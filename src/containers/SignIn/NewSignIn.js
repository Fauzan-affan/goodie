import React from "react";
import {Button, Form, Input, message} from "antd";
import {connect} from "react-redux";

import {
    userSignIn,
    hideMessage
} from "appRedux/actions/Auth";

import IntlMessages from "util/IntlMessages";

import styles from "./SignIn.module.css";
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
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {loader} = this.props;
        const {showMessage, alertMessage} = this.state;
        return (
            <div className="gx-app-login-wrap">
                <div className={styles.container}>
                    <div className={styles.content}>
                    <div className={styles.left}>
                        <img src="/login.png" alt=""/>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.welcome}>
                            <p>
                                Hello, 
                                <br/>
                                Welcome Back
                            </p>
                        </div>
                        <div className={styles.form_container}>
                            <Form onSubmit={this.handleSubmit} className={styles.form}>
                                <FormItem>
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: 'Username is required!'}],
                                    })(<Input placeholder="Email" className={styles.input}/>)}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Password!'}],
                                    })(
                                        <Input type="password" placeholder="Password" className={styles.input}/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" className={styles.button} htmlType="submit">
                                        <IntlMessages id="app.userAuth.login"/>
                                    </Button>
                                </FormItem>
                            </Form>
                            <nav className={styles.forgot_passowrd}>
                                <a onClick={this.goToForgotPassword.bind(this)}>Forgot Password</a>
                            </nav>
                        </div>
                        <div className={styles.logo}>
                            <img src="/logo.png" alt="logo goodie" />
                        </div>
                    </div>

                            {
                                loader ?
                                    <div className={styles.loaderView}>
                                        <CircularProgress/>
                                    </div> : null
                            }
                            
                            {
                                showMessage ?
                                    message.error(alertMessage) : null
                            }
                </div>
                
                <div className={styles.footer}>
                                <p>&copy; 2018 - {new Date().getFullYear()}, <a href="https://goodie.id">Goodie.ID</a></p>
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

