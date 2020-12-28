import React from "react";
import {Card, Col, Row} from "antd";

class Program extends React.Component{
    constructor(){
        super();
        this.searchReward = this.searchReward.bind(this);
        this.insertInternalReward = this.insertInternalReward.bind(this);
        this.insertExternalReward = this.insertExternalReward.bind(this);
    }

    searchReward() {
        this.props.history.push('/reward/search');
    }

    insertInternalReward(){
        this.props.history.push('/reward/create/internal');
    }

    insertExternalReward(){
        this.props.history.push('/reward/marketplace');
    }

    render() {
        return (
            <Row>
                {/*<Col span={24}>*/}
                {/*<ContainerHeader title='Program'/>*/}
                {/*</Col>*/}

                <Col span={24}>
                    <Card>
                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
                                    <div className='gx-package custom-package' onClick={this.searchReward} >
                                        <img src={require('assets/images/Program/search.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-program-big'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Reward List</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Review and edit your reward programs here.
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                        </div>

                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
                                    <Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>
                                        <div className='gx-package custom-package' onClick={this.insertInternalReward} >
                                            <img src={require('assets/images/Program/own.png')}
                                                 alt="Avatar"></img>
                                            <div className='gx-package-header custom-package-header custom-program-big'>
                                                <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Own Product</h2>
                                                <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                    Create your reward program with your own product
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Col>


                                <Col xl={12} lg={24} md={12} xs={24}>
                                    <Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>
                                        <div className='gx-package custom-package' onClick={this.insertExternalReward} >
                                            <img src={require('assets/images/Program/collab.png')}
                                                 alt="Avatar"></img>
                                            <div className='gx-package-header custom-package-header custom-program-big'>
                                                <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Collaboration</h5>
                                                <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                    Create your reward program with our merchant's products.
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Col>

                            </Row>
                        </div>
                    </Card>
                </Col>

            </Row>
        );
    }

}

export default Program;

