import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    redeemReport,
    filterSortSearch,
    clearFilterSortSearch
} from "appRedux/actions/Report";
import {message, Tabs, Card,
    // Card, Col,
} from "antd";
import AmCharts from "@amcharts/amcharts3-react";
import CircularProgress from "components/CircularProgress/index";
// import SweetAlert from "react-bootstrap-sweetalert";
import moment from 'moment';
import {CSVLink} from "react-csv";
import _ from 'lodash';

const { TabPane } = Tabs;

class RedeemReport extends Component {
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
            nextStatus: 0,
            startDate : null,
            endDate : null,
            search : '',
            downloadData : []
        };

    }

    componentWillMount(){
        this.clearFilterComponent();
        // this.fetchData(this.props.filterAndSort);
    }

    fetchData =(filterAndSort, isDownload)=>{
        let credential = this.props.authUser;
        const {pagination, search, startDate, endDate, sorter,
            // filters,  trxType,
        } = filterAndSort;

        credential.page = 0;
        credential.sortBy = 0;
        credential.sort = 1;
        credential.memberName = '';
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
            credential.memberName = search;
        }

        if(startDate != null){
            credential.startDate = moment(startDate).format('YYYY-MM-DD');
        }

        if(endDate != null){
            credential.endDate = moment(endDate).format('YYYY-MM-DD');
        }

        this.props.redeemReport(credential);
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
            endDate : null
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

    render() {
        // let component = [];
        let {loader, alertMessage, showMessage, result, recordInfo} = this.props;
        const {downloadData} = this.state;

        let {search, endDate, startDate} = this.state;

        if(this.props.result.length > 0){
            this.props.result.forEach((res, i) => {
                res.key = i;
                res.name = res.memberName;
                // res.date = moment(res.date, 'DD/MM/YYYY');
                // // //format that date into a different format
                res.date = (moment(res.date).format("YYYY-MM-DD hh:mm:ss"))
                res.dateDay = (moment(res.date).format("YYYY-MM-DD"))
            });
        }

        // sum points for graph chart
        function getData() {
            let listData = [];

            for (let i = 0; i < result.length; i++) {
              let quantity = 0;
                for (let j = 0; j < result.length; j++) {
                    if (result[i].rewardName === result[j].rewardName) {
                        quantity += result[j].quantity;
                    }
                }
          
                listData.push({
                    date : result[i].date,
                    dateDay : result[i].dateDay,
                    rewardName: result[i].rewardName,
                    quantity,
                });
            }
            return listData;
        }

        // remove duplicate by reward Name
        const data = [...getData().reduce( (item, o) => {
            if (!item.has(o.rewardName)) item.set(o.rewardName, { ...o, value: 0});
            item.get(o.rewardName).value++
            return item;
        }, new Map).values()];

        console.log(data)

        // sorted by month a year for line chart
        let byYearAndByMonth = {};
        _.each(data, (item) => {
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

        let filterParam = {
            search : search,
            endDate : endDate,
            startDate : startDate
        }

        let columns = [{
            title: 'Member Name',
            dataIndex: 'memberName',
            label : 'Member Name',
            key: 'memberName'
        },{
            title: 'Date',
            dataIndex: 'date',
            label: 'Date',
            key: 'date',
        },{
            title: 'Transaction ID Reference',
            dataIndex: 'transactionIdReference',
            label: 'Transaction ID Reference',
            key: 'transactionIdReference',
        },{
            title: 'Reward Name',
            dataIndex: 'rewardName',
            label: 'Reward Name',
            key: 'rewardName',
        },{
            title: 'Product Name',
            dataIndex: 'productName',
            label: 'Product Name',
            key: 'productName',
        },{
            title: 'Quantity',
            dataIndex: 'quantity',
            label: 'Quantity',
            key: 'quantity',
        },{
            title: 'Point',
            dataIndex: 'point',
            label: 'Point',
            key: 'point',
        }];

        const config = {
            "type": "serial",
            "categoryField": "dateDay",
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
                {
                    "balloonText": "[[title]] of [[rewardName]] :[[value]]",
                    "bullet": "round",
                    "id": "AmGraph-1",
                    "markerType": "square",
                    "title": "Quantity",
                    "type": "smoothedLine",
                    "valueField": "quantity"
                },
                {
                    "balloonText": "[[title]] of [[rewardName]] :[[value]]",
                    "bullet": "square",
                    "id": "AmGraph-2",
                    "markerType": "square",
                    "title": "value",
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
                    "text": "Chart Report Redeem Reward"
                }
            ],
            "dataProvider": data
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
                                    listData={result}
                                    title='Redeem Report'
                                    placeholder='Search members by name'
                                    onFilter={this.filterComponent.bind(this)}
                                    onClearFilter={this.clearFilterComponent.bind(this)}
                                    recordInfo = {recordInfo}
                                    onSearch = {this.handleSearch.bind(this)}
                                    enableDateFilter = {true}
                                    onFilterDate = {this.handleFilterDate.bind(this)}
                                    enableDownload = {true}
                                    onDownload = {this.handleDownload.bind(this)}
                                    downloadData = {downloadData}
                                    filterParam = {filterParam}
                                />
                                : ''
                            }
                        </TabPane>
                    </Tabs>
                </Card>

                <CSVLink
                    data={downloadData} headers={columns}
                    filename={"Redeem Report.csv"}
                    style={{display:'none'}}
                    ref={this.csvLink}
                >
                    Download
                </CSVLink>
            </div>
        );

    }


}

const mapStateToProps = ({auth, reportState}) => {
    const {authUser} = auth;
    const {result, recordInfo, filterAndSort, loader, alertMessage, showMessage, downloadData} = reportState
    return {authUser, result, recordInfo, filterAndSort, loader, alertMessage, showMessage, downloadData}
};
export default connect(mapStateToProps, {redeemReport, filterSortSearch, clearFilterSortSearch})(RedeemReport);


