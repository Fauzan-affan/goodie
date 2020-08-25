import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchDoorprize,
    filterSortSearch,
    clearFilterSortSearch,
    resetStatus,
} from "appRedux/actions/Doorprize";
import {Button, Col, message, Modal, Row} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";

class SearchDoorprize extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msgContent : '',
            msgType : '',
            msgShow : false,
            onDelete : false,
            idWillDelete: '',
            msgDelete : '',
            search : '',
            nextLocked: 0,
        };

        this.errorNotification = this.errorNotification.bind(this);

    }

    componentWillMount(){
        this.fetchData(this.props.filterAndSort);

    }

    fetchData =(filterAndSort)=>{
        let credential = this.props.authUser;
        const {pagination, sorter, search} = filterAndSort;
        credential.page = 0;
        credential.sortBy = 1;
        credential.sort = 2;
        credential.search = '';

        if(pagination != null){
            credential.page = pagination.current -1;
        }

        if(sorter != null){
            if(sorter.field === 'reward'){
                credential.sortBy = 4;
            }else if(sorter.field === '"memberName"'){
                credential.sortBy = 3;
            }else if(sorter.field === '"period"'){
                credential.sortBy = 1;
            }


            if(sorter.order === 'ascend' ){
                credential.sort = 1
            }else if(sorter.order === 'descend' ){
                credential.sort = 2
            }
        }


        if(search != null){
            credential.search = search;
        }

        this.props.searchDoorprize(credential);
    }

    //Filter page
    filterComponent(pagination, filters, sorter){
        const {search} = this.props.filterAndSort;
        this.props.filterSortSearch(pagination, filters, sorter, search);
    }

    handleSearch(value){
        const {pagination, filters, sorter} = this.props.filterAndSort;
        let newPag = pagination;
        if(pagination != null){
            newPag.current = 1;
        }

        this.setState({
            search : value
        })

        this.props.filterSortSearch(newPag, filters, sorter, value);
    }

    clearFilterComponent(){
        this.props.clearFilterSortSearch();
    }

    componentWillReceiveProps(nextProps){

        //Fetch data after change table
        if(this.props.filterAndSort !== nextProps.filterAndSort){
            this.fetchData(nextProps.filterAndSort);
        }

    }

    onConfirm(){
        this.props.resetStatus();
        let credential = this.props.authUser;
        this.props.searchDoorprize(credential);
    }

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }

    handleAddStock(){
        this.setState({
            enableModalUpload : true,
            errorImport : false
        })
    }

    handleCancel(){
        this.setState({
            enableModalUpload : false
        })
    }


    render() {
        // let component = [];
        let {loader, alertMessage, showMessage} = this.props;
        const { msgShow, msgType, msgContent, enableModalUpload, search } = this.state;
        // let {sorter, filters} = this.props.filterAndSort;
        // let sortedInfo = sorter || {};
        // let filteredInfo = filters || {};

        let filterParam = {
            search : search
        }

        if(this.props.listDoorprize !== undefined) {
            if (this.props.listDoorprize.length > 0) {
                this.props.listDoorprize.forEach((user, i) => {
                    user.key = user.doorPrizeId;
                    user.name = user.period;
                });
            }
        }


        let columns = [{
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        }, {
            title: 'Name',
            dataIndex: 'memberName',
            key: 'memberName',
            // sorter: (a, b) => a.name.length - b.name.length,
            // sortOrder: sortedInfo.columnKey === 'memberName' && sortedInfo.order
        },{
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },{
            title: 'Upload Date',
            dataIndex: 'uploadDate',
            key: 'uploadDate',
        },{
            title: 'Period',
            dataIndex: 'period',
            key: 'period',
            // sorter: (a, b) => a.name.length - b.name.length,
            // sortOrder: sortedInfo.columnKey === 'period' && sortedInfo.order
        },{
            title: 'Reward',
            dataIndex: 'reward',
            key: 'reward',
            // sorter: (a, b) => a.name.length - b.name.length,
            // sortOrder: sortedInfo.columnKey === 'reward' && sortedInfo.order
        },{
            title: 'Winner',
            dataIndex: 'winner',
            key: 'winner',
        }];

        return(
            <div>
                <div>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                    <SweetAlert success={msgType ==='success' ? true : false} danger={msgType ==='danger' ? true : false}
                                show={msgShow} title={msgContent} onConfirm={this.onConfirm.bind(this)}>
                    </SweetAlert>
                </div>
                {loader === false ?
                    <SearchForm
                        columns={columns}
                        listData={this.props.listDoorprize}
                        title='Doorprize List'
                        placeholder='Search by period'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        recordInfo = {this.props.recordInfo}
                        onSearch = {this.handleSearch.bind(this)}
                        filterParam = {filterParam}
                        enableUploadDoorprize = {true}
                        onAddStock = {this.handleAddStock.bind(this)}
                    />
                    : ''
                }
                <div>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                </div>
                {loader === false ?
                    <Modal
                        width={'70%'}
                        title="Download Example Candidates"
                        visible={enableModalUpload}
                        onCancel={this.handleCancel.bind(this)}
                        footer={[
                            <Button key="back" onClick={this.handleCancel.bind(this)}>Back</Button>
                        ]}
                    >
                        <div>
                            <p>You can download candidates for create sample format.</p>
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                    <form method="get" action={window.location.origin.toString()+"/uploadDoorprize.csv"}>
                                        <Button key="download" icon="download" htmlType="submit">
                                            Sample for Candidates
                                        </Button>
                                    </form>
                                </Col>
                            </Row>
                        </div>
                    </Modal>
                    : ''}
                <NotificationContainer/>

            </div>
        );

    }


}

const mapStateToProps = ({auth, doorprizeState}) => {
    const {authUser} = auth;
    const {listDoorprize, recordInfo, filterAndSort, loader, alertMessage, showMessage} = doorprizeState
    return {authUser, listDoorprize, recordInfo, filterAndSort, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {searchDoorprize, filterSortSearch, clearFilterSortSearch,resetStatus})(SearchDoorprize);


