import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchReconciliationPayable,
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

class SearchReconciliationPayable extends Component {
    csvLink = React.createRef();
    filterParam2 = {
        endDate : null,
        startDate : null,
    }

    constructor(props) {
        super(props);

        let dateNow = new Date(Date.now());
        let beginningStartDate = this.formatDate(new Date(dateNow.setDate(1)));
        let beginningEndDate = new Date(dateNow.setDate(1));
        beginningEndDate = new Date(beginningEndDate.setMonth(beginningEndDate.getMonth()+1));
        beginningEndDate = this.formatDate(new Date(beginningEndDate.setDate(beginningEndDate.getDate()-1)));

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
            downloadData : [],
            beginningStartDate:beginningStartDate,
            beginningEndDate:beginningEndDate,
            isDate : true,
            isDead : true,
            periodType : '',
            f : '',
            transactionType : '',
            listMerchantName : ''
        };


        this.fetchData = this.fetchData.bind(this);
        this.setValueStateDate = this.setValueStateDate.bind(this);

    }

    componentWillMount(){
        this.fetchData(this.props.filterAndSort, false);
    }

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }

    fetchData = (filterAndSort, isDownload)=>{
        let credential = this.props.authUser;
        const {pagination, sorter, search, period, startDate, endDate,
            filters,
            // startDate, periodMonth, periodYear
        } = filterAndSort;
        credential.page = 0;
        credential.sortBy = 0;
        credential.sort = 1;
        credential.search = '';
        credential.pageSize = 20;
        credential.startDate = '';
        credential.endDate = '';
        credential.isDownload = isDownload;
        credential.pointTransactionTypeList='';
        credential.merchantNamePayable='';

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
            credential.startDate = moment(startDate).format('YYYY-MM-DD '+'00:00:00');

            let beginningStartDate = moment(startDate).format('YYYY-MM-DD');
            this.setState(
                {
                    beginningStartDate:beginningStartDate
                }
            )
        }else{
            credential.startDate = this.state.beginningStartDate+' 00:00:00';
        }

        if(endDate != null){
            credential.endDate = moment(endDate).format('YYYY-MM-DD '+'23:59:59');
            let beginningEndDate = moment(endDate).format('YYYY-MM-DD');
            this.setState(
                {
                    beginningEndDate:beginningEndDate
                }
            )
        }else{
            credential.endDate = this.state.beginningEndDate+' 23:59:59';
        }


        credential.trxType = 'BILLING';

        // if(period != null){
        //     credential.period = moment(period).format('YYYY-MM');
        // }

        if(filters!=null){
            if(filters.pointTransactionType!=null){

                if(!filters.pointTransactionType.isEmpty){
                    filters.pointTransactionType.forEach(item=>{
                        credential.pointTransactionTypeList += item+',';
                    });
                    credential.pointTransactionTypeList = credential.pointTransactionTypeList+'test';
                }
            }
        }

        if(filters!=null){
            if(filters.merchantPayable!=null){
                if(!filters.merchantPayable.isEmpty){
                    filters.merchantPayable.forEach(item=>{
                        credential.merchantNamePayable += item;
                    });
                    credential.merchantNamePayable = credential.merchantNamePayable;
                }
            }
        }

        credential.merchantType = 0;

        this.props.searchReconciliationPayable(credential);
    }

    formatDate(d) {
        let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
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
    // filterComponent(pagination, filters, sorter){
    //     const {search, startDate, endDate} = this.props.filterAndSort;
    //     this.props.filterSortSearch(pagination, filters, sorter, search, startDate, endDate);
    // }
    // filterComponent(pagination, filters, sorter, trasactionType, merchantName){
    //     const {period, startDate, endDate} = this.props.filterAndSort;
    //     if(trasactionType!=null){
    //         if(trasactionType != '' && merchantName == ''){
    //             filters =  {'pointTransactionType': [trasactionType]};
    //             this.setState({
    //                 transactionType : trasactionType
    //             })
    //             } else if (trasactionType == '' && merchantName !== ''){
    //                 filters = {'merchantPayable' : [merchantName]}   
    //             } else if(trasactionType !== '' && merchantName !== '') {
    //                 filters =  {'pointTransactionType': [trasactionType], 'merchantPayable' : [merchantName]};   
    //                 this.setState({
    //                     listMerchantName : merchantName
    //                 })
    //             } else {
    //                 filters =  {'pointTransactionType': null, 'merchantPayable' : null};
    //             }
    //         }
    //         this.props.filterSortSearch(pagination, filters, sorter, period, startDate, endDate);
    // }
    filterComponent(pagination, filters, sorter, trasactionType, merchantName, type, dateString){
        const {period, startDate, endDate} = this.props.filterAndSort;
        
        let stDate = startDate;
        let enDate = endDate;

        if(trasactionType!=null){
            if(trasactionType != '' && merchantName == ''){
                filters =  {'pointTransactionType': [trasactionType]};
                this.setState({
                    transactionType : trasactionType,
                    listMerchantName : ''
                })
                } else if (trasactionType == '' && merchantName !== ''){
                    filters = {'merchantPayable' : [merchantName]}   
                    this.setState({
                        listMerchantName : merchantName,
                        transactionType : ''
                    })
                } else if(trasactionType !== '' && merchantName !== '') {
                    filters =  {'pointTransactionType': [trasactionType], 'merchantPayable' : [merchantName]};
                    this.setState({
                        transactionType : trasactionType,
                        listMerchantName : merchantName
                    })
                } else {
                    filters =  {'pointTransactionType': null, 'merchantPayable' : null};
                }
            }

            if(type === 'startDate'){
                stDate = dateString;
            }
            
            if(type === 'endDate'){
                enDate = dateString;
            }
    
            this.setState({
                isDead : true,
                periodType : ''
            })
    
            if(type === 'weekPeriod'){
                let d = new Date(dateString);
                stDate = moment(d.setDate(d.getDate() - d.getDay()));
                enDate = moment(d.setDate(d.getDate() - d.getDay()+6));
    
                this.setState({
                    isDead : false,
                    periodType : 'week'
                })
            }
    
            if(type==='monthPeriod'){
                this.setState({
    
                    // valuePeriod : ""+dateString
                })
                let d = new Date(dateString);
                let start = new Date(d.getFullYear(), d.getMonth(), 1);
                let end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
                // var date = new Date('2014-02-27T10:00:00');
                let parseStart = moment(start).format('D MMMM YYYY');
                let parseEnd = moment(end).format('D MMMM YYYY');
    
                stDate = moment(parseStart)
                enDate = moment(parseEnd)
    
                this.setState({
                    isDead : false,
                    periodType : 'month',
                    // valuePeriod : ";"+dateString+";"+start+";"+parseStart+";"+stDate
                    valuePeriod : moment(start).format('YYYY-MM')
                })
            }
    
            if(type === 'yearPeriod') {
    
                let d = new Date(dateString);
                let start = new Date(d.getFullYear(), 0, 1);
                let end = new Date(d.getFullYear(), + 12, 0);
    
                let parseStart = moment(start).format('D MMMM YYYY');
                let parseEnd = moment(end).format('D MMMM YYYY');
    
                stDate = moment(parseStart);
                enDate = moment(parseEnd);
    
                this.setState({
                    isDead : false,
                    periodType : 'year',
                    // valuePeriod : ";"+dateString+";"+start+";"+parseStart+";"+stDate
                    valuePeriod : moment(start).format('YYYY-MM')
                })
            }
    
            this.setState({
                startDate : stDate,
                endDate : enDate
            })
            this.props.filterSortSearch(pagination, filters, sorter, period, stDate, enDate);
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

    // handleFilterDate(type, dateString){
    //     const {search, pagination, filters, sorter, startDate, endDate} = this.props.filterAndSort;
    //     let newPag = pagination;

    //     if(pagination != null){
    //         newPag.current = 1;
    //     }

    //     let stDate = startDate;
    //     let enDate = endDate;

    //     if(type === 'startDate'){
    //         stDate = dateString;
    //     }
        
    //     if(type === 'endDate'){
    //         enDate = dateString;
    //     }

    //     this.setState({
    //         isDead : true,
    //         periodType : ''
    //     })

    //     if(type === 'weekPeriod'){
    //         let d = new Date(dateString);
    //         stDate = moment(d.setDate(d.getDate() - d.getDay()));
    //         enDate = moment(d.setDate(d.getDate() - d.getDay()+6));

    //         this.setState({
    //             isDead : false,
    //             periodType : 'week'
    //         })
    //     }

    //     if(type==='monthPeriod'){
    //         this.setState({

    //             // valuePeriod : ""+dateString
    //         })
    //         let d = new Date(dateString);
    //         let start = new Date(d.getFullYear(), d.getMonth(), 1);
    //         let end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    //         // var date = new Date('2014-02-27T10:00:00');
    //         let parseStart = moment(start).format('D MMMM YYYY');
    //         let parseEnd = moment(end).format('D MMMM YYYY');

    //         stDate = moment(parseStart)
    //         enDate = moment(parseEnd)

    //         this.setState({
    //             isDead : false,
    //             periodType : 'month',
    //             // valuePeriod : ";"+dateString+";"+start+";"+parseStart+";"+stDate
    //             valuePeriod : moment(start).format('YYYY-MM')
    //         })
    //     }

    //     if(type === 'yearPeriod') {

    //         let d = new Date(dateString);
    //         let start = new Date(d.getFullYear(), 0, 1);
    //         let end = new Date(d.getFullYear(), + 12, 0);

    //         let parseStart = moment(start).format('D MMMM YYYY');
    //         let parseEnd = moment(end).format('D MMMM YYYY');

    //         stDate = moment(parseStart);
    //         enDate = moment(parseEnd);

    //         this.setState({
    //             isDead : false,
    //             periodType : 'year',
    //             // valuePeriod : ";"+dateString+";"+start+";"+parseStart+";"+stDate
    //             valuePeriod : moment(start).format('YYYY-MM')
    //         })
    //     }

    //     this.setState({
    //         startDate : stDate,
    //         endDate : enDate
    //     })

    //     this.props.filterSortSearch(newPag, filters, sorter, search, stDate, enDate);
    // }

    clearFilterComponent(){
        let dateNow = new Date(Date.now());
        let beginningStartDate = this.formatDate(new Date(dateNow.setDate(1)));
        let beginningEndDate = new Date(dateNow.setDate(1));
        beginningEndDate = new Date(beginningEndDate.setMonth(beginningEndDate.getMonth()+1));
        beginningEndDate = this.formatDate(new Date(beginningEndDate.setDate(beginningEndDate.getDate()-1)));
        this.setState({
            search : '',
            startDate : null,
            endDate : null,
            beginningStartDate:beginningStartDate,
            beginningEndDate:beginningEndDate,
            transactionType : '',
            listMerchantName : ''
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

    setValueStateDate(startDate, endDate){
        this.setState({
            startDate : startDate,
            endDate : endDate
        })
    }

    showDate(value){
        if(value == 'date') {
            this.setState({
                isDate : true
            })
        } else {
            this.setState({
                isDate : false,
                isDead : false
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
        let {loader, alertMessage, listReconciliation, listMerchant, showMessage, totalBillingamount, response} = this.props;
        // const {
        //     // msgShow, msgType, msgContent, onDelete, msgDelete,
        // } = this.state;
        let {
            sorter, filters
        } = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        let filteredInfo = filters || {};

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

        this.filterParam2 = {
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
            {
            title: 'Point Transaction Id',
            dataIndex: 'pointTransactionId',
            label : 'Point Transaction Id',
            key: 'pointTransactionId',
            // sorter: (a, b) => a.name.length - b.name.length,
            // sortOrder: sortedInfo.columnKey === 'period' && sortedInfo.order
            },
            {
                title: 'Merchant Name',
                dataIndex: 'merchantPayable',
                label : 'Merchant Name',
                key: 'merchantPayable',
                // sorter: (a, b) => a.name.length - b.name.length,
                // sortOrder: sortedInfo.columnKey === 'period' && sortedInfo.order
            },
            {
                title: 'Member Name',
                dataIndex: 'memberName',
                label : 'Member Name',
                key: 'memberName',
            },
            {
                title: 'Member Email',
                dataIndex: 'memberUsername',
                label : 'Member Email',
                key: 'memberUsername',
            },{
                title: 'Transaction Date',
                dataIndex: 'transactionDate',
                label : 'Transaction Date',
                key: 'transactionDate',
            },{
                title: 'Transaction Type',
                dataIndex: 'pointTransactionType',
                label : 'Transaction Type',
                key: 'pointTransactionType',
                filters: [
                    {text: 'Order', value: 'ORDER'},
                    {text: 'Issuing Promotion', value: 'ISSUING_PROMOTION'},
                    {text: 'Redeem Reward', value: 'REDEEM_REWARD'},
                ],
                // filterMultiple: false,
                filteredValue: filteredInfo.pointTransactionType || null,
                onFilter: (value, record) => record.pointTransactionType.includes(value),
            },{
                title: 'Billing Amount',
                dataIndex: 'billingAmount',
                label : 'Billing Amount',
                key: 'billingAmount',
            }
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
                        title='Reconciliation Payable'
                        placeholder='Search by member name'
                        listMerchant={listMerchant}
                        reconcileFilter={true}
                        enabledButtonReconcile = {true}
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        // onView = {this.detailReconciliation.bind(this)}
                        recordInfo = {this.props.recordInfo}
                        onSearch = {this.handleSearch.bind(this)}
                        // enableDownload = {true}
                        onDownload = {this.handleDownload.bind(this)}
                        // enableDateFilter = {true}
                        // onFilterDate = {this.handleFilterDate.bind(this)}
                        downloadData = {downloadData}
                        filterParam = {filterParam}
                        beginningStartDate = {this.state.beginningStartDate}
                        beginningEndDate = {this.state.beginningEndDate}
                        isTotalBillingAmount = {true}
                        totalBillingAmount = {response.totalBillingAmount}
                        isExpand = {true}
                        isDate = {this.showDate.bind(this)}
                        isDead = {this.state.isDead}
                        periodType = {this.state.periodType}
                        valuePeriod = {this.state.valuePeriod}
                        transactionType = {this.state.transactionType}
                        listMerchantName = {this.state.listMerchantName}
                    />
                    : ''
                }


                <CSVLink
                    data={downloadData} headers={columns}
                    filename={"Reconciliation Payable Report.csv"}
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
    const {listReconciliation, listMerchant, response, totalBillingamount,recordInfo, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, downloadData} = reconciliationState;
    // const {listBilling, recordInfo, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, downloadData} = billingState;
    return {authUser, response, totalBillingamount, listReconciliation, listMerchant, recordInfo, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, downloadData}
};
export default connect(mapStateToProps, {
    searchReconciliationPayable,
    // viewReconciliation,
    filterSortSearch, clearFilterSortSearch, resetStatus})(SearchReconciliationPayable);


