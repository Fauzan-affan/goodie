// import React from "react";
// import {Card, Col, Row} from "antd";


// class Product extends React.Component{
//     constructor(){
//         super();
//         this.searchProduct = this.searchProduct.bind(this);
//         this.insertItemProduct = this.insertItemProduct.bind(this);
//         this.insertVoucherProduct = this.insertVoucherProduct.bind(this);
//         this.insertCouponProduct = this.insertCouponProduct.bind(this);
//         this.insertExchangePointProduct = this.insertExchangePointProduct.bind(this);
//     }

//     searchProduct() {
//         this.props.history.push('/crud/search');
//     }

//     insertItemProduct(){
//         this.props.history.push('/crud/create/item');
//     }

//     insertVoucherProduct(){
//         this.props.history.push('/crud/create/voucher');
//     }

//     insertCouponProduct(){
//         this.props.history.push('/crud/create/coupon');
//     }

//     insertExchangePointProduct(){
//         this.props.history.push('/crud/create/point');
//     }

//     render() {
//         return (
//             <Row>
//                 {/*<Col span={24}>*/}
//                 {/*<ContainerHeader title='Product'/>*/}
//                 {/*</Col>*/}

//                 <Col span={24}>
//                     <Card>
//                         <div className="gx-price-tables gx-pt-default">
//                             <Row>
//                                 <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
//                                     <div className='gx-package custom-package' onClick={this.searchProduct} >
//                                         <img src={require('assets/images/Product/search.png')}
//                                              alt="Avatar"></img>
//                                         <div className='gx-package-header custom-package-header custom-product-small'>
//                                             <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Product List</h2>
//                                             <p className="custom-menu-body gx-mb-0 custom-package-body">
//                                                 Provide various product for your reward program. Review and edit your products here.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </Col>

//                             </Row>
//                         </div>

//                         <div className="gx-price-tables gx-pt-default">
//                             <Row>
//                                 <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
//                                     <Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>
//                                         <div className='gx-package custom-package' onClick={this.insertItemProduct} >
//                                             <img src={require('assets/images/Product/item.png')}
//                                                 alt="Avatar"></img>
//                                             <div className='gx-package-header custom-package-header custom-product-small'>
//                                                 <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Item</h2>
//                                                 <p className="custom-menu-body gx-mb-0 custom-package-body">
//                                                     Assign your physical product as your reward
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </Col>
//                                 </Col>

//                             </Row>
//                         </div>
//                     </Card>
//                 </Col>

//             </Row>
//         );
//     }

// }

// export default Product;

