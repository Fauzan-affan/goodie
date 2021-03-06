import React from "react";
import {Card, Col, Row} from "antd";


class Product extends React.Component{
    constructor(){
        super();
        this.searchProduct = this.searchProduct.bind(this);
        this.insertItemProduct = this.insertItemProduct.bind(this);
        this.insertVoucherProduct = this.insertVoucherProduct.bind(this);
        this.insertCouponProduct = this.insertCouponProduct.bind(this);
        this.insertExchangePointProduct = this.insertExchangePointProduct.bind(this);
    }

    searchProduct() {
        this.props.history.push('/product/search');
    }

    insertItemProduct(){
        this.props.history.push('/product/create/item');
    }

    insertVoucherProduct(){
        this.props.history.push('/product/create/voucher');
    }

    insertCouponProduct(){
        this.props.history.push('/product/create/coupon');
    }

    insertExchangePointProduct(){
        this.props.history.push('/product/create/point');
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
                                    <div className='gx-package custom-package' onClick={this.searchProduct} >
                                        <img src={require('assets/images/Product/search.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-product-small'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Product List</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Provide various product for your reward program. Review and edit your products here.
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                        </div>

                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                            <Col xl={8} lg={24} md={8} xs={24}>
                                    {/*<Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>*/}
                                    <div className='gx-package custom-package' onClick={this.insertItemProduct} >
                                        <img src={require('assets/images/Product/item.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-product-small'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Item</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Assign your physical product as your reward
                                            </p>
                                        </div>
                                    </div>
                                    {/*</Col>*/}
                                </Col>


                                <Col xl={8} lg={24} md={8} xs={24}>
                                    {/*<Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>*/}
                                    <div className='gx-package custom-package' onClick={this.insertVoucherProduct} >
                                        <img src={require('assets/images/Product/voucher.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-product-small'>
                                            <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Voucher</h5>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                            Assign your digital voucher as your reward
                                            </p>
                                        </div>
                                    </div>
                                    {/*</Col>*/}
                                </Col>

                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.insertCouponProduct} >
                                        <img src={require('assets/images/Product/coupon.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-product-small'>
                                            <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Coupon</h5>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                            Assign your coupons as your reward
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                                {/*<Col xl={6} lg={24} md={6} xs={24}>*/}
                                {/*    <div className='gx-package custom-package' onClick={this.insertExchangePointProduct} >*/}
                                {/*        <img src={require('assets/images/Product/point.png')}*/}
                                {/*             alt="Avatar"></img>*/}
                                {/*        <div className='gx-package-header custom-package-header custom-product-small'>*/}
                                {/*            <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Point</h5>*/}
                                {/*            <p className="custom-menu-body gx-mb-0 custom-package-body">*/}
                                {/*                Assign your point as your reward*/}
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

export default Product;

