import React, {Component} from "react";
import moment from 'moment';
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "components/CircularProgress/index";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    viewUser,
    updateUser,
    resetStatus,
} from "appRedux/actions/User";
import {
    uploadImage,
    resetFilePath,
    getListCountry,
    getListProvince,
    getListCity
} from "appRedux/actions/Common";
import {
    searchRoles
} from "appRedux/actions/Roles";
import {
    searchSubMerchant,
} from "appRedux/actions/Merchant";
import {Button, Card, Form, Input, InputNumber, Modal, Select, Switch, Upload, Icon, Radio, Col, message} from "antd";

import update from "immutability-helper";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";
import {aboutList} from "../../routes/socialApps/Profile/data";

const RadioGroup = Radio.Group;
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

class UpdateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            listProvince : [],
            listCity: [],
            dataSourceRoles : [],
            listRoles : [],
            listSubMerchant:[],
            msgContent: '',
            msgType: '',
            msgShow: false,
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);

    }

    componentWillMount() {
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewUser(credential);
        //for Roles
        this.props.searchRoles(credential);
        //for sub merchant
        this.props.searchSubMerchant(credential);

        if (this.props.listCountry.length < 1) {
            this.props.getListCountry();
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.data !== this.props.data) {
            this.setState({
                data: nextProps.data
            });
        }

        if (nextProps.listRoles !== this.props.listRoles) {
            this.setState({
                listRoles: nextProps.listRoles
            })
        }

        if (nextProps.listSubMerchant !== this.props.listSubMerchant) {
            this.setState({
                listSubMerchant: nextProps.listSubMerchant
            })
        }

        if (nextProps.listProvince !== this.props.listProvince) {
            this.setState({
                listProvince: nextProps.listProvince
            })
        }

        if (nextProps.listCity !== this.props.listCity) {
            this.setState({
                listCity: nextProps.listCity
            })
        }

        if (nextProps.data !== undefined && nextProps.data != this.props.data && nextProps.data.address !== null) {
            let request = {
                id: nextProps.data.address.countryId
            };
            this.props.getListProvince(request);

            this.setState({
                data: nextProps.data,
            });

        }

        if (nextProps.data !== undefined && nextProps.data != this.props.data && nextProps.data.address !== null) {
            let request = {
                id: nextProps.data.address.stateProvId
            };
            this.props.getListCity(request);

            this.setState({
                data: nextProps.data,
            });

        }

        if (nextProps.updateSuccess && !nextProps.updateFailed) {
            this.setState({
                msgContent: 'Updated Successfully',
                msgShow: true,
                msgType: 'success'
            })
        } else if (!nextProps.updateSuccess && nextProps.updateFailed) {
            this.setState({
                msgContent: 'Update failed ' +nextProps.alertMessage,
                msgShow: true,
                msgType: 'danger'
            })
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let error = false;


                let address = {
                    line1: values.address,
                    line2: '',
                    line3: '',
                    countryId: values.countryId,
                    provinceId: values.stateProvinceId,
                    cityId: values.cityId,
                    postalCode: values.postalCode,
                };

                let contact = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        mobileNumber: values.mobileNumber,
                    };
                
                let roleIds = [values.id]

                let formData = {
                    merchantName: values.merchantName,
                    fullName: values.fullName,
                    loginName: values.loginName,
                    description: values.description,
                    addressId: values.addressId,
                    contactId: values.contactId,
                    address: address,
                    contact: contact,
                    roleIds: roleIds,
                    submerchantCode: values.merchantCode
                };

                let request = this.props.authUser;
                request.data = formData;

                if (!error) {
                    this.props.updateUser(request);
                }

            }
        });
    };

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

    changeRole(value) {
        // console.log(value)
    }

    changeSubMerchant(value) {
        // console.log(value)
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        let {loader, alertMessage, showMessage} = this.props;
        const {data, msgShow, msgType, msgContent, listRoles, listSubMerchant} = this.state;
        var obj = JSON.parse(localStorage.getItem("userData"));
        var idUserForUpdate =  localStorage.getItem('idForUpdate');
        var loginName = '';
        var fullName = '';
        var description = '';
        var merchantName = '';
        var line1 = '';
        var countryId = '';
        var stateProvId = '';
        var cityTown = '';
        var postalCode = '';
        var contactFirstName = '';
        var contactLastName = '';
        var mobileNumber = '';
        var emailAddress = '';
        var id = '';
        var code = '';
        var codeDescription = '';
        var codeSubMerchant = '';
        var nameSubMerchant = '';
                loginName = data.loginName;
                fullName = data.fullName;
                description = data.description;
                merchantName = data.merchantName;
                if(data.address != null ){
                    if (data.address.line1 != null){
                        line1 = data.address.line1;
                    }

                    if (data.address.countryId != null){
                        countryId = data.address.countryId;
                    }

                    if (data.address.stateProvId != null){
                        stateProvId = data.address.stateProvId;
                    }

                    if (data.address.cityTown != null){
                        cityTown = data.address.cityTown;
                    }
                    postalCode = data.address.postalCode;
                }


        if(data.address != null ){
            contactFirstName = data.contact.contactFirstName;
            contactLastName = data.contact.contactLastName;
            mobileNumber = data.contact.mobileNumber;
            emailAddress = data.contact.emailAddress;
        }

        if(data.role != null) {
            console.log(data.role)
            id = data.role.id;
            code = data.role.code;
            codeDescription = data.role.description;
        }

        if(data.subMerchant != null) {
            codeSubMerchant = data.subMerchant.code;
            nameSubMerchant = data.subMerchant.name;
        }

        let showSubMerchant = false
        if(data.subMerchant === null){
            showSubMerchant = true;
        } else {
            showSubMerchant = false;
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
            contactId: '',
            firstName: '',
            lastName: '',
            mobileNumber: '',
            email: ''
        };

        let role = {
            id : '',
            code : '',
            codeDescription : '',
        }

        let subMerchant = {
            codeSubMerchant : '',
            nameSubMerchant : ''
        }

        if (data.contacts !== undefined) {
            contacts = data.contacts;
        }

        if (data.role !== undefined) {
            role = data.role;
        }

        if(data.subMerchant !== undefined){
            subMerchant = data.subMerchant
        }

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

        if (data.address !== undefined) {
            address = data.address;
        }

        let optionsRoles = [];
        listRoles.forEach((role, i) => {
            let optionR =
                <Option key={i} value={role.id}>{role.name}</Option>;
            optionsRoles.push(optionR);
        });

        let optionsSubMerchant = [];
        if(this.state.listSubMerchant !== null){
            listSubMerchant.forEach((sub, i) => {
                let optionR =
                    <Option key={i} value={sub.code}>{sub.name}</Option>;
                optionsSubMerchant.push(optionR);
            });
        } else {
            optionsSubMerchant = []
        }

        return (
            <Card className="gx-card" title='User'>
                <div>
                    {loader == true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                </div>
                <Form onSubmit={this.handleSubmit}>

                    <h5 className='gx-mb-3' style={{marginTop: '30px'}}>Profile</h5>
                    <div className='custom-box'>

                        <FormItem {...formItemLayout} label='Merchant Name'>
                            {getFieldDecorator('merchantName', {
                                rules: [{
                                    required: true,
                                    message: 'Please input merchant name'
                                }],
                                initialValue: merchantName
                            })(
                                <Input placeholder='Merchant Name' disabled={true}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Login Name'>
                            {getFieldDecorator('loginName', {
                                rules: [{
                                    required: true,
                                    message: 'Please input login name'
                                }],
                                initialValue: loginName
                            })(
                                <Input placeholder='Login Name'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Full Name'>
                            {getFieldDecorator('fullName', {
                                rules: [{
                                    required: true,
                                    message: 'Please input full name'
                                }],
                                initialValue: fullName
                            })(
                                <Input placeholder='Full Name'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Description'>
                            {getFieldDecorator('description', {
                                // rules: [{
                                //     required: true,
                                //     message: 'Please input description'
                                // }],
                                initialValue: description
                            })(
                                <Input placeholder='Description'/>
                            )}
                        </FormItem>


                    </div>

                    <h5 className='gx-mb-3' style={{marginTop: '30px'}}>Address</h5>
                    <div className='custom-box'> 

                        <FormItem {...formItemLayout} label='Country'>
                            {getFieldDecorator('countryId', {
                                // rules: [{
                                //     required: true,
                                //     message: 'Please input province'
                                // }],
                                initialValue: countryId
                            })(
                                <Select
                                    onChange={this.changeCountry.bind(this)}
                                    placeholder={
                                        <div>
                                            <div style={{display: 'inline-block'}}
                                                className="icon icon-map-drawing"></div>
                                            <span style={{marginLeft: '5px'}}>Country</span>
                                        </div>
                                    }
                                    disabled={true} >
                                    {optionCountry}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Province'>
                            {getFieldDecorator('stateProvinceId', {
                                // rules: [{
                                //     required: true,
                                //     message: 'Please input province'
                                // }],
                                initialValue: stateProvId
                            })(
                                <Select
                                    onChange={this.changeProvince.bind(this)}
                                    placeholder={
                                        <div>
                                            <div style={{display: 'inline-block'}}
                                                className="icon icon-map-drawing"></div>
                                            <span style={{marginLeft: '5px'}}>Province</span>
                                        </div>
                                    }
                                    disabled={true} >
                                    {optionProvince}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='City'>
                            {getFieldDecorator('cityId', {
                                // rules: [{
                                //     required: true,
                                //     message: 'Please input city'
                                // }],
                                initialValue: cityTown
                            })(
                                <Select placeholder={
                                    <div>
                                        <div style={{display: 'inline-block'}} className="icon icon-navigation"></div>
                                        <span style={{marginLeft: '5px'}}>City</span>
                                    </div>
                                }
                                disabled={true} >
                                    {optionCity}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Address'>
                            {getFieldDecorator('address', {
                                // rules: [{
                                //     required: true,
                                //     message: 'Please input address'
                                // }],
                                initialValue: line1
                            })(
                                <Input placeholder='Address' disabled={true}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Postal Code'>
                            {getFieldDecorator('postalCode', {
                                // rules: [{
                                //     required: true,
                                //     message: 'Please input postal code'
                                // }],
                                initialValue: postalCode

                            })(
                                <Input placeholder="Postal Code" disabled={true}/>
                            )}
                        </FormItem>


                    </div>

                    <h5 className='gx-mb-3' style={{marginTop: '30px'}}>Contact</h5>
                    <div className='custom-box'>
                        <FormItem {...formItemLayout} label='First Name'>
                            {getFieldDecorator('firstName', {
                                rules: [{
                                    required: true,
                                    message: 'Please input first name'
                                }],
                                initialValue: contactFirstName
                            })(
                                <Input placeholder='First Name'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Last Name'>
                            {getFieldDecorator('lastName', {
                                rules: [{
                                    required: true,
                                    message: 'Please input last name'
                                }],
                                initialValue: contactLastName
                            })(
                                <Input placeholder='Last Name'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Phone Number'>
                            {getFieldDecorator('mobileNumber', {
                                rules: [{
                                    required: true,
                                    message: 'Please input phone number'
                                }],
                                initialValue: mobileNumber
                            })(
                                <Input placeholder='Phone Number'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Email'>
                            {getFieldDecorator('email', {
                            rules: [{
                                    required: false
                                }],
                                initialValue: emailAddress
                            })(
                                <Input placeholder='Email'/>
                            )}
                        </FormItem>


                    </div>

                    <h5 className='gx-mb-3' style={{marginTop: '30px'}}>Role </h5>
                    <div className='custom-box'>
                        <FormItem {...formItemLayout} label='Code'>
                            {getFieldDecorator('id', {
                                rules: [{
                                    required: true,
                                    message: 'Please Select the Role'
                                }],
                                initialValue: id 
                            })(
                                <Select
                                    onChange={this.changeRole.bind(this)}
                                    placeholder={
                                        <div>
                                            <div style={{display: 'inline-block'}}
                                                className="icon icon-map-drawing"></div>
                                        </div>
                                    }
                                >
                                    {optionsRoles}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Code Name'>
                            {getFieldDecorator('codeDescription', {
                                // rules: [{
                                //     required: true,
                                //     message: 'Please input first name'
                                // }],
                                initialValue: codeDescription
                            })(
                                <Input placeholder='Role Name' disabled={true}/>
                            )}
                        </FormItem>
                    </div>

                    <h5 className='gx-mb-3' style={{marginTop: '30px'}} hidden={showSubMerchant}>Sub Merchant </h5>
                    <div className='custom-box' hidden={showSubMerchant}>
                        <FormItem {...formItemLayout} label='Merchant Name'>
                            {getFieldDecorator('merchantCode', {
                                // rules: [{
                                //     required: true,
                                //     message: 'Please Select 1 sub Merchant'
                                // }],
                                initialValue: codeSubMerchant 
                            })(
                                <Select
                                    onChange={this.changeSubMerchant.bind(this)}
                                    placeholder={
                                        <div>
                                            <div style={{display: 'inline-block'}}
                                                className="icon icon-map-drawing"></div>
                                        </div>
                                    }
                                >
                                    {optionsSubMerchant}
                                </Select>
                            )}
                        </FormItem>
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
        );

    }
}

const mapStateToProps = ({auth, userState, commonState, rolesState, merchantState}) => {
    const {authUser} = auth;
    const {listProvince, listCity, listCountry} = commonState;
    const {listRoles} = rolesState;
    const {listSubMerchant} = merchantState;
    const {data, updateSuccess, updateFailed, updateData, loader, alertMessage, showMessage} = userState;
    return {
        authUser,
        data,
        updateSuccess,
        updateFailed,
        updateData,
        listCountry,
        listProvince,
        listCity,
        loader,
        alertMessage,
        showMessage,
        listRoles,
        listSubMerchant
    }
};

export default connect(mapStateToProps, {
    viewUser,
    updateUser,
    resetStatus,
    getListCountry,
    getListProvince,
    getListCity,
    searchRoles,
    searchSubMerchant
})(Form.create()(UpdateUser));


