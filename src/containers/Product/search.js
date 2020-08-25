import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {random} from '../../constants/Util';
import {connect} from "react-redux";
import {
    searchProducts,
    filterSortSearch,
    clearFilterSortSearch,
    deleteProduct,
    resetStatus,
    addStock
} from "appRedux/actions/Product";
import {
    // Card,
    Modal,
    Button,
    message,
    InputNumber,
    Form,
    Upload,
    Icon,
    Table,
    Switch,
    Input,
    DatePicker,
    Col,
    Row
} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {xs: 24, sm: 10},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};

class SearchProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msgContent : '',
            msgType : '',
            msgShow : false,
            onDelete : false,
            onAddStock : false,
            msgDelete: '',
            idWillDelete: '',
            addStockId : '',
            additionalStock : '',
            addStockType : '',
            showItem: {display:'none'},
            showVoucher: {display:'none'},
            showUpload: {display:'none'},
            showGenerate: {display:'none'},
            modalStockVisible: false,
            loadingStock: false,
            voucherData : []
        };

        this.errorNotification = this.errorNotification.bind(this);

    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.isExternal = 0;
        this.props.searchProducts(credential);
    }

    filterComponent(pagination, filters, sorter){
        this.props.filterSortSearch(pagination, filters, sorter);
    }

    clearFilterComponent(){
        this.props.clearFilterSortSearch();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.deleteSuccess && !nextProps.deleteFailed){
            this.setState({
                msgContent : 'Deleted successfully',
                msgShow : true,
                msgType : 'success',
                onDelete :false
            })
        }else if (!nextProps.deleteSuccess && nextProps.deleteFailed){
            this.setState({
                msgContent : 'Delete failed. '+ nextProps.alertMessage,
                msgShow : true,
                msgType : 'danger',
                onDelete : false
            })
        }else if (nextProps.updateSuccess && !nextProps.updateFailed){
            this.setState({
                msgContent : 'Add stock successfully',
                msgShow : true,
                msgType : 'success',
                onAddStock :false
            })
        }else if (!nextProps.updateSuccess && nextProps.updateFailed){
            this.setState({
                msgContent : 'Add stock failed',
                msgShow : true,
                msgType : 'danger',
                onAddStock : false
            })
        }else{
            this.setState({
                msgContent : '',
                msgShow : false,
                msgType : '',
                onDelete : false,
                onAddStock : false
            })
        }
    }

    onConfirm(){
        this.props.resetStatus();
        this.setState({
            modalStockVisible : false
        })
        let credential = this.props.authUser;
        this.props.searchProducts(credential);
    }

    viewProduct(id){
        this.props.history.push('/product/view/'+id);
    }

    editProduct(id, source){
        if(source === 'Item'){
            this.props.history.push('/product/update/item/'+id);
        }else if (source === 'Voucher'){
            this.props.history.push('/product/update/voucher/'+id);
        } else if (source === 'Coupon'){
            this.props.history.push('/product/update/coupon/'+id);
        } else{
            this.props.history.push('/product/update/point/'+id);
        }
    }

    deleteProductPopup(id, programs){
        let msgDel = '';
        if(programs.length > 0){
            let progLen = programs.length;
            let progName = '';
            programs.forEach((program, i) => {
                if(i !== 0){
                    progName += ', ';
                }
                progName += program.programName;
            })

            msgDel = 'There are '+progLen+' programs use this product : '+progName+'. Program will be deleted too.';
        }
        this.setState({
            msgDelete: msgDel,
            onDelete : true,
            idWillDelete : id
        })
    }

    deleteProductProcess(){
        let authCredential = this.props.authUser;
        authCredential.id = this.state.idWillDelete;
        this.props.deleteProduct(authCredential);
    }

    onCancelDelete(){
        this.setState({
            onDelete : false,
            idWillDelete : ''
        })
    }

    addStockProcess(){
        const {addStockId, additionalStock, voucherData} = this.state;
        let authCredential = this.props.authUser;
        let datas = {
            productId : addStockId,
            additionalStock : additionalStock,
            productDetails : voucherData
        }
        authCredential.data = datas;
        this.props.addStock(authCredential);
    }

    onCancelAddStock(){
        this.setState({
            onAddStock : false,
        })
    }

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }

    //For Modal Add Stock
    showModalStock(id, type){
        if(type === 'Item'){
            this.setState({
                addStockType : type,
                modalStockVisible : true,
                addStockId : id,
                showItem : {display:'block'},
                showVoucher : {display:'none'},
                showUpload : {display:'none'},
                showGenerate : {display:'none'},
            })
        }else if(type === 'Voucher'){
            this.setState({
                voucherData : [],
                addStockType : type,
                modalStockVisible : true,
                addStockId : id,
                showVoucher : {display:'block'},
                showItem : {display:'none'},
                showUpload : {display:'none'},
                showGenerate : {display:'none'},
            })
        }

    }

    showUp(){
        this.setState({
            showVoucher : {display:'none'},
            showItem : {display:'none'},
            showUpload : {display:'block'},
            showGenerate : {display:'none'},
        })
    }

    showGen(){
        this.setState({
            showVoucher : {display:'none'},
            showItem : {display:'none'},
            showGenerate : {display:'block'},
            showUpload : {display:'none'}
        })
        this.props.form.resetFields();
    }

    handleOk(){
        if(this.state.addStockType === 'Item'){
            this.setState({
                additionalStock : this.props.form.getFieldValue('itemStock'),
                onAddStock : true
            })
        }else if(this.state.addStockType === 'Voucher'){
            this.setState({
                onAddStock : true
            })
        }
    }

    handleCancel(){
        this.setState({
            modalStockVisible : false,
            addStockId : '',
            addStockType : ''
        })
    }


    handleupload = (info) =>{
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
                    voucherData : []
                });
        }
    }

    updateDataFromCsv = (result) => {
        const data = result.data;
        let errorId = 0;
        let errorMessage = '';

        //Delete blank record
        // let voucherData = [];
        let self = this;
        let quantity = 0;

        data.forEach((voucher, i)=>{
            let defaultMessage = 'must not empty';
            voucher.key = i;

            if(voucher.voucherId === '' || voucher.voucherId === undefined){
                errorId = i + 1;
                errorMessage = "voucher id";
            }else{
                if(voucher.voucherId.length > 50){
                    errorId = i + 1;
                    errorMessage = "voucher id";
                    defaultMessage = 'voucher id length must below 50 characters'
                }
            }

            if(voucher.voucherCode === '' || voucher.voucherCode === undefined){
                errorId = i + 1;
                errorMessage = "voucher code";
            }else{
                if(voucher.voucherCode.length > 35){
                    errorId = i + 1;
                    errorMessage = "voucher code";
                    defaultMessage = 'voucher code length must below 35 characters'
                }
            }

            if(voucher.expiredDate === '' || voucher.expiredDate === undefined){
                errorId = i + 1;
                errorMessage = "expired date";
            }

            if(voucher.expiredDate !== undefined){
                if(this.isValidDate(voucher.expiredDate) === false){
                    errorId = i + 1;
                    errorMessage = "expired date";
                    defaultMessage = "must formatted use YYYY-MM-DD (eg. 2019-12-31)"
                }
            }

            if(errorMessage !== ''){
                self.errorNotification('Import voucher from csv file was failed. Column '+errorMessage+' on '+errorId+'th row '+defaultMessage+'.');
                return true;
            }

            quantity ++;
        });

        if(errorMessage === ''){
            this.setState({
                voucherData : data,
                additionalStock : quantity
            });
        }
    }

    isValidDate(dateString) {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if(!dateString.match(regEx)) return false;  // Invalid format
        var d = new Date(dateString);
        var dNum = d.getTime();
        if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
        return d.toISOString().slice(0,10) === dateString;
    }

    //Generate voucher
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                let expiredDate = values['expiredDate'].format('YYYY-MM-DD');
                let additionalStock = values['additionalStock'];
                let prefix = values['prefix'];
                let length = values['length'];
                let prefixString = values['prefixString'];
                let randomCode= length;
                let randomId = 16;

                if(prefix){
                    randomCode = length - prefixString.length;
                }else{
                    prefixString = '';
                }

                let voucherData = [];
                for (let i = 0; i < additionalStock; i ++){
                    let data = {
                        key : i,
                        voucherId : random(randomId),
                        voucherCode : prefixString + random(randomCode),
                        expiredDate : expiredDate
                    };

                    voucherData.push(data);
                }

                this.setState({
                    voucherData : voucherData,
                    additionalStock : additionalStock
                })

            }
        });
    }

    render() {
        // let component = [];
        let {loader, alertMessage, showMessage, form} = this.props;
        const { msgShow, msgType, msgContent, onDelete, onAddStock, msgDelete, addStockType,
            showItem, showVoucher, showUpload, showGenerate,modalStockVisible, loadingStock, voucherData} = this.state;
        let {sorter, filters} = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        let filteredInfo = filters || {};

        const {getFieldDecorator} = this.props.form;

        this.props.listProducts.forEach((product, i) => {
            product.key = product.productId;
            product.name = product.productName;
            product.isMarketplace = (product.isMarketplace === -1 ? 'Yes' : 'No');
        });

        let columns = [{
            title: 'Product Code',
            dataIndex: 'productCode',
            key: 'productCode',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'productCode' && sortedInfo.order
        },{
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'productName' && sortedInfo.order
        },{
            title: 'Product Type',
            dataIndex: 'productType',
            key: 'productType',
            filters: [
                {text: 'Item', value: 'Item'},
                {text: 'Voucher', value: 'Voucher'},
                {text: 'Coupon', value: 'Coupon'},
                {text: 'Point', value: 'Point'},
            ],
            filteredValue: filteredInfo.productType || null,
            onFilter: (value, record) => record.productType.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'productType' && sortedInfo.order
        },{
            title: 'Marketplace Product',
            dataIndex: 'isMarketplace',
            key: 'isMarketplace',
            filters: [
                {text: 'Yes', value: 'Yes'},
                {text: 'No', value: 'No'},
            ],
            filteredValue: filteredInfo.isMarketplace || null,
            onFilter: (value, record) => record.isMarketplace.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'isMarketplace' && sortedInfo.order
        },{
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'stock' && sortedInfo.order
        },{
            title: 'Base Price',
            dataIndex: 'basePrice',
            key: 'basePrice',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'basePrice' && sortedInfo.order
        },{
            title: 'Voucher Value',
            dataIndex: 'voucherValue',
            key: 'voucherValue',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'voucherValue' && sortedInfo.order
        },{
            title: 'Fee',
            dataIndex: 'fee',
            key: 'fee',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'fee' && sortedInfo.order
        }
        ];

        const dummyRequest = ({ file, onSuccess }) => {
            setTimeout(() => {
                onSuccess("ok");
            }, 0);
        };

        const columnVoucher = [{
            title: 'Voucher Id',
            dataIndex: 'voucherId',
            key: 'voucherId',
        }, {
            title: 'Voucher Code',
            dataIndex: 'voucherCode',
            key: 'voucherCode',
        }, {
            title: 'Expired Date',
            dataIndex: 'expiredDate',
            key: 'expiredDate',
        }];

        let enablePx = form.getFieldValue('prefix');
        let disableSave = true;

        if(addStockType === 'Item'){
            if(form.getFieldValue('itemStock') > 0){
                disableSave = false;
            }
        }else if(addStockType === 'Voucher'){
            if(voucherData.length > 0){
                disableSave = false;
            }
        }

        return(
            <div>
                <div>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                    <SweetAlert success={msgType ==='success' ? true : false} danger={msgType ==='danger' ? true : false}
                                show={msgShow} title={msgContent} onConfirm={this.onConfirm.bind(this)}>
                    </SweetAlert>
                    <SweetAlert show={onDelete}
                                warning
                                showCancel
                                confirmBtnText='Yes, delete it!'
                                confirmButtonStyle="danger"
                                cancelButtonStyle="default"
                                title={msgDelete+' Are you sure ?'}
                                onConfirm={this.deleteProductProcess.bind(this)}
                                onCancel={this.onCancelDelete.bind(this)}
                    />
                    <SweetAlert show={onAddStock}
                                warning
                                showCancel
                                confirmButtonStyle="danger"
                                cancelButtonStyle="default"
                                title={'Stock data cannot be change after saved. Are you sure to save these stock ?'}
                                onConfirm={this.addStockProcess.bind(this)}
                                onCancel={this.onCancelAddStock.bind(this)}
                    />
                </div>
                {loader === false ?
                    <SearchForm
                        columns={columns}
                        listData={this.props.listProducts}
                        title='Product List'
                        placeholder='Search products by name'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        onView = {this.viewProduct.bind(this)}
                        onEdit = {this.editProduct.bind(this)}
                        onDelete = {this.deleteProductPopup.bind(this)}
                        onAddStock = {this.showModalStock.bind(this)}
                    />
                    : ''
                }

                <Modal
                    title="Add Stock"
                    visible={modalStockVisible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
                        <Button key="back" onClick={this.handleCancel.bind(this)}>Back</Button>,
                        <Button key="submit" disabled={disableSave} type="primary" loading={loadingStock} onClick={this.handleOk.bind(this)}>
                            Save
                        </Button>,
                    ]}
                >
                    <div style={showItem}>
                        <FormItem {...formItemLayout} label='Additional Stock'>
                            {getFieldDecorator('itemStock',{
                                rules: [{
                                    required: true,
                                    message: 'Please input additional stock',
                                }],
                                initialValue : 1
                            })(
                                <InputNumber min={1}/>
                            )}
                        </FormItem>
                    </div>
                    <div style={showVoucher} className={'custom-add-voucher'}>
                        <Button key="upload" onClick={this.showUp.bind(this)}>Upload File</Button>
                        <span className={'custom-span-voucher'}>OR</span>
                        <Button key="generate" onClick={this.showGen.bind(this)}>Generate Voucher</Button>
                    </div>
                    <div style={showUpload}>
                        <p>You can upload your vouchers by csv file. Click Download sample format, change sample data and your vouchers are ready to upload.</p>
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                <form method="get" action={window.location.origin.toString()+"/format.csv"}>
                                    <Button key="download" icon="download" htmlType="submit">
                                        Download sample format
                                    </Button>
                                </form>
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                <Upload accept='.csv'
                                        customRequest={dummyRequest}
                                        onChange={this.handleupload}>
                                    <Button type="primary">
                                        <Icon type="upload" /> Click to Upload
                                    </Button>
                                </Upload>
                            </Col>

                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <FormItem label='Uploaded Voucher' style={{marginLeft:"0px"}}/>
                                <Table className="gx-table-responsive" pagination = {false} columns={columnVoucher} dataSource={voucherData}/>
                            </Col>
                        </Row>
                    </div>
                    <div style={showGenerate}>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            <FormItem {...formItemLayout} label='Expired Date'>
                                {getFieldDecorator('expiredDate', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input expired date'
                                    }]
                                })(
                                    <DatePicker className="gx-mb-3 gx-w-100"/>
                                )}
                            </FormItem>
                            <Form.Item
                                label="Prefix"
                                style={{ marginBottom: 0 }}
                            >
                                <FormItem {...formItemLayout} style={{display:'inline-block'}}>
                                    {getFieldDecorator('prefix'
                                    )(
                                        <Switch checkedChildren="Yes" unCheckedChildren="No"/>
                                    )}
                                </FormItem>

                                <FormItem {...formItemLayout} style={{display:'inline-block'}}>
                                    {getFieldDecorator('prefixString', {
                                        rules: [{
                                            required: enablePx,
                                            message: 'Please input prefix'
                                        },{
                                            max: 5,
                                            message: 'Prefix cannot be longer than 5 characters'
                                        }],
                                        initialValue: ''
                                    })(
                                        <Input className={'custom-prefix'} disabled={!enablePx} placeholder='Prefix'/>
                                    )}
                                </FormItem>
                            </Form.Item>
                            <FormItem {...formItemLayout} label='Voucher Code Length'>
                                {getFieldDecorator('length', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input voucher length'
                                    }],
                                    initialValue: 10
                                })(
                                    <InputNumber min={10} max={16}/>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label='Additional Stock'>
                                {getFieldDecorator('additionalStock',{
                                    rules: [{
                                        required: true,
                                        message: 'Please input additional stock',
                                    }],
                                    initialValue : 1
                                })(
                                    <InputNumber min={1}/>
                                )}
                            </FormItem>
                            <FormItem {...formTailLayout}>
                                <Button type="primary" htmlType="submit">Generate</Button>
                            </FormItem>
                            <div>
                                <Table className="gx-table-responsive" pagination = {false} columns={columnVoucher} dataSource={voucherData}/>
                            </div>
                        </Form>
                    </div>
                </Modal>
                <NotificationContainer/>
            </div>
        );

    }


}

const mapStateToProps = ({auth, productState}) => {
    const {authUser} = auth;
    const {listProducts, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed,updateSuccess, updateFailed} = productState
    return {authUser, listProducts, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed,updateSuccess, updateFailed}
};
export default connect(mapStateToProps, {searchProducts, filterSortSearch, clearFilterSortSearch,deleteProduct,resetStatus, addStock})(Form.create()(SearchProducts));


