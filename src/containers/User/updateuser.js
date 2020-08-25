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
    getListProvince,
    getListCity
} from "appRedux/actions/Common";
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
            listCity: [],
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

        if (this.props.listProvince.length < 1) {
            this.props.getListProvince();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.listCity !== this.props.listCity) {
            this.setState({
                listCity: nextProps.listCity
            })
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
                msgContent: 'Update failed',
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
                    countryId: 'ID',
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

                let formData = {
                    merchantName: values.merchantName,
                    fullName: values.fullName,
                    loginName: values.loginName,
                    description: values.description,
                    addressId: values.addressId,
                    contactId: values.contactId,
                    address: address,
                    contact: contact,
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

    changeProvince(value) {
        let request = {
            id: value
        };
        this.props.getListCity(request);

        this.props.form.setFieldsValue({
            cityId: ''
        });
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        let {loader, alertMessage, showMessage} = this.props;
        const {data, msgShow, msgType, msgContent} = this.state;
        var obj = JSON.parse(localStorage.getItem("userData"));
        var idUserForUpdate =  localStorage.getItem('idForUpdate');
        var loginName = '';
        var fullName = '';
        var description = '';
        var merchantName = '';
        var line1 = '';
        var stateProvId = '';
        var cityTown = '';
        var postalCode = '';
        var contactFirstName = '';
        var contactLastName = '';
        var mobileNumber = '';
        var emailAddress = '';
        var code = '';
        var codeName = '';
                loginName = obj.data.loginName;
                fullName = obj.data.fullName;
                description = obj.data.description;
                merchantName = obj.data.merchantName;
                if(obj.data.address != null ){
                    if (obj.data.address.line1 != null){
                        line1 = obj.data.address.line1;
                    }
                    if (obj.data.address.stateProvId != null){
                        stateProvId = obj.data.address.stateProvId;
                    }

                    if (obj.data.address.cityTown != null){
                        cityTown = obj.data.address.cityTown;
                    }
                    postalCode = obj.data.address.postalCode;
                }


        if(obj.data.address != null ){
            contactFirstName = obj.data.contact.contactFirstName;
            contactLastName = obj.data.contact.contactLastName;
            mobileNumber = obj.data.contact.mobileNumber;
            emailAddress = obj.data.contact.emailAddress;
        }

        if(obj.data.role != null) {
            code = obj.data.role.code;
            codeName = obj.data.role.name;
        }



        let address = {
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
        if (data.contacts !== undefined) {
            contacts = data.contacts;
        }

        let optionProvince = [];
        this.props.listProvince.forEach((province, i) => {
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
                                    } disabled={true}
                                >
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
                                } disabled={true}
                                >
                                    {optionCity}
                                </Select>
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
                            {getFieldDecorator('firstName', {
                                // rules: [{
                                //     required: true,
                                //     message: 'Please input first name'
                                // }],
                                initialValue: code
                            })(
                                <Input placeholder='Code' disabled={true}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Code Name'>
                            {getFieldDecorator('firstName', {
                                // rules: [{
                                //     required: true,
                                //     message: 'Please input first name'
                                // }],
                                initialValue: codeName
                            })(
                                <Input placeholder='Role Name' disabled={true}/>
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

const mapStateToProps = ({auth, userState, commonState}) => {
    const {authUser} = auth;
    const {listProvince, listCity} = commonState;
    const {data, updateSuccess, updateFailed, updateData, loader, alertMessage, showMessage} = userState;
    return {
        authUser,
        data,
        updateSuccess,
        updateFailed,
        updateData,
        listProvince,
        listCity,
        loader,
        alertMessage,
        showMessage
    }
};

export default connect(mapStateToProps, {
    viewUser,
    updateUser,
    resetStatus,
    getListProvince,
    getListCity
})(Form.create()(UpdateUser));


