import React from "react";
import {Card, Col, Row} from "antd";


class Reconciliation extends React.Component{
    constructor(){
        super();
        this.searchReconciliation = this.searchReconciliation.bind(this);
        this.searchReconciliationPayable = this.searchReconciliationPayable.bind(this);
        this.searchReconciliationReceiveble = this.searchReconciliationReceiveble.bind(this);
        this.searchReconciliationPointfee = this.searchReconciliationPointfee.bind(this);
    }

    searchReconciliation() {
        this.props.history.push('/reconciliation/list');
    }

    searchReconciliationPayable() {
        this.props.history.push('/reconciliation/payable');
    }

    searchReconciliationReceiveble() {
        this.props.history.push('/reconciliation/receiveble');
    }

    searchReconciliationPointfee() {
        this.props.history.push('/reconciliation/pointfee');
    }

    render() {
        return (
            <Row>
                {/*<Col span={24}>*/}
                {/*<ContainerHeader title='Product'/>*/}
                {/*</Col>*/}

                <Col span={24}>
                    <Card>
                        {/*<div className="gx-price-tables gx-pt-default">*/}
                        {/*    <Row>*/}
                        {/*        <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>*/}
                        {/*            <div className='gx-package custom-package' onClick={this.searchReconciliation} >*/}
                        {/*                <img src={require('assets/images/Reconciliation/List.png')}*/}
                        {/*                     alt="Avatar"></img>*/}
                        {/*                <div className='gx-package-header custom-package-header custom-reconciliation'>*/}
                        {/*                    <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Reconcile List</h2>*/}
                        {/*                    <p className="custom-menu-body gx-mb-0 custom-package-body">*/}
                        {/*                        Manage your finance*/}
                        {/*                    </p>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </Col>*/}

                        {/*    </Row>*/}
                        {/*</div>*/}

                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24}>
                                    {/*<Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>*/}
                                    <div className='gx-package custom-package' onClick={this.searchReconciliationPayable} >
                                        <img src={require('assets/images/Reconciliation/AP.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-reconciliation'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Account Payable</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Manage your payment
                                            </p>
                                        </div>
                                    </div>
                                    {/*</Col>*/}
                                </Col>


                                <Col xl={12} lg={24} md={12} xs={24}>
                                    {/*<Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>*/}
                                    <div className='gx-package custom-package' onClick={this.searchReconciliationReceiveble} >
                                        <img src={require('assets/images/Reconciliation/AR.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-reconciliation'>
                                            <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Account Receivable</h5>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Manage your receivable
                                            </p>
                                        </div>
                                    </div>
                                    {/*</Col>*/}
                                </Col>

                                {/*<Col xl={8} lg={24} md={8} xs={24}>*/}
                                {/*    <div className='gx-package custom-package' onClick={this.searchReconciliationPointfee} >*/}
                                {/*        <img src={require('assets/images/Reconciliation/Fee.png')}*/}
                                {/*             alt="Avatar"></img>*/}
                                {/*        <div className='gx-package-header custom-package-header custom-reconciliation'>*/}
                                {/*            <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Point Fee</h5>*/}
                                {/*            <p className="custom-menu-body gx-mb-0 custom-package-body">*/}
                                {/*                Manage your point fee*/}
                                {/*            </p>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</Col>*/}

                            </Row>
                        </div>
                    </Card>
                </Col>

            </Row>
        );
    }

}

export default Reconciliation;

