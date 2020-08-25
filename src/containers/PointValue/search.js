import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchPoint,
    filterSortSearch,
    clearFilterSortSearch,
    deletePoint,
    resetStatus,
} from "appRedux/actions/Point";
import {
    message,
    // Form, Modal, Button, Row, Col, Upload, Icon, Table,

} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationManager} from "react-notifications";

// const FormItem = Form.Item;

// const formItemLayout = {
//     labelCol: {xs: 24, sm: 10},
//     wrapperCol: {xs: 24, sm: 14},
// };
//
// const formTailLayout = {
//     labelCol: {xs: 24, sm: 6},
//     wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
// };

class SearchPoint extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msgContent : '',
            msgType : '',
            msgShow : false,
            onDelete : false,
            msgDelete: '',
            idWillDelete: '',
            search : '',
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
            if(sorter.field === 'pointValue'){
                credential.sortBy = 4;
            }else if(sorter.field === '"currency"'){
                credential.sortBy = 3;
            }else if(sorter.field === '"status"'){
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

        this.props.searchPoint(credential);
    }

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
        if (nextProps.deleteSuccess && !nextProps.deleteFailed){
            this.setState({
                msgContent : 'Deleted successfully',
                msgShow : true,
                msgType : 'success',
                onDelete :false
            })
        }else if (!nextProps.deleteSuccess && nextProps.deleteFailed){
            this.setState({
                msgContent : 'Delete failed. '+ nextProps.alertMessage,
                msgShow : true,
                msgType : 'danger',
                onDelete : false
            })
        }else{
            this.setState({
                msgContent : '',
                msgShow : false,
                msgType : '',
                onDelete : false,
            })
        }

        //Fetch data after change table
        if(this.props.filterAndSort !== nextProps.filterAndSort){
            this.fetchData(nextProps.filterAndSort);
        }
    }

    onConfirm(){
        this.props.resetStatus();
        let credential = this.props.authUser;
        this.props.searchPoint(credential);
    }

    viewPoint(id){
        this.props.history.push('/point/view/'+id);
    }

    editPoint(id){
        this.props.history.push(id + '/update');
    }

    deletePointPopup(id){
        this.setState({
            onDelete : true,
            idWillDelete : id
        })
    }

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }

    deletePointProcess(){
        let authCredential = this.props.authUser;
        authCredential.id = this.state.idWillDelete;
        this.props.deletePoint(authCredential);
    }

    onCancelDelete(){
        this.setState({
            onDelete : false,
            idWillDelete : ''
        })
    }


    render() {
        // let component = [];
        let {loader, alertMessage, showMessage} = this.props;
        const { msgShow, msgType, msgContent, onDelete,
            // msgDelete,
            search,
            // enableModalUpload, memberData
        } = this.state;
        let {sorter,
            // filters
        } = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        // let filteredInfo = filters || {};

        let filterParam = {
            search : search
        }

        if(this.props.listPoint !== undefined) {
            if(this.props.listPoint.length > 0){
                this.props.listPoint.forEach((point, i) => {
                    point.key = point.pointValueId;
                    point.name = point.pointValue;
                });
            }
        }

        let columns = [{
            title: 'Point Value',
            dataIndex: 'pointValue',
            key: 'pointValue',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'pointValue' && sortedInfo.order
        },{
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'currency' && sortedInfo.order
        },{
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'startDate' && sortedInfo.order
        },{
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'endDate' && sortedInfo.order
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order
        }
        ];

        return(
            <div>
                <div>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                    <SweetAlert success={msgType ==='success' ? true : false} danger={msgType ==='danger' ? true : false}
                                show={msgShow} title={msgContent} onConfirm={this.onConfirm.bind(this)}>
                    </SweetAlert>
                    <SweetAlert show={onDelete}
                                warning
                                showCancel
                                confirmBtnText='Yes, delete it!'
                                confirmButtonStyle="danger"
                                cancelButtonStyle="default"
                                title={'Are you sure delete this point value ?'}
                                onConfirm={this.deletePointProcess.bind(this)}
                                onCancel={this.onCancelDelete.bind(this)}
                    />
                </div>
                {loader === false ?
                    <SearchForm
                        columns={columns}
                        listData={this.props.listPoint}
                        title='Point Value List'
                        placeholder='Search by start date'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        recordInfo = {this.props.recordInfo}
                        onSearch = {this.handleSearch.bind(this)}
                        filterParam = {filterParam}
                        onView = {this.viewPoint.bind(this)}
                        onEdit = {this.editPoint.bind(this)}
                        onDelete = {this.deletePointPopup.bind(this)}
                    />
                    : ''
                }
            </div>
        );

    }


}

const mapStateToProps = ({auth, pointState}) => {
    const {authUser} = auth;
    const {listPoint, recordInfo, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed,updateSuccess, updateFailed} = pointState
    return {authUser, listPoint, recordInfo, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed,updateSuccess, updateFailed}
};
export default connect(mapStateToProps, {searchPoint, filterSortSearch, clearFilterSortSearch,deletePoint,resetStatus})(SearchPoint);


