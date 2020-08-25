import React, {Component} from "react";
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    viewPoint,
    updatePoint,
    // createPoint,
    resetStatus,
} from "appRedux/actions/Point";
// import {
//     viewMerchant,
//     getListCurrency,
// } from "appRedux/actions/Merchant";
import {Button, Card, DatePicker, Form, Input, Select,
    // InputNumber, Popconfirm, Table
} from "antd";
import moment from "moment";


const FormItem = Form.Item;
// const Option = Select.Option;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};

class UpdatePointValue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            merchant: [],
            currency: [],
            // logoPoint: [],
            msgContent : '',
            msgType : '',
            msgShow : false,
            endOpen: false,

        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
    }

    componentWillMount(){
        let credential = this.props.authUser;
        // this.props.viewMerchant(credential);

        // if (this.props.listCurrency.length < 1) {
        //     this.props.getListCurrency();
        // }

        if(this.props.match.params.type === 'update'){
            credential.id = this.props.match.params.id;
            this.props.viewPoint(credential);
        }else{
            let data = [];
            this.setState({
                data : data
            })
        }

    }

    componentWillReceiveProps(nextProps){

        // if (nextProps.merchant !== undefined && nextProps.merchant !== this.props.merchant) {
        //     let request = {
        //         authToken: localStorage.getItem('a'),
        //         deviceId: localStorage.getItem('d'),
        //         userId: localStorage.getItem('u'),
        //         merchantId: localStorage.getItem('mt'),
        //         paramCurrencyPoint: -1
        //     };
        //     this.props.getListCurrency(request);
        // }

        // if (nextProps.listCurrency !== this.props.listCurrency) {
        //     this.setState({
        //         listCurrency: nextProps.listCurrency
        //     })
        // }

        // if (nextProps.data.currency !== this.props.data.currency) {
        //     this.setState({
        //         currency: nextProps.data.currency
        //     });
        // }


        if(this.props.match.params.type === 'update') {
            if (nextProps.data !== this.props.data) {


                if(nextProps.data !== undefined){

                    // this.state.data.pointValue=nextProps.data.pointValue;
                    // this.state.data.currency=nextProps.data.currency;
                    // this.state.data.startDate=nextProps.data.startDate;
                    // this.state.data.endDate=nextProps.data.endDate;


                    if(nextProps.data.startDate != null ||
                        nextProps.data.startDate !== ''){
                        nextProps.data.startDate = moment(nextProps.data.startDate, 'YYYY/MM/DD');
                    }

                    if(nextProps.data.endDate != null ||
                        nextProps.data.endDate !== ''){
                        nextProps.data.endDate = moment(nextProps.data.endDate, 'YYYY/MM/DD');
                    }

                    this.setState({
                        data: nextProps.data,
                    });
                }
            }
        }else{
            let newData = this.state.data;


            this.setState({
                data : newData,
                pointValueId : ''
            })
        }

        if (nextProps.updateSuccess && !nextProps.updateFailed){
            this.setState({
                msgContent : 'Updated Successfully',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.updateSuccess && nextProps.updateFailed){
            this.setState({
                msgContent : 'Update failed',
                msgShow : true,
                msgType : 'danger'
            })
        }

        if (nextProps.createSuccess && !nextProps.createFailed){
            this.setState({
                msgContent : 'Created Successfully',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.createSuccess && nextProps.createFailed){
            this.setState({
                msgContent : 'Create failed',
                msgShow : true,
                msgType : 'danger'
            })
        }
    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let error = false;

                let request = this.props.authUser;
                // const {data, dataSourceTier, selectedRowKeys, selectedRule} = this.state;

                // values.currency = data.currency
                values.startDate = moment(values.startDate).format('YYYY-MM-DD')
                values.endDate = moment(values.endDate).format('YYYY-MM-DD')

                request.data = values;

                if(!error){
                    this.props.updatePoint(request);
                }

            }
        });
    };

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }


    back(){
        this.props.history.goBack();
    }

    onConfirm(){
        this.props.resetStatus();
        if(this.state.msgType === "success"){
            this.props.history.goBack();
        }else{
            this.setState({
                msgShow : false
            })
        }
    }

    changeCurrency(value) {
        this.props.form.setFieldsValue({
            lookupDtlId: value
        });
    }

    onChangeStartDate(date, dateString) {
        if(dateString !== undefined){
            let newData = this.state.data;
            newData.startDate = date;
            this.setState({
                data : newData
            });
        }
    }

    onChangeEndDate(date, dateString) {
        if(dateString !== undefined){
            let newData = this.state.data;
            newData.endDate = date;
            this.setState({
                data : newData
            });
        }
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    disabledStartDate = (startValue) => {
        const endValue = moment(this.state.data.endDate, 'YYYY/MM/DD');
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = moment(this.state.data.startDate, 'YYYY/MM/DD');
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        let {data} = this.state;
        const { msgShow, msgType, msgContent, endOpen,
            // showDay, showDate, currency
        } = this.state;

        // let optionProvince = [];
        // this.props.listProvince.forEach((province, i) => {
        //     let option =
        //         <Option key={i} value={province.id}>{province.label}</Option>
        //     ;
        //     optionProvince.push(option);
        // });
        //
        // let optionCity = [];
        // this.state.listCity.forEach((city, i) => {
        //     let option =
        //         <Option key={i} value={city.id}>{city.label}</Option>
        //     ;
        //     optionCity.push(option);
        // });

        // let optionCurrency = [];
        // this.props.listCurrency.forEach((currency, i) => {
        //     let option =
        //         <Option key={i} value={currency.lookupDtlId}>{currency.description}</Option>;
        //     optionCurrency.push(option);
        // });


        return(
            <Card className="gx-card" title='Point Value'>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Point Value'>
                        {getFieldDecorator('pointValue', {
                            rules: [{
                                required: true,
                                message: 'Please input point value'
                            }],
                            initialValue: data.pointValue
                        })(
                            <Input placeholder='Point Value'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Currency'>
                        {getFieldDecorator('currency', {
                            rules: [{
                                required: true,
                                message: 'Please input currency'
                            }],
                            initialValue: data.currency
                        })(
                            <Input placeholder='Currency' disabled={true}/>
                        )}
                    </FormItem>

                    {/*<FormItem id='type' {...formItemLayout} label='Currency'>*/}
                    {/*    {getFieldDecorator('currency', {*/}
                    {/*        rules: [{*/}
                    {/*            required: true,*/}
                    {/*            message: 'Please select your currency!'*/}
                    {/*        }],*/}
                    {/*        initialValue: data.currency*/}
                    {/*    })(*/}
                    {/*        <Select*/}
                    {/*            onChange={this.changeCurrency.bind(this)}*/}
                    {/*            placeholder={*/}
                    {/*                <div>*/}
                    {/*                    <span style={{marginLeft: '5px'}}>Currency</span>*/}
                    {/*                </div>*/}
                    {/*            }>*/}
                    {/*            {optionCurrency}*/}
                    {/*        </Select>*/}
                    {/*    )}*/}
                    {/*</FormItem>*/}

                    <FormItem {...formItemLayout} label='Start Date'>
                        {getFieldDecorator('startDate', {
                            rules: [{
                                required: true,
                                message: 'Please input start date'
                            }],
                            initialValue: data.startDate

                        })(
                            <DatePicker className="gx-mb-3 gx-w-100"
                                        disabledDate={this.disabledStartDate}
                                        onChange={this.onChangeStartDate.bind(this)}
                                        onOpenChange={this.handleStartOpenChange}
                                // disabled = {(this.props.match.params.type === 'update')}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='End Date'>
                        {getFieldDecorator('endDate', {
                            rules: [{
                                required: true,
                                message: 'Please input end date'
                            }],
                            initialValue: data.endDate

                        })(
                            <DatePicker className="gx-mb-3 gx-w-100"
                                        disabledDate={this.disabledEndDate}
                                        onChange={this.onChangeEndDate.bind(this)}
                                        onOpenChange={this.handleEndOpenChange}
                                        open={endOpen}
                                // disabled = {(this.props.match.params.type === 'update')}
                            />
                        )}
                    </FormItem>


                    <FormItem {...formTailLayout}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button type="default" onClick={this.back} >Back</Button>
                    </FormItem>

                </Form>
                <SweetAlert success={msgType ==='success' ? true : false} danger={msgType ==='danger' ? true : false}
                            show={msgShow} title={msgContent} onConfirm={this.onConfirm}>
                </SweetAlert>
                <NotificationContainer/>
            </Card>
        );

    }
}

const mapStateToProps = ({auth, pointState,
                             // merchantState, commonState
}) => {
    const {authUser} = auth;
    // const {listProvince, listCity} = commonState;
    // const {merchant, currency, logoPoint, listCurrency} = merchantState;
    const {data, updateSuccess, updateFailed, updateData,
        // createSuccess, createFailed,  createData
    } = pointState;
    return {authUser, data, updateSuccess, updateFailed, updateData,
        // createSuccess, createFailed, createData, merchant, currency, logoPoint, listCurrency, listProvince, listCity,
    }
};

export default connect(mapStateToProps, {
    viewPoint,
    updatePoint,
    // createPoint,
    resetStatus,
    // viewMerchant,
    // getListCurrency,
    // getCurrencyMerchant,
    // getListProvince,
    // getListCity
})(Form.create()(UpdatePointValue));


