import React, {Component} from "react";
import moment from 'moment';
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "components/CircularProgress/index";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    updateStore,
    viewStore,
    resetStatus,
} from "appRedux/actions/Store";
import {
    uploadImage,
    resetFilePath,
    getListCountry,
    getListProvince,
    getListCity
} from "appRedux/actions/Common";
import {Button, Card, Form, Input, InputNumber, Table,
    Modal, Select, Switch, Upload, Icon, Radio, Col, message, Popconfirm
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formItemLayout1 = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};

class UpdateStore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            store: [],
            listProvince : [],
            listCity: [],
            msgContent: '',
            msgType: '',
            msgShow: false,
            fileList: [],
            previewImage: '',
            previewVisible: false,
            dataSource : [],
            count: 0,
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handlePreview = this.handlePreview.bind(this);

    }

    componentWillMount() {
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewStore(credential);

        // get list Country
        if(this.props.listCountry.length < 1){
            this.props.getListCountry();
        }
    }

    componentWillReceiveProps(nextProps) {
        let dataSourceRaw = [];
        let totalRec = 0;

        nextProps.store.contact.forEach((detail, i) => {
            detail.key = i;
            dataSourceRaw.push(detail);
            totalRec++;
        })

        if (nextProps.store !== this.props.store) {
            this.setState({
                store: nextProps.store,
                dataSource: dataSourceRaw,
                count: totalRec + 1
            });
        }

        if (nextProps.store !== undefined && nextProps.store != this.props.store && nextProps.store.address !== null) {
            let request = {
                id: nextProps.store.address.countryId
            };
            this.props.getListProvince(request);

            this.setState({
                store: nextProps.store,
            });

        }

        if (nextProps.store !== undefined && nextProps.store != this.props.store && nextProps.store.address !== null) {
            let request = {
                id: nextProps.store.address.provinceId
            };
            this.props.getListCity(request);

            this.setState({
                store: nextProps.store,
            });

        }

        if (nextProps.store !== undefined && nextProps.store !== this.props.store) {
            this.setState({
                store: nextProps.store,
                previewImage: nextProps.store.storeLogo
                // count: totalRec + 1
            });

            if(nextProps.store.storeLogo !== null){
                let fileListRaw = [{
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: nextProps.store.storeLogo,
                }]

                this.setState({
                    fileList: fileListRaw
                })
            }

        }

        if (nextProps.listProvince !== this.props.listProvince) {
            this.setState({
                listProvince : nextProps.listProvince
            })
        }

        if (nextProps.listCity !== this.props.listCity) {
            this.setState({
                listCity : nextProps.listCity
            })
        }

        if(nextProps.filePath !== this.props.filePath && this.state.store.storeCode !== '' && nextProps.filePath!== ''){
            let filePath = nextProps.filePath;

            let storeNew = this.state.store;
            storeNew.storeLogo = filePath;
            this.setState({
                store : storeNew
            })

            this.props.resetFilePath();
        }

        if (nextProps.updateSuccess && !nextProps.updateFailed) {
            this.setState({
                msgContent: 'Updated Successfully',
                msgShow: true,
                msgType: 'success'
            })
        } else if (!nextProps.updateSuccess && nextProps.updateFailed) {
            this.setState({
                msgContent: 'Update failed '+nextProps.alertMessage,
                msgShow: true,
                msgType: 'danger'
            })
        }

    }

    errorNotification(message) {
        return NotificationManager.error(message, 'Alert', 3000);
    }

    back() {
        this.props.history.goBack();
    }

    onConfirm() {
        this.props.resetStatus();
        if (this.state.msgType === "success") {
            this.props.history.goBack();
        } else {
            this.setState({
                msgShow: false
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

    handleChange = ({ fileList }) => {
            this.setState({ 
                fileList 
        })
    }

    handleCancel = () => 
        this.setState({ 
            previewVisible: false 
    })

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let error = false;
                let image = this.state.store.storeLogo;
                let {dataSource} = this.state;
                if(this.state.store.storeLogo !== undefined){
                    if(this.state.store.storeLogo.substr(0,4) === 'http'){
                        image = '';
                    }
                }else{
                    image = '';
                }

                let address = {
                    addressLine1: values.addressLine1,
                    addressLine2: '',
                    addressLine3: '',
                    countryId: values.countryId,
                    provinceId: values.provinceId,
                    cityId: values.cityId,
                    cityTown: values.cityId,
                    postalCode: values.postalCode,
                };

                // let contact = [{
                //     contactFirstName: values.contactFirstName,
                //     mobileNumber: values.mobileNumber,
                //     emailAddress: values.emailAddress,
                //     workNumber: values.workNumber,
                // }];

                let formData = {
                    storeCode: values.storeCode,
                    storeName: values.storeName,
                    storeLogo: image,
                    pintype : 1,
                    pin: values.pin,
                    address: address,
                    contact: dataSource,
                };

                let request = this.props.authUser;
                request.data = formData;

                if (!error) {
                    this.props.updateStore(request);
                }

            }
        });
    };

    changeCountry(value) {
        let request = {
            id: value
        };
        this.props.getListProvince(request);

        this.props.form.setFieldsValue({
            stateProvinceId: ''
        });
    }

    changeProvince(value) {
        let request = {
            id: value
        };
        this.props.getListCity(request);

        this.props.form.setFieldsValue({
            cityId: ''
        });
    }    
    
    //Action For List Contact
    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }

    handleAdd = () => {
        const { count, dataSource } = this.state;
        let newData = {
            key: count,
            contactFirstName: '',
            mobileNumber: '',
            workNumber: '',
            emailAddress: '',
        };

        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        let {loader, alertMessage, showMessage} = this.props;
        const { msgShow, msgType, msgContent, previewVisible, previewImage, fileList, store, dataSource } = this.state;
        let obj = JSON.parse(localStorage.getItem("userData"));

        let addressLine1 = '';
        let country = '';
        let countryId = '';
        let province = '';
        let provinceId = '';
        let cityTown = '';
        let cityId = '';
        let postalCode = '';
        let contactFirstName = '';
        let emailAddress = '';
        let mobileNumber = '';
        let workNumber = '';
        if(store.address != null ){
            if (store.address.addressLine1 != null){
                addressLine1 = store.address.addressLine1;
            }

            if (store.address.country != null){
                country = store.address.country;
                countryId = store.address.countryId;
            }

            if (store.address.province != null){
                province = store.address.province;
                provinceId = store.address.provinceId;
            }

            if (store.address.cityTown != null){
                cityTown = store.address.cityTown;
                cityId = store.address.cityId;
            }
            postalCode = store.address.postalCode;
        }

        if(store.contact != null ){
            for (let i = 0; i < store.contact.length; i++){
                contactFirstName = store.contact[i].contactFirstName;
                emailAddress = store.contact[i].emailAddress;
                mobileNumber = store.contact[i].mobileNumber;
                workNumber = store.contact[i].workNumber;
            }
        }

        let address = {
            countryId : '',
            addressId: '',
            line1: '',
            provinceId: '',
            province: '',
            cityId: '',
            cityTown: '',
            postalCode: ''
        };

        let contacts = {
            contactFirstName: '',
            emailAddress: '',
            mobileNumber: '',
            workNumber: ''
        };

        if (store.contacts !== undefined) {
            contacts = store.contacts;
        }

        if (store.address !== undefined) {
            address = store.address;
        }

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        let optionCountry = [];
        this.props.listCountry.forEach((country, i) => {
            let option =
                <Option key={i} value={country.id}>{country.label}</Option>
            ;
            optionCountry.push(option);
        });

        let optionProvince = [];
        this.state.listProvince.forEach((province, i) => {
            let option =
                <Option key={i} value={province.id}>{province.label}</Option>
            ;
            optionProvince.push(option);
        });

        let optionCity = [];
        this.state.listCity.forEach((city, i) => {
            let option =
                <Option key={i} value={city.id}>{city.label}</Option>
            ;
            optionCity.push(option);
        });

        //For Contact
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        //for contact
        let columnsComp = [{
            title: 'Contact Name',
            dataIndex: 'contactFirstName',
            width: '25%',
            editable: true,
        }, {
            title: 'Mobile Number',
            dataIndex: 'mobileNumber',
            width: '25%',
            editable: true,
        }, {
            title: 'Office Number',
            dataIndex: 'workNumber',
            width: '25%',
            editable: true,
        }, {
            title: 'Email',
            dataIndex: 'emailAddress',
            width: '25%',
            editable: true,
        }, {
            title: 'Action',
            dataIndex: 'operation',
            render: (text, record) => (
                this.state.dataSource.length >= 1
                    ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <Button type="primary" style={{size:'small'}}>Delete</Button>
                        </Popconfirm>
                    ) : null
            ),
        }];

        const columns = columnsComp.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        return(
            <Card className="gx-card" title='Update Store'>
                <div>
                    {loader == true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                </div>
                <Form onSubmit={this.handleSubmit}>

                    <h5 className='gx-mb-3' style={{marginTop: '30px'}}>Store</h5>
                    <div className='custom-box'>
                        <FormItem {...formItemLayout} label='Merchant Name'>
                            {getFieldDecorator('merchantName', {
                                rules: [{
                                    required: true,
                                    message: 'Please Input Merchant Name'
                                }],
                                initialValue: store.merchantName
                            })(
                                <Input placeholder='Merchant Name' disabled={true}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Store Code'>
                            {getFieldDecorator('storeCode', {
                                rules: [{
                                    required: true,
                                    message: 'Please Input Store Code'
                                }],
                                initialValue: store.storeCode
                            })(
                                <Input placeholder='Store Code' disabled={true}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Store Name'>
                            {getFieldDecorator('storeName', {
                                rules: [{
                                    required: true,
                                    message: 'Please input Store Name'
                                }],
                                initialValue: store.storeName
                            })(
                                <Input placeholder='Store Name'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Store Logo'>
                            {getFieldDecorator('storeLogo', {
                                rules: [{
                                    required: true,
                                    message: 'Please Upload Image'
                                }],
                                initialValue: store.storeLogo
                            })(
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
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Pin'>
                            {getFieldDecorator('pin', {
                                rules: [{
                                    required: true,
                                    pattern: /^[\d]{0,5}$/,
                                    message: 'Please input Pin, Value should be less than 5 character',
                                }],
                                initialValue: store.pin
                            })(
                                <Input placeholder='Pin'/>
                            )}
                        </FormItem>

                        {/* <FormItem {...formItemLayout} label='Store Collaboration'>
                            {getFieldDecorator('isStoreCollaboration',{
                            })(
                                <Switch checkedChildren="Yes" unCheckedChildren="No" disabled={enableSwitch} onChange={this.onChangeSwitch} checked={statChecked}/>
                            )}
                        </FormItem> */}

                    </div>

                    <h5 className='gx-mb-3' style={{marginTop: '30px'}}>Address</h5>
                    <div className='custom-box'>
                        <FormItem {...formItemLayout} label='Country'>
                            {getFieldDecorator('countryId', {
                                rules: [{
                                    required: true,
                                    message: 'Please Select Country'
                                }],
                                initialValue: countryId
                            })(
                                <Select
                                    onChange={this.changeCountry.bind(this)}
                                    placeholder={
                                        <div>
                                            <div style={{display:'inline-block'}} className="icon icon-map-drawing"></div>
                                            <span style={{marginLeft:'5px'}}>Country</span>
                                        </div>
                                    }
                                >
                                    {optionCountry}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Province'>
                            {getFieldDecorator('provinceId', {
                                rules: [{
                                    required: true,
                                    message: 'Please Select Province'
                                }],
                                initialValue: provinceId
                            })(
                                <Select
                                    onChange={this.changeProvince.bind(this)}
                                    placeholder={
                                        <div>
                                            <div style={{display:'inline-block'}} className="icon icon-map-drawing"></div>
                                            <span style={{marginLeft:'5px'}}>Province</span>
                                        </div>
                                    }
                                >
                                {optionProvince}
                            </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='City'>
                            {getFieldDecorator('cityId', {
                                rules: [{
                                    required: true,
                                    message: 'Please Select City'
                                }],
                                initialValue: cityId
                            })(
                                <Select
                                    placeholder={
                                        <div>
                                            <div style={{display:'inline-block'}} className="icon icon-navigation"></div>
                                            <span style={{marginLeft:'5px'}}>City</span>
                                        </div>
                                    }
                                >
                                    {optionCity}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Address'>
                            {getFieldDecorator('addressLine1', {
                                rules: [{
                                    required: true,
                                    message: 'Please input Address'
                                }],
                                initialValue: addressLine1
                            })(
                                <Input placeholder='Address'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Postal Code'>
                            {getFieldDecorator('postalCode', {
                                rules: [{
                                    required: true,
                                    message: 'Please input Postal Code'
                                }],
                                initialValue: postalCode
                            })(
                                <Input placeholder='Postal Code'/>
                            )}
                        </FormItem>
                    </div>

                    <h5 className='gx-mb-3' style={{marginTop: '30px'}}>Contact</h5>
                    <div className='custom-box'>
                        <FormItem {...formItemLayout1} label='Contact'>
                            <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                                Add Contact
                            </Button>
                            <Table
                                className="gx-table-responsive"
                                components={components}
                                rowClassName={() => 'editable-row'}
                                bordered
                                dataSource={dataSource}
                                columns={columns}
                            />
                        </FormItem>
                        {/* <FormItem {...formItemLayout} label='Contact Name'>
                            {getFieldDecorator('contactFirstName', {
                                rules: [{
                                    required: true,
                                    message: 'Please Input Contact Name'
                                }],
                                initialValue: contactFirstName
                            })(
                                <Input placeholder='Contact Name'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Mobile Number'>
                            {getFieldDecorator('mobileNumber', {
                                rules: [{
                                    required: true,
                                    message: 'Please input Mobile Number'
                                }],
                                initialValue: mobileNumber
                            })(
                                <Input placeholder='Mobile Number'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Office Number'>
                            {getFieldDecorator('workNumber', {
                                rules: [{
                                    required: true,
                                    message: 'Please input Office Number'
                                }],
                                initialValue: workNumber
                            })(
                                <Input placeholder='Office Number'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Email Address'>
                            {getFieldDecorator('emailAddress', {
                                rules: [{
                                    required: true,
                                    message: 'Please input Email Address'
                                }],
                                initialValue: emailAddress
                            })(
                                <Input placeholder='Email Address'/>
                            )}
                        </FormItem> */}
                    </div>

                        <FormItem {...formTailLayout} style={{marginTop: '30px'}}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                            <Button type="default" onClick={this.back}>Back</Button>
                        </FormItem>

                </Form>
                <SweetAlert success={msgType === 'success' ? true : false} danger={msgType === 'danger' ? true : false}
                            show={msgShow} title={msgContent} onConfirm={this.onConfirm}>
                </SweetAlert>
                <NotificationContainer/>
            </Card>
        )
    }
}

// Create List Table
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    save = (e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;

        const className = !editable ? 'custom-disable' : 'custom-enable';
        restProps.className = className;

        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                <FormItem style={{ margin: 0 }}>
                                    {form.getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `${title} is required.`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(
                                        <Input
                                            ref={node => (this.input = node)}
                                            onPressEnter={this.save}
                                            onBlur={this.save}
                                        />
                                    )}
                                </FormItem>
                            )
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

const mapStateToProps = ({auth, commonState, storeState}) => {
    const {authUser} = auth;
    const {filePath} = commonState;
    const {listProvince, listCity, listCountry} = commonState;
    const {store, updateSuccess, updateFailed, updateData, alertMessage, loader, showMessage} = storeState;
    return {authUser, store, listCountry, listProvince, listCity, alertMessage, loader, showMessage, updateSuccess, updateFailed, updateData, filePath};
};

export default connect(mapStateToProps, {getListCountry, getListProvince, getListCity, viewStore, uploadImage, resetFilePath, resetStatus, updateStore})(Form.create()(UpdateStore));