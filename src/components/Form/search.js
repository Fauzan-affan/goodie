import React, {Component} from "react";
import {Button, Card, Table, Input, Divider, DatePicker, Row, Col, Select, Upload, Icon} from "antd";
import TransactionType from "../../constants/TransactionType";
import VoucherStatus from "../../constants/VoucherStatus";
import moment from 'moment';
import { element } from "prop-types";

const Search = Input.Search;
const Option = Select.Option;

const {MonthPicker } = DatePicker;
const {WeekPicker} = DatePicker;

class SearchForm extends Component {
    constructor(props) {
        super(props);


        let search = '';
        let startDate, endDate, periodWeek, periodMonth, periodYear, period, downgradeTimeSet, trxType, status, productName = null;

        if(this.props.filterParam !== undefined){
            if(this.props.filterParam.search !== undefined){
                search = this.props.filterParam.search;
            }

            if(this.props.filterParam.startDate !== undefined){
                startDate = this.props.filterParam.startDate;
            }

            if(this.props.filterParam.endDate !== undefined){
                endDate = this.props.filterParam.endDate;
            }

            if(this.props.filterParam.periodWeek !== undefined){
                periodWeek = this.props.filterParam.periodWeek
            }

            if(this.props.filterParam.periodMonth !== undefined){
                periodMonth = this.props.filterParam.periodMonth;
            }

            if(this.props.filterParam.periodYear !== undefined){
                periodYear = this.props.filterParam.periodYear;
            }

            if(this.props.filterParam.period !== undefined){
                period = this.props.filterParam.period;
            }

            if(this.props.filterParam.downgradeTimeSet !== undefined){
                downgradeTimeSet = this.props.filterParam.downgradeTimeSet;
            }

            if(this.props.filterParam.trxType !== undefined){
                trxType = this.props.filterParam.trxType;
            }

            if(this.props.filterParam.status !== undefined){
                status = this.props.filterParam.status;
            }

            if(this.props.filterParam.productName !== undefined){
                productName = this.props.filterParam.productName;
            }
        }

        this.state = {
            searchParam: search,
            allData : this.props.listData,
            listData : this.props.listData,
            listMerchant : this.props.listMerchant,
            data:this.props.data,
            downloadData : [],
            recordInfo : this.props.recordInfo,
            endOpen: false,
            startDate : startDate,
            endDate : endDate,
            periodWeek : periodWeek,
            periodMonth : periodMonth,
            periodYear : periodYear,
            period : period,
            downgradeTimeSet : downgradeTimeSet,
            trxType : trxType,
            status : status,
            productName : productName,
            getValue : '',
            getPeriod : '',
            transactionType :[],
            merchantName :[],
            takeDate : '',
            takeDateString : '',
            filters: [
                {text: 'Order', value: 'ORDER'},
                {text: 'Issuing Promotion', value: 'ISSUING_PROMOTION'},
                {text: 'Redeem Reward', value: 'REDEEM_REWARD'},
            ]
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.listData !== this.props.listData){
            this.setState({
                allData : nextProps.listData,
                listData : nextProps.listData,
                recordInfo : nextProps.recordInfo
            });
        }
    }

    handleChange = (pagination, filters, sorter) => {
        this.props.onFilter(pagination, filters, sorter);
    };

    clearAll = () => {
        this.setState({
            listData : this.state.allData,
            recordInfo : this.state.recordInfo,
            searchParam : '',
            productName : '',
        });
        this.props.onClearFilter();
    };

    handleSearch(value) {
        if(this.props.onSearch == null){
            this.setState({
                searchParam: value,
            });
            this.filterSearch(value);
        }else{
            this.props.onSearch(value);
        }
    }

    searchChange = (ev) =>{
        this.setState({
            searchParam: ev.target.value,
        });
    }

    productNameChange = (ev) =>{
        this.setState({
            productName: ev.target.value,
        });
    }

    handleProductNameFilter(value) {
        this.props.onFilterProductName(value);
    }

    transactionTypeSearch = (ev) => {
        this.setState({
            ...this.state,
            transactionType: ev
        })
    }

    merchantName = ev => {
        this.setState({
            merchantName : ev
        })
    }

    handleOnSubmit = (pagination, filters, sorter) => {
        let trasactionType = null; 
        let merchantName = null;
        let dateString = null;
        let type = '';
        if(trasactionType !== this.state.transactionType){
            trasactionType = this.state.transactionType
        }
        if(merchantName !== this.state.merchantName){
            merchantName = this.state.merchantName
        }
        if(this.state.startDate){
            dateString = this.state.startDate
            type = 'startDate'
            console.log(type, dateString,'startDate')
        }
         if(this.state.endDate){
            dateString = this.state.endDate
            type = 'endDate'
            console.log(type, dateString,'endDate')
        }
         if(this.state.periodWeek){
            dateString = this.state.periodWeek
            type = 'weekPeriod'
            console.log(type, dateString,'weekPeriod')
        } 
        if(this.state.periodMonth){
            dateString = this.state.periodMonth
            type = 'monthPeriod'
            console.log(type, dateString,'monthPeriod')
        } 
        if(this.state.periodYear){
            dateString = this.state.periodYear
            type = 'yearPeriod'
            console.log(type, dateString,'yearPeriod')
        }
        this.props.onFilter(pagination, filters, sorter, trasactionType, merchantName, type, dateString) 
      };

    getPeriod(value) {
        this.setState({
            getPeriod : value,
            getValue : 'period'
        })

        this.props.isDate(value)
    }

    filterSearch = (value) => {
        // const {filterOption} = this.state;
        if (value === '') {
            this.setState({listData: this.state.allData});
        } else {
            const filterSearch = this.state.allData.filter((data) =>
                data.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
                this.setState({listData: filterSearch});
        }
    };

    viewPage(id,type){
        this.props.onView(id,type);
        localStorage.setItem('userId', id);
    }

    editPage(id,type){
        localStorage.setItem('userId', id);
        this.props.onEdit(id,type);
    }

    deletePage(id,type){
        this.props.onDelete(id,type);
    }

    addStock(id, type){
        this.props.onAddStock(id,type);
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endDate;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = this.state.startDate;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    disabledDowngradeTimeSet = (startValue) => {
        const endValue = this.state.downgradeTimeSet;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    onChangeStartDate = (date, dateString) => {
        console.log(date,dateString)
        // if(dateString !== undefined){
        //     this.props.onFilterDate('startDate',date);
        // }
        this.setState({
            startDate : date
        })
    }

    onChangeEndDate = (date, dateString) =>{
        console.log(date,dateString)
        // if(dateString !== undefined){
        //     this.props.onFilterDate('endDate',date);
        // }
        this.setState({
            endDate : date
        })
    }

    onChangeWeek = (date, dateString) =>{
        console.log(date,dateString)
        // if(dateString !== undefined){
        //     this.props.onFilterDate('weekPeriod',date);
        // }
        this.setState({
            periodWeek : date
        })
    }

    onChangeMonth = (date, dateString) =>{
        console.log(date,dateString)
        // if(dateString !== undefined){
        //     this.props.onFilterDate('monthPeriod',date);
        // }
        this.setState({
            periodMonth : date
        })
    }

    onChangeYear = (date, dateString) => {
        console.log(date, dateString);
        // if(dateString !== undefined){
        //     this.props.onFilterDate('yearPeriod',date);
        // }
        this.setState({
            periodYear : date,
            getPeriod : 'year'
        })
      }

    onChangeDowngradeTimeSet = (date, dateString) =>{
        if(dateString !== undefined){
            this.props.onFilterDate('downgradeTimeSet',date);
        }
    }

    changeTrxType(value){
        this.props.onFilterTrxType(value);
    }

    changeStatus(value){
        this.props.onFilterStatus(value);
    }

    downloadDetail(id){
        this.props.onDownload(id);
    }

    downloadCsv(){
        this.props.onDownload();
    }

    handleUpload = () =>{
        this.props.onAddStock();
    }

    changePage = (id,type) =>{
        this.props.onChanges(id,type);
    }

    getValue(value) {
        this.setState({
            getValue : value
        })
        this.props.isDate(value)
    }

    detailRespReconPointFee(pointTransactionid, index){
        let viewDetailReconPointFee  =
            <ul>
                <li>Point Fee : {this.state.listData[index].pointFee}</li>
                <li>Point Earned : {this.state.listData[index].pointEarned}</li>
                <li>Fee : {this.state.listData[index].feePercent+' %'}</li>
            </ul>
        ;
        return viewDetailReconPointFee;
    }

    detailPointTransfer(pointTransferId, index){
        const styleLabelDetail ={
            width:"15%",
        };

        const styleLabelPtrxId ={
            color:"blue",
        };

        let viewDetailPointTransfer = 
        <ul>
            <li>Receiver Point Detail</li>
                <ul>
                    <table >
                        <tbody>
                            <tr>
                                <td style={styleLabelDetail}>Detect Account</td>
                                <td style={{width:"1%"}}>:</td>
                                <td >{this.state.listData[index].detectAccount}</td>
                            </tr>
                            <tr>
                                <td style={styleLabelDetail}>Receiver Merchant</td>
                                <td style={{width:"1%"}}>:</td>
                                <td >{this.state.listData[index].merchantNameAdjustment}</td>
                            </tr>
                            <tr>
                                <td style={styleLabelDetail}>Member Email</td>
                                <td style={{width:"1%"}}>:</td>
                                <td >{this.state.listData[index].memberUsernameAdjustment}</td>
                            </tr>
                            <tr>
                                <td style={styleLabelDetail}>Mobile Number</td>
                                <td style={{width:"1%"}}>:</td>
                                <td >{this.state.listData[index].mobileNumberAdjustment}</td>
                            </tr>
                            <tr>
                                <td style={styleLabelDetail}>Point Value Adjustment</td>
                                <td style={{width:"1%"}}>:</td>
                                <td >{this.state.listData[index].pointValueAdjustment}</td>
                            </tr><tr>
                                <td style={styleLabelDetail}>Point Adjustment</td>
                                <td style={{width:"1%"}}>:</td>
                                <td >{this.state.listData[index].pointAdjustment}</td>
                            </tr>
                        </tbody>
                    </table>
                </ul>
        </ul>
        ;
        return viewDetailPointTransfer;
    }

    detailRespReconRedeemReward(pointTransactionid, index){
        const styleLabelDetail ={
            width:"15%",
        };
        let viewDetailReconRedeemReward  =
            <table >
                <tbody>
                    <tr>
                        <td style={styleLabelDetail}>Reward Name</td>
                        <td style={{width:"1%"}}>:</td>
                        <td >{this.state.listData[index].detail.data.rewardName}</td>
                    </tr>
                    <tr>
                        <td style={styleLabelDetail}>Product Name</td>
                        <td style={{width:"1%"}}>:</td>
                        <td >{this.state.listData[index].detail.data.productName}</td>
                    </tr>
                    <tr>
                        <td style={styleLabelDetail}>Quantity</td>
                        <td style={{width:"1%"}}>:</td>
                        <td >{this.state.listData[index].detail.data.quantity}</td>
                    </tr>
                    <tr>
                        <td style={styleLabelDetail}>Point Used</td>
                        <td style={{width:"1%"}}>:</td>
                        <td >{this.state.listData[index].detail.data.point}</td>
                    </tr>
                    <tr>
                        <td style={styleLabelDetail}>Reward Id</td>
                        <td style={{width:"1%"}}>:</td>
                        <td >{this.state.listData[index].detail.data.rewardId}</td>
                    </tr>
                </tbody>
            </table>
        ;
        return viewDetailReconRedeemReward;
    }

    detailRespReconOrder(pointTransactionid, index, title){

        const styleLabelDetail ={
            width:"15%",
        };

        const styleLabelPtrxId ={
            color:"blue",
        };

        let pointTrxId = pointTransactionid

        let viewDetailRecon  =
            <ul><li>Order</li>
                <ul>

                    <table >
                        <tbody>
                            <tr>
                                <td style={styleLabelDetail}>Merchant</td>
                                <td style={{width:"1%"}}>:</td>
                                <td >{this.state.listData[index].detail.data.merchantName}</td>
                            </tr>
                            <tr>
                                <td style={styleLabelDetail}>Email</td>
                                <td style={{width:"1%"}}>:</td>
                                <td >{this.state.listData[index].detail.data.memberUsername}</td>
                            </tr>
                            <tr>
                                <td style={styleLabelDetail}>No. HP</td>
                                <td style={{width:"1%"}}>:</td>
                                <td >{this.state.listData[index].detail.data.mobileNumber}</td>
                            </tr>
                            <tr>
                                <td style={styleLabelDetail}>Total Amount</td>
                                <td style={{width:"1%"}}>:</td>
                                <td >{this.state.listData[index].detail.data.orderHistoryList[0].totalAmount}</td>
                            </tr>
                            <tr>
                                <td style={styleLabelDetail}>Order Number</td>
                                <td style={{width:"1%"}}>:</td>
                                <td >{this.state.listData[index].detail.data.orderHistoryList[0].orderNumber}</td>
                            </tr>
                            <tr>
                                <td style={styleLabelDetail}>Order Id</td>
                                <td style={{width:"1%"}}>:</td>
                                <td >{this.state.listData[index].detail.data.orderHistoryList[0].orderId}</td>
                            </tr><tr>
                                <td style={styleLabelDetail}>Product From Merchant</td>
                                <td style={{width:"1%"}}>:</td>
                                <td ><span style={title=='Reconciliation Receiveble'?{color:"blue"}:{}}>{this.state.listData[index].detail.data.orderHistoryList[0].merchantProductDetail[0].merchantName}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </ul>
                <ul></ul><li>Point Deducted Detail</li>


                {this.state.listData[index].detail.data.orderHistoryList[0].orderDetail.map((item, index) => (
                    <ul style={{listStyleType: 'square'}}>
                        <li >
                            <table>
                                <tbody>
                                <tr>
                                    <td style={styleLabelDetail}>From Merchant</td>
                                    <td style={{width:"1%"}}>:</td>
                                    <td >{item.merchantName}</td>
                                </tr>
                                <tr>
                                    <td style={styleLabelDetail}>Email</td>
                                    <td style={{width:"1%"}}>:</td>
                                    <td >{item.memberUsername}</td>
                                </tr>
                                <tr>
                                    <td style={styleLabelDetail}>No. HP</td>
                                    <td style={{width:"1%"}}>:</td>
                                    <td >{item.mobileNumber}</td>
                                </tr>
                                <tr>
                                    <td style={styleLabelDetail}>Billing Amount</td>
                                    <td style={{width:"1%"}}>:</td>
                                    <td >{item.totalAmount}</td>
                                </tr>
                                <tr>
                                    <td style={styleLabelDetail}>Point Used</td>
                                    <td style={{width:"1%"}}>:</td>
                                    <td >{item.pointUsed}</td>
                                </tr>
                                <tr>
                                    <td style={styleLabelDetail}>Point Value</td>
                                    <td style={{width:"1%"}}>:</td>
                                    <td >{item.pointValue}</td>
                                </tr>
                                <tr>
                                    <td style={styleLabelDetail}>Point Transaction Id</td>
                                    <td style={{width:"1%"}}>:</td>
                                    <td ><span style={pointTrxId==item.pointTransactionId?{color:"blue"}:{}}>{item.pointTransactionId}</span></td>
                                    {/*<td >{item.pointTransactionId}</td>*/}
                                </tr>
                                </tbody>
                            </table>
                        </li>

                    </ul>
                ))}
            </ul>
        ;
        return viewDetailRecon;
    }

    currencyFormat(num) {
        return 'Rp ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    getUnique(arr, comp) {
        const unique = arr
          //store the comparison values in array
          .map(e => e[comp])
    
          // store the keys of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)
    
          // eliminate the dead keys & store unique objects
          .filter(e => arr[e])
    
          .map(e => arr[e]);
    
        return unique;
      }

    render() {
        const {recordInfo, endOpen, startDate, endDate, periodWeek, periodMonth, periodYear, period, downgradeTimeSet, trxType, status, productName, data, listMerchant} = this.state;
        let pagination = true;
        const dateFormat = 'YYYY-MM-DD';
        //For download csv


        if(recordInfo != undefined){
            pagination = {
                total : recordInfo.totalRecords,
                current : recordInfo.page + 1,
                pageSize : recordInfo.nrecords
            }
        }

        // is disabled link
        let linkDisable ={
            color: "currentColor",
            cursor: "not-allowed",
            opacity: "0.5"
        };

        let linkActive ={
            color: "#F87060",
            cursor: "allowed",
            opacity: "1"
        };

        let totalBillingAmount = this.props.isTotalBillingAmount === true ?
            this.props.totalBillingAmount:
            null;
        totalBillingAmount = totalBillingAmount!=null? this.currencyFormat(totalBillingAmount):null

        if(this.props.columns[this.props.columns.length-1].key !== 'action') {

            if (this.props.title === 'Rules List') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key, record.ruleType)}>{text}</a>;
                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span>
                            <a onClick={() => this.editPage(record.key, record.ruleType)}>Edit</a>
                            <Divider type="vertical"/>
                            <a onClick={() => this.deletePage(record.key, record.promotions)}>Delete</a>
                        </span>
                    });
            } else if (this.props.title === 'Reward List') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key, record.sourceProduct)}>{text}</a>;
                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span>
                            <a onClick={() => this.editPage(record.key, record.sourceProduct)}>Edit</a>
                            <Divider type="vertical"/>
                            <a onClick={() => this.deletePage(record.key)}>Delete</a>
                        </span>
                    });
            } else if (this.props.title === 'Role List') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key)}>{text}</a>;
                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span>
                            <a onClick={() => this.editPage(record.key)}>Edit</a>
                            <Divider type="vertical"/>
                            <a onClick={() => this.deletePage(record.key)}>Delete</a>
                        </span>
                    });
            } else if (this.props.title === 'User List') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key)}>{text}</a>;
                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span>
                            <a onClick={() => this.editPage(record.key)}>Edit</a>
                            <Divider type="vertical"/>
                                {record.userNonLocked !== 'Inactive' ?
                                    <a onClick={() => this.deletePage(record.key, record.userNonLockedLabel)}>{record.userNonLocked === -1 ? 'Inactivate User' : 'Activate User'}</a>
                                    :
                                    ''}
                                <Divider type="vertical"/>
                                <a onClick={() => this.changePage(record.key)}>Change Password</a>
                        </span>
                    });
            } else if (this.props.title === 'Product List') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key)}>{text}</a>;
                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span>
                            <a onClick={() => this.editPage(record.key, record.productType)}>Edit</a>
                            <Divider type="vertical"/>
                            <a onClick={() => this.addStock(record.key, record.productType)}>Add Stock</a>
                            <Divider type="vertical"/>
                            <a onClick={() => this.deletePage(record.key, record.programs)}>Delete</a>
                        </span>
                    });
            } else if (this.props.title === 'Approval List') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key)}>{text}</a>;
                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span >
                                {
                                    record.status!="New"
                                    ?<a style={linkDisable} >Edit</a>
                                    :<a style={linkActive} onClick={() => this.editPage(record.key, record.productType)}>Edit</a>
                                }

                            </span>
                    });
            } else if (this.props.title === 'Tier') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key)}>{text}</a>;
                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span>
                            <a onClick={() => this.editPage(record.key)}>Edit</a>
                        </span>
                    });
            } else if (this.props.title === 'Promotion List') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key)}>{text}</a>;
                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span>
                            <a onClick={() => this.editPage(record.key)}>Edit</a>
                        </span>
                    });
            } else if (this.props.title === 'Member List') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key)}>{text}</a>;

                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span>
                            {record.status !== 'Inactive' ?
                                <a onClick={() => this.editPage(record.key, record.status)}>{record.status === 'Active' ? 'Suspend Member' : 'Activate Member'}</a>
                                :
                                ''}
                        </span>
                    });
            } else if (this.props.title === 'Billing List') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key)}>{text}</a>;

                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span>
                                {/* <Button style={{marginLeft:"0px"}} type="primary" icon="download" onClick={this.downloadDetail(record.key).bind(this)}>Download</Button> */}
                            <a onClick={() => this.downloadDetail(record.key)}>Download</a>
                        </span>
                    });
            } else if (this.props.title === 'Message Blast List') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key)}>{text}</a>;
                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span>
                            <a onClick={() => this.editPage(record.key, record.messageType)}>Edit</a>
                            <Divider type="vertical"/>
                            <a onClick={() => this.deletePage(record.key, record.key)}>Delete</a>
                        </span>
                    });
            } else if (this.props.title === 'Point Value List') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key)}>{text}</a>;
                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span>
                            <a onClick={() => this.editPage(record.key)}>Edit</a>
                            <Divider type="vertical"/>
                            <a onClick={() => this.deletePage(record.key)}>Delete</a>
                        </span>
                    });
            }
            // else if (this.props.title === 'Reconciliation List') {
            //     this.props.columns[0].render = (text, record) => <a
            //         onClick={() => this.viewPage(record.key)}>{text}</a>;
            //     this.props.columns.push(
            //         {
            //             title: 'Action',
            //             dataIndex: '',
            //             key: 'action',
            //             render: (record) =>
            //                 <span>
            //                 <a onClick={() => this.downloadDetail(record.key)}>Download</a>
            //                 {/*<a onClick={() => this.editPage(record.key)}>Edit</a>*/}
            //                 {/*<Divider type="vertical"/>*/}
            //                 {/*<a onClick={() => this.deletePage(record.key)}>Delete</a>*/}
            //             </span>
            //         });
            // }
            else if (this.props.title === 'Advertising List') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key)}>{text}</a>;
                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span>
                            <a onClick={() => this.editPage(record.key)}>Edit</a>
                            <Divider type="vertical"/>
                            <a onClick={() => this.deletePage(record.key)}>Delete</a>
                        </span>
                    });
            }else if (this.props.title === 'Gamification List') {
                this.props.columns[0].render = (text, record) => <a
                    onClick={() => this.viewPage(record.key)}>{text}</a>;
                this.props.columns.push(
                    {
                        title: 'Action',
                        dataIndex: '',
                        key: 'action',
                        render: (record) =>
                            <span>
                            <a onClick={() => this.editPage(record.key)}>Edit</a>
                            <Divider type="vertical"/>
                            <a onClick={() => this.deletePage(record.key)}>Delete</a>
                        </span>
                    });
            } else if (this.props.title === 'Doorprize List') {
                // this.props.columns[0].render = (text, record) =>
                //     <a onClick={() => this.viewPage(record.key)}>{text}</a>;
                // this.props.columns.push(
                //     {
                //         title: 'Action',
                //         dataIndex: '',
                //         key: 'action',
                //         render: (record) =>
                //             <span>
                //             <a onClick={() => this.editPage(record.key, record.messageType)}>Edit</a>
                //             <Divider type="vertical"/>
                //             <a onClick={() => this.deletePage(record.key, record.key)}>Delete</a>
                //         </span>
                //     });
            }
        }

        let options = [];
        if(this.props.enableTrxTypeFilter === true){
            TransactionType.values().forEach((ruleType, i) => {
                let option = [];
                option.push(
                    <Option key={i} value={ruleType.value}>{ruleType.label}</Option>
                );

                options.push(option);
            });
        }

        let optionsStatus = [];
        if(this.props.enableStatusFilter === true){
            VoucherStatus.values().forEach((status, i) => {
                let option = [];
                option.push(
                    <Option key={i} value={status.value}>{status.label}</Option>
                );

                optionsStatus.push(option);
            });
        }

        // get merchant name and remove duplicate 
        let optionsMerchant = [];
        if(this.props.reconcileFilter === true){
        listMerchant.map((item, i) => 
            optionsMerchant.push(<Option key={i} value={item}> {item} </Option>))
            }

        // get order filter by Transaction Type
        let uniquepointTransactionType = [];
            this.state.filters.map((item, i) => {
                let selected = this.state.transactionType == item.value
                uniquepointTransactionType.push(<Option value={item.value} key={i}> {item.value} </Option>)
            })

        return (
            <Card title={this.props.title}>
                <div className="table-operations">
                    {
                        // this.props.title==='Reconciliation Payable' || 
                        this.props.title==='Reconciliation Receiveble' || 
                        this.props.title==='Reconciliation Payable' 
                        || this.props.title === 'Point Transfer Report'
                         ? '':
                        <Search
                            className='test'
                            placeholder={this.props.placeholder}
                            onSearch={this.handleSearch.bind(this)}
                            value = {this.state.searchParam}
                            onChange={this.searchChange}
                            // onSearch={value => console.log(value)}
                        />
                    }
                    
                    {/* Start for Reconcile filter */}
                    {
                        this.props.reconcileFilter === true ?
                            <Row style={{marginBottom:"16px"}}>

                                <Col lg={8} md={8} sm={24} xs={24}>
                                    <span>Period</span><br/>
                                    <Select style={{width: '100%'}} placeholder='Select Period'
                                        defaultValue={this.props.isDead==true?'date':'period'}
                                        onChange={this.getValue.bind(this)}>
                                        <Option value='date'> Date </Option>
                                        <Option value='period'> Period </Option>                                        
                                    </Select>
                                </Col>
                            { this.props.listMerchantName == '' ?
                                <Col lg={8} md={8} sm={24} xs={24}>
                                    <span>Merchant </span><br/>
                                    <Select style={{width: '100%'}} 
                                            placeholder='Select by Merchant Name' 
                                            onChange={this.merchantName}
                                            >
                                        {optionsMerchant}
                                    </Select>
                                </Col>
                                :
                                <Col lg={8} md={8} sm={24} xs={24}>
                                    <span>Merchant </span><br/>
                                    <Select style={{width: '100%'}} 
                                            onChange={this.merchantName}
                                            defaultValue = {this.props.listMerchantName == '' ? '':
                                            this.props.listMerchantName}
                                            >
                                        {optionsMerchant}
                                    </Select>
                                </Col>

                            }
                                {this.props.transactionType==''? 
                                <Col lg={8} md={8} sm={24} xs={24}>
                                    <span>Transaction Type</span><br/>
                                    <Select style={{width: '100%'}} placeholder='Select Transaction Type'
                                            // selected = {true}
                                            // labelInValue
                                            onChange={this.transactionTypeSearch}
                                            >
                                        {uniquepointTransactionType}
                                    </Select>
                                </Col>
                                :
                                <Col lg={8} md={8} sm={24} xs={24}>
                                    <span>Transaction Type</span><br/>
                                    <Select style={{width: '100%'}} placeholder='Select Transaction Type'
                                            // selected = {true}
                                            // labelInValue
                                            defaultValue={this.props.transactionType==''?'':
                                                    this.props.transactionType==''?'':
                                                    this.props.transactionType=='ORDER'?'ORDER':
                                                    this.props.transactionType=='ISSUING_PROMOTION'?'ISSUING_PROMOTION':
                                                    this.props.transactionType=='REDEEM_REWARD'?'REDEEM_REWARD':
                                                    ''}
                                            onChange={this.transactionTypeSearch}
                                            >
                                        {uniquepointTransactionType}
                                    </Select>
                                </Col> 
                        }
                            </Row>
                                : ''
                        }
                                
                        {
                            this.props.isDead==true || this.state.getValue == 'date'?
                            // this.state.getValue === 'date' ||  this.state.getValue == ''?
                                <Row>
                                    <Col lg={8} md={8} sm={24} xs={24}>
                                        {this.props.beginningStartDate!=undefined?this.props.beginningStartDate!=null?<span>Start Date</span>:'':''}
        
                                        <DatePicker className="gx-mb-3 gx-w-100"
                                            style={{width: '100%'}}
                                            placeholder ="Select start date"
                                            disabledDate={this.disabledStartDate}
                                            onChange={this.onChangeStartDate}
                                            onOpenChange={this.handleStartOpenChange}
                                            // value={startDate}
                                            value={this.props.beginningStartDate!=null?startDate !=null ? startDate : moment(''+this.props.beginningStartDate, dateFormat):startDate}
                                            format={dateFormat}
        
                                        />
                                    </Col>
                                    <Col lg={8} md={8} sm={24} xs={24}>
                                        {this.props.beginningEndDate!=undefined?this.props.beginningEndDate!=null?<span>End Date</span>:'':''}
        
                                        <DatePicker className="gx-mb-3 gx-w-100"
                                            style={{width: '100%'}}
                                            placeholder ="Select end date"
                                            disabledDate={this.disabledEndDate}
                                            onChange={this.onChangeEndDate}
                                            onOpenChange={this.handleEndOpenChange}
                                            open={endOpen}
                                            // value={endDate}
                                            value={this.props.beginningEndDate!=null?endDate !=null ? endDate : moment(''+this.props.beginningEndDate, dateFormat):endDate}
                                            format={dateFormat}
                                        />
                                    </Col>
                                </Row>
        
                            : this.state.getValue == 'period'?'':''
                        }

                        {
                            // this.state.getValue === 'period' ?
                            this.state.getValue == 'date'?'':
                            this.props.isDead==false || this.state.getValue == 'period'?
                                <Row style={{marginBottom:"16px"}}>
                                    
                                    {
                                        this.props.periodType==''?
                                            <Col lg={8} md={8} sm={24} xs={24}>
                                                <Select style={{width: '100%'}} placeholder='Select Period'
                                                    onChange={this.getPeriod.bind(this)} icon='calender'
                                                >
                                                    <Option value='week'> Week </Option>
                                                    <Option value='month'> Month </Option>
                                                    <Option value='year'> Year </Option>                                         
                                                </Select>
                                            </Col>
                                        :
                                            <Col lg={8} md={8} sm={24} xs={24}>
                                                <Select style={{width: '100%'}} placeholder='Select'
                                                    onChange={this.getPeriod.bind(this)} icon='calender'
                                                        defaultValue={this.props.periodType==''?'':
                                                            this.props.periodType=='month'?'month':
                                                            this.props.periodType=='week'?'week':
                                                            this.props.periodType=='year'?'year':
                                                            ''}
                                                >
                                                    <Option value='week'> Week </Option>
                                                    <Option value='month'> Month </Option>
                                                    <Option value='year'> Year </Option>                                         
                                                </Select>
                                            </Col>
                                    }

                                    {
                                        this.state.getPeriod == 'year'?'':
                                        this.state.getPeriod == 'month'?'':
                                        this.state.getPeriod == 'week' || this.props.periodType == 'week' ?
                                        <Col lg={8} md={8} sm={24} xs={24}>
                                            {/* <WeekPicker className="gx-mb-3 gx-w-100"
                                                placeholder ="Select Period Week"
                                                onChange={this.onChangeWeek}
                                                onOpenChange={this.handleStartOpenChange}
                                                value={periodWeek}
                                            /> */}
                                            <WeekPicker onChange={this.onChangeWeek} className="gx-mb-3 gx-w-100" placeholder="Select week" />
                                        </Col>
                                    : ''
                                    }

                                    {
                                        this.state.getPeriod == 'year'?'':
                                        this.state.getPeriod == 'week'?'':
                                        this.state.getPeriod == 'month' || this.props.periodType == 'month' ?
                                            <Col lg={8} md={8} sm={24} xs={24}>
                                                <MonthPicker
                                                    // defaultValue={moment('2020-07', 'YYYY-MM-D')}
                                                    defaultValue={this.props.valuePeriod == undefined?'':moment(''+ this.props.valuePeriod, 'YYYY-MM-DD')}
                                                    className="gx-mb-3 gx-w-100"
                                                    placeholder ="Select Period Month"
                                                    onChange={this.onChangeMonth}
                                                    onOpenChange={this.handleStartOpenChange}
                                                    // value={periodMonth}
                                                />
                                            </Col>
                                        : ''
                                    }

                                    {
                                        this.state.getPeriod == 'month'?'':
                                        this.state.getPeriod == 'week'?'':
                                        this.state.getPeriod == 'year' || this.props.periodType == 'year' ?
                                            <Col lg={8} md={8} sm={24} xs={24}>
                                                <DatePicker picker="year" mode={"year"}
                                                onPanelChange={this.onChangeYear}
                                                placeholder ="Select Period Year"
                                                onOpenChange={this.handleStartOpenChange}
                                                defaultValue={this.props.valuePeriod == undefined?'':moment(''+ this.props.valuePeriod, 'YYYY-MM-DD')}
                                                // value={periodYear}
                                                />
                                            </Col>
                                    : ''
                                    }
                                    
                                </Row>
                            : ''
                        }

                        {
                            this.props.enabledButtonReconcile === true ? 
                                <Row>
                                    {/* <Col lg={4} md={4} sm={24} xs={24} style={{textAlign: this.props.isTotalBillingAmount === false ?"right":"left"}}> */}
                                        <Button style={{marginLeft:"15px"}} 
                                        type="primary " 
                                        icon="search"
                                        onClick={this.handleOnSubmit}
                                        >Search</Button>
                                    {/* </Col> */}

                                    {/* <Col lg={4} md={4} sm={24} xs={24} style={{textAlign: this.props.isTotalBillingAmount === false ?"right":"left"}}> */}
                                        <Button style={{marginLeft:"15px"}} type="primary" icon="download" onClick={this.downloadCsv.bind(this)}>Download</Button>
                                    {/* </Col> */}

                                    {/* <Col lg={4} md={4} sm={24} xs={24} style={{textAlign: this.props.isTotalBillingAmount === false ?"right":"left"}}> */}
                                        <Button style={{marginLeft:"15px"}} onClick={this.clearAll}>Clear filters and sorters</Button>
                                    {/* </Col> */}
                                </Row>
                                    :''
                        }

                        {/* End for Reconcile filter */}

                    {
                        this.props.enableTrxTypeFilter === true ?
                            <Row style={{marginBottom:"16px"}}>
                                <Col lg={12} md={12} sm={24} xs={24}>
                                    <Select style={{width: '50%'}} onChange={this.changeTrxType.bind(this)}
                                        placeholder="Select Transaction Type" value={trxType}
                                    >
                                        {options}
                                    </Select>
                                </Col>
                            </Row>

                        : ''
                    }

                    {
                        this.props.enablePhoneNumber === true? 
                        <Search
                            className='test'
                            placeholder = 'Search by phone number'
                            // onSearchPhone={this.handleSearchPhone.bind(this)}
                            value = {this.state.searchPhone}
                            onChange={this.searchChangePhone}
                            style={{marginLeft: "30px"}}
                        />
                        : ''
                    } 
                    
                    {
                        this.props.enableProductNameFilter === true ?
                            <Search
                                className='test'
                                placeholder="Search by product name"
                                onSearch={this.handleProductNameFilter.bind(this)}
                                value = {productName}
                                onChange={this.productNameChange}
                                style={{marginLeft: "30px"}}
                                    />
                        : ''
                    }

                    {
                        this.props.enableStatusFilter === true ?
                            <Row style={{marginBottom:"16px"}}>
                                <Col lg={12} md={12} sm={24} xs={24}>
                                    <Select style={{width: '50%'}} onChange={this.changeStatus.bind(this)}
                                            placeholder="Select Voucher Status" value={status}
                                    >
                                        {optionsStatus}
                                    </Select>
                                </Col>
                            </Row>

                        : ''
                    }

                    {
                        this.props.enableDateFilter === true ?
                            <Row>
                                <Col lg={6} md={6} sm={24} xs={24}>
                                    {this.props.beginningStartDate!=undefined?this.props.beginningStartDate!=null?<span>Start Date</span>:'':''}

                                    <DatePicker className="gx-mb-3 gx-w-100"
                                        placeholder ="Select start date"
                                        disabledDate={this.disabledStartDate}
                                        onChange={this.onChangeStartDate}
                                        onOpenChange={this.handleStartOpenChange}
                                        // value={startDate}
                                        value={this.props.beginningStartDate!=null?startDate !=null ? startDate : moment(''+this.props.beginningStartDate, dateFormat):startDate}
                                        format={dateFormat}

                                    />
                                </Col>
                                <Col lg={6} md={6} sm={24} xs={24}>
                                    {this.props.beginningEndDate!=undefined?this.props.beginningEndDate!=null?<span>End Date</span>:'':''}

                                    <DatePicker className="gx-mb-3 gx-w-100"
                                        placeholder ="Select end date"
                                        disabledDate={this.disabledEndDate}
                                        onChange={this.onChangeEndDate}
                                        onOpenChange={this.handleEndOpenChange}
                                        open={endOpen}
                                        // value={endDate}
                                        value={this.props.beginningEndDate!=null?endDate !=null ? endDate : moment(''+this.props.beginningEndDate, dateFormat):endDate}
                                        format={dateFormat}
                                    />
                                </Col>
                            </Row>
                        : ''
                    }

                    {
                        this.props.enableMonthFilter === true ?
                            <Row>
                                <Col lg={6} md={6} sm={24} xs={24}>
                                    <MonthPicker className="gx-mb-3 gx-w-100"
                                        placeholder ="Select Period"
                                        onChange={this.onChangeMonth}
                                        onOpenChange={this.handleStartOpenChange}
                                        value={period}
                                    />
                                </Col>
                            </Row>
                        : ''
                    }

                    {
                        this.props.enableDowngradeTimeSetFilter === true ?
                            <Row>
                                <Col lg={6} md={6} sm={24} xs={24}>
                                    <DatePicker className="gx-mb-3 gx-w-100"
                                        placeholder ="Select Downgrade Time Set"
                                        onChange={this.onChangeDowngradeTimeSet}
                                        onOpenChange={this.handleStartOpenChange}
                                        value={downgradeTimeSet}
                                    />
                                </Col>
                            </Row>
                        : ''
                    }

                    {
                        this.props.enableDownload === true ?
                            <Row>
                                {
                                    this.props.isTotalBillingAmount === false ?
                                        <Col lg={12} md={12} sm={24} xs={24}>
                                            <Button style={{marginLeft:"0px"}} className='custom-clear-button' onClick={this.clearAll}>Clear filters and sorters</Button>
                                        </Col>
                                        :''
                                }

                                <Col lg={12} md={12} sm={24} xs={24} style={{textAlign: this.props.isTotalBillingAmount === false ?"right":"left"}}>
                                    <Button style={{marginLeft:"0px"}} type="primary" icon="download" onClick={this.downloadCsv.bind(this)}>Download</Button>
                                </Col>
                            </Row>
                            :
                            this.props.title === 'Reconciliation Receiveble' ||  this.props.title === 'Reconciliation Payable' ? '' :
                                <Button className='custom-clear-button' onClick={this.clearAll}>Clear filters and sorters</Button>
                    }

                    {
                        this.props.isTotalBillingAmount === true ?
                            <hr />
                                :''
                    }

                    {
                        this.props.isTotalBillingAmount === true ?
                            // <h3 style={{paddingTop:"2%", paddingBottom:"10%"}}>Total Billing Amount Periode &nbsp;
                            <h4 >Total Billing Amount Periode &nbsp;
                                {startDate!=null?moment(startDate).format('YYYY-MM-DD'):this.props.beginningStartDate} - &nbsp;
                                {endDate!=null?moment(endDate).format('YYYY-MM-DD'):this.props.beginningEndDate} = {totalBillingAmount }
                            </h4>

                            :''
                    }

                    {
                        this.props.isTotalBillingAmount === true ?
                        <br />
                        :''
                    }

                    {
                        this.props.enableUploadMember === true ?
                            <Button className='custom-clear-button' onClick={this.handleUpload}>
                                <Icon type="upload" /> Upload new members
                            </Button>
                        : ''
                    }

                    {
                        this.props.enableUploadReceivers === true ?
                            <Button className='custom-clear-button' onClick={this.handleUpload}>
                                <Icon type="upload" /> Download Example Receivers
                            </Button>
                        : ''
                    }

                    {
                        this.props.enableUploadDoorprize === true ?
                            <Button className='custom-clear-button' onClick={this.handleUpload}>
                                <Icon type="upload" /> Download Example Doorprize
                            </Button>
                        : ''
                    }   

                </div>


                {

                    this.props.title==='Reconciliation Payable' || this.props.title==='Reconciliation Receiveble' || this.props.title === 'Point Transfer Report' ?
                        <Table className="gx-table-responsive" columns={this.props.columns}
                               dataSource={this.state.listData} pagination={pagination}
                            //    expandedRowRender={record => <p style={{ margin: 0 }}>{record.pointTransactionId}</p>}
                               expandedRowRender={
                                   (record,index) =>
                                   this.props.title == 'Point Transfer Report' ? 
                                   <div>{this.detailPointTransfer(record.pointTransferId, index, this.props.title)}</div>:
                                   record.pointTransactionType=='ORDER'?
                                   <div>{this.detailRespReconOrder(record.pointTransactionId, index, this.props.title)}</div>:
                                   record.pointTransactionType==='ISSUING_PROMOTION'?
                                   <div>{this.detailRespReconPointFee(record.pointTransactionId, index)}</div>:
                                   record.pointTransactionType==='REDEEM_REWARD'?
                                   <div>{this.detailRespReconRedeemReward(record.pointTransactionId, index)}</div>:
                                   null
                                   // <span>{record.pointTransactionType}</span>
                               }
                            //    expandedRowKeys={'merchantPayable'}
                            //    expandable={{
                            //        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                            //        rowExpandable: record => record.name !== 'Not Expandable',
                            //    }}
                               onChange={this.handleChange}/>
                       :
                        <Table className="gx-table-responsive" columns={this.props.columns}
                               dataSource={this.state.listData} pagination={pagination}
                               onChange={this.handleChange}/>
                }

                {/*<Table className="gx-table-responsive" columns={this.props.columns}*/}
                {/*       dataSource={this.state.listData} pagination={pagination}*/}
                {/*       // expandable={{*/}
                {/*       //      expandedRowRender: record => <p style={{ margin: 0 }}>{record.pointTransactionId}</p>,*/}
                {/*       //*/}
                {/*       //  }}*/}
                {/*       expandedRowRender={record => <p style={{ margin: 0 }}>{record.pointTransactionId}</p>}*/}
                {/*       rowExpandable={record => this.props.isExpand !== true}*/}
                {/*       expandableRowIcon={<Icon type="right" />}*/}
                {/*       collapsedRowIcon={<Icon type="down" />}*/}
                {/*       onChange={this.handleChange}/>*/}

            </Card>
        );
    }

}

export default (SearchForm);

