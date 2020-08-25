import React, {Component} from "react";
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    changeUserPassword
} from "../../appRedux/actions/User"
import {Button, Card, Form, Icon, Input, message} from "antd";
// import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};

class ChangePasswordUsers extends Component {


    componentDidUpdate() {
        if (this.props.showMessage) {
            setTimeout(() => {
                this.props.hideMessage();
            }, 50);
        }
    }

    componentWillMount() {
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
    }

    goToChangePassword(){
        this.props.history.push('v2/user/password/change');
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
                msgContent : 'Change password user successfully',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.updateSuccess && nextProps.updateFailed){
            this.setState({
                msgContent : 'Change password user failed',
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
                let request = this.props.authUser;

                if(values.password !== values.confirmPassword) {
                    this.errorNotification('Password is not match. Please input your correct password.');
                    error = true;
                    return;
                }

                let formData = {
                    passwordOld: values.passwordOld,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                    description: values.description,
                };

                request.data = formData;

                if(!error){
                    this.props.changeUserPassword(request);
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

    render() {
        const {getFieldDecorator} = this.props.form;
        const { msgShow, msgType, msgContent, alertMessage, showMessage } = this.state;
        const {loader} = this.props;
        return(
            <Card className="gx-card" title='Change Password User'>
                <Form onSubmit={this.handleSubmit} className="gx-changepassword-form gx-form-row0">

                    <FormItem {...formItemLayout} label='Password Old'>
                        {getFieldDecorator('passwordOld', {
                            rules: [{required: true, message: 'Please input your old password'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="Password Old"/>
                        )}
                    </FormItem>

                    <Form.Item {...formItemLayout} label="Password" hasFeedback>
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

                    <Form.Item {...formItemLayout} label="Confirm Password" hasFeedback>
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

const WrappedChangePasswordForm = Form.create()(ChangePasswordUsers);

const mapStateToProps = ({userState, auth}) => {
    const {authUser} = auth;
    const {updateSuccess, updateFailed, updateData, alertMessage, showMessage} = userState;
    return {authUser, updateSuccess, updateFailed, updateData, alertMessage, showMessage}
};

export default connect(mapStateToProps, {
    changeUserPassword})(WrappedChangePasswordForm);


