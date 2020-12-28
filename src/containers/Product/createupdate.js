import React, {Component} from "react";
import CKEditor from "react-ckeditor-component";
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import ProductType from '../../constants/ProductType';
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    viewProduct,
    updateProduct,
    createProduct,
    resetStatus
} from "appRedux/actions/Product";
import {
    uploadImage,
    resetFilePath
} from "appRedux/actions/Common";
import {Button, Card, Form, Input, InputNumber, Modal, Select, Switch, Upload, Icon} from "antd";
// import update from "immutability-helper";


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

class CreateUpdateProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product : [],
            productList: [],
            msgContent : '',
            msgType : '',
            msgShow : false,
            previewVisible: false,
            previewImage: '',
            fileList: []
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
        this.onChangeSwitch = this.onChangeSwitch.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
    }

    componentWillMount(){
        let credential = this.props.authUser;

        if(this.props.match.params.type === 'update'){
            credential.id = this.props.match.params.id;
            this.props.viewProduct(credential);
        }else{
            let product = [];
            // product.productType = this.props.match.params.productType === 'item' ? 0 : 1
            product.productType = this.props.match.params.productType === 'item' ? 0 : product.productType = this.props.match.params.productType === 'voucher' ? 1 : product.productType = this.props.match.params.productType === 'coupon' ? 2 : 4

            this.setState({
                product : product
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.match.params.type === 'update') {

            if (nextProps.product !== undefined && nextProps.product !== this.props.product) {
                this.setState({
                    product: nextProps.product,
                    previewImage: nextProps.product.productImage
                    // count: totalRec + 1
                });

                if(nextProps.product.productImage !== null){
                    let fileListRaw = [{
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: nextProps.product.productImage,
                    }]

                    this.setState({
                        fileList: fileListRaw
                    })
                }

            }
        }

        if(nextProps.filePath !== this.props.filePath && this.state.product.productCode !== '' && nextProps.filePath!== ''){
            let filePath = nextProps.filePath;

            let productNew = this.state.product;
            productNew.productImage = filePath;
            this.setState({
                product : productNew
            })

            this.props.resetFilePath();
        }

        if (nextProps.updateSuccess && !nextProps.updateFailed){
            this.setState({
                msgContent : 'Updated Successfully',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.updateSuccess && nextProps.updateFailed){
            this.setState({
                msgContent : 'Update failed ' +nextProps.alertMessage,
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
                msgContent : 'Create failed ' +nextProps.alertMessage,
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

                let image = this.state.product.productImage;

                if(this.state.product.productImage !== undefined){
                    if(this.state.product.productImage.substr(0,4) === 'http'){
                        image = '';
                    }
                }else{
                    image = '';
                }

                let request = this.props.authUser;
                values.description = this.state.product.description;
                values.productImage = image;
                values.isMarketplace = (this.state.product.isMarketplace === 'Yes' ? -1 : 0);
                request.data = values;

                if(!error){
                    if(this.props.match.params.type === 'update') {
                        this.props.updateProduct(request);
                    }else{
                        this.props.createProduct(request);
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

    handleChange = ({ fileList }) => this.setState({ fileList })

    onChangeSwitch(checked) {
        let value = 'No';
        if(checked === true){
            value = 'Yes';
        }
        let newProduct = this.state.product;
        newProduct.isMarketplace = value;
        this.setState({
            product : newProduct
        })
    }

    onChange(evt) {
        const newContent = evt.editor.getData();
        let newProduct = this.state.product;
        newProduct.description = newContent;
        this.setState({
            product : newProduct
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
        let {product} = this.state;
        const { msgShow, msgType, msgContent, previewVisible, previewImage, fileList } = this.state;

        var statChecked = '';
        if(product.isMarketplace != null && product.isMarketplace !== 'No'){
            statChecked = 'Yes';
        }else if(this.props.match.params.productType === 'point' && this.props.match.params.type === 'create'){
            statChecked = 'Yes';
            // enableSwitch = true;
        }

        let options = [];
        ProductType.values().forEach((type, i) => {
            let option = [];
            option.push(
                <Option key={i} value={type.value}>{type.label}</Option>
            );
            options.push(option);
        });

        let enableSwitch = false;
        if(this.props.match.params.type === 'update'){
            enableSwitch = true;
        }else if(this.props.match.params.productType === 'point' && this.props.match.params.type === 'create'){
            enableSwitch = true;
        }

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );


        return(
            <Card className="gx-card" title='Product'>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Product Code'>
                        {getFieldDecorator('productCode', {
                            rules: [{
                                required: true,
                                message: 'Please input product code'
                            }],
                            initialValue: product.productCode
                        })(
                            <Input placeholder='Product Code'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Product Name'>
                        {getFieldDecorator('productName', {
                            rules: [{
                                required: true,
                                message: 'Please input product name'
                            }],
                            initialValue: product.productName
                        })(
                            <Input placeholder='Product Name'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Description'>

                        <CKEditor
                            activeClass="p10"
                            content={product.description}
                            events={{
                                'blur': this.onBlur.bind(this),
                                'afterPaste': this.afterPaste.bind(this),
                                'change': this.onChange.bind(this)
                            }}
                        />

                    </FormItem>

                    <FormItem {...formItemLayout} label='Product type'>
                        {getFieldDecorator('productType',{
                            initialValue: product.productType,
                            rules: [{
                                required: true,
                                message: 'Please input product type',
                            }],
                        })(
                            <Select style={{width: '50%'}} disabled={true}>
                                {options}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Product Image'>
                        <div className="clearfix">
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                action={this.uploadImage}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                            <p style={{marginBottom: '0px', color: 'red'}}>* Maximum upload file size: 2 MB.</p>
                        </div>
                    </FormItem>

                    <FormItem {...formItemLayout} label='Stock'>
                        {getFieldDecorator('stock',{
                            rules: [{
                                required: true,
                                message: 'Please input stock',
                            }],
                            initialValue: product.stock ? product.stock : 0,
                            status:true
                        })(
                            <InputNumber min={0} disabled={this.props.match.params.productType === 'voucher' ? true : product.productType === 0 || product.productType === 1}/>
                            // <InputNumber min={0} disabled={true}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Base Price'>
                        {getFieldDecorator('basePrice', {
                            rules: [{
                                type: 'number',
                                required: true,
                                message: 'Please input Base Price'
                            }],
                            initialValue: product.basePrice ? product.basePrice : ''
                        })(
                            <InputNumber min={0}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Voucher Value'>
                        {getFieldDecorator('voucherValue',{
                            // rules: [{
                            //     required: this.props.match.params.productType === 'item' ? false : true,
                            //     message: 'Please input voucher value',
                            // }],
                            initialValue: product.voucherValue ? product.voucherValue : 0,
                        })(
                            <InputNumber min={0} disabled={this.props.match.params.type === 'productType' ? true : product.productType === 0 || product.productType === 2 || product.productType === 4}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Point Earned'>
                        {getFieldDecorator('pointsEarned',{
                            rules: [{
                                required: true,
                                message: 'Please input points earned',
                            }],
                            initialValue: product.pointsEarned ? product.pointsEarned : 0,
                        })(
                            <InputNumber min={0} disabled={this.props.match.params.type === 'productType' ? true : product.productType === 0 || product.productType === 1 || product.productType === 2}/>
                        )}
                    </FormItem>

                    {
                        this.props.match.params.productType === 'coupon' ? '' :
                            <FormItem {...formItemLayout} label='Marketplace Product'>
                                {getFieldDecorator('isMarketplace',{
                                })(
                                    <Switch checkedChildren="Yes" unCheckedChildren="No" disabled={enableSwitch} onChange={this.onChangeSwitch} checked={statChecked}/>
                                )}
                            </FormItem>
                    }

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

const mapStateToProps = ({auth, productState, commonState}) => {
    const {authUser} = auth;
    const {filePath} = commonState;
    const {product, updateSuccess, updateFailed, updateData, createSuccess, createFailed,  createData, alertMessage} = productState
    return {authUser, product, updateSuccess, updateFailed, updateData, createSuccess, createFailed, createData, filePath, alertMessage}
};

export default connect(mapStateToProps, {viewProduct, updateProduct, createProduct, resetStatus, uploadImage, resetFilePath})(Form.create()(CreateUpdateProduct));


