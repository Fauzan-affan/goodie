import React from "react";
import {Card, Col, Row} from "antd";


class Promotion extends React.Component{
    constructor(){
        super();
        this.searchPromotion = this.searchPromotion.bind(this);
        this.insertLifetimePromotion = this.insertLifetimePromotion.bind(this);
        this.insertPeriodPromotion = this.insertPeriodPromotion.bind(this);
        this.insertDatePromotion = this.insertDatePromotion.bind(this);
    }

    searchPromotion() {
        this.props.history.push('/promotion/search');
    }

    insertLifetimePromotion(){
        this.props.history.push('/promotion/create/lifetime');
    }

    insertPeriodPromotion(){
        this.props.history.push('/promotion/create/period');
    }

    insertDatePromotion(){
        this.props.history.push('/promotion/create/date');
    }

    render() {
        return (
            <Row>

                <Col span={24}>
                    <Card>
                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
                                    <div className='gx-package custom-package' onClick={this.searchPromotion} >
                                        <img src={require('assets/images/Promotion/search.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-promotion'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Promotion List</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Review and edit your existing point promotion
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                        </div>

                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.insertLifetimePromotion} >
                                        <img src={require('assets/images/Promotion/noexp.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-promotion'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Lifetime</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create promotion that will generate point without expiry date
                                            </p>
                                        </div>
                                    </div>
                                </Col>


                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.insertPeriodPromotion} >
                                        <img src={require('assets/images/Promotion/period.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-promotion'>
                                            <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Period</h5>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create promotion that will generate point with expiry period
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.insertDatePromotion} >
                                        <img src={require('assets/images/Promotion/expdate.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-promotion'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Set The Date</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create promotion that will generate point with expiry date
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

export default Promotion;

