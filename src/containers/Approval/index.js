import React from "react";
import {Card, Col, Row} from "antd";


class Approval extends React.Component{
    constructor(){
        super();
        this.searchApproval = this.searchApproval.bind(this);
    }

    searchApproval() {
        this.props.history.push('/approval/search');
    }

    render() {
        return (
            <Row>
                {/*<Col span={24}>*/}
                {/*<ContainerHeader title='Product'/>*/}
                {/*</Col>*/}

                <Col span={24}>
                    <Card>
                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
                                    <div className='gx-package custom-package' onClick={this.searchApproval} >
                                        <img src={require('assets/images/Approval/list.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-approval'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Approval List</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Manage all your approval program
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

export default Approval;

