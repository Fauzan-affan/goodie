import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchBilling,
    filterSortSearch,
    clearFilterSortSearch,
    resetStatus,
} from "appRedux/actions/Billing";
import {
    viewBilling
} from "appRedux/actions/Billing";
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
import {currency} from '../../constants/Util';
import {
    viewMerchant,
    getCurrency
} from "appRedux/actions/Merchant";

class SearchBilling extends Component {
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
            periodMonth: null,
            periodYear: null,
            nextStatus: 0,
            period : null,
            startDate : null,
            search : '',
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
        const {pagination, sorter, search, period,
            // filters, startDate, periodMonth, periodYear
        } = filterAndSort;
        credential.page = 0;
        credential.sortBy = 0;
        credential.sort = 0;
        credential.search = '';
        credential.period = '';
        credential.periodMonth = '';
        credential.periodYear = '';
        credential.pageSize = 20;
        credential.startDate = '';
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

        if(period != null){
            credential.period = moment(period).format('YYYY-MM');
        }

        this.props.searchBilling(credential);
    }


    fetchDataView = (filterAndSort,id, isDownload)=>{
        let credential = this.props.authUser;
        const {pagination,
            // filters, sorter, search
        } = filterAndSort;
        credential.id = id;
        credential.pageSize = 20;
        credential.isDownload = isDownload;

        if(isDownload === false){
            if(pagination != null){
                credential.page = pagination.current - 1;
            }
        }else{
            credential.pageSize = 9999999;
        }

        this.props.viewBilling(credential);
    }

    //Filter page
    filterComponent(pagination, filters, sorter){
        const {search, startDate, periodMonth, periodYear, period} = this.props.filterAndSort;
        this.props.filterSortSearch(pagination, filters, sorter, search, startDate, period, periodMonth, periodYear);
    }

    handleSearch(value){
        const {pagination, filters, sorter, period, startDate, periodMonth, periodYear} = this.props.filterAndSort;
        let newPag = pagination;
        if(pagination != null){
            newPag.current = 1;
        }

        this.setState({
            search : value
        })

        this.props.filterSortSearch(newPag, filters, sorter, value, startDate, period, periodMonth, periodYear);
    }

    handleFilterDate(type, dateString){
        const {search, pagination, filters, sorter, period, startDate} = this.props.filterAndSort;
        let newPag = pagination;

        if(pagination != null){
            newPag.current = 1;
        }

        
        let prd = period;

        let stDate = startDate;

        if(type === 'period'){
            prd = dateString;
        }

        if(type === 'startDate'){
            stDate = dateString;
        }


        this.setState({
             period: prd,
             startDate : stDate,
        })

        this.props.filterSortSearch(newPag, filters, sorter, search, stDate, prd);
    }

    clearFilterComponent(){
        this.setState({
            search : '',
            startDate : null,
            period : null,
        })
        this.props.clearFilterSortSearch();
    }


    componentWillReceiveProps(nextProps){
        if (nextProps.updateSuccess && !nextProps.updateFailed){
            this.setState({
                msgContent : 'Updated Successfully',
                msgShow : true,
                msgType : 'success',
                onDelete :false
            })
        }else if (!nextProps.updateSuccess && nextProps.updateFailed){
            this.setState({
                msgContent : 'Update Failed',
                msgShow : true,
                msgType : 'danger',
                onDelete : false
            })
        }else{
            this.setState({
                msgContent : '',
                msgShow : false,
                msgType : '',
                onDelete : false
            })
        }


        //Fetch data after change table
        if(this.props.filterAndSort !== nextProps.filterAndSort){
            this.fetchData(nextProps.filterAndSort, false);
        }

        if(nextProps.downloadData !== this.props.downloadData){
            this.setState({
                downloadData : nextProps.downloadData
            })
        }

        // for get param currency
        if (nextProps.merchant !== undefined && nextProps.merchant !== this.props.merchant) {
            let request = {
                authToken: localStorage.getItem('a'),
                deviceId: localStorage.getItem('d'),
                userId: localStorage.getItem('u'),
                merchantId: localStorage.getItem('mt'),
                paramCurrencyPoint: nextProps.merchant.paramCurrencyPoint
            };
            this.props.getCurrency(request);
        }

    }

    handleDownloadView(id){
        this.fetchDataView(this.props.filterAndSort, id, true);
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


    onConfirm(){
        this.props.resetStatus();
        let credential = this.props.authUser;
        this.props.searchBilling(credential);
    }

    detailBilling(id){
        this.props.history.push('/billing/view/'+id);
    }

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
        let {loader, alertMessage, listBilling, showMessage} = this.props;
        const {
            // msgShow, msgType, msgContent, onDelete, msgDelete,
        } = this.state;
        let {
            // sorter, filters
        } = this.props.filterAndSort;
        // let sortedInfo = sorter || {};
        // let filteredInfo = filters || {};
        const {downloadData} = this.state;

        let {search, period, startDate} = this.state;

        if(this.props.listBilling.length > 0){
            this.props.listBilling.forEach((billing, i) => {
                billing.key = billing.billingId;
                billing.period = billing.periodMonth + '-' + billing.periodYear;
            });
        }

        let filterParam = {
            search : search,
            period : period, 
            startDate : startDate,      
        }

       let columnsView = [{
            title: 'Billing Detail Id',
            dataIndex: 'billingDetailId',
            label: 'Billing Detail Id',
            key: 'billingDetailId',
        },{
            title: 'Period',
            dataIndex: 'period',
            label: 'Period',
            key: 'period',
        },{
            title: 'Product Name',
            dataIndex: 'productName',
            label: 'Product Name',
            key: 'productName',
        }, {
            title: 'Price',
            dataIndex: 'salePrice',
            label: 'Price',
            key: 'salePrice',
        }, {
            title: 'Quantity',
            dataIndex: 'quantity',
            label : 'Quantity',
            key: 'quantity',
        }, {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            label : 'Total Price',
            key: 'totalPrice',
        }]


        // column for search //
        let columns = [{
            title: 'Period',
            dataIndex: 'period',
            label : 'Period',
            key: 'period',
            // sorter: (a, b) => a.name.length - b.name.length,
            // sortOrder: sortedInfo.columnKey === 'period' && sortedInfo.order
        },
        {
            title: 'Billing ID',
            dataIndex: 'billingId',
            label : 'Billing ID',
            key: 'billingId',
        },{
            title: 'Amount',
            dataIndex: 'amount',
            label : 'Amount',
            key: 'amount',
        },{
            title: 'Due Date',
            dataIndex: 'dueDate',
            label : 'Due Date',
            key: 'dueDate',
        }
        ];

        return(
            <div>
                <div>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                    {/* <SweetAlert success={msgType ==='success' ? true : false} danger={msgType ==='danger' ? true : false}
                                show={msgShow} title={msgContent} onConfirm={this.onConfirm.bind(this)}>
                    </SweetAlert>
                    <SweetAlert show={onDelete}
                                warning
                                showCancel
                                confirmBtnText='Yes'
                                confirmButtonStyle="danger"
                                cancelButtonStyle="default"
                                title='Are you sure ?'
                                onConfirm={this.changeStatusProcess.bind(this)}
                                onCancel={this.onCancelChangeStatus.bind(this)}
                    /> */}
                </div>
                {loader === false ?
                    <SearchForm
                        columns={columns}
                        listData={listBilling}
                        title='Billing List'
                        placeholder='Search Billing by period'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        onView = {this.detailBilling.bind(this)}
                        // onEdit = {this.changeStatusPopup.bind(this)}
                        recordInfo = {this.props.recordInfo}
                        onSearch = {this.handleSearch.bind(this)}
                        // enableMonthFilter = {true}
                        onFilterDate = {this.handleFilterDate.bind(this)}
                        // enableDownload = {true}
                        // onDownload = {this.handleDownload.bind(this)}
                        onDownload = {this.handleDownloadView.bind(this)}
                        downloadData = {downloadData}
                        filterParam = {filterParam}
                    />
                    : ''
                }

                <CSVLink
                    data={downloadData} headers={columnsView}
                    filename={"Billing Report.csv"}
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

const mapStateToProps = ({auth, billingState}) => {
    const {authUser} = auth;
    const {listBilling, recordInfo, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, downloadData} = billingState
    return {authUser, listBilling, recordInfo, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, downloadData}
};
export default connect(mapStateToProps, {searchBilling, viewBilling, filterSortSearch, clearFilterSortSearch, resetStatus})(SearchBilling);


