import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import AmCharts from "@amcharts/amcharts3-react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
import {
    issuingReport,
    filterSortSearch,
    clearFilterSortSearch
} from "appRedux/actions/Report";
import {message, Tabs, Card
    // Card, Col,
} from "antd";
import CircularProgress from "components/CircularProgress/index";
// import SweetAlert from "react-bootstrap-sweetalert";
import moment from 'moment';
import {CSVLink} from "react-csv";

const { TabPane } = Tabs;

class IssuingReport extends Component {
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
        const {pagination, search, startDate, endDate,
            // filters, sorter, trxType,
        } = filterAndSort;
        credential.page = 0;
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
            credential.startDate = moment(startDate).format('YYYY-MM-DD');
        }

        if(endDate != null){
            credential.endDate = moment(endDate).format('YYYY-MM-DD');
        }

        this.props.issuingReport(credential);
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
            // console.log("OUT >>"+ this.csvLink.current.link )
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

        let {search, endDate, startDate} = this.state;

        if(this.props.result.length > 0){
            this.props.result.map((res, i) => {
                res.key = i;
                res.name = res.memberName;
                // res.date = moment(res.date, 'DD/MM/YYYY'); 
                // //format that date into a different format
                // res.date = (moment(res.date).format("MMMM"))
            });

        }

        const data = [...result.reduce( (item, o) => {
            if (!item.has(o.promotionName)) item.set(o.promotionName, { ...o, value: 0 });
            item.get(o.promotionName).value++;
            return item;
        }, new Map).values()];

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
            title: 'Promotion Name',
            dataIndex: 'promotionName',
            label: 'Promotion Name',
            key: 'promotionName',
        },{
            title: 'Rule Type',
            dataIndex: 'ruleType',
            label: 'Rule Type',
            key: 'ruleType',
        },{
            title: 'Rule Name',
            dataIndex: 'ruleName',
            label: 'Rule Name',
            key: 'ruleName',
        },{
            title: 'Point',
            dataIndex: 'point',
            label: 'Point',
            key: 'point',
        }];

        const config = {
            "type": "pie",
            "theme": "light",
            "dataProvider": data,
            "titleField": "promotionName",
            "valueField": "value",
            "labelRadius": 5,
            "outlineAlpha": 0.4,
            "depth3D": 8,
            "radius": "42%",
            // "innerRadius": "60%",
            "labelText": "[[title]]",
            "angle": 30,

            "legend":{
                "position":"bottom",
                "marginBottom":8    ,
                "autoMargins":false,
               },

            "export": {
                "enabled": true
            },
            "titles": [
                {
                    "id": "Title-1",
                    "size": 15,
                    "text": "Chart Report Issuing"
                }
            ],
        };

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
                                            title= 'Issuing Report'
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
                    filename={"Issuing Report.csv"}
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
export default connect(mapStateToProps, {issuingReport, filterSortSearch, clearFilterSortSearch})(IssuingReport);


