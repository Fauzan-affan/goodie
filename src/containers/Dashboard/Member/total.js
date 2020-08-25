import React from "react";
import {Col, Row} from "antd";
import Metrics from "components/Metrics";

import {
    summaryMemberDashboard
} from "appRedux/actions/Dashboard";
import {connect} from "react-redux";

class TotalMember extends React.Component {

    componentWillMount() {
        let credential = this.props.authUser;
        this.props.summaryMemberDashboard(credential);
    }

    render(){
        const {totalMember} = this.props;

        return (
            <Metrics title="Total Member">
                <Row>
                    <Col xl={11} lg={12} md={24} sm={12} xs={12}>
                        <h1 className="gx-mb-1 gx-revenue-title" style={{marginTop: '20px'}}>{totalMember}</h1>
                        <p className="gx-mb-md-0 gx-text-light" style={{marginTop: '20px'}}>Members</p>
                    </Col>
                </Row>
            </Metrics>
        );

    }

}

const mapStateToProps = ({auth, dashboardState}) => {
    const {authUser} = auth;
    const {totalMember, loader, alertMessage, showMessage} = dashboardState
    return {authUser, totalMember, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {summaryMemberDashboard})(TotalMember);
