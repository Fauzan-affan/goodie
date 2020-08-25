import React from "react";
import {connect} from "react-redux";
import {
    verificationForgotPassword,
} from "appRedux/actions/Merchant";
import CircularProgress from "components/CircularProgress/index";
// import IntlMessages from "util/IntlMessages";
import {Button, Form, Input, Icon, message} from "antd";
import {NotificationContainer, NotificationManager} from "react-notifications";
import SweetAlert from "react-bootstrap-sweetalert";

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {xs: 24, sm: 12},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};

class UserResetPassword extends React.Component {

    componentDidUpdate() {
        if (this.props.showMessage) {
            setTimeout(() => {
                this.props.hideMessage();
            }, 50);
        }
    }

    goToResetPassword(){
        this.props.history.push('user/resetpassword');
    }

    constructor(props) {
        super(props);

        this.state = {
            msgContent : '',
            msgType : '',
            msgShow : false
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
    }

    componentWillReceiveProps(nextProps){

        if (nextProps.updateSuccess && !nextProps.updateFailed){
            this.setState({
                msgContent : 'Reset password successfully',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.updateSuccess && nextProps.updateFailed){
            this.setState({
                msgContent : 'Reset password failed',
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

                if(values.password !== values.confirmPassword) {
                    this.errorNotification('Password is not match. Please input your correct password.');
                    error = true;
                    return;
                }

                if(!error){
                    let request = {
                        userId : this.props.match.params.userId,
                        merchantId : this.props.match.params.merchantId,
                        code : this.props.match.params.code,
                    }
                    request.password = values.password;
                    this.props.verificationForgotPassword(request);
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
        if(this.state.msgType === "success"){
            this.props.history.push('/signin');
        }else{
            this.setState({
                msgShow : false
            })
        }
    }


    render(){
        const {getFieldDecorator} = this.props.form;
        const { msgShow, msgType, msgContent, alertMessage, showMessage } = this.state;
        const {loader} = this.props;

        return (
            <div className="gx-app-login-wrap custom-background">
                <div className="gx-login-container">

                    <div className="gx-login-content">

                        <div style={{textAlign: 'center'}} className="gx-login-header">
                            <img style={{width: '40%'}} src={require("assets/images/logo-white.png")} alt="wieldy"
                                 title="wieldy"/>
                        </div>

                        <div className="gx-mb-4">
                            <h2>Reset your password</h2>
                        </div>

                            <Form onSubmit={this.handleSubmit} className="gx-changepassword-form gx-form-row0">

                                <FormItem {...formItemLayout} label=' New Password'>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your new password'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                            placeholder="Password"/>
                                    )}
                                </FormItem>

                                <FormItem {...formItemLayout} label='Confirm Password'>
                                    {getFieldDecorator('confirmPassword', {
                                        rules: [{required: true, message: 'Please input your confirm password'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                            placeholder="Confirm Password"/>
                                    )}
                                </FormItem>

                                <FormItem {...formTailLayout}>
                                    <Button type="primary" htmlType="submit">Submit</Button>
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
                    </div>
                </div>
            </div>
        )

    }

}

const WrappedResetPasswordForm = Form.create()(UserResetPassword)

const mapStateToProps = ({merchantState}) => {
    const {loader, updateSuccess, updateFailed, alertMessage, showMessage} = merchantState
    return {updateFailed, updateSuccess, alertMessage, loader, showMessage}
};
export default connect(mapStateToProps, {
    verificationForgotPassword,})(WrappedResetPasswordForm);
