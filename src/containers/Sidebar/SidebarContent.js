import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu, Icon} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
// import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";

import {
    menuMerchant
} from "appRedux/actions/Menu";

import {
    viewMerchant
} from "appRedux/actions/Merchant";

class SidebarContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            merchant: [],
        };

    }

    reload = () => {
        this.componentDidMount();
    }


    componentDidMount() {
        let credential = this.props.authUser;

        if (this.props.menuList.length < 1) {
            let request = {
                authToken: localStorage.getItem('a'),
                deviceId: localStorage.getItem('d'),
                userId: localStorage.getItem('u'),
                merchantId: localStorage.getItem('mt'),
            };

            this.props.menuMerchant(request);
        }

        this.props.viewMerchant(credential);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.menuList !== this.props.menuList) {
            this.setState({
                menuList: nextProps.menuList
            })
        }

        if (nextProps.merchant !== undefined && nextProps.merchant !== this.props.merchant) {
            let request = {
                authToken: localStorage.getItem('a'),
                deviceId: localStorage.getItem('d'),
                userId: localStorage.getItem('u'),
                merchantId: localStorage.getItem('mt'),
            };
            this.props.menuMerchant(request);
        }
    }

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    const {themeType, navStyle, pathname, menuList,} = this.props;
    const menu = pathname.split('/');
    const selectedKeys = menu[1];
    const defaultOpenKeys = selectedKeys.split('/')[1];

    return (<Auxiliary>

        <SidebarLogo/>
        <div className="gx-sidebar-content">
          <div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>
            <UserProfile/>
            {/*<AppsNavigation/>*/}
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              // selectedKeys={[this.props.location.pathname]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">

                {
                menuList.map((item) => (

                    <Menu.Item key={item.name.toLowerCase()}>
                            <Link to={item.url}>
                                {item.isImage!=1
                                    ?(<i className={item.icon}/>)
                                    :(<img style={{maxWidth: "20px", marginRight: "20px"}} src={require('assets/'+item.icon)} alt="Avatar"></img>)
                                }
                                <IntlMessages id={item.name}/>
                            </Link>
                        </Menu.Item>

                    )
                )}


                {/*<Menu.Item key="reconciliation">*/}
                {/*    <Link to="/reconciliation"><img style={{maxWidth: "20px", marginRight: "20px"}} src={require('assets/images/Recon_Icon.svg')}*/}
                {/*                              alt="Avatar"></img>*/}
                {/*        <IntlMessages id="sidebar.reconciliation"/></Link>*/}
                {/*</Menu.Item>*/}

                {/*<Menu.Item key="dashboard">*/}
                {/*    <Link to="/dashboard"><i className="icon icon-dasbhoard"/>*/}
                {/*        <IntlMessages id="sidebar.dashboard"/></Link>*/}
                {/*</Menu.Item>*/}



                {/*<Menu.Item key="deposit">*/}
                {/*    <Link to="/deposit"><i className="icon icon-revenue-new"/>*/}
                {/*        <IntlMessages id="sidebar.deposit"></IntlMessages>*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}

                {/*<Menu.Item key="user">*/}
                {/*    <Link to="/user">*/}
                {/*        <i className="icon icon-user"/>*/}
                {/*        <IntlMessages id="sidebar.user"/>*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}

                {/*<Menu.Item key="advertising">*/}
                {/*    <Link to="/advertising">*/}
                {/*        <i className="icon icon-message"/>*/}
                {/*        /!*<Icon type="share-alt" />*!/*/}
                {/*        <IntlMessages id="sidebar.advertising"/>*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}

                {/*<Menu.Item key="gamification">*/}
                {/*   <Link to="/gamification">*/}
                {/*       <i className="icon icon-family"/>*/}
                {/*       /!*<Icon type="share-alt" />*!/*/}
                {/*       <IntlMessages id="sidebar.gamification"/>*/}
                {/*   </Link>*/}
                {/*</Menu.Item>*/}

                {/*<Menu.Item key="blast">*/}
                {/*    <Link to="/blast">*/}
                {/*        <i className="icon icon-sent"/>*/}
                {/*        <IntlMessages id="sidebar.blast"/>*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}

                {/*<Menu.Item key="point">*/}
                {/*    <Link to="/point">*/}
                {/*        <Icon type="money-collect" className={`icon icon-money-collect`} />*/}
                {/*        <IntlMessages id="sidebar.point"/>*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}


                {/*<Menu.Item key="doorprize">*/}
                {/*    <Link to="/doorprize">*/}
                {/*        <i className="icon icon-inbuilt-apps"/>*/}
                {/*        <IntlMessages id="sidebar.doorprize"/>*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}

                {/*<Menu.Item key="member">*/}
                {/*    <Link to="/member">*/}
                {/*        <i className="icon icon-profile"/>*/}
                {/*        <IntlMessages id="sidebar.member"/>*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}

                {/*<Menu.Item key="billing">*/}
                {/*    <Link to="/billing">*/}
                {/*        <Icon type="dollar" className={`icon icon-dollar`} />*/}
                {/*        <IntlMessages id="sidebar.billing"/>*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}

                {/*<Menu.Item key="tier">*/}
                {/*    <Link to="/tier">*/}
                {/*        <i className="icon icon-star"/>*/}
                {/*        <IntlMessages id="sidebar.tier"/>*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}

                {/*<Menu.Item key="rules">*/}
                {/*    <Link to="/rules">*/}
                {/*        <i className="icon icon-orders"/>*/}
                {/*        <IntlMessages id="sidebar.rules"/>*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}

                {/*<Menu.Item key="promotion">*/}
                {/*    <Link to="/promotion">*/}
                {/*        <i className="icon icon-megaphone"/>*/}
                {/*        <IntlMessages id="sidebar.promotion"/>*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}

                {/*<Menu.Item key="product">*/}
                {/*    <Link to="/product">*/}
                {/*        <Icon type="shopping" className={`icon icon-shopping`} />*/}
                {/*        <IntlMessages id="sidebar.product"/>*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}

                {/*<Menu.Item key="reward">*/}
                {/*    <Link to="/reward">*/}
                {/*        <i className="icon icon-tasks"/>*/}
                {/*        <IntlMessages id="sidebar.reward"/>*/}
                {/*    </Link>*/}
                {/*</Menu.Item>*/}

                {/* <Menu.Item key="store">
                    <Link to="/store">
                        <i className="icon icon-timeline-with-icons"/>
                        <IntlMessages id="Store"/>
                    </Link>
                </Menu.Item> */}

                {/* <Menu.Item key="crud">
                  <Link to="/crud">
                      <i className="icon icon-tasks"/>
                      <IntlMessages id="Crud"/>
                  </Link>
                </Menu.Item>

                <Menu.Item key="crudcontent">
                  <Link to="/crud_content">
                      <i className="icon icon-tasks"/>
                      <IntlMessages id="Crud Content"/>
                  </Link>
                </Menu.Item> */}

            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings, merchantState, menuState}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  const  {menuList, loader, alertMessage, showMessage} = menuState;
    const {merchant} = merchantState;
  return {navStyle, themeType, locale, pathname, menuList, loader, alertMessage, showMessage, merchant}
};
export default connect(mapStateToProps, {menuMerchant, viewMerchant})(SidebarContent);

