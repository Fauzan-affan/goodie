import React from "react";
import {Card, Col, Row} from "antd";


class Report extends React.Component{
    constructor(){
        super();
        this.issuingReport = this.issuingReport.bind(this);
        this.redeemReport = this.redeemReport.bind(this);
        this.memberBalanceReport = this.memberBalanceReport.bind(this);
        this.voucherBalanceReport = this.voucherBalanceReport.bind(this);
        this.referralReport = this.referralReport.bind(this);
        this.pointTransactionReport = this.pointTransactionReport.bind(this);
        this.pointTransferReport = this.pointTransferReport.bind(this);
    }

    issuingReport() {
        this.props.history.push('/report/issuing');
    }

    redeemReport(){
        this.props.history.push('/report/redeem');
    }

    memberBalanceReport(){
        this.props.history.push('/report/member');
    }

    voucherBalanceReport(){
        this.props.history.push('/report/voucher');
    }

    referralReport(){
        this.props.history.push('/report/referral');
    }

    pointTransactionReport(){
        this.props.history.push('/report/point-transaction');
    }

    pointTransferReport(){
        this.props.history.push('/report/point-transfer');
    }

    render() {
        return (
            <Row>
                <Col span={24}>
                    <Card>

                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.issuingReport} >
                                        <img src={require('assets/images/Report/report_issuing.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-report'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Issuing</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Monitoring your member point issuing
                                            </p>
                                        </div>
                                    </div>
                                </Col>


                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.redeemReport} >
                                        <img src={require('assets/images/Report/report_redeem.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-report'>
                                            <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Redeem</h5>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Monitoring your member point redeem
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.pointTransactionReport} >
                                        <img src={require('assets/images/Report/report_point_transaction.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-report'>
                                            <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Point Transaction</h5>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Monitoring your member journey
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.memberBalanceReport} >
                                        <img src={require('assets/images/Report/report_member_balance.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-report'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Member Balance</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Monitoring your member points
                                            </p>
                                        </div>
                                    </div>
                                </Col>


                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.voucherBalanceReport} >
                                        <img src={require('assets/images/Report/report_voucher_balance.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-report'>
                                            <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Voucher Balance</h5>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Monitoring member's vouchers
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.referralReport} >
                                        <img src={require('assets/images/Report/report_referral_member.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-report'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Referral Member</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Monitoring your member referral
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                                {/*hide sementara*/}

                                <Col xl={8} lg={24} md={8} xs={24}>
                                   <div className='gx-package custom-package' onClick={this.pointTransferReport} >
                                       <img src={require('assets/images/Report/Report-Point-Transfer.png')}
                                            alt="Avatar"></img>
                                       <div className='gx-package-header custom-package-header custom-report'>
                                           <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Point Transfer</h2>
                                           <p className="custom-menu-body gx-mb-0 custom-package-body">
                                               Monitoring your Point Transfer
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

export default Report;

