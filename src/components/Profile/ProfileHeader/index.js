import React from "react";
import {Avatar} from "antd";
import {Button} from "antd";

const ProfileHeader = () => {
  return (
    <div className="gx-profile-banner custom-profile-banner">
      <div className="gx-profile-container">
        <div className="gx-profile-banner-top">
          <div className="gx-profile-banner-top-left">
            <div className="gx-profile-banner-avatar">
              <Avatar className="gx-size-90" alt="..." src={'https://via.placeholder.com/150x150'}/>
            </div>
            <div className="gx-profile-banner-avatar-info">
              <h2 className="gx-mb-2 gx-mb-sm-3 gx-fs-xxl gx-font-weight-light">{this.props.data.merchantName}</h2>
              <p className="gx-mb-0 gx-fs-lg">Florida, USA</p>
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
            <Button type="primary" icon="edit">Edit Profile</Button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader;
