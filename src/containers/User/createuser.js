import React, {Component} from "react";
import {
    Button,
    Form,
    Icon,
    Input,
    // Radio,
    Row,
    Col,
    Select,
    Card,
    message,
    Table,
    Popconfirm,
    InputNumber,
    // Switch
} from "antd";
import {connect} from "react-redux";
import {
    createUser,
    resetStatus
} from "appRedux/actions/User";
import {
    getListProvince,
    getListCity
} from "appRedux/actions/Common";
import {
    searchRoles
} from "appRedux/actions/Roles";
import {
    viewMerchant,
} from "appRedux/actions/Merchant";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import CircularProgress from "components/CircularProgress/index";

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 22},
};

const formItemLayout1 = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};

const postalCodeSVG = () => (
    <svg viewBox="64 64 896 896" width='1em'
         height='1em'>
        <defs>
            <style type="text/css"></style>
        </defs>
        <path d="M384 0l0 128-256 0-128 128 128 128 256 0 0 640 128 0 0-512 256 0 128-128-128-128-256 0 0-256-128 0z" p-id="1256" fill="#cdcdcd"></path>
    </svg>
);

class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            merchant: [],
            listCity : [],
            dataSourceRoles: [],
            selectedRoles:[],
            count: 0,
            msgContent : '',
            msgType : '',
            msgShow : false,
            isButtonDisabled : false,
        }

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
    }

    componentWillMount() {

        let credential = this.props.authUser;
        this.props.viewMerchant(credential);

        // this.props.viewUser(credential);
        this.props.searchRoles(credential);

        if(this.props.listProvince.length < 1){
            this.props.getListProvince();
        }


    }


    componentWillReceiveProps(nextProps){

        if (nextProps.listRoles !== undefined) {
            let dataRaw = [];
            // let totalRec = 0;

            nextProps.listRoles.forEach((roles, i) => {
                let rolesDetail = {};
                rolesDetail.key = i;
                rolesDetail.name = roles.name;
                rolesDetail.id = roles.id;
                localStorage.setItem('roleCode'+roles.id, roles.code);
                localStorage.setItem('roleDesc'+roles.id, roles.description);
                rolesDetail.code = roles.code;
                rolesDetail.description = roles.description;
                dataRaw.push(rolesDetail);
                // totalRec++;
            });

            this.setState({
                dataSourceRoles : dataRaw
            })

        }

        if(this.props.match.params.type === 'update') {
            if (nextProps.data !== this.props.data) {
                if(nextProps.data !== undefined){


                    let roles= [];
                    let count = 1;
                    nextProps.data.roles.forEach((detail, i) => {
                        let role = detail;
                        role.flag = 'success';
                        role.msg = '';
                        role.key = count;
                        roles.push(role);
                        count++;
                    })

                    this.setState({
                        data: nextProps.data,
                        selectedRoles: roles,
                        count : count
                    });
                }
            }
        }else{
            let newData = this.state.data;

            this.setState({
                data : newData,
                id : ''
            })
        }

        if (nextProps.listCity !== this.props.listCity) {
            this.setState({
                listCity : nextProps.listCity
            })
        }

        if (nextProps.merchant !== undefined && nextProps.merchant != this.props.merchant) {
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

        if (nextProps.createSuccess && !nextProps.createFailed){
            this.setState({
                msgContent : 'Created User Successfully',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.createSuccess && nextProps.createFailed){
            this.setState({
                // msgContent : 'Create User failed. ' +  localStorage.getItem("Create Failed"),
                msgContent : 'Create User failed',
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
            if(!err){
                let error = false;
                let request = this.props.authUser;

                const {selectedRoles} = this.state;

                //Build role request
                let roles = [];
                selectedRoles.forEach((role,i)=>{
                    let r = {
                        id : role.id,
                        name : role.name,
                        code : role.code,
                        description : role.description
                    }

                    roles.push(r);
                })
                values.roles = roles;

                if(values.roles.length === 0){
                    this.errorNotification('Please add minimal 1 role');
                    error = true;
                    return;
                }

                if(values.password !== values.confirmPassword) {
                    this.errorNotification('Password is not match. Please input your correct password.');
                    error = true;
                    return;
                }


                let address = {
                    line1: values.address,
                    line2: '',
                    line3: '',
                    countryId: 'ID',
                    stateProvId: values.stateProvId,
                    cityId: values.cityId,
                    postalCode: values.postalCode,
                };

                let contact = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        mobileNumber: values.mobileNumber,
                    };

                let roleIds = '';
                roleIds = localStorage.getItem('roleIds');

                let formData = {
                    fullName: values.fullName,
                    loginName: values.loginName,
                    merchantName: values.merchantName,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                    description: values.description,
                    address: address,
                    contact: contact,
                    roleIds:[roleIds],
                };

                request.data = formData;


                if(!error){
                    this.props.createUser(request);
                }
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
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

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    //Action For Roles
    handleDelete = (key) => {
        const selectedRoles = [...this.state.selectedRoles];
        this.setState({
            selectedRoles: selectedRoles.filter(item => item.key !== key),
            isButtonDisabled: false,
        });
    }

    handleAdd = () => {
        const { count, selectedRoles } = this.state;
        let newData = {
            key: count,
            id: '',
            code: '',
            name: '',
            description: '',
            flag: 'success',
            msg: ''
        };

        this.setState({
            selectedRoles: [...selectedRoles, newData],
            count: count + 1,
            isButtonDisabled:true,
        });
    }

    handleSaveRole = (record ,row) => {
        // const {dataSourceRoles, selectedRule, count} = this.state;
        // let status = 0;
        let itemSource = {};
        let newData = [...this.state.selectedRoles];

        //Validate if rule already choose
        // const validData = [...this.state.selectedRoles];
        // const indexValid = validData.findIndex(item => row === item.id);

        localStorage.setItem('roleIds',row);

        itemSource = {
            key: record.key,
            id: '',
            name: '',
            code: localStorage.getItem('roleCode'+row),
            description: localStorage.getItem('roleDesc'+row),
            flag: '',
            msg: ''
        };

        const index = newData.findIndex(item => record.key === item.key);
        const item = newData[index];

        newData.splice(index, 1, {
            ...item,
            ...itemSource,
        });

        this.setState({
            selectedRoles: newData
        });
    }

    disabledButtonAddRoles = () => {

        if(this.state.validationButtonAddRoleson === -1) {
            return true;
        }else{
            return false;
        }
    }

    //End - Action For Role

    render() {
        const {msgShow, msgType, msgContent, alertMessage, showMessage, dataSourceRoles, selectedRoles, merchant} = this.state;
        const {getFieldDecorator} = this.props.form;
        const {loader} = this.props;

        let address = {
            addressLine1: '',
            provinceId: '',
            province: '',
            cityId: '',
            cityTown: '',
            postalCode: ''
            // line1: '',
            // provinceId: '',
            // province: '',
            // cityId: '',
            // cityTown: '',
            // postalCode: ''
        };

        let contacts = {
            contactFirstName: '',
            contactLastName: '',
            mobileNumber: '',
            emailAddress: ''
            // firstName: '',
            // lastName: '',
            // mobileNumber: '',
            // email: ''
        };

        if (merchant.contacts !== undefined) {
            contacts = merchant.contacts[0];
        }

        if (merchant.address !== undefined) {
            address = merchant.address;
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


        let optionsRoles = [];
        dataSourceRoles.forEach((role, i) => {
            let optionR =
                <Option key={i} value={role.id}>{role.name}</Option>;
            optionsRoles.push(optionR);
        });


        //For Role
        const componentsRoles = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        let columnsComp = [{
            title: 'Role Name',
            dataIndex: 'id',
            editable: true
        }, {
            title: 'Role Code',
            dataIndex: 'code',
            editable: false
        }, {
            title: 'Role Description',
            dataIndex: 'description',
            editable: false
        },   {
            title: 'Action',
            dataIndex: 'operation',
            render: (text, record) => (
                this.state.selectedRoles.length >= 1
                    ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;">Delete</a>
                        </Popconfirm>
                    ) : null
            ),
        }];

        const columnsRoles = columnsComp.map((col) => {
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
                    handleSave: this.handleSaveRole,
                    dataOption: optionsRoles
                }),
            };
        });
        //End - For Role

        return (
            <Card className="gx-card" title='User'>
                        <Form onSubmit={this.handleSubmit} className="">
                            <Row>
                                <Col lg={12} md={12} sm={24} xs={24}>


                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator('fullName', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your full name'
                                            }],
                                            // initialValue: data.fullName
                                        })(
                                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Full Name"/>
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator('loginName', {
                                            rules: [{
                                                required: true,
                                                message: 'login name must match the email address'
                                            }],
                                            // initialValue: data.loginName
                                        })(
                                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Login Name must match the email address"/>
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator('merchantName', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your merchant name'
                                            }],
                                            initialValue: merchant.merchantName
                                        })(
                                            <Input prefix={<Icon type="shop" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Merchant Name" disabled={true}/>
                                        )}
                                    </FormItem>

                                    <Form.Item {...formItemLayout} hasFeedback>
                                        {getFieldDecorator('password', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                                {
                                                    validator: this.validateToNextPassword,
                                                },
                                            ],
                                        })(<Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="Password" />)}
                                    </Form.Item>

                                    <Form.Item {...formItemLayout} hasFeedback>
                                        {getFieldDecorator('confirmPassword', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                {
                                                    validator: this.compareToFirstPassword,
                                                },
                                            ],
                                        })(<Input.Password prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />)}
                                    </Form.Item>

                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator('description', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your description'
                                            }],
                                            // initialValue: data.description
                                        })(
                                            <TextArea placeholder='Description' rows={5}
                                            />
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator('stateProvId',{
                                            rules: [{
                                                required: true,
                                                message: 'Please input province'
                                            }],
                                            initialValue: address.provinceId
                                        })(
                                            <Select
                                                onChange={this.changeProvince.bind(this)}
                                                placeholder={
                                                    <div>
                                                        <div style={{display:'inline-block'}} className="icon icon-map-drawing"></div>
                                                        <span style={{marginLeft:'5px'}}>Province</span>
                                                    </div>
                                                } disabled={true}
                                            >
                                                {optionProvince}
                                            </Select>
                                        )}
                                    </FormItem>

                                </Col>

                                <Col lg={12} md={12} sm={24} xs={24}>

                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator('cityId',{
                                            rules: [{
                                                required: true,
                                                message: 'Please input city'
                                            }],
                                            initialValue: address.cityId
                                        })(
                                            <Select
                                                placeholder={
                                                <div>
                                                    <div style={{display:'inline-block'}} className="icon icon-navigation"></div>
                                                    <span style={{marginLeft:'5px'}}>City</span>
                                                </div>
                                            } disabled={true}
                                            >
                                                {optionCity}
                                            </Select>
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator('address', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your address'
                                            }],
                                            initialValue: address.addressLine1
                                        })(
                                            <TextArea placeholder='Address' rows={5} disabled={true}
                                            />
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator('postalCode', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input postal code'
                                            }],
                                            initialValue: address.postalCode
                                        })(
                                            <Input prefix={<Icon component={postalCodeSVG} style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Postal Code" disabled={true}/>
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator('firstName', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your first name'
                                            }],
                                            // initialValue: contacts.firstName
                                        })(
                                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="First Name"/>
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator('lastName', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your last name'
                                            }],
                                            // initialValue: contacts.lastName
                                        })(
                                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Last Name"/>
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your email'
                                            }],
                                            // initialValue: contacts.email
                                        })(
                                            <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Email address"/>
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator('mobileNumber', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your phone number'
                                            }],
                                            // initialValue: contacts.mobileNumber
                                        })(
                                            <Input prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Phone Number"/>
                                        )}
                                    </FormItem>

                                </Col>

                            </Row>

                            <FormItem {...formItemLayout1} label='Roles'>
                                <Button
                                    disabled={this.state.isButtonDisabled}
                                    onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                                    Add Roles
                                </Button>
                                <Table
                                    className="gx-table-responsive"
                                    components={componentsRoles}
                                    rowClassName={() => 'editable-row'}
                                    bordered
                                    dataSource={selectedRoles}
                                    columns={columnsRoles}
                                />
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
            // this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    changeRole = (value) => {
        const { record, handleSave } = this.props;
        handleSave(record, value);
    }

    render() {
        // const { editing } = this.state;
        const {
            dataOption,
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            selectedRows,
            ...restProps
        } = this.props;

        const className = !editable ? 'custom-disable' : 'custom-enable';
        restProps.className = className;

        let edit = editable;
        if(selectedRows !== undefined){
            let ix = selectedRows.find(element => element === record.key);
            if(ix === undefined){
                edit = false;
            }
        }

        return (
            <td {...restProps}>
                {edit ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                dataIndex === 'id' ? (
                                    <FormItem style={{ margin: 0 }}
                                              validateStatus={record.flag}
                                              help={record.msg}
                                    >
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(

                                            <Select style={{width:'300px'}}
                                                    onChange={this.changeRole}>
                                                {dataOption}
                                            </Select>
                                        )}
                                    </FormItem>
                                ):(
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <InputNumber
                                                ref={node => (this.input = node)}
                                                min={1}
                                                onPressEnter={this.save}
                                                onBlur={this.save}
                                            />
                                        )}
                                    </FormItem>
                                )
                            )
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

const mapStateToProps = ({auth, commonState, userState, rolesState, merchantState}) => {
    const {authUser} = auth;
    const {listRoles} = rolesState;
    const {listProvince, listCity} = commonState;
    const {createSuccess, createFailed,  createData, alertMessage, loader, showMessage} = userState;
    const {merchant} = merchantState;
    return {authUser, listProvince, listCity, createSuccess, createFailed, createData, alertMessage, loader, listRoles, merchant, showMessage};
};

export default connect(mapStateToProps, {getListProvince,getListCity, searchRoles, createUser, resetStatus, viewMerchant,})(Form.create()(CreateUser));
