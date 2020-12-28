import React from "react";
import {Col, Row} from "antd";
import Auxiliary from "util/Auxiliary";

import PromotionDashboard from "./Loyalty/promotion";
import RewardDashboard from "./Loyalty/reward";
import Revenue from "./Marketplace/revenue";
import Balance from "./Marketplace/balance";
import BestProducts from "./Marketplace/bestproduct";
import TopMerchants from "./Marketplace/topmerchant";
// import BillingDashboard from "./Billing/billing";
import TotalMember from "./Member/total";
import MemberGrowth from "./Member/growth";
import TierMember from "./Member/tier";
import TotalLoyalty from "./Loyalty/total";

const CRM = () => {
    return (
        <Auxiliary>
            <Row>

                <Col xl={12} lg={24} md={12} sm={24} xs={24}>
                    <PromotionDashboard/>
                </Col>
                <Col xl={12} lg={24} md={12} sm={24} xs={24}>
                    <RewardDashboard/>
                </Col>
                <TotalLoyalty/>

                <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                    <Row>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <Revenue/>
                        </Col>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <Balance/>
                        </Col>
                    </Row>
                    {/*<Revenue/>*/}
                </Col>
                <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                    <BestProducts/>
                </Col>
                <Col xl={8} lg={8} md={12} sm={24} xs={24}>
                    <TopMerchants/>
                </Col>

                {/* <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <BillingDashboard/>
                </Col> */}

                <Col xl={12} lg={24} md={24} sm={24} xs={24} className="gx-order-sm-1">
                    <Row>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <TotalMember/>
                    </Col>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <MemberGrowth/>
                    </Col>
                    </Row>
                </Col>
                <Col xl={12} lg={24} md={24} sm={24} xs={24} className="gx-order-sm-2">
                    <TierMember/>
                </Col>
            </Row>


        </Auxiliary>
    );
};

export default CRM;
