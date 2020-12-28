import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
// import {currency} from '../../constants/Util';
import {connect} from "react-redux";
import {
    viewStore
} from "appRedux/actions/Store";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";
// import RedeemFreq from '../../constants/RedeemFreq';

class ViewStore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            store : this.props.store
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewStore(credential);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.store !== this.props.store){
            this.setState({
                store : nextProps.store
            });
        }
    }

    back(){
        this.props.history.goBack();
    }


    render() {

        let content = [];
        let content1 = [];
        let content2 = [];
        let titleView = '';
        let {loader, alertMessage, showMessage} = this.props;

        //set key address
        let address = [];
        if (this.state.store.address != null) {
            address.push(this.state.store.address);
        }

        //set key Contact
        let contact = [];
        if (this.state.store.contact != null) {
            this.state.store.contact.map((item, i) => {
                contact.push(item);
            })
        }
        console.log(this.state.store.storeLogo)
        titleView = this.state.store.storeName;
        content =
            [
                {
                    key : 'merchantName',
                    label : 'Merchant Name',
                    value : this.state.store.merchantName,
                    type : 'text'
                },{
                    key : 'storeCode',
                    label : 'Store Code',
                    value : this.state.store.storeCode,
                    type : 'text'
                },{
                    key : 'storeName',
                    label : 'Store Name',
                    value : this.state.store.storeName,
                    type : 'text'
                },{
                    key : 'storeLogo',
                    label : 'Store Logo',
                    value : this.state.store.storeLogo,
                    type : 'image',
                    render: (text) => <img src={text} alt="avatar" width={'100px'}/>
                },
                // {
                //     key : 'industryType',
                //     label : 'Industry Type',
                //     value : this.state.store.industryType,
                //     type : 'text'
                // },
                // {
                //     key : 'highclass',
                //     label : 'HighClass',
                //     value : this.state.store.highclass,
                //     type : 'text'
                // },
                {
                    key : 'pin',
                    label : 'Pin',
                    value : this.state.store.pin,
                    type : 'text'
                },
                // {
                //     key : 'status',
                //     label : 'Status',
                //     value : this.state.store.status,
                //     type : 'text'
                // },{
                //     key : 'isStoreCollaboration',
                //     label : 'Store Collaboration',
                //     value : this.state.store.isStoreCollaboration,
                //     type : 'text'
                // }, 
                {
                    key : 'address',
                    label: 'Address',
                    listData : address,
                    type : 'list without pgnation',
                    columns : [{
                        title: 'Address',
                        dataIndex: 'addressLine1',
                        key: 'addressLine1',
                    }, {
                        title: 'Country',
                        dataIndex: 'country',
                        key: 'country',
                    }, {
                        title: 'Province',
                        dataIndex: 'province',
                        key: 'province',
                    }, {
                        title: 'City',
                        dataIndex: 'cityTown',
                        key: 'cityTown',
                    }, {
                        title: 'Postal Code',
                        dataIndex: 'postalCode',
                        key: 'postalCode',
                    }]
                },{
                    key : 'contact',
                    label: 'Contact Details',
                    listData : contact,
                    type : 'list without pgnation',
                    columns : [{
                        title: 'First Name',
                        dataIndex: 'contactFirstName',
                        key: 'contactFirstName',
                    }, {
                        title: 'Mobile Number',
                        dataIndex: 'mobileNumber',
                        key: 'mobileNumber',
                    }, {
                        title: 'Email',
                        dataIndex: 'emailAddress',
                        key: 'emailAddress',
                    }]
            }];

            Array.prototype.push.apply(content, content1, content2);


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

const mapStateToProps = ({auth, storeState}) => {
    const {authUser} = auth;
    const {store, loader, alertMessage, showMessage} = storeState
    return {authUser, store, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewStore})(ViewStore);


