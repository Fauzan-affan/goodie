import React from "react";
import {Card, Col, Row} from "antd";


class Doorprize extends React.Component{
    constructor(){
        super();
        this.searchDoorprize = this.searchDoorprize.bind(this);
        this.insertDoorprize = this.insertDoorprize.bind(this);
    }

    searchDoorprize() {
        this.props.history.push('/doorprize/search');
    }

    insertDoorprize(){
        this.props.history.push('/doorprize/create');
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
                                        <div className='gx-package custom-package' onClick={this.searchDoorprize} >
                                            <img src={require('assets/images/Doorprize/List.png')}
                                                 alt="Avatar"></img>
                                            <div className='gx-package-header custom-package-header custom-doorprize'>
                                                <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Doorprize List</h2>
                                                <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                    Manage all your doorprize program
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
                                        <div className='gx-package custom-package' onClick={this.insertDoorprize} >
                                            <img src={require('assets/images/Doorprize/Create.png')}
                                                 alt="Avatar"></img>
                                            <div className='gx-package-header custom-package-header custom-doorprize'>
                                                <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Create Doorprize</h2>
                                                <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                    Create a Doorprize for distribution to customer loyalty
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

export default Doorprize;

