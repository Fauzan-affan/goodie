import React from "react";
import {Card, Col, Row} from "antd";


class Rules extends React.Component{
    constructor(){
        super();
        this.searchRule = this.searchRule.bind(this);
        this.insertBasicRule = this.insertBasicRule.bind(this);
        this.insertReferralRule = this.insertReferralRule.bind(this);
        this.insertCustomRule = this.insertCustomRule.bind(this);
    }

    searchRule() {
        this.props.history.push('/rules/search');
    }

    insertBasicRule(){
        this.props.history.push('/rules/create/basic');
    }

    insertReferralRule(){
        this.props.history.push('/rules/create/referral');
    }

    insertCustomRule(){
        this.props.history.push('/rules/create/custom');
    }

    // searchGamificationRule = () => this.props.history.push('/rules/gamification/search');

    render() {
        return (
            <Row>
                {/*<Col span={24}>*/}
                    {/*<ContainerHeader title='Rules'/>*/}
                {/*</Col>*/}

                <Col span={24}>
                    <Card>
                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
                                    <div className='gx-package custom-package' onClick={this.searchRule} >
                                        <img src={require('assets/images/Issuing/search.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-rules'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Rule List</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Review and edit your existing point rules
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                                {/*<Col xl={12} lg={24} md={12} xs={24}>*/}
                                {/*    <div className='gx-package custom-package' onClick={this.searchGamificationRule} >*/}
                                {/*        <img src={require('assets/images/Gamification/Game.png')}*/}
                                {/*             alt="Avatar"></img>*/}
                                {/*        <div className='gx-package-header custom-package-header custom-rules'>*/}
                                {/*            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Gamification Rule List</h2>*/}
                                {/*            /!* <p className="custom-menu-body gx-mb-0 custom-package-body">*/}
                                {/*                Create custom rule based on issuing or amount*/}
                                {/*            </p> *!/*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</Col>*/}

                            </Row>
                        </div>

                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.insertBasicRule} >
                                        <img src={require('assets/images/Issuing/basic.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-rules'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Create Basic Rule</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create point rule based on your business transaction
                                            </p>
                                        </div>
                                    </div>
                                </Col>


                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.insertReferralRule} >
                                        <img src={require('assets/images/Issuing/referral.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-rules'>
                                            <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Create Referral Rule</h5>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create point rule based on your member referral
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.insertCustomRule} >
                                        <img src={require('assets/images/Issuing/custom.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-rules'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Create Custom Rule</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create custom rule based on issuing or amount
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

export default Rules;

