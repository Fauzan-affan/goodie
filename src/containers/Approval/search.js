import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchApproval,
    filterSortSearch,
    clearFilterSortSearch,
    resetStatus,
} from "appRedux/actions/Approval";
import {
    message,
    Form,
} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import moment from "moment";

class SearchApproval extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msgContent : '',
            msgType : '',
            msgShow : false,
            startDate : null,
            endDate : null,
            search : '',
        };

        this.errorNotification = this.errorNotification.bind(this);

    }

    // componentWillMount(){
    //     let credential = this.props.authUser;
    //     this.props.searchProducts(credential);
    // }

    // for approval //

    componentWillMount(){
        this.fetchData(this.props.filterAndSort);
    }

    // //

    fetchData =(filterAndSort)=>{
        let credential = this.props.authUser;
        const {pagination,
            // filters,
            sorter, search, startDate, endDate} = filterAndSort;
        credential.page = 0;
        credential.sortBy = 1;
        credential.sort = 2;
        credential.search = '';
        credential.startDate = '';
        credential.endDate = '';

        if(pagination != null){
            credential.page = pagination.current -1;
        }

        if(sorter != null){
            if(sorter.field === 'memberUsername'){
                credential.sortBy = 4;
            }else if(sorter.field === '"mobileNumber"'){
                credential.sortBy = 3;
            }else if(sorter.field === '"status"'){
                credential.sortBy = 1;
            }


            if(sorter.order === 'ascend' ){
                credential.sort = 1
            }else if(sorter.order === 'descend' ){
                credential.sort = 2
            }
        }


        if(search != null){
            credential.search = search;
        }

        if(startDate != null){
        credential.startDate = moment(startDate).format('YYYY-MM-DD');
        }

        if(endDate != null){
        credential.endDate = moment(endDate).format('YYYY-MM-DD');
        }

        credential.orderType=1;

        this.props.searchApproval(credential);
    }

    //Filter page

    filterComponent(pagination, filters, sorter){
        const {search, startDate, endDate} = this.props.filterAndSort;
        this.props.filterSortSearch(pagination, filters, sorter, search, startDate, endDate);
    }

    handleSearch(value){
        const {pagination, filters, sorter, startDate, endDate} = this.props.filterAndSort;

        let newPag = pagination;
        if(pagination != null){
            newPag.current = 1;
        }

        this.setState({
            search : value
        })

        this.props.filterSortSearch(newPag, filters, sorter, value, startDate, endDate);
    }

    handleFilterDate(type, dateString){
        const {search, pagination, filters, sorter, startDate, endDate} = this.props.filterAndSort;
        let newPag = pagination;

        if(pagination != null){
            newPag.current = 1;
        }

        let stDate = startDate;
        let enDate = endDate;

        if(type === 'startDate'){
            stDate = dateString;
        }

        if(type === 'endDate'){
            enDate = dateString;
        }

        this.setState({
            startDate : stDate,
            endDate : enDate
        })

        this.props.filterSortSearch(newPag, filters, sorter, search, stDate, enDate);
    }

    clearFilterComponent(){
        this.setState({
            search : '',
            startDate : null,
            endDate : null,
        })
        this.props.clearFilterSortSearch();
    }

    componentWillReceiveProps(nextProps){

        //Fetch data after change table
        if(this.props.filterAndSort !== nextProps.filterAndSort){
            this.fetchData(nextProps.filterAndSort);
        }
    }

    // onConfirm(){
    //     this.props.resetStatus();
    //     this.setState({
    //         modalStockVisible : false
    //     })
    //     let credential = this.props.authUser;
    //     this.props.searchProducts(credential);
    // }

    onConfirm(){
        this.props.resetStatus();
        let credential = this.props.authUser;
        this.props.searchApproval(credential);
    }

    viewApproval(id){
        this.props.history.push('/approval/view/'+id);
    }

    editApproval(id){
        this.props.history.push(id + '/update');
        // if(source === 'Item'){
        //     this.props.history.push('/approval/update/item/'+id);
        // }else if (source === 'Voucher'){
        //     this.props.history.push('/approval/update/voucher/'+id);
        // } else if (source === 'Coupon'){
        //     this.props.history.push('/approval/update/coupon/'+id);
        // } else{
        //     this.props.history.push('/approval/update/point/'+id);
        // }
    }


    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }

    render() {
        // let component = [];
        // let {loader, alertMessage, showMessage, form} = this.props;
        // const { msgShow, msgType, msgContent} = this.state;
        // let {sorter, filters} = this.props.filterAndSort;
        // let sortedInfo = sorter || {};
        // let filteredInfo = filters || {};

        // const {getFieldDecorator} = this.props.form;

        // this.props.listProducts.forEach((product, i) => {
        //     product.key = product.productId;
        //     product.name = product.productName;
        //     product.isMarketplace = (product.isMarketplace === -1 ? 'Yes' : 'No');
        // });

        // render for approval //
        let component = [];
        let {loader, alertMessage, showMessage} = this.props;
        const { msgShow, msgType, msgContent, search, endDate, startDate,
        } = this.state;
        let {sorter, filters} = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        let filteredInfo = filters || {};

        let filterParam = {
            search : search,
            endDate : endDate,
            startDate : startDate,
        }

        if(this.props.listApproval !== undefined) {
            if(this.props.listApproval.length > 0){
                this.props.listApproval.forEach((approval, i) => {
                    approval.key = approval.receiptId;
                    approval.name = approval.memberUsername;
                });
            }
        }

        let columns = [{
            title: 'Receipt ID',
            dataIndex: 'receiptId',
            key: 'receiptId',
            // sorter: (a, b) => a.name.length - b.name.length,
            // sortOrder: sortedInfo.columnKey === 'receiptId' && sortedInfo.order
            },
            {
                title: 'Date',
                dataIndex: 'createdDate',
                key: 'createdDate',
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === 'createdDate' && sortedInfo.order
            },
            {
            title: 'Member User Name',
            dataIndex: 'memberUsername',
            key: 'memberUsername',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'memberUsername' && sortedInfo.order
        },
            {
            title: 'Mobile Number',
            dataIndex: 'mobileNumber',
            key: 'mobileNumber',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'mobileNumber' && sortedInfo.order
        },{
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order
        }
        ];

        // const dummyRequest = ({ file, onSuccess }) => {
        //     setTimeout(() => {
        //         onSuccess("ok");
        //     }, 0);
        // };
        //
        // const columnVoucher = [{
        //     title: 'Voucher Id',
        //     dataIndex: 'voucherId',
        //     key: 'voucherId',
        // }, {
        //     title: 'Voucher Code',
        //     dataIndex: 'voucherCode',
        //     key: 'voucherCode',
        // }, {
        //     title: 'Expired Date',
        //     dataIndex: 'expiredDate',
        //     key: 'expiredDate',
        // }];
        //
        // let enablePx = form.getFieldValue('prefix');
        // let disableSave = true;
        //
        // if(addStockType === 'Item'){
        //     if(form.getFieldValue('itemStock') > 0){
        //         disableSave = false;
        //     }
        // }else if(addStockType === 'Voucher'){
        //     if(voucherData.length > 0){
        //         disableSave = false;
        //     }
        // }

        return(
            <div>
                <div>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                    <SweetAlert success={msgType ==='success' ? true : false} danger={msgType ==='danger' ? true : false}
                                show={msgShow} title={msgContent} onConfirm={this.onConfirm.bind(this)}>
                    </SweetAlert>
                </div>
                {loader === false ?
                    <SearchForm
                        columns={columns}
                        listData={this.props.listApproval}
                        title='Approval List'
                        placeholder='Search approval by phone number'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        recordInfo = {this.props.recordInfo}
                        onSearch = {this.handleSearch.bind(this)}
                        onView = {this.viewApproval.bind(this)}
                        onEdit = {this.editApproval.bind(this)}
                        enableDateFilter = {true}
                        onFilterDate = {this.handleFilterDate.bind(this)}
                        disableEdit = {true}
                        filterParam = {filterParam}
                    />
                    : ''
                }
                <NotificationContainer/>
            </div>
        );

    }


}

const mapStateToProps = ({auth, approvalState}) => {
    const {authUser} = auth;
    const {listApproval, recordInfo, filterAndSort, loader, alertMessage, showMessage} = approvalState
    return {authUser, listApproval, recordInfo, filterAndSort, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {searchApproval, filterSortSearch, clearFilterSortSearch, resetStatus})(SearchApproval);


