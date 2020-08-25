import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
import {connect} from "react-redux";
import {
    viewBilling
} from "appRedux/actions/Billing";
import {Icon, message} from "antd";
import CircularProgress from "components/CircularProgress/index";
import {currency} from "../../constants/Util";
import {
    viewMerchant,
    getCurrency
} from "appRedux/actions/Merchant";

class ViewBilling extends Component {
    constructor(props) {
        super(props);

        this.state = {
            billing : this.props.billing,
            merchant: null,
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewBilling(credential);

        // for view merchant
        this.props.viewMerchant(credential);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.billing !== this.props.billing){
            this.setState({
                billing : nextProps.billing
            });
        }

        this.setState({
            merchant : nextProps.merchant
        });

        // console.log("this.props.merchant")
        // console.log(this.props.merchant)


        // for get param currency
        if (nextProps.merchant !== undefined && nextProps.merchant !== this.props.merchant) {
            let request = {
                authToken: localStorage.getItem('a'),
                deviceId: localStorage.getItem('d'),
                userId: localStorage.getItem('u'),
                merchantId: localStorage.getItem('mt'),
                paramCurrencyPoint: nextProps.merchant.paramCurrencyPoint
            };
            // this.props.getCurrency(request);
        }
    }

    currencyFormat(num, curr) {
        return curr +' '+ num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    back(){
        this.props.history.goBack();
    }


    render() {
        let content = {};
        let titleView = '';
        let {loader, alertMessage, showMessage} = this.props;
        const{merchant} = this.state;

        //set key
        let details = [];

        if(this.state.billing.length > 0){
            this.state.billing.forEach((detail, i) => {
                detail.key = i;
                let curr = this.state.merchant!==null&&this.state.merchant.currency.lookupValue!==null?this.state.merchant.currency.lookupValue:'';
                detail.salePrice = curr!=='' ? ((detail.salePrice+'').substr(0,1)!==curr?this.currencyFormat(parseInt(detail.salePrice), curr):detail.salePrice) : detail.salePrice;
                detail.totalPrice = curr!=='' ? ((detail.totalPrice+'').substr(0,1)!==curr?this.currencyFormat(parseInt(detail.totalPrice), curr):detail.totalPrice) : detail.totalPrice;
                details.push(detail);
            });
        }else{
            details = null;
        }

        // let object;
        // if(this.state.billing[0]){
        //
        //     object = this.state.data[0];
        //     console.log("dataaaa =====> "+JSON.stringify(object));
        //     console.log("receiptId =====> "+object.receiptId);

        // console.log(currency)
        // console.log(JSON.stringify(this.props.merchant.currency))
        // console.log(JSON.stringify(this.props.merchant.currency.lookupValue))
        // console.log(JSON.stringify(this.props.merchant.currency.icon))
        // // console.log(JSON.stringify(this.props.billing))
        // console.log(JSON.stringify(this.state.billing))
        // console.log(JSON.stringify(this.state.billing.salePrice))
        // // console.log(JSON.stringify(billing))

        content = [
            {
                key :'billingDetails',
                listData : details,
                type : 'list full',
                columns : [{
                    title: 'Billing Detail Id',
                    dataIndex: 'billingDetailId',
                    key: 'billingDetailId',
                    // key : 'billingDetailId',
                    // label : 'Billing Detail Id',
                    // value : object.billingDetailId,
                    // type : 'text'
                },{
                    title: 'Period',
                    dataIndex: 'period',
                    key: 'period',
                },{
                    title: 'Product Name',
                    dataIndex: 'productName',
                    key: 'productName',
                }, {
                    title: 'Price',
                    dataIndex: 'salePrice',
                    // dataIndex: <p>{this.props.billing.salePrice}</p>,
                    key: 'salePrice',
                    // render: () => <p>{currency((this.props.billing.salePrice == null ? 0 : this.props.salePrice), this.props.merchant.currency)}</p>,
                    // render: () => <p>{currency((this.props.billing.salePrice == null ? 0 : this.props.salePrice))}</p>,
                    // dataIndex: this.currencyFormat()
                }, {
                    title: 'Quantity',
                    dataIndex: 'quantity',
                    key: 'quantity',
                }, {
                    title: 'Total Price',
                    dataIndex: 'totalPrice',
                    key: 'totalPrice',
                }]
            }
        ]
        // }

        return(
            <div>
                <div>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                </div>
                {loader === false ?
                    <ViewForm
                        component={content}
                        title={titleView}
                        onBack = {this.back.bind(this)}
                    />
                    : ''}
            </div>
        );

    }


}

const mapStateToProps = ({auth, billingState, merchantState}) => {
    const {authUser} = auth;
    const {billing, loader, alertMessage, showMessage} = billingState;
    const {merchant, currency} = merchantState;
    return {authUser, billing, loader, alertMessage, showMessage, currency, merchant}
};
export default connect(mapStateToProps, {viewBilling, getCurrency, viewMerchant})(ViewBilling);


