import React, {Component} from "react";
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import FileBase64 from 'react-file-base64';
import {
    createDoorprize,
    resetStatus
} from "appRedux/actions/Doorprize";
import {
    Button,
    Card,
    Form,
    Input,
    // InputNumber,
    // Modal,
    // Select,
    // Switch,
    // Upload,
    // Icon,
    // Radio,
    // DatePicker,
    // Table, Row, Col, message
} from "antd";
// import update from "immutability-helper";
// import moment from "moment";

// const RadioGroup = Radio.Group;
const FormItem = Form.Item;
// const Option = Select.Option;
// const TextArea = Input.TextArea;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};


class CreateDoorprize extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            msgContent : '',
            msgType : '',
            msgShow : false,
            visible: false,
            memberData : [],
            strBase64: ''
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
    }

    componentWillMount(){
        // let credential = this.props.authUser;
        //
        // if(this.props.match.params.type === 'update'){
        //     credential.id = this.props.match.params.id;
        //     this.props.viewBlast(credential);
        // }else{
        //     let messageBlast = [];
        //     messageBlast.messageType = this.props.match.params.messageType === 'email' ? 1 : 2
        //
        //     this.setState({
        //         messageBlast : messageBlast
        //     })
        // }
    }

    componentWillReceiveProps(nextProps){
        // if(this.props.match.params.type === 'update') {
        //
        //     if (nextProps.messageBlast !== undefined && nextProps.messageBlast != this.props.messageBlast) {
        //         this.setState({
        //             messageBlast: nextProps.messageBlast,
        //         });
        //
        //     }
        // }

        // if (nextProps.updateSuccess && !nextProps.updateFailed){
        //     this.setState({
        //         msgContent : 'Updated Message Blast Successfully',
        //         msgShow : true,
        //         msgType : 'success'
        //     })
        // }else if (!nextProps.updateSuccess && nextProps.updateFailed){
        //     this.setState({
        //         msgContent : 'Update failed. ' +  localStorage.getItem("Update Failed")+ '. Please Create New Message Blast',
        //         msgShow : true,
        //         msgType : 'danger'
        //     })
        // }

        if (nextProps.createSuccess && !nextProps.createFailed){
            this.setState({
                msgContent : 'Created Doorprize Successfully',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.createSuccess && nextProps.createFailed){
            this.setState({
                msgContent : 'Create Doorprize failed. ',
                msgShow : true,
                msgType : 'danger'
            })
        }
    }

    normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    handleupload(info){
        // const nextState = {};

        switch (info.file.status) {
            case "done":


                    let Papa = require("papaparse/papaparse.min.js");
                    Papa.parse(info.file.originFileObj, {
                        header: true,
                        download: true,
                        skipEmptyLines: true,
                        // Here this is also available. So we can call our custom class method
                        complete: this.updateDataFromCsv
                    });

                break;

            default:
                // error or removed
                this.setState({
                    memberData : []
                });
        }
    }


    updateDataFromCsv = (result) => {
        const data = result.data;

        let errorId = 0;
        let errorMessage = '';

        //Delete blank record
        let self = this;
        // let quantity = 0;

        data.forEach((voucher, i)=>{
            let defaultMessage = 'must not empty';
            voucher.key = i;

            if(voucher.MEMBER_NAME === '' || voucher.MEMBER_NAME === undefined){
                errorId = i + 1;
                errorMessage = "no";
            }else{
                if(voucher.MEMBER_NAME.length > 50){
                    errorId = i + 1;
                    errorMessage = "member name";
                    defaultMessage = 'length must below 50 characters'
                }
            }

            if(voucher.PHONE_NUMBER === '' || voucher.PHONE_NUMBER === undefined){
                errorId = i + 1;
                errorMessage = "phone number";
            }else{
                if(voucher.PHONE_NUMBER.length > 50){
                    errorId = i + 1;
                    errorMessage = "phone number";
                    defaultMessage = 'phone number length must below 12 number or less'
                }
            }

            if(voucher.EMAIL === '' || voucher.EMAIL === undefined){
                errorId = i + 1;
                errorMessage = "email";
            }else{
                if(voucher.EMAIL.length > 50){
                    errorId = i + 1;
                    errorMessage = "email";
                    defaultMessage = 'email length must below 50 characters'
                }
            }

            if(errorMessage !== ''){
                self.errorNotification('Import receiver from csv file was failed. Column '+errorMessage+' on '+errorId+'th row '+defaultMessage+'.');
                return true;
            }

            // quantity ++;
        });

        if(errorMessage === ''){
            this.setState({
                memberData : data,
                errorImport : false
            });
        }else{
            this.setState({
                memberData : [],
                errorImport : true
            });
        }
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let error = false;

                const {
                    // memberData, data, files,
                    strBase64} = this.state;

                let request = this.props.authUser;


                request.base64file = strBase64
                // let members = [];
                // memberData.forEach((data, i) => {
                //     let member = {
                //         MEMBER_NAME: data.MEMBER_NAME,
                //         PHONE_NUMBER: data.PHONE_NUMBER,
                //         EMAIL: data.EMAIL,
                //
                //     };
                //     members.push(member);
                // });
                //
                // values.members = members;

                request.data = values;

                if(!error){
                        this.props.createDoorprize(request);
                }

            }
        });
    };

    getFiles(files){
        var strBase64 = '';
        strBase64 = JSON.stringify(files, ['base64']);

        const answer_array = strBase64.split(',');
        const base64String=answer_array[1].split('"');
        strBase64 = base64String[0];
        this.setState({ strBase64: strBase64 });
    }


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

    render() {

        const {getFieldDecorator} = this.props.form;
        let {data} = this.state;
        const { msgShow, msgType, msgContent,
            // memberData
        } = this.state;


        // const radioStyle = {
        //     display: 'block',
        //     height: '30px',
        //     lineHeight: '30px',
        // };

        // const columns = [{
        //     title: 'Name',
        //     dataIndex: 'MEMBER_NAME'
        // },{
        //     title: 'Phone Number',
        //     dataIndex: 'PHONE_NUMBER'
        // },{
        //     title: 'Email',
        //     dataIndex: 'EMAIL'
        // }]

        //for upload member
        // const dummyRequest = ({ file, onSuccess }) => {
        //     setTimeout(() => {
        //         onSuccess("ok");
        //     }, 0);
        // };



        return(
            <Card className="gx-card" title='Doorprize'>

                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Period'>
                        {getFieldDecorator('period', {
                            rules: [{
                                required: true,
                                message: 'Please input period'
                            }],
                            initialValue: data.period
                        })(
                            <Input placeholder='Period'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Reward'>
                        {getFieldDecorator('reward', {
                            rules: [{
                                required: true,
                                message: 'Please input reward'
                            }],
                            initialValue: data.reward
                        })(
                            <Input placeholder='Reward'/>
                        )}
                    </FormItem>

                    <Form.Item {...formItemLayout} label="Candidates">
                        <FileBase64
                            multiple={ true }
                            onDone={ this.getFiles.bind(this) } />
                        <span style={{color:'red'}}>* Upload File by .csv</span>

                    </Form.Item>

                    {/*<Form.Item {...formItemLayout} label="Candidates">*/}
                    {/*    {getFieldDecorator('upload', {*/}
                    {/*        valuePropName: 'fileList',*/}
                    {/*        getValueFromEvent: this.normFile,*/}
                    {/*    })(*/}
                    {/*        <Upload accept='.csv'*/}
                    {/*                customRequest={dummyRequest}*/}
                    {/*                onChange={this.handleupload.bind(this)}>*/}
                    {/*            <Button type="primary">*/}
                    {/*                <Icon type="upload" /> Click to Upload*/}
                    {/*            </Button>*/}
                    {/*        </Upload>*/}
                    {/*    )}*/}
                    {/*</Form.Item>*/}



                    {/*<Table className="gx-table-responsive" pagination = {false} columns={columns} dataSource={memberData}/>*/}

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

const mapStateToProps = ({auth, doorprizeState}) => {
    const {authUser} = auth;
    const {data, createSuccess, createFailed,  createData, uploadSuccess, uploadFailed} = doorprizeState
    return {authUser, data, createSuccess, createFailed, createData, uploadSuccess, uploadFailed}
};

export default connect(mapStateToProps, {createDoorprize, resetStatus})(Form.create()(CreateDoorprize));


