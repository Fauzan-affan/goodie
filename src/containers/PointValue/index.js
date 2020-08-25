import React from "react";
import {Card, Col, Row} from "antd";


class Point extends React.Component{
    constructor(){
        super();
        this.searchPoint = this.searchPoint.bind(this);
        this.insertPoint = this.insertPoint.bind(this);
    }

    searchPoint() {
        this.props.history.push('/point/search');
    }

    insertPoint(){
        this.props.history.push('/point/create');
    }

    render() {
        return (
            <Row>
                {/*<Col span={24}>*/}
                {/*<ContainerHeader title='User'/>*/}
                {/*</Col>*/}

                <Col span={24}>
                    <Card>
                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
                                    {/*<Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>*/}
                                    <div className='gx-package custom-package' onClick={this.searchPoint} >
                                        <img src={require('assets/images/Point-Value/list.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-pointvalue'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Point Value List</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Review and edit your point value here
                                            </p>
                                        </div>
                                    </div>
                                    {/*</Col>*/}
                                </Col>

                            </Row>
                        </div>

                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
                                    <Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>
                                        <div className='gx-package custom-package' onClick={this.insertPoint} >
                                            <img src={require('assets/images/Point-Value/create.png')}
                                                 alt="Avatar"></img>
                                            <div className='gx-package-header custom-package-header custom-pointvalue'>
                                                <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Create Point Value</h2>
                                                <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                    Create point value based on your need
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

export default Point;

