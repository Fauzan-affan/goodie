import React, {Component} from "react";
import {Button, Checkbox, Form, Icon, Input, Radio, Row, Col, Select, Card, message} from "antd";
import { ReCaptcha } from 'react-recaptcha-google';
import MerchantType from '../constants/MerchantType';
import {connect} from "react-redux";
import {
    registerMerchant,
    resetStatus
} from "appRedux/actions/Merchant";
import {
    getListProvince,
    getListCity
} from "appRedux/actions/Common";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import CircularProgress from "components/CircularProgress/index";

const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {xs: 24, sm: 6},
  wrapperCol: {xs: 24, sm: 22},
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

const addressSVG = () => (
    <svg viewBox="64 64 896 896" width='1em'
         height='1em'>
      <defs>
        <style type="text/css"></style>
      </defs>
      <path d="M832 389.3c-0.5 49.1-16.2 94.1-37.5 137.4-31.8 65-74 123-119.8 178.6-42.6 51.7-88.5 100.6-137.4 146.4-17.1 16-32.7 16.5-50.2 0.8-90.6-81.4-172.1-170.6-234.3-276.1-10.1-17.2-19.3-34.9-27.2-53.2-7.5-17.4-1-35.5 15.1-43 16.2-7.5 33.9-0.9 41.8 16.2 37.2 80.8 90.6 149.5 150 214.6 22.9 25.1 46.9 50.2 71.8 73.4 3.1 2.9 9 4.2 13.4-0.2 82.4-83 158.5-170 214.6-273.6C748.6 480.5 768 425.9 768 389c0-52.3-5.7-75.5-30.3-121-46.8-86.5-119.2-140-218.7-140-113.1 0-213.4 69.6-249 177.3-8.9 27.1-13.6 54.8-14 83.3-0.3 20.4-13.7 34.7-32.1 34.7-18.5 0-32-14.8-31.9-34.8 0.4-151.5 104.8-282.8 252-316.8C565.8 43.6 696.2 94.1 769.9 198c40.7 57.3 60.9 121.2 62.1 191.3z" fill="#cdcdcd" p-id="3386"></path><path d="M512.5 256c-70.9-0.1-128.5 57.2-128.5 128 0 70.3 57.3 127.9 127.5 128 70.8 0.2 128.5-57.3 128.5-128 0-70.4-57.3-127.9-127.5-128z m0.6 192c-36 0.3-65.2-28.4-65.1-64.1 0.1-35.3 28.8-63.9 64.4-63.9 34.7 0 63.5 28.7 63.6 63.6 0.1 34.9-28.3 64.1-62.9 64.4zM960 928v-0.4-1-0.6c0-0.4 0-0.7-0.1-1.1 0-0.2 0-0.4-0.1-0.5 0-0.3-0.1-0.6-0.1-1 0-0.2-0.1-0.4-0.1-0.7 0-0.2-0.1-0.5-0.1-0.7-0.1-0.3-0.1-0.6-0.2-1 0-0.1 0-0.2-0.1-0.3-0.9-3.9-2.4-7.5-4.6-10.7L827 689.3c-8.6-14.9-27.8-20-42.6-11.4l-1.4 0.8c-14.9 8.6-20 27.8-11.4 42.6L872.5 896h-721l100.3-173.7c8.8-15.2 3.5-34.9-11.7-43.7-15.2-8.8-34.9-3.5-43.7 11.7L68.3 912c-1.2 2.1-2.1 4.2-2.8 6.5v0.1c-0.1 0.4-0.3 0.9-0.4 1.3 0 0.1-0.1 0.3-0.1 0.4-0.1 0.3-0.2 0.7-0.2 1 0 0.2-0.1 0.5-0.1 0.7 0 0.2-0.1 0.5-0.1 0.7-0.1 0.3-0.1 0.7-0.1 1 0 0.2 0 0.3-0.1 0.5 0 0.4-0.1 0.8-0.1 1.2v0.2c-0.1 0.8-0.1 1.5-0.1 2.3 0 4.4 0.9 8.7 2.6 12.5 2.6 6.2 7.2 11.6 13.4 15.2 4.5 2.6 9.4 4 14.2 4.2h833.8c16.8 0 30.7-13.2 31.9-29.7v-0.2-1-0.7c-0.1 0-0.1-0.1-0.1-0.2z" fill="#cdcdcd" p-id="3387"></path>
    </svg>
);

const addressPlaceholder =
    <div>
      <div className="icon icon-map-street-view"></div>
      <span style={{marginLeft:'5px'}}>Address</span>
    </div>;

class SignUP extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listCity : [],
            msgContent : '',
            msgType : '',
            msgShow : false,
            recaptchaToken : ''
        }

        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    componentWillMount() {
        if(this.props.listProvince.length < 1){
            this.props.getListProvince();
        }
    }

    componentDidMount() {
        if (this.captcha) {
            // console.log("started, just a second...")
            this.captcha.reset();
        }
    }
    onLoadRecaptcha() {
        if (this.captcha) {
            this.captcha.reset();
        }
    }

    verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!
        // console.log(recaptchaToken, "<= your recaptcha token")
        this.setState({
                recaptchaToken : recaptchaToken
            }
        )
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.listCity !== this.props.listCity) {
            this.setState({
                listCity : nextProps.listCity
            })
        }

        if (nextProps.registerSuccess && !nextProps.registerFailed){
            this.setState({
                msgContent : 'Register Successfully. You can login now in Goodie Portal',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.registerSuccess && nextProps.registerFailed){
            this.setState({
                msgContent : 'Register failed. '+ nextProps.alertMessage,
                msgShow : true,
                msgType : 'danger'
            })
            this.captcha.reset();
        }
    }

    changeProvince(value){
        let request = {
            id : value
        }
        this.props.getListCity(request);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                let error = false;
                if(values.password !== values.confirmPassword) {
                    this.errorNotification('Password is not match. Please input your correct password.');
                    error = true;
                    return;
                }

                if(this.state.recaptchaToken === ''){
                    this.errorNotification('Please click recaptcha before register.');
                    error = true;
                    return;
                }

                values.token = this.state.recaptchaToken;

                if(!error){
                    values.rootRegister = 'baseUrl';
                    this.props.registerMerchant(values);
                }
            }
          // console.log("values", values)
        });
    };

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }

    onConfirm(){
        this.props.resetStatus();
        if(this.state.msgType === "success"){
            this.props.history.push('/signin');
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

    render() {
        const {msgShow, msgType, msgContent, alertMessage, showMessage} = this.state;
        const {getFieldDecorator} = this.props.form;
        const {loader} = this.props;

        let options = [];
        MerchantType.values().forEach((mtype, i) => { 
          let option =
              <div>
              <Radio key={i} value={mtype.value}> {mtype.label}</Radio>
                <p>{mtype.description}</p>
              </div>
          options.push(option);
        });

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

        return (
            <div className="gx-app-login-wrap custom-background">
                <div className="gx-login-container" style={{overflow:'scroll', paddingTop: '30px'}}>
                  <div className="custom-register">
                      <div className='custom-back-register'>
                          <a href='https://www.goodie.id'><Icon type="arrow-left"/>  Back to homepage</a>
                      </div>
                    <div className="gx-login-header gx-text-center custom-header-register">
                        <img src={require('assets/images/logo-big.png')} className='custom-logo-register'/>
                      <h1 className="gx-login-title">Build your loyalty system</h1>
                    </div>

                    <Form onSubmit={this.handleSubmit} className="">
                      <Row>
                        <Col lg={12} md={12} sm={24} xs={24}>


                          <FormItem {...formItemLayout}>
                            {getFieldDecorator('firstName', {
                              rules: [{required: true, message: 'Please input your first name'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="First Name"/>
                            )}
                          </FormItem>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator('lastName', {
                                    rules: [{required: true, message: 'Please input your last name'}],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="Last Name"/>
                                )}
                            </FormItem>
                          <FormItem {...formItemLayout}>
                            {getFieldDecorator('email', {
                              rules: [{required: true, message: 'Please input your email'}],
                            })(
                                <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Email address"/>
                            )}
                          </FormItem>

                          <FormItem {...formItemLayout}>
                            {getFieldDecorator('phoneNumber', {
                              rules: [{required: true, message: 'Please input your phone number'}],
                            })(
                                <Input prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Phone Number"/>
                            )}
                          </FormItem>

                          {/*<FormItem {...formItemLayout}>*/}
                          {/*  {getFieldDecorator('password', {*/}
                          {/*    rules: [{required: true, message: 'Please input your Password'}],*/}
                          {/*  })(*/}
                          {/*      <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"*/}
                          {/*             placeholder="Password"/>*/}
                          {/*  )}*/}
                          {/*</FormItem>*/}

                          {/*<FormItem {...formItemLayout}>*/}
                          {/*  {getFieldDecorator('confirmPassword', {*/}
                          {/*    rules: [{required: true, message: 'Please input your Password'}],*/}
                          {/*  })(*/}
                          {/*      <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"*/}
                          {/*             placeholder="Confirm Password"/>*/}
                          {/*  )}*/}
                          {/*</FormItem>*/}

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

                          </Col>

                          <Col lg={12} md={12} sm={24} xs={24}>
                            <FormItem {...formItemLayout}>
                              {getFieldDecorator('merchantName', {
                                rules: [{required: true, message: 'Please input your merchant name'}],
                              })(
                                  <Input prefix={<Icon type="shop" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                         placeholder="Merchant Name"/>
                              )}
                            </FormItem>

                            <FormItem {...formItemLayout}>
                              {getFieldDecorator('stateProvinceId',{
                                rules: [{
                                  required: true,
                                  message: 'Please input province'
                                }]
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

                            <FormItem {...formItemLayout}>
                              {getFieldDecorator('cityId',{
                                rules: [{
                                  required: true,
                                  message: 'Please input city'
                                }]
                              })(
                                  <Select placeholder={
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

                            <FormItem {...formItemLayout}>
                              {getFieldDecorator('address', {
                                rules: [{required: true, message: 'Please input your address'}],
                              })(
                                  <TextArea placeholder='Address' rows={5}
                                  />
                              )}
                            </FormItem>

                            <FormItem {...formItemLayout}>
                              {getFieldDecorator('postalCode', {
                                rules: [{required: true, message: 'Please input postal code'}],
                              })(
                                  <Input prefix={<Icon component={postalCodeSVG} style={{color: 'rgba(0,0,0,.25)'}}/>}
                                         placeholder="Postal Code"/>
                              )}
                            </FormItem>

                          </Col>

                      </Row>


                      <FormItem label='Loyalty Package' style={{marginLeft:'15px'}}>
                        {getFieldDecorator('merchantType',{
                          rules: [{
                            required: true,
                            message: 'Please select loyalty package'
                          }]
                        })(

                              <RadioGroup>
                                {options}
                              </RadioGroup>
                        )}
                      </FormItem>

                        <ReCaptcha
                            style={{marginLeft:'30px'}}
                            ref={(el) => {this.captcha = el;}}
                            size="normal"
                            data-theme="dark"
                            render="explicit"
                            sitekey="6Lcx2aUUAAAAADZUsxlUhsIcslU0ouRHgvns_0mN"
                            onloadCallback={this.onLoadRecaptcha}
                            verifyCallback={this.verifyCallback}
                        />

                        <div className='custom-term-condition'>
                            By clicking Register, you agree to <a href='#'>our Terms</a>.
                        </div>
                        <div style={{width:'100%', textAlign:'center'}}>
                            <Button type="primary" htmlType="submit" className='custom-register-button'>
                              Register
                            </Button>
                        </div>
                    </Form>
                      {loader ?
                          <div style={{position: 'absolute', top: 0, left:0, right:0, bottom:0}} className="gx-loader-view">
                              <CircularProgress/>
                          </div> : null}
                      {showMessage ?
                          message.error(alertMessage.toString()) : null}
                  </div>

                    <SweetAlert success={msgType ==='success' ? true : false} danger={msgType ==='danger' ? true : false}
                                show={msgShow} title={msgContent} onConfirm={this.onConfirm}>
                    </SweetAlert>
                    <NotificationContainer/>
                </div>
            </div>
        );
  }
}

const mapStateToProps = ({auth, commonState, merchantState}) => {
    const {authUser} = auth;
    const {listProvince, listCity} = commonState;
    const {registerSuccess, registerFailed, alertMessage, loader, showMessage} = merchantState;
    return {authUser, listProvince, listCity, registerSuccess, registerFailed, alertMessage, loader, showMessage};
};

export default connect(mapStateToProps, {getListProvince,getListCity, registerMerchant, resetStatus})(Form.create()(SignUP));
