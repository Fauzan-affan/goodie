import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
import {connect} from "react-redux";
import {
    viewReconciliation
} from "appRedux/actions/Reconciliation";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";

class ViewReconciliation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            billing : this.props.billing,
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewReconciliation(credential);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.billing !== this.props.billing){
            this.setState({
                billing : nextProps.billing
            });
        }
    }

    back(){
        this.props.history.goBack();
    }


    render() {
        let content = {};
        let titleView = '';
        let {loader, alertMessage, showMessage} = this.props;

        //set key
        let details = [];

        if(this.state.billing.length > 0){
            this.state.billing.forEach((detail, i) => {
                detail.key = i;
                details.push(detail);
            });
        }else{
            details = null;
        }

        content = [
            {
                key :'billingDetails',
                listData : details,
                type : 'list full',
                columns : [{
                    title: 'Billing Detail Id',
                    dataIndex: 'billingDetailId',
                    key: 'billingDetailId',
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
                    key: 'salePrice',
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

const mapStateToProps = ({auth, reconciliationState}) => {
    const {authUser} = auth;
    const {billing, loader, alertMessage, showMessage} = reconciliationState;
    // const {billing, loader, alertMessage, showMessage} = billingState;
    return {authUser, billing, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewReconciliation})(ViewReconciliation);


