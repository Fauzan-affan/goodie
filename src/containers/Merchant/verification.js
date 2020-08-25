import React from "react";
import {connect} from "react-redux";
import {
    verification
} from "appRedux/actions/Merchant";
import CircularProgress from "components/CircularProgress/index";
import IntlMessages from "util/IntlMessages";
import {Button} from "antd";

class MerchantVerification extends React.Component {
    // constructor(props) {
    //     super(props);
    //
    //
    // }

    componentWillMount() {
        let request = {
            merchantId : this.props.match.params.merchantId,
            userId : this.props.match.params.userId,
            code : this.props.match.params.code
        }
        this.props.verification(request);
    }

    loginPage(){
        this.props.history.push('/signin');
    }

    render(){
        let {loader, updateSuccess, updateFailed} = this.props;

        let verificationMessage = '';
        if(updateSuccess === true && updateFailed === false){
            verificationMessage =
            <div className="gx-mb-4 custom-verified-message">
                <h2>Verification Success</h2>
                <p>Your account has been activated. Now you can login to Goodie.</p>
            </div>

        }else{
            verificationMessage =
                <div className="gx-mb-4 custom-verified-message">
                    <h2>Verification Failed</h2>
                    <p>Makes sure you click the right link from our email.</p>
                </div>

        }

        return (
            <div className="gx-app-login-wrap custom-background">
                <div className="gx-login-container">
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> :

                        <div className="gx-login-content">

                            <div style={{textAlign: 'center'}} className="gx-login-header">
                                <img style={{width: '40%'}} src={require("assets/images/logo-white.png")} alt="wieldy"
                                     title="wieldy"/>
                            </div>

                            {verificationMessage}

                            {updateSuccess === true && updateFailed === false ?
                                <div>
                                    <Button onClick={this.loginPage.bind(this)} type="primary"
                                            className="gx-mb-0 custom-login-button">
                                        <IntlMessages id="app.userAuth.login"/>
                                    </Button>
                                </div>
                                : ''
                            }
                        </div>
                    }
                </div>
            </div>
        )

    }

}

const mapStateToProps = ({merchantState}) => {
    const {loader, updateSuccess, updateFailed} = merchantState
    return {updateFailed, updateSuccess, loader}
};
export default connect(mapStateToProps, {verification})(MerchantVerification);
