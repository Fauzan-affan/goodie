import React, {Component} from "react";
import CKEditor from "react-ckeditor-component";
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import BlastType from "../../constants/BlastType"
import {NotificationContainer, NotificationManager} from "react-notifications";
// import CircularProgress from "components/CircularProgress/index";
import {
    viewBlast,
    updateBlast,
    createBlast,
    resetStatus
} from "appRedux/actions/Blast";
import {
    Button,
    Card,
    Form,
    Input,
    // InputNumber,
    // Modal,
    Select,
    // Switch,
    Upload,
    Icon,
    // Radio,
    DatePicker,
    Table,
    // Row, Col, message
} from "antd";
// import update from "immutability-helper";
import moment from "moment";

// const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
// const TextArea = Input.TextArea;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};


class CreateUpdateBlast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageBlast : [],
            msgContent : '',
            msgType : '',
            msgShow : false,
            visible: false,
            memberData : [],
            // enableModalUpload : false,
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
    }

    componentWillMount(){
        let credential = this.props.authUser;

        if(this.props.match.params.type === 'update'){
            credential.id = this.props.match.params.id;
            this.props.viewBlast(credential);
        }else{
            let messageBlast = [];
            messageBlast.messageType = this.props.match.params.messageType === 'email' ? 1 : 2

            this.setState({
                messageBlast : messageBlast
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.match.params.type === 'update') {

            if (nextProps.messageBlast !== undefined && nextProps.messageBlast !== this.props.messageBlast) {
                this.setState({
                    messageBlast: nextProps.messageBlast,
                });

            }
        }

        if (nextProps.updateSuccess && !nextProps.updateFailed){
            this.setState({
                msgContent : 'Updated Message Blast Successfully',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.updateSuccess && nextProps.updateFailed){
            this.setState({
                msgContent : 'Update failed. ' +  localStorage.getItem("Update Failed")+ '. Please Create New Message Blast',
                msgShow : true,
                msgType : 'danger'
            })
        }

        if (nextProps.createSuccess && !nextProps.createFailed){
            this.setState({
                msgContent : 'Created Message Blast Successfully',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.createSuccess && nextProps.createFailed){
            this.setState({
                msgContent : 'Create Message Blast failed. '+  localStorage.getItem("Create Failed"),
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


                if (this.props.match.params.messageType === 'email') {
                    let Papa = require("papaparse/papaparse.min.js");
                    Papa.parse(info.file.originFileObj, {
                        header: true,
                        download: true,
                        skipEmptyLines: true,
                        // Here this is also available. So we can call our custom class method
                        complete: this.updateDataFromCsv1
                    });
                }else if (this.props.match.params.messageType === 'sms') {
                    let Papa = require("papaparse/papaparse.min.js");
                    Papa.parse(info.file.originFileObj, {
                        header: true,
                        download: true,
                        skipEmptyLines: true,
                        // Here this is also available. So we can call our custom class method
                        complete: this.updateDataFromCsv
                    });
                }

                break;

            default:
                // error or removed
                this.setState({
                    memberData : []
                });
        }
    }

    updateDataFromCsv1 = (result) => {
        const data = result.data;

        let errorId = 0;
        let errorMessage = '';

        //Delete blank record
        let self = this;
        // let quantity = 0;

        data.forEach((voucher, i)=>{
            let defaultMessage = 'must not empty';
            voucher.key = i;

            if(voucher.no === '' || voucher.no === undefined){
                errorId = i + 1;
                errorMessage = "no";
            }else{
                if(voucher.no.length > 50){
                    errorId = i + 1;
                    errorMessage = "no";
                    defaultMessage = 'no must be filled'
                }
            }

            if(voucher.emailAddress === '' || voucher.emailAddress === undefined){
                errorId = i + 1;
                errorMessage = "email address";
            }else{
                if(voucher.emailAddress.length > 50){
                    errorId = i + 1;
                    errorMessage = "email address";
                    defaultMessage = 'email address length must below 12 number or less'
                }
            }

            if(voucher.nameReceiver === '' || voucher.nameReceiver === undefined){
                errorId = i + 1;
                errorMessage = "name receivers";
            }else{
                if(voucher.nameReceiver.length > 50){
                    errorId = i + 1;
                    errorMessage = "name receivers";
                    defaultMessage = 'name receivers length must below 50 characters'
                }
            }

            if(errorMessage !== ''){
                self.errorNotification('Import data from csv file was failed. Column '+errorMessage+' on '+errorId+'th row '+defaultMessage+'.');
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

            if(voucher.no === '' || voucher.no === undefined){
                errorId = i + 1;
                errorMessage = "no";
            }else{
                if(voucher.no.length > 50){
                    errorId = i + 1;
                    errorMessage = "no";
                    defaultMessage = 'no must be filled'
                }
            }

            if(voucher.mobileNumber === '' || voucher.mobileNumber === undefined){
                errorId = i + 1;
                errorMessage = "mobile number";
            }else{
                if(voucher.mobileNumber.length > 50){
                    errorId = i + 1;
                    errorMessage = "mobile number";
                    defaultMessage = 'mobile number length must below 12 number or less'
                }
            }

            if(voucher.nameReceiver === '' || voucher.nameReceiver === undefined){
                errorId = i + 1;
                errorMessage = "name receivers";
            }else{
                if(voucher.nameReceiver.length > 50){
                    errorId = i + 1;
                    errorMessage = "name receivers";
                    defaultMessage = 'name receivers length must below 50 characters'
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

                const {memberData,
                    // messageBlast
                } = this.state;

                let request = this.props.authUser;
                values.content = this.state.messageBlast.content;


                let members = [];
                memberData.forEach((data, i) => {
                    let member = {
                        no: data.no,
                        mobileNumber: data.mobileNumber,
                        emailAddress: data.emailAddress,
                        nameReceiver: data.nameReceiver

                    };
                    members.push(member);
                });

                    values.members = members;
                    values.sendDate = values.sendDate.format('YYYY-MM-DD HH:mm:ss');


                request.data = values;

                if(!error){
                    if(this.props.match.params.type === 'update') {
                        this.props.updateBlast(request);
                    }else{
                        this.props.createBlast(request);
                    }
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

    onChange(evt) {
        const newContent = evt.editor.getData();
        let newBlast = this.state.messageBlast;
        newBlast.content = newContent;
        this.setState({
            messageBlast : newBlast
        })
    }

    onBlur(evt) {
        // console.log('onBlur event called with event info: ', evt);
    }

    afterPaste(evt) {
        // console.log('afterPaste event called with event info: ', evt);
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        let {messageBlast} = this.state;
        const { msgShow, msgType, msgContent, memberData,
            // dataSource, selectedRowKeys, enableModalUpload,
        } = this.state;


        let options = [];
        BlastType.values().forEach((type, i) => {
            let option = [];
            option.push(
                <Option key={i} value={type.value}>{type.label}</Option>
            );
            options.push(option);
        });

        // const radioStyle = {
        //     display: 'block',
        //     height: '30px',
        //     lineHeight: '30px',
        // };

        const columns = [{
            title: 'No',
            dataIndex: 'no'
        },{
            title: 'Mobile Number',
            dataIndex: 'mobileNumber'
        },{
            title: 'Email',
            dataIndex: 'emailAddress'
        },{
            title: ' Name Receiver',
            dataIndex: 'nameReceiver'
        }]

        //for upload member
        const dummyRequest = ({ file, onSuccess }) => {
            setTimeout(() => {
                onSuccess("ok");
            }, 0);
        };



        return(
            <Card className="gx-card" title='Blast'>

                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Message type'>
                        {getFieldDecorator('messageType',{
                            initialValue: messageBlast.messageType,
                            rules: [{
                                required: true,
                                message: 'Please input message type',
                            }],
                        })(
                            <Select style={{width: '50%'}} disabled={true}>
                                {options}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Subject'>
                        {getFieldDecorator('subject', {
                            rules: [{
                                required: true,
                                message: 'Please input message name'
                            }],
                            initialValue: messageBlast.subject
                        })(
                            <Input placeholder='Subject'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Date & Time'>
                        {getFieldDecorator('sendDate', {
                            rules: [{
                                required: true,
                                message: 'Please input send date'
                            }],
                            initialValue: messageBlast.sendDate ? moment(messageBlast.sendDate, 'YYYY-MM-DD HH:mm:ss') : ''

                        })(
                            <DatePicker className="gx-mb-3 gx-w-100" showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Content'>

                        <CKEditor
                            activeClass="p10"
                            content={messageBlast.content}
                            events={{
                                'blur': this.onBlur.bind(this),
                                'afterPaste': this.afterPaste.bind(this),
                                'change': this.onChange.bind(this),
                                'type': 'text'
                            }}
                        />
                        <span style={{color:'red'}}>* For SMS Maximum content 140 characters</span>
                    </FormItem>

                    <Form.Item {...formItemLayout} label="Receivers">
                        {getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload accept='.csv'
                                    customRequest={dummyRequest}
                                    onChange={this.handleupload.bind(this)}>
                                <Button type="primary">
                                    <Icon type="upload" /> Click to Upload
                                </Button>
                            </Upload>
                        )}
                    </Form.Item>



                    <Table className="gx-table-responsive" pagination = {false} columns={columns} dataSource={memberData}/>

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

const mapStateToProps = ({auth, blastState}) => {
    const {authUser} = auth;
    const {messageBlast, updateSuccess, updateFailed, updateData, createSuccess, createFailed,  createData, uploadSuccess, uploadFailed} = blastState
    return {authUser, messageBlast, updateSuccess, updateFailed, updateData, createSuccess, createFailed, createData, uploadSuccess, uploadFailed}
};

export default connect(mapStateToProps, {viewBlast, updateBlast, createBlast, resetStatus})(Form.create()(CreateUpdateBlast));


