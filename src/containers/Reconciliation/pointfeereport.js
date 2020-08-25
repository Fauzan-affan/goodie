import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchReconciliation,
    filterSortSearch,
    clearFilterSortSearch,
    resetStatus,
} from "appRedux/actions/Reconciliation";
// import {
//     viewReconciliation
// } from "appRedux/actions/Reconciliation";
import {
    // Button,
    // Col,
    // Icon,
    message,
    // Modal,
    // Row, Table,
    // Upload,
    // Form
} from "antd";
import moment from 'moment';
import CircularProgress from "components/CircularProgress/index";
// import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {CSVLink} from "react-csv";

class SearchReconciliation extends Component {
    csvLink = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            msgContent : '',
            msgType : '',
            msgShow : false,
            onDelete : false,
            msgDelete: '',
            idWillDelete: '',
            // periodMonth: null,
            // periodYear: null,
            nextStatus: 0,
            // period : null,
            search : '',
            startDate : null,
            endDate : null,
            downloadData : []
        };

    }

    componentWillMount(){
        this.fetchData(this.props.filterAndSort, false);
    }

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }

    fetchData = (filterAndSort, isDownload)=>{
        let credential = this.props.authUser;
        const {pagination, sorter, search, period, startDate, endDate
            // filters, startDate, periodMonth, periodYear
        } = filterAndSort;
        credential.page = 0;
        credential.sortBy = 0;
        credential.sort = 0;
        credential.search = '';
        credential.pageSize = 20;
        credential.startDate = '';
        credential.endDate = '';
        credential.isDownload = isDownload;

        if(isDownload === false){
            if(pagination != null){
                credential.page = pagination.current - 1;
            }
        }else{
            credential.pageSize = 9999999;
        }

        if(sorter != null){
            if(sorter.field === 'period'){
                credential.sortBy = 1;
            }

            if(sorter.order === 'ascend' ){
                credential.sort = 1
            }else if(sorter.order === 'descend' ){
                credential.sort = 2
            }
        }

        if(search != null){
            credential.period = search;
        }

        if(startDate != null){
            credential.startDate = moment(startDate).format('YYYY-MM-DD');
        }

        if(endDate != null){
            credential.endDate = moment(endDate).format('YYYY-MM-DD');
        }

        // if(period != null){
        //     credential.period = moment(period).format('YYYY-MM');
        // }

        this.props.searchReconciliation(credential);
    }


    // fetchDataView = (filterAndSort,id, isDownload)=>{
    //     let credential = this.props.authUser;
    //     const {pagination,
    //         // filters, sorter, search
    //     } = filterAndSort;
    //     credential.id = id;
    //     credential.pageSize = 20;
    //     credential.isDownload = isDownload;
    //
    //     if(isDownload === false){
    //         if(pagination != null){
    //             credential.page = pagination.current - 1;
    //         }
    //     }else{
    //         credential.pageSize = 9999999;
    //     }
    //
    //     this.props.viewReconciliation(credential);
    // }

    //Filter page
    filterComponent(pagination, filters, sorter){
        const {search, startDate, endDate} = this.props.filterAndSort;
        this.props.filterSortSearch(pagination, filters, sorter, search, startDate, endDate);
    }

    handleSearch(value){
        const {pagination, filters, sorter, period, startDate, endDate} = this.props.filterAndSort;
        let newPag = pagination;
        if(pagination != null){
            newPag.current = 1;
        }

        this.setState({
            search : value
        })

        this.props.filterSortSearch(newPag, filters, sorter, value, startDate, endDate, period);
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
            this.fetchData(nextProps.filterAndSort, false);
        }

        if(nextProps.downloadData !== this.props.downloadData){
            this.setState({
                downloadData : nextProps.downloadData
            })
        }

    }

    handleDownload(){
        this.fetchData(this.props.filterAndSort, true);
    }

    componentDidUpdate() {
        // Download data
        if(this.state.downloadData.length > 0 ){
            this.csvLink.current.link.click();

            //Empty data
            this.setState({
                downloadData : []
            })
        }
    }


    // onConfirm(){
    //     this.props.resetStatus();
    //     let credential = this.props.authUser;
    //     this.props.searchReconciliation(credential);
    // }

    // detailReconciliation(id){
    //     this.props.history.push('/reconciliation/view/'+id);
    // }

    // changeStatusPopup(id, currentStatus){
    //     //suspend
    //     let nextStatus = 1;
    //     if(currentStatus !== 'Active'){
    //         nextStatus = -1;
    //     }

    //     this.setState({
    //         onDelete : true,
    //         idWillDelete : id,
    //         nextStatus : nextStatus
    //     })
    // }

    // changeStatusProcess(){
    //     let authCredential = this.props.authUser;
    //     authCredential.id = this.state.idWillDelete;
    //     authCredential.status = this.state.nextStatus;

    //     this.props.changeStatusBilling(authCredential);
    // }

    // onCancelChangeStatus(){
    //     this.setState({
    //         onDelete : false,
    //         idWillDelete : '',
    //         nextStatus : 0
    //     })
    // }

    render() {
        // let component = [];
        let {loader, alertMessage, listReconciliation, showMessage} = this.props;
        // const {
        //     // msgShow, msgType, msgContent, onDelete, msgDelete,
        // } = this.state;
        // let {
        //     sorter, filters
        // } = this.props.filterAndSort;
        // let sortedInfo = sorter || {};
        // let filteredInfo = filters || {};

        let {search, startDate, endDate, downloadData} = this.state;

        if(this.props.listReconciliation.length > 0){
            this.props.listReconciliation.forEach((reconciliation, i) => {
                reconciliation.key = i;
                reconciliation.name = reconciliation.memberUsername;
            });
        }

        let filterParam = {
            search : search,
            endDate : endDate,
            startDate : startDate,
        }

        // let columnsView = [{
        //     title: 'Billing Detail Id',
        //     dataIndex: 'billingDetailId',
        //     label: 'Billing Detail Id',
        //     key: 'billingDetailId',
        // },{
        //     title: 'Period',
        //     dataIndex: 'period',
        //     label: 'Period',
        //     key: 'period',
        // },{
        //     title: 'Product Name',
        //     dataIndex: 'productName',
        //     label: 'Product Name',
        //     key: 'productName',
        // }, {
        //     title: 'Price',
        //     dataIndex: 'salePrice',
        //     label: 'Price',
        //     key: 'salePrice',
        // }, {
        //     title: 'Quantity',
        //     dataIndex: 'quantity',
        //     label : 'Quantity',
        //     key: 'quantity',
        // }, {
        //     title: 'Total Price',
        //     dataIndex: 'totalPrice',
        //     label : 'Total Price',
        //     key: 'totalPrice',
        // }]


        // column for search //
        let columns = [
            //     {
            //     title: 'Member Name',
            //     dataIndex: 'memberUsername',
            //     label : 'Member Name',
            //     key: 'memberUsername',
            //     // sorter: (a, b) => a.name.length - b.name.length,
            //     // sortOrder: sortedInfo.columnKey === 'period' && sortedInfo.order
            // },
            {
                title: 'Transaction Date',
                dataIndex: 'transactionDate',
                label : 'Transaction Date',
                key: 'transactionDate',
            },{
                title: 'Member Name',
                dataIndex: 'memberName',
                label : 'Member Name',
                key: 'memberName',
            },{
                title: 'No Hp',
                dataIndex: 'mobileNumber',
                label : 'No Hp',
                key: 'mobileNumber',
            },{
                title: 'Email',
                dataIndex: 'memberUsername',
                label : 'Email',
                key: 'memberUsername',
            },{
                title: 'Amount',
                dataIndex: 'feeAmount',
                label : 'Amount',
                key: 'feeAmount',
            },{
                title: 'Point Fee %',
                dataIndex: 'feePercent',
                label : 'Point Fee %',
                key: 'feePercent',
            },{
                title: 'Member Point',
                dataIndex: 'pointEarned',
                label : 'Member Point',
                key: 'pointEarned',
            },{
                title: 'Point Fee',
                dataIndex: 'pointFee',
                label : 'Point Fee',
                key: 'pointFee',
            },
            // {
            //     title: 'Point Fee',
            //     dataIndex: 'pointFee',
            //     label : 'Point Fee',
            //     key: 'pointFee',
            // }
        ];

        return(
            <div>
                <div>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                </div>
                {loader === false ?
                    <SearchForm
                        columns={columns}
                        listData={listReconciliation}
                        title='Reconciliation Point Fee'
                        placeholder='Search by member name'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        // onView = {this.detailReconciliation.bind(this)}
                        recordInfo = {this.props.recordInfo}
                        onSearch = {this.handleSearch.bind(this)}
                        enableDownload = {true}
                        onDownload = {this.handleDownload.bind(this)}
                        enableDateFilter = {true}
                        onFilterDate = {this.handleFilterDate.bind(this)}
                        downloadData = {downloadData}
                        filterParam = {filterParam}
                    />
                    : ''
                }

                <CSVLink
                    data={downloadData} headers={columns}
                    filename={"Reconciliation List Report.csv"}
                    style={{display:'none'}}
                    ref={this.csvLink}
                >
                    Download
                </CSVLink>

                <NotificationContainer/>
            </div>
        );

    }


}

const mapStateToProps = ({auth, reconciliationState}) => {
    const {authUser} = auth;
    const {listReconciliation, recordInfo, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, downloadData} = reconciliationState;
    // const {listBilling, recordInfo, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, downloadData} = billingState;
    return {authUser, listReconciliation, recordInfo, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, downloadData}
};
export default connect(mapStateToProps, {searchReconciliation,
    // viewReconciliation,
    filterSortSearch, clearFilterSortSearch, resetStatus})(SearchReconciliation);


