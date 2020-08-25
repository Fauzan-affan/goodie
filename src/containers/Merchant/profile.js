import React, {Component} from "react";
import {Avatar, Button, Col, Row, Tabs, Icon} from "antd";
import About from "../../components/Profile/About/index";
import Auxiliary from "../../util/Auxiliary";
import {connect} from "react-redux";
import {
    viewMerchant,
    getCurrency,
    activateSandbox,
    resetStatus
} from "appRedux/actions/Merchant";
import Widget from "components/Widget";
import {aboutList} from "../../routes/socialApps/Profile/data";
import AboutItem from "../../components/Profile/About/AboutItem";
import {ReCaptcha} from "react-recaptcha-google";
import SweetAlert from "react-bootstrap-sweetalert";

const TabPane = Tabs.TabPane;

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            merchant : this.props.merchant,
            recaptchaToken : '',
            msgContent : '',
            msgType : '',
            msgShow : false,
            currency : this.props.currency,
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    componentWillMount(){
        if (this.captchaSandbox) {
            // console.log("started, just a second...")
            this.captchaSandbox.reset();
        }

        let credential = this.props.authUser;
        this.props.viewMerchant(credential);
    }

    onLoadRecaptcha() {
        if (this.captchaSandbox) {
            this.captchaSandbox.reset();
        }
    }

    verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!
        // console.log(recaptchaToken, "<= your recaptcha token")

        if(recaptchaToken != undefined){
            let merchantData = this.props.merchant;
            let credential = this.props.authUser;

            credential.rootRegister = 'sandbox';
            credential.email = merchantData.contacts[0].emailAddress;
            credential.phoneNumber = merchantData.contacts[0].mobileNumber;
            credential.firstName = merchantData.contacts[0].contactFirstName;
            credential.lastName = merchantData.contacts[0].contactLastName;
            credential.merchantType = merchantData.merchantType;
            credential.password = 'password';
            credential.address= merchantData.address.addressLine1;
            credential.cityId = merchantData.address.cityId;
            credential.stateProvinceId = merchantData.address.provinceId;
            credential.postalCode = merchantData.address.postalCode;
            credential.token = recaptchaToken;

            this.props.activateSandbox(credential);
        }
    }

    /* polimorfisme cannot work in javascript
    componentWillReceiveProps(nextProps){
        if(nextProps.merchant !== this.props.merchant){
            this.setState({
                merchant : nextProps.merchant
            });
        }

        if(nextProps.currency !== this.props.currency){
            this.setState({
                currency : nextProps.merchant
            });
        }
    }

    */

    editProfile = () =>{
        this.props.history.push('/merchant/profile/edit');
    };

    activateSandbox = () =>{
        //Hit recaptha for sandbox
        this.captchaSandbox.execute();
    };

    onConfirm(){
        this.props.resetStatus();
        this.setState({
            msgShow : false
        })
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.merchant != this.props.merchant){
            this.setState({
                merchant : nextProps.merchant,
                currency : nextProps.currency
            });
        }

        if(nextProps.currency !== this.props.currency){
            this.setState({
                currency : nextProps.currency
            });
        }

        if (nextProps.activeSuccess && !nextProps.activeFailed) {
            this.setState({
                msgContent: 'Activation Sandbox Successfully',
                msgShow: true,
                msgType: 'success'
            })
        } else if (!nextProps.activeSuccess && nextProps.activeFailed) {
            this.setState({
                msgContent: 'Activation Sandbox Failed',
                msgShow: true,
                msgType: 'danger'
            })
        } else {
            this.setState({
                msgContent: '',
                msgShow: false,
                msgType: ''
            })
        }

        if (nextProps.merchant != undefined && nextProps.merchant != this.props.merchant) {
            let request = {
                authToken: localStorage.getItem('a'),
                deviceId: localStorage.getItem('d'),
                userId: localStorage.getItem('u'),
                merchantId: localStorage.getItem('mt'),
                paramCurrencyPoint: nextProps.merchant.paramCurrencyPoint
            };
            this.props.getCurrency(request);
        }
    }


    render() {
        const{merchant, msgType, msgShow, msgContent, currency} = this.state;
        
        let name = '';
        let email = '';
        let phoneNumber = '';
        let website = '';
        let pointFeePercent = '';
        let city= '';
        let province = '';
        let address= '';
        let postalCode = '';
        let requiredVerification = '';
        let requiredOtpForRedeem = '';
        let issuingPoint = '';
        let currencyPoint = '';

        let currencyDtl = '';
        let currencyCategory = '';
        let currencyCode = '';
        let currencyValue = '';
        let currencyDescription = '';
        let currencyIcon = '';
        
        if(merchant.isRequiredVerification != null){
            requiredVerification = merchant.isRequiredVerification == 0 ? 'No' : 'Yes';
        }

        if(merchant.isRedeemOtp != null){
            requiredOtpForRedeem = merchant.isRedeemOtp == 0 ? 'No' : 'Yes';
        }

        if(merchant.issuingReferral != null){
            issuingPoint = merchant.issuingReferral == 0 ? 'Register' : 'Verification Member';
        }

        if(merchant.paramCurrencyPoint != null){
            currencyPoint = merchant.paramCurrencyPoint == 0 ? 'Point' : 'Currency';
        }

        if(merchant.currencyId != null){
            currencyDtl = merchant.currencyId;
        }

        if(merchant.contacts !== null){
            name = merchant.contacts[0].contactFirstName + ' ' + merchant.contacts[0].contactLastName;
            email = merchant.contacts[0].emailAddress;
            phoneNumber = merchant.contacts[0].mobileNumber;
            website = merchant.merchantWebsite;
        }

        if(merchant.address !== null){
            address = merchant.address.addressLine1;
            city = merchant.address.cityTown;
            province = merchant.address.province;
            postalCode = merchant.address.postalCode;
        }

        if(currency.lookupDtlId != null){
            currencyDtl = currency.lookupDtlId;
        }

        if(currency.lookupHdrId != null){
            currencyCategory = currency.lookupHdrId;
        }

        if(currency.lookupCode != null){
            currencyCode = currency.lookupCode;
        }

        if(currency.lookupValue != null){
            currencyValue = currency.lookupValue;
        }

        if(currency.description != null){
            currencyDescription = currency.description;
        }

        if(currency.icon != null){
            currencyIcon = currency.icon;
        }

        return (
            <Auxiliary>
                {/*Header*/}
                <div className="gx-profile-banner custom-profile-banner">
                    <div className="gx-profile-container">
                        <div className="gx-profile-banner-top">
                            <div className="gx-profile-banner-top-left">
                                <div className="gx-profile-banner-avatar">
                                    <Avatar className="gx-size-90" alt="..." src={merchant.merchantLogo}/>
                                </div>
                                <div className="gx-profile-banner-avatar-info">
                                    <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light">{merchant.merchantName}</h2>
                                    <p className="gx-mb-0 gx-fs-lg">{city}, {province}</p>
                                </div>
                            </div>
                            <div className="gx-profile-banner-top-right">
                                <ul className="gx-follower-list">

                                </ul>
                            </div>
                        </div>
                        <div className="gx-profile-banner-bottom">
                            <div className="gx-tab-list">
                                <ul className="gx-navbar-nav">

                                </ul>
                            </div>
                            <span className="gx-link gx-profile-setting">
                                <Button type="primary" icon="edit" onClick={this.editProfile}>Edit Profile</Button>
                              </span>
                        </div>
                    </div>
                </div>


                <div className="gx-profile-content">
                    <Row>
                        <Col xl={16} lg={14} md={14} sm={24} xs={24}>
                            <Widget title="Overview" styleName="gx-card-tabs gx-card-tabs-right gx-card-profile">
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="Settings" key="1">
                                        <div className="gx-mb-2">
                                            <Row>

                                                <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                                                    <Auxiliary>
                                                        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                            <div className="gx-mr-3">
                                                                <i className={`icon icon-select gx-fs-xlxl gx-text-orange`}/>
                                                            </div>
                                                            <div className="gx-media-body">
                                                                <h6 className="gx-mb-1 gx-text-grey">Required Verification While Register</h6>
                                                                <p className="gx-mb-0">{requiredVerification}</p>
                                                            </div>
                                                        </div>
                                                    </Auxiliary>
                     
                                                </Col>

                                                <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                                                    <Auxiliary>
                                                        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                            <div className="gx-mr-3">
                                                            <Icon type="mobile" className={`gx-fs-xlxl gx-text-orange`} />
                                                                {/* <i className={`icon icon-select gx-fs-xlxl gx-text-orange`}/> */}
                                                            </div>
                                                            <div className="gx-media-body">
                                                                <h6 className="gx-mb-1 gx-text-grey">Required Otp While Redeem Reward</h6>
                                                                <p className="gx-mb-0">{requiredOtpForRedeem}</p>
                                                            </div>
                                                        </div>
                                                    </Auxiliary>
                                                </Col>

                                                <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                                                    <Auxiliary>
                                                        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                            <div className="gx-mr-3">
                                                                <i className={`icon icon-revenue-new gx-fs-xlxl gx-text-orange`}/>
                                                            </div>
                                                            <div className="gx-media-body">
                                                                <h6 className="gx-mb-1 gx-text-grey">Issuing Referral Point On</h6>
                                                                <p className="gx-mb-0">{issuingPoint}</p>
                                                            </div>
                                                        </div>
                                                    </Auxiliary>
                                                </Col>


                                                <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                                                    <Auxiliary>
                                                        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                            <div className="gx-mr-3">
                                                            <Icon type="dollar" className={`gx-fs-xlxl gx-text-orange`} />
                                                            </div>
                                                            <div className="gx-media-body">
                                                                <h6 className="gx-mb-1 gx-text-grey">Required Currency Display Reward</h6>
                                                                <p className="gx-mb-0">{currencyPoint}</p>
                                                            </div>
                                                        </div>
                                                    </Auxiliary>
                                                </Col>

                                                <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                                                    <Auxiliary>
                                                        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                            <div className="gx-mr-3">
                                                            {/*<img src={process.env.PUBLIC_URL + '/change.png'} style={{maxWidth: "40px"}}/>*/}
                                                            <img src={currencyIcon} style={{maxWidth: "40px"}}/>
                                                            </div>
                                                            <div className="gx-media-body">
                                                                <h6 className="gx-mb-1 gx-text-grey"> Required Currency or Point While Redeem Reward</h6>
                                                                <p className="gx-mb-0">{currencyDescription}</p>
                                                            </div>
                                                        </div>
                                                    </Auxiliary>
                                                </Col>

                                                <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                                                    <Auxiliary>
                                                        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                            <div className="gx-mr-3">
                                                                {/*<img src={process.env.PUBLIC_URL + '/change.png'} style={{maxWidth: "40px"}}/>*/}
                                                                {/*<img src={currencyIcon} style={{maxWidth: "40px"}}/>*/}
                                                                <img style={{maxWidth: "40px"}} src={require('assets/images/profile_pointfee.svg')}></img>
                                                            </div>
                                                            <div className="gx-media-body">
                                                                <h6 className="gx-mb-1 gx-text-grey">Point Sharing Scheme</h6>
                                                                <p className="gx-mb-0">{merchant.pointFeePercent}</p>
                                                            </div>
                                                        </div>
                                                    </Auxiliary>
                                                </Col>
                                            </Row>
                                        </div>
                                    </TabPane>

                                    <TabPane tab="Address" key="2">
                                        <div className="gx-mb-2">
                                            <Row>
                                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                    <Auxiliary>
                                                        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                            <div className="gx-mr-3">
                                                                <i className={`icon icon-location gx-fs-xlxl gx-text-orange`}/>
                                                            </div>
                                                            <div className="gx-media-body">
                                                                <h6 className="gx-mb-1 gx-text-grey">Address</h6>
                                                                <p className="gx-mb-0">{address}</p>
                                                            </div>
                                                        </div>
                                                    </Auxiliary>
                                                </Col>

                                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                    <Auxiliary>
                                                        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                            <div className="gx-mr-3">
                                                                <i className={`icon icon-map-drawing gx-fs-xlxl gx-text-orange`}/>
                                                            </div>
                                                            <div className="gx-media-body">
                                                                <h6 className="gx-mb-1 gx-text-grey">Province</h6>
                                                                <p className="gx-mb-0">{province}</p>
                                                            </div>
                                                        </div>
                                                    </Auxiliary>
                                                </Col>

                                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                    <Auxiliary>
                                                        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                            <div className="gx-mr-3">
                                                                <i className={`icon icon-map-street-view gx-fs-xlxl gx-text-orange`}/>
                                                            </div>
                                                            <div className="gx-media-body">
                                                                <h6 className="gx-mb-1 gx-text-grey">City</h6>
                                                                <p className="gx-mb-0">{city}</p>
                                                            </div>
                                                        </div>
                                                    </Auxiliary>
                                                </Col>

                                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                    <Auxiliary>
                                                        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                            <div className="gx-mr-3">
                                                                <i className={`icon icon-navigation gx-fs-xlxl gx-text-orange`}/>
                                                            </div>
                                                            <div className="gx-media-body">
                                                                <h6 className="gx-mb-1 gx-text-grey">Postal Code</h6>
                                                                <p className="gx-mb-0">{postalCode}</p>
                                                            </div>
                                                        </div>
                                                    </Auxiliary>
                                                </Col>
                                            </Row>
                                        </div>
                                    </TabPane>

                                    <TabPane tab="Developer" key="3">
                                        <div className="gx-mb-2">
                                            <Row>
                                                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                    <Auxiliary>
                                                        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                            <div className="gx-mr-3">
                                                                <i className={`icon icon-company gx-fs-xlxl gx-text-orange`}/>
                                                            </div>
                                                            <div className="gx-media-body">
                                                                <h6 className="gx-mb-1 gx-text-grey">Merchant Code</h6>
                                                                <p className="gx-mb-0">{merchant.merchantCode}</p>
                                                            </div>
                                                        </div>
                                                        {/*<div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">*/}
                                                        {/*    <div className="gx-mr-3">*/}
                                                        {/*        <i className={`icon icon-components gx-fs-xlxl gx-text-orange`}/>*/}
                                                        {/*    </div>*/}
                                                        {/*    <div className="gx-media-body">*/}
                                                        {/*        <h6 className="gx-mb-1 gx-text-grey">Sandbox Environment</h6>*/}
                                                        {/*        <p className="gx-mb-0">{merchant.sandboxStatus == -1 ? 'Active' : 'Inactive'}</p>*/}
                                                        {/*    </div>*/}
                                                        {/*    {merchant.sandboxStatus == 0 ? <Button type="primary" onClick={this.activateSandbox}>Activate Sandbox</Button> : ''}*/}
                                                        {/*</div>*/}
                                                        <ReCaptcha
                                                            ref={(el) => {this.captchaSandbox = el;}}
                                                            size="invisible"
                                                            render="explicit"
                                                            sitekey="6Lcfq60UAAAAANDAWaDUURGc5_Ha_8lZU5MW3gu0"
                                                            onloadCallback={this.onLoadRecaptcha}
                                                            verifyCallback={this.verifyCallback}
                                                        />
                                                    </Auxiliary>
                                                </Col>

                                                {merchant.sandboxStatus == -1 ?
                                                    <div>
                                                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                            <Auxiliary>
                                                                <div
                                                                    className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                                    <div className="gx-mr-3">
                                                                        <i className={`icon icon-link gx-fs-xlxl gx-text-orange`}/>
                                                                    </div>
                                                                    <div className="gx-media-body">
                                                                        <h6 className="gx-mb-1 gx-text-grey">Sandbox
                                                                            URL</h6>
                                                                        <p className="gx-mb-0"><a
                                                                            href={window.sandboxURL}>{window.sandboxURL}</a>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Auxiliary>
                                                        </Col>


                                                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                            <Auxiliary>
                                                                <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                                    <div className="gx-mr-3">
                                                                        <i className={`icon icon-user-o gx-fs-xlxl gx-text-orange`}/>
                                                                    </div>
                                                                    <div className="gx-media-body">
                                                                        <h6 className="gx-mb-1 gx-text-grey">Username</h6>
                                                                        <p className="gx-mb-0">{email}</p>
                                                                    </div>
                                                                </div>
                                                            </Auxiliary>
                                                        </Col>

                                                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                                            <Auxiliary>
                                                                <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
                                                                    <div className="gx-mr-3">
                                                                        <i className={`icon icon-forgot-password gx-fs-xlxl gx-text-orange`}/>
                                                                    </div>
                                                                    <div className="gx-media-body">
                                                                        <h6 className="gx-mb-1 gx-text-grey">Default Password</h6>
                                                                        <p className="gx-mb-0">password</p>
                                                                    </div>
                                                                </div>
                                                            </Auxiliary>
                                                        </Col>
                                                    </div>
                                                    : ''}
                                            </Row>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </Widget>
                        </Col>

                        <Col xl={8} lg={10} md={10} sm={24} xs={24}>
                            <Widget title="Contact" styleName="gx-card-profile-sm">
                                <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
                                    <div className="gx-mr-3">
                                        <i className={`icon icon-user gx-fs-xxl gx-text-grey`}/>
                                    </div>
                                    <div className="gx-media-body">
                                        <span className="gx-mb-0 gx-text-grey gx-fs-sm">Name</span>
                                        <p className="gx-mb-0">{name}</p>
                                    </div>
                                </div>

                                <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
                                    <div className="gx-mr-3">
                                        <i className={`icon icon-email gx-fs-xxl gx-text-grey`}/>
                                    </div>
                                    <div className="gx-media-body">
                                        <span className="gx-mb-0 gx-text-grey gx-fs-sm">Email</span>
                                        <p className="gx-mb-0">{email}</p>
                                    </div>
                                </div>
                                <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
                                    <div className="gx-mr-3">
                                        <i className={`icon icon-phone gx-fs-xxl gx-text-grey`}/>
                                    </div>
                                    <div className="gx-media-body">
                                        <span className="gx-mb-0 gx-text-grey gx-fs-sm">Phone Number</span>
                                        <p className="gx-mb-0">{phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
                                    <div className="gx-mr-3">
                                        <i className={`icon icon-link gx-fs-xxl gx-text-grey`}/>
                                    </div>
                                    <div className="gx-media-body">
                                        <span className="gx-mb-0 gx-text-grey gx-fs-sm">Web Page</span>
                                        <p className="gx-mb-0">{website}</p>
                                    </div>
                                </div>
                            </Widget>
                        </Col>
                    </Row>
                </div>
                <SweetAlert success={msgType ==='success' ? true : false} danger={msgType ==='danger' ? true : false}
                            show={msgShow} title={msgContent} onConfirm={this.onConfirm}>
                </SweetAlert>
            </Auxiliary>
        );
    }
}

const mapStateToProps = ({auth, merchantState}) => {
    const {authUser} = auth;
    const {merchant, currency, loader, alertMessage, showMessage, activeSuccess, activeFailed} = merchantState
    return {authUser, merchant, currency, loader, alertMessage, showMessage, activeSuccess, activeFailed}
};
export default connect(mapStateToProps, {viewMerchant, getCurrency, activateSandbox, resetStatus})(Profile);


