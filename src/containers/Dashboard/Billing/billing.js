import React from "react";
import Widget from "components/Widget/index";
import {Button, Col, Row} from "antd";

class BillingDashboard extends React.Component {


    render(){
        return (
            <Widget>
                <h2 className="h4 gx-mb-3">Billing May 2019</h2>
                <Row>
                    <Col lg={20} md={20} sm={16} xs={16}>

                        <div style={{textAlign:"center", marginTop:"20px"}}>
                            <h2 className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">$179,626</h2>
                            <p style={{marginTop:"20px"}}>Due date 20 May 2019</p>
                        </div>

                    </Col>
                    <Col lg={4} md={4} sm={8} xs={8}>
                        <div>
                            <Button type="primary" icon="edit" onClick={this.editProfile}>Print</Button>
                        </div>
                    </Col>
                </Row>
            </Widget>
        )

    }

}

export default BillingDashboard;