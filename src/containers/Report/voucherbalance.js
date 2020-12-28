import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import AmCharts from "@amcharts/amcharts3-react";
import {
    voucherBalanceReport,
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
import BreadcrumbSeparator from "antd/lib/breadcrumb/BreadcrumbSeparator";

const { TabPane } = Tabs;

class VoucherBalanceReport extends Component {
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
            status : -1,
            productName : '',
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
            // filters, sorter
        } = filterAndSort;
        credential.page = 0;
        credential.memberName = '';
        credential.startDate = '';
        credential.endDate = '';
        credential.trxType = -1;
        credential.productName = '';
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

        if(customFilter != null){
            if(customFilter.status !== undefined && customFilter.status !== null){
                credential.status = customFilter.status;
            }

            if(customFilter.productName !== undefined && customFilter.productName !== null){
                credential.productName = customFilter.productName;
            }
        }

        this.props.voucherBalanceReport(credential);
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

    handleFilterStatus(status){
        const {search, pagination, filters, sorter, startDate, endDate, customFilter} = this.props.filterAndSort;

        let newPag = pagination;
        if(pagination != null){
            newPag.current = 1;
        }

        this.setState({
            status : status
        })

        let newCustomFilter = {
            status : status,
            // productName : customFilter.productName
        }


        this.props.filterSortSearch(newPag, filters, sorter, search, startDate, endDate, newCustomFilter);
    }

    handleFilterProductName(productName){
        const {search, pagination, filters, sorter, startDate, endDate, customFilter} = this.props.filterAndSort;

        let newPag = pagination;
        if(pagination != null){
            newPag.current = 1;
        }

        this.setState({
            productName : productName
        })

        let newCustomFilter = {
            // status : customFilter.status,
            productName : productName
        }


        this.props.filterSortSearch(newPag, filters, sorter, search, startDate, endDate, newCustomFilter);
    }


    clearFilterComponent(){
        this.setState({
            search : '',
            startDate : null,
            endDate : null,
            productName : '',
            status : -1
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

        let {search, endDate, startDate, status, productName} = this.state;

        if(this.props.result.length > 0){
            this.props.result.forEach((res, i) => {
                res.key = i;
                res.name = res.memberName;
            });
        }

        const data = [...result.reduce( (item, o) => {
            if (!item.has(o.productName)) item.set(o.productName, { ...o, Active:0, Redeem: 0, Expired: 0});
            if(o.status == 'Active')
            item.get(o.productName).Active++
            if(o.status == 'Redeemed')
            item.get(o.productName).Redeem++
            if(o.status == 'Expired')
            item.get(o.productName).Expired++
            return item;
        }, new Map).values()];

        let filterParam = {
            search : search,
            endDate : endDate,
            startDate : startDate,
            status : status,
            productName : productName
        }

        let columns = [{
            title: 'Member User Name',
            dataIndex: 'memberUsername',
            label : 'Member User Name',
            key: 'memberUsername'
        },{
            title: 'Product Name',
            dataIndex: 'productName',
            label : 'Product Name',
            key: 'productName'
        },{
            title: 'Voucher Id',
            dataIndex: 'voucherId',
            label : 'Voucher Id',
            key: 'voucherId'
        },{
            title: 'Created Date',
            dataIndex: 'createdDate',
            label: 'Created Date',
            key: 'createdDate',
        },{
            title: 'Status',
            dataIndex: 'status',
            label: 'Status',
            key: 'status',
        },{
            title: 'Redeem Date',
            dataIndex: 'redeemDate',
            label: 'Redeem Date',
            key: 'redeemDate',
        }
        ];

        const config = {
            "type": "serial",
            "categoryField": "productName",
            "startDuration": 1,
            "export": {
                "enabled": true
            },
            "categoryAxis": {
                "gridPosition": "start"
            },
            "chartCursor": {
                "enabled": true
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[productName]] of [[title]] :[[value]]",
                    "bullet": "round",
                    "id": "AmGraph-1",
                    "markerType": "square",
                    "title": "Active",
                    "type": "smoothedLine",
                    "valueField": "Active"
                },
                {
                    "balloonText": "[[productName]] of [[title]] :[[value]]",
                    "bullet": "square",
                    "id": "AmGraph-2",
                    "markerType": "square",
                    "title": "Redeem",
                    "type": "smoothedLine",
                    "valueField": "Redeem"
                },
                {
                    "balloonText": "[[productName]] of [[title]] :[[value]]",
                    "bullet": "square",
                    "id": "AmGraph-3",
                    "markerType": "square",
                    "title": "Expired",
                    "type": "smoothedLine",
                    "valueField": "Expired"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    // "title": "Axis title",
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
                    "text": "Chart Report Voucher Balance"
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
                                    title='Voucher Balance Report'
                                    placeholder='Search members by name'
                                    onFilter={this.filterComponent.bind(this)}
                                    onClearFilter={this.clearFilterComponent.bind(this)}
                                    recordInfo = {recordInfo}
                                    onSearch = {this.handleSearch.bind(this)}
                                    enableDateFilter = {true}
                                    onFilterDate = {this.handleFilterDate.bind(this)}
                                    enableProductNameFilter = {true}
                                    onFilterProductName = {this.handleFilterProductName.bind(this)}
                                    enableStatusFilter = {true}
                                    onFilterStatus = {this.handleFilterStatus.bind(this)}
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
                    filename={"Voucher Balance Report.csv"}
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
export default connect(mapStateToProps, {voucherBalanceReport, filterSortSearch, clearFilterSortSearch})(VoucherBalanceReport);


