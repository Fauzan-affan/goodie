import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import AmCharts from "@amcharts/amcharts3-react";
import {
    pointTransactionReport,
    filterSortSearch,
    clearFilterSortSearch
} from "appRedux/actions/Report";
import {message, Tabs, Card,
    // Card, Col
} from "antd";
import CircularProgress from "components/CircularProgress/index";
// import SweetAlert from "react-bootstrap-sweetalert";
import moment from 'moment';
import {CSVLink} from "react-csv";
import _ from 'lodash';

const { TabPane } = Tabs;

class PointTransactionReport extends Component {
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
            trxType : 0,
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
        const {pagination, search, startDate, endDate, customFilter,
            // filters, sorter,
        } = filterAndSort;
        credential.page = 0;
        credential.memberName = '';
        credential.startDate = '';
        credential.endDate = '';
        credential.trxType = 0;
        credential.pageSize = 10;
        credential.isDownload = isDownload;

        if(isDownload === false){
            if(pagination != null){
                credential.page = pagination.current - 1;
            }
        }else{
            credential.pageSize = 9999999;
        }

        // if(sorter != null){
        //     if(sorter.field === 'memberName'){
        //         credential.sortBy = 4;
        //     }else if(sorter.field === '"memberUsername"'){
        //         credential.sortBy = 3;
        //     }else if(sorter.field === '"pointBalance"'){
        //         credential.sortBy = 1;
        //     }
        //
        //
        //     if(sorter.order === 'ascend' ){
        //         credential.sort = 1
        //     }else if(sorter.order === 'descend' ){
        //         credential.sort = 2
        //     }
        // }

        if(search != null){
            credential.memberName = search;
        }

        if(startDate != null){
            credential.startDate = moment(startDate).format('YYYY-MM-DD'+ ' ' +'00:00:00');
        }

        if(endDate != null){
            credential.endDate = moment(endDate).format('YYYY-MM-DD'+ ' ' +'23:59:59');
        }

        if(customFilter != null){
            if(customFilter.trxType !== undefined && customFilter.trxType != null){
                credential.trxType = customFilter.trxType;
            }
        }

        this.props.pointTransactionReport(credential);
    }

    //Filter page
    filterComponent(pagination, filters, sorter){
        const {search, startDate, endDate, customFilter} = this.props.filterAndSort;
        this.props.filterSortSearch(pagination, filters, sorter, search, startDate, endDate, customFilter);
    }

    handleSearch(value){
        const {pagination, filters, sorter, startDate, endDate, customFilter} = this.props.filterAndSort;

        let newPag = pagination;
        if(pagination != null){
            newPag.current = 1;
        }

        this.setState({
            search : value
        })

        this.props.filterSortSearch(newPag, filters, sorter, value, startDate, endDate, customFilter);
    }

    handleFilterDate(type, dateString){
        const {search, pagination, filters, sorter, startDate, endDate, customFilter} = this.props.filterAndSort;
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

        this.props.filterSortSearch(newPag, filters, sorter, search, stDate, enDate, customFilter);
    }

    handleFilterTrxType(type){
        const {search, pagination, filters, sorter, startDate, endDate} = this.props.filterAndSort;

        let newPag = pagination;
        if(pagination != null){
            newPag.current = 1;
        }

        this.setState({
            trxType : type
        })

        let newCustomFilter = {
            trxType : type
        }


        this.props.filterSortSearch(newPag, filters, sorter, search, startDate, endDate, newCustomFilter);
    }


    clearFilterComponent(){
        this.setState({
            search : '',
            startDate : null,
            endDate : null,
            trxType : 0
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

    renderColorfulLegendText(value, entry) {
        const { color } = entry;
      
      return <span style={{ color }}>{value}</span>;
    }

    render() {
        // let component = [];
        let {loader, alertMessage, showMessage, result, recordInfo} = this.props;
        const {downloadData} = this.state;

        let {search, endDate, startDate, trxType} = this.state;

        if(this.props.result.length > 0){
            this.props.result.forEach((res, i) => {
                res.key = i;
                res.name = res.memberName;
                // res.date = moment(res.date, 'DD/MM/YYYY'); 
                //format that date into a different format
                res.date = (moment(res.date).format("YYYY-MM-DD hh:mm:ss"))
                res.dateDay = (moment(res.date).format("YYYY-MM-DD"))
            });
        }

        const data = [...result.reduce( (item, o) => {
            if (!item.has(o.date)) item.set(o.date, { ...o, issuing: 0, redeem : 0 });
            item.get(o.date);
            if(o.trxType == 'Issuing')
            item.get(o.date).issuing++
            if(o.trxType == 'Redeem')
            item.get(o.date).redeem++
            return item;
        }, new Map).values()];

        // sorter by month a year
        // let sorted = result.sort((a, b)  =>{
        //     return new Date(b.date) - new Date(a.date);
        // });

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
            startDate : startDate,
            trxType : trxType
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
            title: 'Transaction Type',
            dataIndex: 'trxType',
            label: 'Transaction Type',
            key: 'trxType',
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
                    "balloonText": "[[title]] :[[value]]",
                    "bullet": "round",
                    "id": "AmGraph-1",
                    "markerType": "square",
                    "title": "Issuing",
                    "type": "smoothedLine",
                    "valueField": "issuing"
                },
                {
                    "balloonText": "[[title]] :[[value]]",
                    "bullet": "square",
                    "id": "AmGraph-2",
                    "markerType": "square",
                    "title": "Redeem",
                    "type": "smoothedLine",
                    "valueField": "redeem"
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
                    "text": "Chart Report Point Transaction"
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
                                    title='Point Transaction Report'
                                    placeholder='Search members by name'
                                    onFilter={this.filterComponent.bind(this)}
                                    onClearFilter={this.clearFilterComponent.bind(this)}
                                    recordInfo = {recordInfo}
                                    onSearch = {this.handleSearch.bind(this)}
                                    enableDateFilter = {true}
                                    onFilterDate = {this.handleFilterDate.bind(this)}
                                    enableTrxTypeFilter = {true}
                                    onFilterTrxType = {this.handleFilterTrxType.bind(this)}
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
                    filename={"Point Transaction Report.csv"}
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
export default connect(mapStateToProps, {pointTransactionReport, filterSortSearch, clearFilterSortSearch})(PointTransactionReport);


