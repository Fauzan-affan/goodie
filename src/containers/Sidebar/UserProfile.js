import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {userSignOut} from "appRedux/actions/Auth";
import {withRouter} from "react-router-dom";

class UserProfile extends Component {

    goToProfile = () =>{
        this.props.history.push('/merchant/profile');
    }

    changePassword = () =>{
        this.props.history.push('/user/change-password');
    }


    render() {
        const {authUser} = this.props;

        const userMenuOptions = (
            <ul className="gx-user-popover">
                <li onClick={() => this.goToProfile()}>My Account</li>
                <li onClick={() => this.changePassword()}>Change Password</li>
                <li onClick={() => this.props.userSignOut()}>Logout
                </li>
            </ul>
        );

        return (

            <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
                <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
                    <Avatar src={authUser.userPic}
                            className="gx-size-40 gx-pointer gx-mr-3" alt=""/>
                    <span className="gx-avatar-name">{authUser.merchantName}<i
                        className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/></span>
                </Popover>
            </div>

        )

    }
}

const mapStateToProps = ({auth}) => {
    const {authUser} = auth;
    return {authUser}
};

export default withRouter(connect(mapStateToProps, {userSignOut})(UserProfile));
