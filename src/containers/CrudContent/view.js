// import React, {Component} from "react";
// import ViewForm from '../../components/Form/view';
// import {currency} from '../../constants/Util';
// import {connect} from "react-redux";
// import {
//     viewProduct
// } from "appRedux/actions/Crud";
// import {message} from "antd";
// import CircularProgress from "components/CircularProgress";
// import {
//     viewMerchant,
//     getCurrency
// } from "appRedux/actions/Merchant";

// class ViewProduct extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             product : this.props.product
//         };
//     }

//     componentWillMount(){
//         let credential = this.props.authUser;
//         credential.id = this.props.match.params.id;
//         this.props.viewProduct(credential);

//         this.props.viewMerchant(credential);
//     }

//     componentWillReceiveProps(nextProps){
//         if(nextProps.product !== this.props.product){
//             this.setState({
//                 product : nextProps.product
//             });
//         }

//         if (nextProps.merchant !== undefined && nextProps.merchant !== this.props.merchant) {
//             let request = {
//                 authToken: localStorage.getItem('a'),
//                 deviceId: localStorage.getItem('d'),
//                 userId: localStorage.getItem('u'),
//                 merchantId: localStorage.getItem('mt'),
//                 paramCurrencyPoint: nextProps.merchant.paramCurrencyPoint
//             };
//             this.props.getCurrency(request);
//         }
//     }

//     back(){
//         this.props.history.goBack();
//     }


//     render() {

//         let content = [];
//         let titleView = '';
//         let {loader, alertMessage, showMessage} = this.props;

//         titleView = this.state.product.productCode;

//         //set key
//         let productDetails = [];
//         if(this.state.product.productDetails.length > 0){
//             this.state.product.productDetails.forEach((detail, i) => {
//                 detail.key = i;
//                 productDetails.push(detail);
//             });
//         }


//         content =
//             [
//                 {
//                     key : 'productCode',
//                     label : 'Product Code',
//                     value : this.state.product.productCode,
//                     type : 'text'
//                 },
//                 {
//                     key : 'productName',
//                     label : 'Product Name',
//                     value : this.state.product.productName,
//                     type : 'text'
//                 },
//                 {
//                     key : 'description',
//                     label : 'Description',
//                     value : this.state.product.description,
//                     type : 'html'
//                 },
//                 {
//                     key : 'productTypeLabel',
//                     label : 'Product Type',
//                     value : this.state.product.productTypeLabel,
//                     type : 'text'
//                 },
//                 {
//                     key : 'productImage',
//                     label : 'Product Image',
//                     value : this.state.product.productImage,
//                     type : 'image'
//                 },
//                 {
//                     key : 'stock',
//                     label : 'Product Stock',
//                     value : this.state.product.stock,
//                     type : 'text'
//                 },
//                 {
//                     key : 'basePrice',
//                     label : 'Base Price',
//                     value : currency(this.state.product.basePrice, this.props.merchant.currency),
//                     type : 'text'
//                 },
//                 {
//                     key : 'pointsEarned',
//                     label : 'Points Earned',
//                     value : this.state.product.pointsEarned,
//                     type : 'text'
//                 },
//                 {
//                     key : 'voucherValue',
//                     label : 'Voucher Value',
//                     value : this.state.product.voucherValue,
//                     type : 'text'
//                 },
//                 {
//                     key : 'isMarketplace',
//                     label : 'Marketplace Product',
//                     value : this.state.product.isMarketplace,
//                     type : 'text'
//                 },
//                 {
//                     key : 'productDetails',
//                     label : 'Voucher List',
//                     listData : productDetails,
//                     type : 'list partial',
//                     columns : [{
//                         title: 'Voucher Id',
//                         dataIndex: 'voucherId',
//                         key: 'voucherId',
//                     }, {
//                         title: 'Expired Date',
//                         dataIndex: 'expiredDate',
//                         key: 'expiredDate',
//                     }
//                     ]
//                 }
//             ];

//         return(
//             <div>
//                 <div>
//                     {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
//                     {showMessage ? message.error(alertMessage.toString()) : null}
//                 </div>
//                 {loader === false ?
//                     <ViewForm
//                         component={content}
//                         title={titleView}
//                         onBack = {this.back.bind(this)}
//                     />
//                     : ''}
//             </div>
//         );

//     }


// }

// const mapStateToProps = ({auth, productState, merchantState}) => {
//     const {authUser} = auth;
//     const {merchant, currency} = merchantState;
//     const {product, loader, alertMessage, showMessage} = productState
//     return {authUser, product, loader, alertMessage, showMessage, merchant, currency}
// };
// export default connect(mapStateToProps, {viewProduct, getCurrency, viewMerchant})(ViewProduct);


