import React from "react";
import {Card, Col, Form, message, Row} from "antd";
import CircularProgress from "components/CircularProgress/index";
import connect from "react-redux/es/connect/connect";

import {
    searchTiers
} from "appRedux/actions/Tier";

class Tier extends React.Component{
    constructor(){
        super();
        this.searchTier = this.searchTier.bind(this);
        this.insertTier = this.insertTier.bind(this);
    }

    searchTier() {
        this.props.history.push('/tier/search');
    }

    insertTier(){
        this.props.history.push('/tier/create');
    }

    componentWillMount(){
        let credential = this.props.authUser;
        this.props.searchTiers(credential);
    }

    render() {
        let {listTiers,loader, alertMessage, showMessage} = this.props;

        var showCreate = 0;
        if(listTiers.length > 0){
            showCreate = 1;
        }

        return (
            <Row>
                {/*<Col span={24}>*/}
                    {/*<ContainerHeader title='Tier'/>*/}
                {/*</Col>*/}

                <Col span={24}>
                    <Card>
                        <div>
                            {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                            {showMessage ? message.error(alertMessage.toString()) : null}
                        </div>
                        {loader === false && showCreate > 0 ?
                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
                                    <div className='gx-package custom-package' onClick={this.searchTier} >
                                        <img src={require('assets/images/Member/search.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-tier-big gx-text-white'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Tier Administration</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Review and edit your membership classification
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                            : ''}

                        {loader === false && showCreate < 1 ?
                            <div className="gx-price-tables gx-pt-default">
                                <Row>
                                    <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
                                        <div className='gx-package custom-package' onClick={this.insertTier} >
                                            <img src={require('assets/images/Member/create.png')}
                                                 alt="Avatar"></img>
                                            <div className='gx-package-header custom-package-header custom-tier-small gx-text-white'>
                                                <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Create Tier</h2>
                                                <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                    Create your membership classification to activate your point rules
                                                </p>
                                            </div>
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        : ''}
                    </Card>
                </Col>

            </Row>
        );
    }

}

const mapStateToProps = ({auth, tierState}) => {
    const {authUser} = auth;
    const {listTiers, loader, showMessage, alertMessage} = tierState
    return {authUser, listTiers, loader, showMessage, alertMessage}
};

export default connect(mapStateToProps, {searchTiers})(Form.create()(Tier));

