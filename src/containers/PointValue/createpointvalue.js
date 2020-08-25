import React, {Component} from "react";
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    createPoint,
    resetStatus,
} from "appRedux/actions/Point";
import {
    getListProvince,
    getListCity
} from "appRedux/actions/Common";
import {
    viewMerchant,
} from "appRedux/actions/Merchant";
import {
    Button, Card, DatePicker, Form, Input, message, Select,
} from "antd";
import moment from "moment";
import CircularProgress from "components/CircularProgress/index";


const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};

class CreatePointValue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            merchant: [],
            listCity : [],
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
        this.props.viewMerchant(credential);

    }

    componentWillReceiveProps(nextProps){

        if (nextProps.listCity !== this.props.listCity) {
            this.setState({
                listCity : nextProps.listCity
            })
        }

        if (nextProps.merchant !== undefined && nextProps.merchant !== this.props.merchant) {
            let request = {
                id: nextProps.merchant.address.provinceId
            };
            this.props.getListCity(request);

            this.setState({
                merchant: nextProps.merchant,
                previewImage: nextProps.merchant.merchantLogo
                // count: totalRec + 1
            });

            if (nextProps.merchant.merchantLogo !== null) {
                let fileListRaw = [{
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: nextProps.merchant.merchantLogo,
                }];

                this.setState({
                    fileList: fileListRaw
                })
            }

        }

        if (nextProps.filePath !== this.props.filePath && this.state.merchant.merchantCode !== '' && nextProps.filePath !== '') {
            let filePath = nextProps.filePath;

            let merchantNew = this.state.merchant;
            merchantNew.merchantLogo = filePath;
            this.setState({
                merchant: merchantNew
            });

            this.props.resetFilePath();
        }


        if(this.props.match.params.type === 'update') {
            if (nextProps.data !== this.props.data) {


                if(nextProps.data !== undefined){

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

    changeProvince(value){
        let request = {
            id : value
        }
        this.props.getListCity(request);

        this.props.form.setFieldsValue({
            cityId: ''
        });
    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let error = false;

                let request = this.props.authUser;

                values.startDate = moment(values.startDate).format('YYYY-MM-DD')
                values.endDate = moment(values.endDate).format('YYYY-MM-DD')

                request.data = values;

                if(!error){
                    this.props.createPoint(request);
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
        const {loader} = this.props;
        const { msgShow, msgType, msgContent, endOpen, alertMessage, showMessage, merchant} = this.state;

        let currency = {
            lookupDtlId: '',
            lookupHdrId: '',
            lookupCode: '',
            lookupValue: '',
            description: '',
            icon: ''
        };

        if (merchant.currency !== undefined) {
            currency = merchant.currency;
        }

        let optionProvince= [];
        this.props.listProvince.forEach((province,i)=>{
            let option =
                <Option key={i} value={province.id}>{province.label}</Option>
            ;
            optionProvince.push(option);
        })

        let optionCity= [];
        this.state.listCity.forEach((city,i)=>{
            let option =
                <Option key={i} value={city.id}>{city.label}</Option>
            ;
            optionCity.push(option);
        })

        return(
            <Card className="gx-card" title='Point Value'>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Point Value'>
                        {getFieldDecorator('pointValue', {
                            rules: [{
                                required: true,
                                message: 'Please input point value'
                            }],
                            // initialValue: data.pointValue
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
                            initialValue: currency.description
                        })(
                            <Input placeholder='Currency' disabled={true}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Start Date'>
                        {getFieldDecorator('startDate', {
                            rules: [{
                                required: true,
                                message: 'Please input start date'
                            }],
                            // initialValue: data.startDate

                        })(
                            <DatePicker className="gx-mb-3 gx-w-100"
                                        disabledDate={this.disabledStartDate}
                                        onChange={this.onChangeStartDate.bind(this)}
                                        onOpenChange={this.handleStartOpenChange}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='End Date'>
                        {getFieldDecorator('endDate', {
                            rules: [{
                                required: true,
                                message: 'Please input end date'
                            }],
                            // initialValue: data.endDate

                        })(
                            <DatePicker className="gx-mb-3 gx-w-100"
                                        disabledDate={this.disabledEndDate}
                                        onChange={this.onChangeEndDate.bind(this)}
                                        onOpenChange={this.handleEndOpenChange}
                                        open={endOpen}
                            />
                        )}
                    </FormItem>


                    <FormItem {...formTailLayout}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button type="default" onClick={this.back} >Back</Button>
                    </FormItem>

                </Form>
                {loader ?
                    <div style={{position: 'absolute', top: 0, left:0, right:0, bottom:0}} className="gx-loader-view">
                        <CircularProgress/>
                    </div> : null}
                {showMessage ?
                    message.error(alertMessage.toString()) : null}
                <SweetAlert success={msgType ==='success' ? true : false} danger={msgType ==='danger' ? true : false}
                            show={msgShow} title={msgContent} onConfirm={this.onConfirm}>
                </SweetAlert>
                <NotificationContainer/>
            </Card>
        );

    }
}

const mapStateToProps = ({auth, pointState, merchantState, commonState}) => {
    const {authUser} = auth;
    const {merchant} = merchantState;
    const {listProvince, listCity} = commonState;
    const {updateData, createSuccess, createFailed,  createData, alertMessage, loader, showMessage,
        // data,
    } = pointState;
    return {authUser, updateData, createSuccess, createFailed, createData, merchant, alertMessage, loader, showMessage, listProvince, listCity,
        // data,
    }
};

export default connect(mapStateToProps, {
    getListProvince,
    getListCity,
    createPoint,
    resetStatus,
    viewMerchant,
})(Form.create()(CreatePointValue));


