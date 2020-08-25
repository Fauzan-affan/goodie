import React from "react";
import {Card, Col, Row} from "antd";


class Blast extends React.Component{
    constructor(){
        super();
        this.searchSimplyBlast = this.searchSimplyBlast.bind(this);
        this.insertEmailBlast = this.insertEmailBlast.bind(this);
        this.insertSmsBlast = this.insertSmsBlast.bind(this);
        // this.insertItemProduct = this.insertItemProduct.bind(this);
        // this.insertVoucherProduct = this.insertVoucherProduct.bind(this);
    }

    searchSimplyBlast() {
        this.props.history.push('/blast/search');
    }

    insertEmailBlast(){
        this.props.history.push('/blast/create/email');
    }

    insertSmsBlast(){
        this.props.history.push('/blast/create/sms');
    }

    // insertItemProduct(){
    //     this.props.history.push('/product/create/item');
    // }
    //
    // insertVoucherProduct(){
    //     this.props.history.push('/product/create/voucher');
    // }

    render() {
        return (
            <Row>

                <Col span={24}>
                    <Card>
                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
                                    <div className='gx-package custom-package' onClick={this.searchSimplyBlast} >
                                        <img src={require('assets/images/Simply-Blast/Blast_List.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-simplyblast'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Message Blast List</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Review and edit your blast here
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                        </div>

                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24}>
                                    <Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>
                                    <div className='gx-package custom-package' onClick={this.insertEmailBlast} >
                                    {/*<div className='gx-package custom-package' onClick={this.insertItemProduct} >*/}
                                        <img src={require('assets/images/Simply-Blast/Email-Blast.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-simplyblast'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Email</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create new email blast for your member
                                            </p>
                                        </div>
                                    </div>
                                    </Col>
                                </Col>


                                <Col xl={12} lg={24} md={12} xs={24}>
                                    <Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>
                                    <div className='gx-package custom-package' onClick={this.insertSmsBlast} >
                                    {/*<div className='gx-package custom-package' onClick={this.insertVoucherProduct} >*/}
                                        <img src={require('assets/images/Simply-Blast/SMS-Blast.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-simplyblast'>
                                            <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>SMS</h5>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create new sms blast for your member
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

export default Blast;

