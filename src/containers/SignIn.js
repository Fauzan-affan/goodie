import React from "react";
import {Button, Checkbox, Form, Icon, Input, message} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {
    userSignIn,
    hideMessage
} from "appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";

const FormItem = Form.Item;

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMessage : false,
            alertMessage : ''
        };
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // this.props.showLoader();
                this.props.userSignIn(values);
            }
        });
    };

    componentWillMount() {
        this.setState({
            showMessage : this.props.showMessage,
            alertMessage : this.props.alertMessage
        })

        this.props.hideMessage();
    }

    goToForgotPassword(){
        this.props.history.push('/user/forgot-password');
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            showMessage : nextProps.showMessage,
            alertMessage : nextProps.alertMessage
        })


        if (nextProps.showMessage) {
            this.props.hideMessage();
            // setTimeout(() => {
            //     this.props.hideMessage();
            // }, 100);
        }

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {loader} = this.props;
        const {showMessage, alertMessage} = this.state;
        return (
            <div className="gx-app-login-wrap custom-background">
                <div className="gx-app-login-container">
                    <div className="gx-app-login-main-content">
                        <div className="gx-app-logo-content">
                            <div className="custom-login-message">
                                <h5>Hey, good to see you again !</h5>
                            </div>
                            <div>
                                <img src={require('assets/images/Login/style1.png')} alt='Neature'/>
                            </div>
                        </div>
                        <div className="gx-app-login-content">
                            <div className="custom-login-header">
                                {/*<div className="custom-login-logo">*/}
                                {/*    <i className={`icon icon-avatar gx-fs-icon-lg`}/>*/}
                                {/*</div>*/}
                                <h2 className="background"><span><i className={`icon icon-avatar custom-icon-lg`}/></span></h2>
                            </div>

                            <Form onSubmit={this.handleSubmit} className="gx-signin-form gx-form-row0">

                                <FormItem>
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: 'Username is required!'}],
                                    })(<Input placeholder="Email"/>)}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Password!'}],
                                    })(
                                        <Input type="password" placeholder="Password"/>
                                    )}
                                </FormItem>
                                {/*<FormItem>*/}
                                {/*    {getFieldDecorator('remember', {*/}
                                {/*        valuePropName: 'checked',*/}
                                {/*        initialValue: true,*/}
                                {/*    })(*/}
                                {/*        <Checkbox><IntlMessages id="appModule.iAccept"/></Checkbox>*/}
                                {/*    )}*/}
                                {/*    <span className="gx-signup-form-forgot gx-link"><IntlMessages*/}
                                {/*        id="appModule.termAndCondition"/></span>*/}
                                {/*</FormItem>*/}
                                <FormItem>
                                    <Button type="primary" className="gx-mb-0 custom-login-button" htmlType="submit">
                                        <IntlMessages id="app.userAuth.login"/>
                                    </Button>
                                    {/*<span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signup"><IntlMessages*/}
                                    {/*id="app.userAuth.signUp"/></Link>*/}
                                </FormItem>
                                {/*<div className="gx-flex-row gx-justify-content-between">*/}
                                {/*    <span>or connect with</span>*/}

                                {/*</div>*/}
                                {/*<span*/}
                                {/*    className="gx-text-light gx-fs-sm"> demo username: 'admininka' and password: '123456'</span>*/}
                            </Form>
                            <div className="forgot-container">
                                <a onClick={this.goToForgotPassword.bind(this)}>Forgot password</a>
                            </div>
                            <div className="login-footer">
                                <img style={{width:'40%'}} alt="example" src={require("assets/images/logo.png")}/>
                                <div className="copyright">
                                    copyright &#9400; 2019
                                </div>
                            </div>
                        </div>

                        {loader ?
                            <div className="gx-loader-view">
                                <CircularProgress/>
                            </div> : null}
                        {showMessage ?
                            message.error(alertMessage) : null}
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(SignIn);

const mapStateToProps = ({auth}) => {
    const {loader, authUser, showMessage, alertMessage} = auth;
    return {loader, alertMessage, showMessage, authUser};
};

export default connect(mapStateToProps, {
    userSignIn,
    hideMessage
    // showLoader
})(WrappedNormalLoginForm);

