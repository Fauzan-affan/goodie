import React from "react";
import {Col, Row} from "antd";
import IconWithTextCard from "../../../components/dashboard/CRM/IconWithTextCard";
import {connect} from "react-redux";
import {
    totalDashboard
} from "appRedux/actions/Dashboard";

class TotalLoyalty extends React.Component {

    componentWillMount() {
        let credential = this.props.authUser;
        this.props.totalDashboard(credential);
    }

    render(){
        const {total} = this.props;

        let rule, promotion, product, reward = 0;

        if(total.totalRules !== undefined){
            rule = total.totalRules;
            promotion = total.totalPromotions;
            product = total.totalProducts;
            reward = total.totalPrograms;
        }

        return (
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Row>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <IconWithTextCard cardColor="cyan" icon="orders" title={rule} subTitle="Rules"/>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <IconWithTextCard cardColor="orange" icon="megaphone" title={promotion} subTitle="Promotions"/>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <IconWithTextCard cardColor="teal" icon="inbuilt-apps" title={product} subTitle="Products"/>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                        <IconWithTextCard cardColor="red" icon="tasks" title={reward} subTitle="Rewards"/>
                    </Col>
                </Row>
            </Col>

        )

    }

}

const mapStateToProps = ({auth, dashboardState}) => {
    const {authUser} = auth;
    const {total, loader, alertMessage, showMessage} = dashboardState
    return {authUser, total, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {totalDashboard})(TotalLoyalty);
