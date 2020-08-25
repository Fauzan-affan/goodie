import React from "react";
import {Card, Col, Row} from "antd";


class Advertising extends React.Component{
    constructor(){
        super();
        this.searchAdvertising = this.searchAdvertising.bind(this);
        this.insertSplashscreenAdvertising = this.insertSplashscreenAdvertising.bind(this);
        this.insertBannerhomeAdvertising = this.insertBannerhomeAdvertising.bind(this);
        this.insertIntroductionAdvertising = this.insertIntroductionAdvertising.bind(this);
        this.insertPopupAdvertising = this.insertPopupAdvertising.bind(this);
    }

    searchAdvertising() {
        this.props.history.push('/advertising/search');
    }

    insertSplashscreenAdvertising(){
        this.props.history.push('/advertising/create/splashscreen');
    }

    insertBannerhomeAdvertising(){
        this.props.history.push('/advertising/create/bannerhome');
    }

    insertIntroductionAdvertising(){
        this.props.history.push('/advertising/create/introduction');
    }

    insertPopupAdvertising(){
        this.props.history.push('/advertising/create/popup');
    }

    render() {
        return (
            <Row>

                <Col span={24}>
                    <Card>
                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
                                    <div className='gx-package custom-package' onClick={this.searchAdvertising} >
                                        <img src={require('assets/images/Advertising/Ads.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-advertising'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Advertising List</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Review and edit your advertising content
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                        </div>

                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={6} lg={24} md={6} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.insertSplashscreenAdvertising} >
                                        <img src={require('assets/images/Advertising/SScreen.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-advertising'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Splash Screen</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create new splash screen on every time a running Android app
                                            </p>
                                        </div>
                                    </div>
                                </Col>


                                <Col xl={6} lg={24} md={6} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.insertBannerhomeAdvertising} >
                                        <img src={require('assets/images/Advertising/BHome.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-advertising'>
                                            <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Banner Home</h5>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create new banner home become one of the promoted media tools
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                                <Col xl={6} lg={24} md={6} xs={24}>
                                <div className='gx-package custom-package' onClick={this.insertIntroductionAdvertising} >
                                    <img src={require('assets/images/Advertising/Int.png')}
                                         alt="Avatar"></img>
                                    <div className='gx-package-header custom-package-header custom-advertising'>
                                        <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Introduction</h2>
                                        <p className="custom-menu-body gx-mb-0 custom-package-body">
                                            Create new introduction for detail information that will be show as announcements
                                        </p>
                                    </div>
                                </div>
                            </Col>

                                <Col xl={6} lg={24} md={6} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.insertPopupAdvertising} >
                                        <img src={require('assets/images/Advertising/Pup.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-advertising'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Pop Up</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create new pop up to reminder about new notification
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                    </Card>
                </Col>

            </Row>
        );
    }

}

export default Advertising;

