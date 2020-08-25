import React, {Component} from "react";
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import MethodApproval from '../../constants/MethodApproval';

// import {
//     viewProduct,
//     updateProduct,
//     createProduct,
//     resetStatus
// } from "appRedux/actions/Product";
import {
    viewApproval,
    inqPostApproval,
    // updateApproval,
    // resetStatus,
} from "appRedux/actions/Approval";
import {
    showLoader
    // uploadImage,
    // resetFilePath
} from "appRedux/actions/Common";
import {
    Button,
    Card,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
    Upload,
    Icon,
    DatePicker,
    Radio, Switch
} from "antd";
import {loadReCaptcha} from "react-recaptcha-google";
// import Spin from 'antd/es/spin';
// import 'antd/es/spin/style/css';

const RadioGroup = Radio.Group;
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14}
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};

class QualityControlApproval extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            msgContent : '',
            msgType : '',
            msgShow : false,
            previewVisible: false,
            previewImage: '',
            fileList: [],
            statusAmount:true,
            totalAmount:0,
            customAmount:0,
            statusReason:true,
            isApproval:true,
            pointEarned: null ,
            isCalculate:false,
            // spinnerPoint:true,
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.onChangeSwitch = this.onChangeSwitch.bind(this);
        this.handleApprovement = this.handleApprovement.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setPointDefault = this.setPointDefault.bind(this);
        this.inqPoint = this.inqPoint.bind(this);

        // global variable
        let reqBody;
    }

    UNSAFE_componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        credential.page = 0;
        this.props.viewApproval(credential);

        console.log("this.state")
        console.log(this.state)

        // let data = [];
        // data.methodApproval = MethodApproval.MethodApproval.ACCEPT.label;
        // this.setState({
        //
        // })

        // if(this.props.match.params.type === 'update'){
        //     credential.id = this.props.match.params.id;
        //     this.props.viewApproval(credential);
        // }else{
        //     let data = [];
        //     // data.adsCategory = MethodApproval.MethodApproval.COMMON.label;
        //     // this.setState({
        //     //     rewardDisable : false
        //     // })
        //
        //
        //     this.setState({
        //         data : data
        //     })
        // }
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.data!==undefined){
            this.setState({
                data: nextProps.data,
                // rewardDisable: true,
            });
        }

        if(nextProps.data.length>0){
            this.setState({
                totalAmount:nextProps.data[0].totalAmount
            });
        }

        if(nextProps.dataInq !== undefined){

            if(this.state.totalAmount!=0){

                this.setState({
                    // pointEarned : pointEarned
                    pointEarned: nextProps.dataInq.accPoint
                    // spinnerPoint:false
                });
            }

            if(nextProps.dataInq.abstractResponse.responseStatus==='INQ004'){
                this.setState({
                    msgContent : 'Updated Successfully',
                    msgShow : true,
                    msgType : 'success_update'
                })
            }else if(nextProps.dataInq.abstractResponse.responseStatus==='INQ000'){
                this.setState({
                    msgContent : 'Updated Successfully',
                    msgShow : false,
                    msgType : 'success'
                })
            }else{
                this.setState({
                    msgContent : 'Updated Failed',
                    msgShow : true,
                    msgType : 'failed_update'
                })
            }

        }

        if(this.props.match.params.type === 'update') {

            if (nextProps.data !== undefined && nextProps.data !== this.props.data) {
                this.setState({
                    data: nextProps.data,
                    previewImage: nextProps.data.imageUrl
                    // count: totalRec + 1
                });

                if(nextProps.data.imageUrl !== null){
                    let fileListRaw = [{
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: nextProps.data.imageUrl,
                    }]

                    this.setState({
                        fileList: fileListRaw
                    })
                }


            }

            if (nextProps.data.adsCategory === MethodApproval.MethodApproval.ACCEPT.label) {
                this.setState({
                    data: nextProps.data,
                    rewardDisable: true,
                });
            } else if (nextProps.data.adsCategory === MethodApproval.MethodApproval.DECLINE.label) {
                this.setState({
                    data: nextProps.data,
                    rewardDisable: false,
                });
            }
        }

        if(nextProps.filePath !== this.props.filePath && this.state.data.receiptId !== '' && nextProps.filePath!== ''){
            let filePath = nextProps.filePath;

            let dataNew = this.state.data;
            dataNew.imageUrl = filePath;
            this.setState({
                data : dataNew
            })

            this.props.resetFilePath();
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let totalAmount = values.totalAmount;
                if(!this.state.statusAmount){
                    totalAmount = values.customAmount
                }
                this.reqBody = this.props.authUser;
                this.reqBody.id = this.props.match.params.id;
                this.reqBody.totalAmount = totalAmount;
                this.reqBody.action = 'POSTING';
                this.reqBody.status = values.methodApproval;
                this.reqBody.description = values.description;

                this.props.inqPostApproval(this.reqBody);
                this.onConfirm();
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
        if(this.state.msgType === "success_update"){
            this.props.history.goBack();
        }else if(this.state.msgType === "failed_update"){
            this.setState({
                msgShow : true
            })
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

    uploadImage = (image) => {
        let credential = this.props.authUser;
        credential.file = image;
        this.props.uploadImage(credential);
    }

    handlePreview = (image) => {
        this.setState({
            previewImage: image.url || image.thumbUrl,
            previewVisible: true,
        });
    }

    handleCancel = () => this.setState({ previewVisible: false })

    // handleChange = ({ fileList }) => this.setState({ fileList })

    onChangeSwitch(checked) {
        this.setState({
            statusAmount    : checked?false:true,
            totalAmount     : checked?this.props.data[0].totalAmount:this.state.totalAmount,
            // isApproval      : checked?false:true
            pointEarned     : checked?'':this.state.pointEarned,
            // isCalculate    : checked?false:true,
        });
        if(!checked){
            this.inqPoint(this.props.data[0].totalAmount)
            this.setState({
                isCalculate    : false,
            });
        }
    }

    handleApprovement(value){

        let rejected = MethodApproval.MethodApproval.DECLINE.value;

        if(value==rejected){

            this.setState({
                statusReason:false
            })

        }else {
            this.setState({
                statusReason:true
            })
        }
    }


    handleCalculate = (e) => {
        // e.preventDefault();
        // console.log(this.props.form.getFieldValue('customAmount'))
        this.setState({
            // spinnerPoint:true
            isCalculate:true
        })
        this.reqBody = this.props.authUser;
        this.reqBody.id = this.props.match.params.id;
        this.reqBody.totalAmount = this.props.form.getFieldValue('customAmount');
        this.reqBody.action = 'INQ';
        this.reqBody.status = 0;
        // console.log(values.customAmount);

        // console.log(reqBody);
        this.props.inqPostApproval(this.reqBody);

        // this.props.form.validateFields((err, values) => {
        //
        // });

    };

    inqPoint(totalAmount){
        this.reqBody = this.props.authUser;
        this.reqBody.id = this.props.match.params.id;
        this.reqBody.totalAmount = totalAmount;
        this.reqBody.action = 'INQ';
        this.reqBody.status = 0;
        // console.log("this.state.totalAmount = "+this.state.totalAmount)
        // console.log("totalAmount = "+totalAmount)
        // this.setState({
        //
        // })

        this.props.inqPostApproval(this.reqBody);
    }

    setPointDefault(event){
        this.setState({
            pointEarned     : '',
        });
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        let {data} = this.state;
        const { msgShow, msgType, msgContent, previewVisible, previewImage, fileList, pointEarned } = this.state;
        
        let dataIntPoint = this.props.data;
        
        // dataIntPoint.forEach((item) => {
        //     if(this.props.data){
        //         data = item;
        //         // if(data !== null){
        //         if(this.state.pointEarned !== undefined) {
        //             this.inqPoint(item.totalAmount)
        //         } else {
        //             return data
        //         }
        //     }
        // });

        console.log("data = "+JSON.stringify(this.props.dataInq))

        let totalPoint = '';

        if(this.props.data[0]){
            data = this.props.data[0];

            // console.log("data.totalAmount = "+data.totalAmount)
            // console.log("state.totalAmount = "+ this.state.totalAmount)
            // console.log("point earned = "+this.state.pointEarned)
            if(this.state.pointEarned == null
                 && data.totalAmount == this.state.totalAmount
            ){
            // if(this.state.pointEarned != totalPoint){
                this.inqPoint(data.totalAmount)
            }

        }

        const imageClick = (url) => {
            this.setState({
                previewImage: url ,
                previewVisible: true,
            });
        }

        let displayAmount ={
            display: "",
        };

        let displayCustomAmount ={
            display: "none",
        };




        if(!this.state.statusAmount){
            displayCustomAmount ={
                display: "",
            };
            displayAmount ={
                display: "none",
            };
            if(this.state.isCalculate){
                totalPoint = this.state.pointEarned;

            }
        }else{
            displayAmount ={
                display: "",
            };
            totalPoint = this.state.pointEarned;
        }

        // totalPoint = this.state.pointEarned;


        // let statChecked = true;

        // let statChecked = '';
        // if(data.totalAmount != null && data.totalAmount < 1){
        //     statChecked = 'Yes';
        // }else if(this.props.match.params.productType === 'point' && this.props.match.params.type === 'create'){
        //     statChecked = 'Yes';
        //     // enableSwitch = true;
        // }


        // let options = [];
        // ProductType.values().forEach((type, i) => {
        //     let option = [];
        //     option.push(
        //         <Option key={i} value={type.value}>{type.label}</Option>
        //     );
        //     options.push(option);
        // });

        // let enableSwitch = false;
        // if(this.props.match.params.type === 'update'){
        //     enableSwitch = true;
        // }else if(this.props.match.params.productType === 'point' && this.props.match.params.type === 'create'){
        //     enableSwitch = true;
        // }

        let optionsMethodApproval = [];
        MethodApproval.values().forEach((ads, i) => {
            let optionMethodApproval = [];
            optionMethodApproval.push(
                <Option key={i} value={ads.value}>{ads.label}</Option>
            );
            optionsMethodApproval.push(optionMethodApproval);
        });

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );


        return(
            <Card className="gx-card" title='Approval'>
                <Form onSubmit={this.handleSubmit}>

                    {/*<Row>*/}

                        {/*<Col lg={12} md={12} sm={24} xs={24}>*/}
                            {/*<FormItem {...formItemLayout} label='Product Code'>*/}
                            {/*    {getFieldDecorator('productCode', {*/}
                            {/*        rules: [{*/}
                            {/*            required: true,*/}
                            {/*            message: 'Please input product code'*/}
                            {/*        }],*/}
                            {/*        initialValue: product.productCode*/}
                            {/*    })(*/}
                            {/*        <Input placeholder='Product Code'/>*/}
                            {/*    )}*/}
                            {/*</FormItem>*/}

                            {/*<FormItem {...formItemLayout} label='Product Name'>*/}
                            {/*    {getFieldDecorator('productName', {*/}
                            {/*        rules: [{*/}
                            {/*            required: true,*/}
                            {/*            message: 'Please input product name'*/}
                            {/*        }],*/}
                            {/*        initialValue: product.productName*/}
                            {/*    })(*/}
                            {/*        <Input placeholder='Product Name'/>*/}
                            {/*    )}*/}
                            {/*</FormItem>*/}

                            <FormItem {...formItemLayout} label='Image'>
                                {/*<div className="clearfix">*/}
                                {/*    <Upload*/}
                                {/*        listType="picture-card"*/}
                                {/*        fileList={fileList}*/}
                                {/*        action={this.uploadImage}*/}
                                {/*        onPreview={this.handlePreview}*/}
                                {/*        // onChange={this.handleChange}*/}
                                {/*    >*/}
                                {/*        {fileList.length >= 1 ? null : uploadButton}*/}
                                {/*    </Upload>*/}
                                {/*    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>*/}
                                {/*        <img alt="example" style={{ width: '100%' }} src={previewImage} />*/}
                                {/*    </Modal>*/}
                                {/*    /!*<p style={{marginBottom: '0px', color: 'red'}}>* Maximum upload file size: 2 MB.</p>*!/*/}
                                {/*</div>*/}

                                {/*<button >*/}
                                    <img src={data.imageUrl} alt='image not found' height={'100px'} width={'90px'} style={{cursor: 'pointer'}} onClick={() => imageClick(data.imageUrl)} />
                                {/*</button>*/}

                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>

                            </FormItem>



                        {/*</Col>*/}

                        {/*<Col lg={12} md={12} sm={24} xs={24}>*/}

                            <FormItem {...formItemLayout} label='Transaction ID'>
                                {getFieldDecorator('receiptId', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input transaction id'
                                    }],
                                    initialValue: data.receiptId
                                })(
                                    <span className='ant-form-text'>{data.receiptId}</span>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label='Date'>
                                {getFieldDecorator('startDate', {
                                    // rules: [{
                                    //     required: true,
                                    //     message: 'Please input start date'
                                    // }],
                                    initialValue: data.createdDate

                                })(
                                    // <DatePicker cssName="gx-mb-3 gx-w-100"
                                    //             disabledDate={this.disabledStartDate}
                                    //             onChange={this.onChangeStartDate.bind(this)}
                                    //             onOpenChange={this.handleStartOpenChange}
                                    // />
                                   < span className='ant-form-text'>{data.createdDate}</span>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label='Mobile Number'>
                                {getFieldDecorator('mobileNumber', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input product code'
                                    }],
                                    initialValue: data.mobileNumber
                                })(
                                    // <Input placeholder='Product Code'/>
                                    <span className='ant-form-text'>{data.mobileNumber}</span>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label='Member Name'>
                                {getFieldDecorator('memberName', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input member name'
                                    }],
                                    initialValue: data.memberName
                                })(
                                    // <Input placeholder='Member Name'/>
                                    <span className='ant-form-text'>{data.memberName}</span>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label='Username'>
                                {getFieldDecorator('memberUsername', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input member name'
                                    }],
                                    initialValue: data.memberUsername
                                })(
                                    // <Input placeholder='Member Name'/>
                                    <span className='ant-form-text'>{data.memberUsername}</span>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label='Approvement'>
                                {getFieldDecorator('methodApproval', {
                                    initialValue: MethodApproval.getLabel(data.methodApproval),
                                    rules: [{
                                        required: this.state.isApproval,
                                        message: 'Please input your Approvement',
                                    }],
                                })(
                                    <Select style={{width: '60%'}} htmlType="submit" onChange={this.handleApprovement}>
                                        {optionsMethodApproval}
                                    </Select>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label='Scheme'>
                                {getFieldDecorator('issuingReferral', {
                                    rules: [{
                                        // required: true,
                                        // message: 'Please select issuing point referral'
                                    }],
                                    // initialValue: merchant.issuingReferral
                                })(
                                    <RadioGroup style={{width:'100%'}}>
                                        {/*<Radio style={{paddingBottom: '15px', paddingRight: '500px'}} value={0}> Calculate Point By Amount </Radio>*/}
                                        <FormItem {...formItemLayout} label='Custom Amount' >
                                            <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={this.onChangeSwitch}/>
                                        </FormItem>

                                        <FormItem {...formItemLayout} label='Total Amount' style={displayAmount}>
                                            {getFieldDecorator('totalAmount',{
                                                // rules: [{
                                                //     required: true,
                                                //     message: 'Please input voucher value',
                                                // }],
                                                initialValue: data.totalAmount,
                                            })(
                                                // <InputNumber min={0} disabled={this.state.statusAmount} />
                                                <InputNumber min={0} disabled={true} />
                                            )}

                                        </FormItem>

                                        <FormItem {...formItemLayout} label='Total Custom Amount' style={displayCustomAmount}  >
                                            {getFieldDecorator('customAmount',{
                                                // rules: [{
                                                //     required: true,
                                                //     message: 'Please input voucher value',
                                                // }],
                                                initialValue: this.state.totalAmount,
                                            })(
                                                <InputNumber min={0}  onChange={this.setPointDefault} />
                                            )}
                                            <br></br>
                                            <Button style={{marginTop: '10px'}} type="primary" onClick={this.handleCalculate}  >Calculate</Button>
                                            <br></br>
                                        </FormItem>



                                        <FormItem label='Point' {...formItemLayout} >
                                            {getFieldDecorator('voucherValue',{
                                                // rules: [{
                                                //     required: true,
                                                //     message: 'Please input voucher value',
                                                // }],
                                                // initialValue: product.voucherValue ? product.voucherValue : 0,
                                            })(
                                                // this.state.spinnerPoint
                                                // ?<Spin /> :
                                                // <h3 style={{paddingTop: '9px', color: '#F87060', fontSize: '18px'}} >{totalPoint}</h3>
                                                <h3 style={{paddingTop: '9px', color: '#F87060', fontSize: '18px'}} >{this.state.pointEarned}</h3>

                                            )}
                                        </FormItem>
                                        {/*<Radio style={{paddingBottom: '15px'}} value={1}> Input Amount Manually </Radio>*/}
                                        {/*<FormItem style={{paddingLeft: '45px'}} label='Input Point'>*/}
                                        {/*    {getFieldDecorator('voucherValue',{*/}
                                        {/*        // rules: [{*/}
                                        {/*        //     required: true,*/}
                                        {/*        //     message: 'Please input voucher value',*/}
                                        {/*        // }],*/}
                                        {/*        initialValue: data.voucherValue ? data.voucherValue : 0,*/}
                                        {/*    })(*/}
                                        {/*        <InputNumber min={0} disabled={this.props.match.params.type === 'productType' ? true : data.productType === 0 || data.productType === 2 || data.productType === 4}/>*/}
                                        {/*    )}*/}
                                        {/*</FormItem>*/}
                                    </RadioGroup>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label='Reason Rejected'>
                                {getFieldDecorator('description', {
                                    rules: [{
                                        required: this.state.statusReason?false:true,
                                        message: 'Please input your reason'
                                    }],
                                    initialValue: data.description
                                })(
                                    <TextArea placeholder='' rows={10}
                                              disabled={this.state.statusReason}
                                    />
                                )}
                            </FormItem>
                        {/*</Col>*/}

                    {/*</Row>*/}

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

// const mapStateToProps = ({auth, productState, commonState}) => {
const mapStateToProps = ({auth, approvalState, commonState}) => {
    const {authUser} = auth;
    const {filePath} = commonState;
    // const {product, updateSuccess, updateFailed, updateData, createSuccess, createFailed,  createData} = productState
    const {data, dataInq, updateSuccess, updateFailed, updateData} = approvalState
    return {authUser, dataInq,data, updateSuccess, updateFailed, updateData, filePath}
    // return {authUser, product, updateSuccess, updateFailed, updateData, createSuccess, createFailed, createData, filePath}
};

// export default connect(mapStateToProps, {viewProduct, updateProduct, createProduct, resetStatus, uploadImage, resetFilePath})(Form.create()(QualityControlApproval));
export default connect(mapStateToProps, {
    viewApproval,
    inqPostApproval,
    showLoader,
    // updateApproval,
    // resetStatus,
    // uploadImage, resetFilePath
})(Form.create()(QualityControlApproval));


