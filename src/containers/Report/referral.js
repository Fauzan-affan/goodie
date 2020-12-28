import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    referralReport,
    filterSortSearch,
    clearFilterSortSearch
} from "appRedux/actions/Report";
import {message,Tabs, Card,
    // Card, Col,
} from "antd";
import AmCharts from "@amcharts/amcharts3-react";
import CircularProgress from "components/CircularProgress/index";
// import SweetAlert from "react-bootstrap-sweetalert";
import moment from 'moment';
import {CSVLink} from "react-csv";

const { TabPane } = Tabs;

class ReferralReport extends Component {
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
            credential.startDate = moment(startDate).format('YYYY-MM-DD');
        }

        if(endDate != null){
            credential.endDate = moment(endDate).format('YYYY-MM-DD');
        }

        this.props.referralReport(credential);
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
            });
        }

        function getData() {
            let listData = [];

            for (let i = 0; i < result.length; i++) {
              let total = 0;
              let memberName = '';
                for (let j = 0; j < result.length; j++) {
                    if (result[i].date === result[j].date) {
                        memberName = result[j].memberName
                    }
                }
          
                listData.push({
                    date: result[i].date,
                    memberName
                });
            }
            return listData;
        }

        const data = [...getData().reduce( (item, o) => {
            if (!item.has(o.memberName)) item.set(o.memberName, { ...o, value: 0});
            item.get(o.memberName).value++
            return item;
        }, new Map).values()];

        // sorter by month a year
        // let sorted = result.sort((a, b)  =>{
        //     return new Date(b.date) - new Date(a.date);
        // });

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
            title: 'Member Receiver Name',
            dataIndex: 'memberReceiverName',
            label: 'Member Receiver Name',
            key: 'memberReceiverName',
        }
        ];

        const config = {
            "type": "pie",
            "theme": "light",
            "dataProvider": data,
            "titleField": "memberName",
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
               "titles": [
                   {
                       "id": "Title-1",
                       "size": 15,
                       "text": "Chart Report Referral"
                   }
               ],
            "export": {
                "enabled": true
            }
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
                                    title='Referral Member Report'
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
                    filename={"Referral Report.csv"}
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
export default connect(mapStateToProps, {referralReport, filterSortSearch, clearFilterSortSearch})(ReferralReport);


