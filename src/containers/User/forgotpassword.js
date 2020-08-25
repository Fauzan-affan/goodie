import React from "react";
import {connect} from "react-redux";
import {
    verificationForgot,
} from "appRedux/actions/Merchant";
import { 
    forgotPassword
} from "appRedux/actions/Auth";
import CircularProgress from "components/CircularProgress/index";
import IntlMessages from "util/IntlMessages";
import {Button, Form, Input, message} from "antd";
import {NotificationContainer, NotificationManager} from "react-notifications";
import SweetAlert from "react-bootstrap-sweetalert";

const FormItem = Form.Item;

class UserForgotPassword extends React.Component {

    componentDidUpdate() {
        if (this.props.showMessage) {
            setTimeout(() => {
                this.props.hideMessage();
            }, 50);
        }
    }

    goToForgotPassword(){
        this.props.history.push('user/password/forgot');
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
                msgContent : 'Forgot password successfully, Please check your Email',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.updateSuccess && nextProps.updateFailed){
            this.setState({
                msgContent : 'Forgot password failed',
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


                if(!error){
                    let request = this.props.verificationForgot;
                    request.email = values.email;
                    this.props.verificationForgot(request);
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
                            <h2>Forgot Your Password ?</h2>
                            <p><IntlMessages id="app.userAuth.forgot"/></p>
                        </div>

                        <Form layout="vertical" onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">

                            <FormItem>
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email', message: 'The input is not valid E-mail!',
                                    }, {
                                        required: true, message: 'Please input your E-mail!',
                                    }],
                                })(
                                    <Input type="email" placeholder="Email Address"/>
                                )}
                            </FormItem>

                            <FormItem>
                                <Button type="primary" htmlType="submit">
                                    <IntlMessages id="app.userAuth.send"/>
                                </Button>
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

                    </div>
                </div>
            </div>
        )

    }

}

const WrappedForgotPasswordForm = Form.create()(UserForgotPassword)

const mapStateToProps = ({merchantState}) => {
    const {loader, updateSuccess, updateFailed, alertMessage, showMessage} = merchantState
    return {updateFailed, updateSuccess, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {
    verificationForgot, forgotPassword})(WrappedForgotPasswordForm);
