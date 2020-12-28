import React, {Component} from "react";
import {connect} from "react-redux";
import URLSearchParams from 'url-search-params'
import {Redirect, Route, Switch} from "react-router-dom";
import {ConfigProvider } from "antd";
import {IntlProvider} from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../../containers/SignIn/NewSignIn.js";
import SignUp from "../SignUp";
import CustomContent from "../CustomContent/customcontent";
import MerchantVerification from "../Merchant/verification";
import UserForgotPassword from "../User/forgotpassword";
import UserResetPassword from "../User/resetpassword"

import {setInitUrl} from "appRedux/actions/Auth";
import {onLayoutTypeChange, onNavStyleChange, setThemeType} from "appRedux/actions/Setting";
import { loadReCaptcha } from 'react-recaptcha-google'

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_TYPE_DARK
} from "../../constants/ThemeSetting";

const RestrictedRoute = ({component: Component, authUser, ...rest}) =>
    <Route
        {...rest}
        render={props =>
            authUser.authToken !== null
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/signin',
                        state: {from: props.location}
                    }}
                />}Compnat
    />;


class App extends Component {
    constructor(props){
        super(props);

        this.state={
            initUrl : ''
        }

    }

  setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };

  setNavStyle = (navStyle) => {
    if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER) {
      document.body.classList.add('full-scroll');
      document.body.classList.add('horizontal-layout');
    } else {
      document.body.classList.remove('full-scroll');
      document.body.classList.remove('horizontal-layout');
    }
  };

  componentWillMount() {
      const params = new URLSearchParams(this.props.location.search);

    if (params.has("theme")) {
      this.props.setThemeType(params.get('theme'));
    }
    if (params.has("nav-style")) {
      this.props.onNavStyleChange(params.get('nav-style'));
    }
    if (params.has("layout-type")) {
      this.props.onLayoutTypeChange(params.get('layout-type'));
    }
  }

  componentWillReceiveProps(nextProps){
      if(this.props.initURL !== nextProps.initURL){
          this.setState({
              initUrl : nextProps.initURL
          })
      }
  }

    componentDidMount() {
        loadReCaptcha();
    }


    render() {
        const {match, location, layoutType, navStyle, locale, authUser} = this.props;

        if (this.state.initUrl !== '') {
            this.props.setInitUrl('');
            return ( <Redirect to={this.state.initUrl}/> );
        }

        if (location.pathname === '/') {
            return ( <Redirect to={'/dashboard'}/> );
        }
            // else if (
        //     location.pathname === '/'){
        //     return  ( <Redirect to={'/member'}/>);
        // }

        // if (location.pathname !== '/signin') {
        //     if (authUser.authToken === null || authUser.authToken === undefined) {
        //         return (<Redirect to={'/signin'}/>);
        //     }
        // }

        // if (location.pathname === '/') {
        //     if (initURL === '' || initURL === '/' || initURL === '/signin') {
        //         return ( <Redirect to={'/dashboard'}/> );
        //     } else {
        //         return ( <Redirect to={initURL}/> );
        //     }
        // }

        this.setLayoutType(layoutType);

        this.setNavStyle(navStyle);

        const currentAppLocale = AppLocale[locale.locale];
        return (
            <ConfigProvider  locale={currentAppLocale.antd}>
                <IntlProvider
                    locale={currentAppLocale.locale}
                    messages={currentAppLocale.messages}
                    onError={() => ""}
                >

                    <Switch>
                        <Route exact path='/signin' component={SignIn}/>
                        <Route exact path='/signup' component={SignUp}/>
                        <Route exact path='/custom_content' component={CustomContent}/>
                        <Route exact path='/merchant/verification/:merchantId/:userId/:code' component={MerchantVerification}/>
                        <Route exact path='/user/forgot-password' component={UserForgotPassword}/>
                        <Route exact path='/user/reset-password/:userId/:merchantId/:code' component={UserResetPassword}/>
                        {/* <Route exact path='/user/change-password' component={UserChangePassword}/> */}
                        <RestrictedRoute path={`${match.url}`} authUser={authUser}
                                         component={MainApp}/>
                    </Switch>
                </IntlProvider>
            </ConfigProvider >
        )
    }
}

const mapStateToProps = ({settings, auth, common}) => {
  const {locale, navStyle, themeType, layoutType} = settings;
    const {authUser, initURL} = auth;
  return {locale, navStyle, themeType, layoutType, authUser, initURL}
};
export default connect(mapStateToProps, {setThemeType, onNavStyleChange, onLayoutTypeChange, setInitUrl})(App);
