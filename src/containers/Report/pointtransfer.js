import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    pointTransferReport,
    filterSortSearch,
    clearFilterSortSearch
} from "appRedux/actions/Report";
import { message, Tabs, Card, } from "antd";
import AmCharts from "@amcharts/amcharts3-react";
import moment from 'moment';
import CircularProgress from "components/CircularProgress/index";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {CSVLink} from "react-csv";
import _ from 'lodash';

const { TabPane } = Tabs;


class PointTransferReport extends Component {
    csvLink = React.createRef();
    filterParam2 = {
        endDate : null,
        startDate : null,
    }

    constructor(props) {
        super(props);

        this.state = {
            msgContent : '',
            msgType : '',
            msgShow : false,
            onDelete : false,
            msgDelete: '',
            idWillDelete: '',
            nextStatus: 0,
            search : '',
            startDate : null,
            endDate : null,
            downloadPointTransfer : [],
        };


        this.fetchData = this.fetchData.bind(this);
        this.setValueStateDate = this.setValueStateDate.bind(this);

    }

    componentWillMount(){
        this.clearFilterComponent();
        // this.fetchData(this.props.filterAndSort, false);
    }

    // errorNotification(message){
    //     return NotificationManager.error(message, 'Alert', 3000);
    // }

    fetchData =(filterAndSort, isDownload)=>{
        let credential = this.props.authUser;
        const {pagination, search, startDate, endDate,
            // filters, sorter, trxType,
        } = filterAndSort;
        credential.page = 0;
        credential.username = '';
        credential.startDate = '';
        credential.endDate = '';
        credential.pageSize = 20;
        credential.isDownload = isDownload;

        if(isDownload === false){
            if(pagination != null){
                credential.page = pagination.current - 1;
            }
        }else{
            credential.pageSize = 9999999;
        }

        if(search != null){
            credential.username = search;
        }

        if(startDate != null){
            credential.startDate = moment(startDate).format('YYYY-MM-DD' + ' ' + '00:00:00');
        }

        if(endDate != null){
            credential.endDate = moment(endDate).format('YYYY-MM-DD' + ' ' + '23:59:59');
        }

        this.props.pointTransferReport(credential);
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
            this.fetchData(nextProps.filterAndSort, false);
        }

        if(nextProps.downloadPointTransfer !== this.props.downloadPointTransfer){
            this.setState({
                downloadPointTransfer : nextProps.downloadPointTransfer
            })
        }

    }

    handleDownload(){
        this.fetchData(this.props.filterAndSort, true);
    }

    componentDidUpdate() {
        // Download data
        if(this.state.downloadPointTransfer.length > 0 ){
            this.csvLink.current.link.click();

            //Empty data
            this.setState({
                downloadPointTransfer : []
            })
        }
    }

    setValueStateDate(startDate, endDate){
        this.setState({
            startDate : startDate,
            endDate : endDate
        })
    }

    render() {
        let {loader, alertMessage, showMessage, recordInfo, listPointTransfer} = this.props;
        let {search, startDate, endDate, downloadPointTransfer} = this.state;
        let filterParam = {
            search : search,
            endDate : endDate,
            startDate : startDate,
        }

        // get detail pointTransferHistoryList
        let pointTransferList = listPointTransfer.map((item, index) => {
            return {
                key : index,
                pointTransferId: item.pointTransferId,
                detectAccount: item.detectAccount,
                transferDate: item.transferDate,
                date: moment(item.transferDate).format('YYYY-MM'),
                // // point Deduct Detail
                pointDeduct: item.detail[0].pointDeduct,
                pointValueDeduct: item.detail[0].pointValueDeduct,
                pointValue: item.detail[0].pointValue,
                pointTransactionId: item.detail[0].pointTransactionId,
                merchantId: item.detail[0].merchantId,
                mobileNumber: item.detail[0].mobileNumber,
                memberUsername: item.detail[0].memberUsername,
                memberId: item.detail[0].memberId,
                merchantName: item.detail[0].merchantName,
                //point Adjustment Detail
                pointAdjustment:item.detail[1].pointAdjustment,
                pointValueAdjustment:item.detail[1].pointValueAdjustment,
                pointValue:item.detail[1].pointValue,
                pointTransactionIdAdjustment:item.detail[1].pointTransactionId,
                merchantIdAdjustment:item.detail[1].merchantId,
                mobileNumberAdjustment:item.detail[1].mobileNumber,
                memberUsernameAdjustment:item.detail[1].memberUsername,
                memberIdAdjustment:item.detail[1].memberId,
                merchantNameAdjustment:item.detail[1].merchantName,
            }
        })

        // sum points for graph chart
        function getData() {
            let listData = [];

            for (let i = 0; i < pointTransferList.length; i++) {
              let quantity = 0;
                for (let j = 0; j < pointTransferList.length; j++) {
                    if (pointTransferList[i].merchantName === pointTransferList[j].merchantName) {
                        // quantity += pointTransferList[j].quantity;
                    }
                }
          
                listData.push({
                    date : pointTransferList[i].date,
                    merchantName: pointTransferList[i].merchantName,
                    // quantity,
                });
            }
            return listData;
        }

        // remove duplicate by reward Name
        const data = [...getData().reduce( (item, o) => {
            if (!item.has(o.merchantName)) item.set(o.merchantName, { ...o, value: 0});
            item.get(o.merchantName).value++
            return item;
        }, new Map).values()];

        // sorter by month a year
        let sorted = data.sort((a, b)  =>{
            return new Date(a.date) - new Date(b.date);
        });

        // sorted by month a year for line chart
        let byYearAndByMonth = {};
        _.each(sorted, (item) => {
                var year = item.date.substring(0,4)
                var month = item.date.substring(5,7)
        
            if (typeof byYearAndByMonth[year] === "undefined") {
                    byYearAndByMonth[year] = {};
            }
            
            if (typeof byYearAndByMonth[year][month] === "undefined") {
                byYearAndByMonth[year][month] = [];
            }
            
            byYearAndByMonth[year][month].push(item);
         }); 

         // end sorter for line chart
        
        // column for search //

        let columns = [
            {
            title: 'Point Transfer Id',
            dataIndex: 'pointTransferId',
            label : 'Point Transfer Id',
            key: 'pointTransferId',
            },
            {
                title: 'Merchant Name',
                dataIndex: 'merchantName',
                label : 'Merchant Name',
                key: 'merchantName',
            },
            {
                title: 'Transfer Date',
                dataIndex: 'transferDate',
                label : 'Transfer Date',
                key: 'transferDate',
            },
            {
                title: 'Mobile Number',
                dataIndex: 'mobileNumber',
                label : 'Mobile Number',
                key: 'mobileNumber',
            },
            {
                title: 'Member Email',
                dataIndex: 'memberUsername',
                label : 'Member Email',
                key: 'memberUsername',
            },
            {
                title: 'Point Value Deduct',
                dataIndex: 'pointValueDeduct',
                label : 'Point Value Deduct',
                key: 'pointValueDeduct',
            },
            {
                title: 'Point Deduct',
                dataIndex: 'pointDeduct',
                label : 'Point Deduct',
                key: 'pointDeduct',
            }
        ];

        const config = {
            "type": "serial",
            "categoryField": "date",
            "dataDateFormat": "YYYY-MM",
            "startDuration": 1,
            "export": {
                "enabled": true
            },
            "categoryAxis": {
                "minPeriod": "MM",
                // "parseDates": true,
                "gridPosition": "start"
            },
            "chartCursor": {
                "enabled": true,
                "categoryBalloonDateFormat": "MMM YYYY"
            },
            "trendLines": [],
            "graphs": [
                // {
                //     "balloonText": "[[title]] of [[rewardName]] :[[value]]",
                //     "bullet": "round",
                //     "id": "AmGraph-1",
                //     "markerType": "square",
                //     "title": "Quantity",
                //     "type": "smoothedLine",
                //     "valueField": "quantity"
                // },
                {
                    "balloonText": "[[title]] of [[merchantName]] :[[value]]",
                    "bullet": "square",
                    "id": "AmGraph-2",
                    "markerType": "square",
                    "title": "Value",
                    "type": "smoothedLine",
                    "valueField": "value"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    // "title": "Axis title"
                }
            ],
            "allLabels": [],
            "balloon": {},
            "legend": {
                "position":"left",
                "enabled": true,
                "useGraphSettings": true
            },
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": "Chart Report Point Transfer"
                }
            ],
            "dataProvider": sorted
        }


        return(
            <div>
                <div>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                </div>

                <Card>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Chart Report" key="1">
                            <Card className="gx-card"  title="">
                                <div className="App">
                                    <AmCharts.React style={{width: "100%", height: "500px"}} options={config}/>
                                </div>
                            </Card>
                        </TabPane>
                        <TabPane tab="Table Report" key="2">
                            {loader === false ?
                                <SearchForm
                                    columns={columns}
                                    listData={pointTransferList}
                                    title='Point Transfer Report'
                                    placeholder='Search by Member Email'
                                    onFilter={this.filterComponent.bind(this)}
                                    onClearFilter={this.clearFilterComponent.bind(this)}
                                    recordInfo = {recordInfo}
                                    onSearch = {this.handleSearch.bind(this)}
                                    // enablePhoneNumber = {true}                       
                                    enableDownload = {true}
                                    onDownload = {this.handleDownload.bind(this)}
                                    downloadPointTransfer = {downloadPointTransfer}
                                    enableDateFilter = {true}
                                    onFilterDate = {this.handleFilterDate.bind(this)}
                                    filterParam = {filterParam}
                                    isExpand = {true}
                                />
                                : ''
                            }
                        </TabPane>
                    </Tabs>
                </Card>


                <CSVLink
                    data={pointTransferList} headers= {columns}
                    filename={"Point Transfer Report.csv"}
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

const mapStateToProps = ({auth, reportState}) => {
    const {authUser} = auth;
    const {response, recordInfo, listPointTransfer, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, downloadPointTransfer} = reportState;
    return {authUser, response, recordInfo, listPointTransfer, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, downloadPointTransfer}
};
export default connect(mapStateToProps, {
    pointTransferReport, filterSortSearch, clearFilterSortSearch})(PointTransferReport);


