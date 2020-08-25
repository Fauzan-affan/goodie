import React from "react";
import Widget from "components/Widget/index";
import {Col, Row} from "antd";
import {currency} from '../../../constants/Util';

import {
    revenueDashboard
} from "appRedux/actions/Dashboard";

import {
    viewMerchant,
    getCurrency
} from "appRedux/actions/Merchant";
import {connect} from "react-redux";


class Revenue extends React.Component {

    componentWillMount() {
        let credential = this.props.authUser;
        this.props.revenueDashboard(credential);

        this.props.viewMerchant(credential);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.merchant !== undefined && nextProps.merchant !== this.props.merchant) {
            let request = {
                authToken: localStorage.getItem('a'),
                deviceId: localStorage.getItem('d'),
                userId: localStorage.getItem('u'),
                merchantId: localStorage.getItem('mt'),
                paramCurrencyPoint: nextProps.merchant.paramCurrencyPoint
            };
            this.props.getCurrency(request);
        }
    }

    render(){
        const {revenue} = this.props;
        let totalRevenue, totalQty = 0;

        if(revenue.totalRevenue !== undefined){
            // totalRevenue = currency(revenue.totalRevenue);
            totalRevenue = currency(revenue.totalRevenue, this.props.merchant.currency);
            totalQty = revenue.totalQty;
        }

        return (
            <Widget>
                <h2 className="h4 gx-mb-3" >Total Product Revenue (this month)</h2>
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>

                        <div className="ant-row-flex" style={{marginBottom: '20px', marginTop: '20px'}} >
                            <h2 className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">{totalRevenue}</h2>
                            {/*<h4 className="gx-pt-2 gx-chart-up">64% <i className="icon icon-menu-up gx-fs-sm"/></h4>*/}
                        </div>
                        <p className="gx-text-grey">{totalQty} products</p>
                    </Col>
                </Row>
            </Widget>
        )

    }

}

const mapStateToProps = ({auth, dashboardState, merchantState}) => {
    const {authUser} = auth;
    const {revenue, loader, alertMessage, showMessage} = dashboardState;
    const {merchant, currency} = merchantState;
    return {authUser, revenue, loader, alertMessage, showMessage, merchant, currency}
};
export default connect(mapStateToProps, {revenueDashboard, getCurrency, viewMerchant})(Revenue);
