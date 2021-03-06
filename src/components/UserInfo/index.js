import React, { Component } from "react";
import { Avatar, Popover } from "antd";
import { connect } from "react-redux";
import { userSignOut } from "appRedux/actions/Auth";
import { Link } from "react-router-dom";

class UserInfo extends Component {
  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <Link
          to={"/merchant/profile"}
          style={{ color: "#545454", padding: "3px 15px" }}
        >
          My Account
        </Link>
        <li>Connections</li>
        <li onClick={() => this.props.userSignOut()}>Logout</li>
      </ul>
    );

    return (
      <Popover
        overlayClassName="gx-popover-horizantal"
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <Avatar
          src="https://via.placeholder.com/150x150"
          className="gx-avatar gx-pointer"
          alt=""
        />
      </Popover>
    );
  }
}

export default connect(null, { userSignOut })(UserInfo);
