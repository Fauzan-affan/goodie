import React, { Component } from "react";
import Widget from "components/Widget/index";
import {Col, Row} from "antd";
import {getBalance, getDepositBalanceHistory } from "appRedux/actions/Deposit";

import {connect} from "react-redux";


class Balance extends Component {

    componentDidMount() {
        const { auth } = this.props;

        this.props.getBalance(auth);
        this.props.getDepositBalanceHistory(auth);
    }

    render(){
        const {balance, balanceHistory,
        } = this.props;

        const balanceFormat = balance ? balance.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }) : 'Rp 0,-'



        return (
            <Widget>
                <h2 className="h4 gx-mb-3" >Balance Deposit</h2>
                <Row>
                    <Col lg={24} md={24} sm={24} xs={24}>

                        <div className="ant-row-flex" style={{marginBottom: '20px', marginTop: '20px'}}>
                            <div className="gx-mr-2 gx-mb-0 gx-fs-xxxl gx-font-weight-medium">{`${balanceFormat.split(',')[0]},-`}</div>
                        </div>
                        <p className="gx-text-grey">
                            Last top up  {
                                (balanceHistory.length!==0)?balanceHistory[0].paymentDate:""
                            }
                        </p>
                    </Col>
                </Row>
            </Widget>
        )

    }

}


const mapStateToProps = ({ depositState, auth }) => {
    const { authUser: { authToken, deviceId, userId, merchantId } } = auth;

    return {
        balanceHistory: depositState.balanceHistory,
        vaList: depositState.vaList,
        loader: depositState.loader,
        error: depositState.error,
        showMessage: depositState.showMessage,
        balance: depositState.balance,
        auth: {
            authToken, deviceId, userId, merchantId
        }
    }
}

export default connect(mapStateToProps, {getBalance, getDepositBalanceHistory})(Balance);
