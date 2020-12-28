import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchStore,
    filterSortSearch,
    clearFilterSortSearch,
    resetStatus,
    deleteStore,
} from "appRedux/actions/Store";
import { Button, Col, Icon, message, Modal, Row, Table, Upload, Form, Radio } from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";

const FromItem = Form.Item;


class SearchStore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msgContent : '',
            msgType : '',
            msgShow : false,
            onDelete : false,
            msgDelete: '',
            id: '',
            search : '',
            errorImport : false,
            idWillDelete: '',
        };

        this.errorNotification = this.errorNotification.bind(this);

    }

    componentWillMount(){
    //     let credential = this.props.authUser;
    //     this.props.searchStore(credential);
        this.fetchData(this.props.filterAndSort);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.deleteSuccess && !nextProps.deleteFailed){
            this.setState({
                msgContent : 'Deleted Successfully',
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
                onDelete : false
            })
        }

        //Fetch data after change table
        if(this.props.filterAndSort !== nextProps.filterAndSort){
            this.fetchData(nextProps.filterAndSort);
        }
    }

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }

    fetchData =(filterAndSort)=>{
        let credential = this.props.authUser;
        const {pagination, sorter, search,
            // filters
        } = filterAndSort;
        credential.page = 0;
        credential.sort = 2;
        credential.search = '';
        credential.searchStoreCode = '';
        credential.isAllStore = 0;

        if(pagination != null){
            credential.page = pagination.current - 1;
        }

        if(sorter != null){
            if(sorter.order === 'ascend' ){
                credential.sort = 1
            }else if(sorter.order === 'descend' ){
                credential.sort = 2
            }
        }

        if(search != null){
            credential.search = search;
        }

        this.props.searchStore(credential);
    }

    filterComponent(pagination, filters, sorter){
        this.props.filterSortSearch(pagination, filters, sorter);
    }

    clearFilterComponent(){
        this.props.clearFilterSortSearch();
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

    onConfirm(){
        this.props.resetStatus();
        let credential = this.props.authUser;
        this.props.searchStore(credential);
    }

    viewStore(id){
        this.props.history.push('/store/view/'+id);
    }

    editStore(id){
        this.props.history.push(id + '/update');
        // localStorage.setItem('idForUpdate', id);
    }

    deleteStorePopup(id, stores){
        let msgDel = '';
        stores = [];
        if(stores.length > 0){
            let progLen = stores.length;
            let progName = '';
            stores.forEach((store, i) => {
                if(i !== 0){
                    progName += ', ';
                }
                progName += store.storeName;
            })

            msgDel = 'There are '+progLen+' stores '+progName+'. Program will be deleted too.';
        }
        this.setState({
            msgDelete: msgDel,
            onDelete : true,
            idWillDelete : id
        })
    }

    deleteStoreProcess(){
        let authCredential = this.props.authUser;
        authCredential.id = this.state.idWillDelete;
        this.props.deleteStore(authCredential);
    }

    onCancelDelete(){
        this.setState({
            onDelete : false,
            idWillDelete : ''
        })
    }

    render() {
        let {loader, alertMessage, showMessage} = this.props;
        const { msgShow, msgType, msgContent, onDelete, msgDelete, search } = this.state;
        let {sorter, filters} = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        let filteredInfo = filters || {};

        if(this.props.listStore.length > 0){
            this.props.listStore.forEach((user, i) => {
                user.key = user.storeId;
            });
        }

        let filterParam = {
            search : search
        }

        let columns = [
        //{
        //     title: 'Store Id',
        //     dataIndex: 'storeId',
        //     key: 'storeId',
        //     sorter: (a, b) => a.storeId.length - b.storeId.length,
        //     sortOrder: sortedInfo.columnKey === 'storeId' && sortedInfo.order
        // }, 
        {
            title: 'Store Code',
            dataIndex: 'storeCode',
            key: 'storeCode',
            sorter: (a, b) => a.storeCode.length - b.storeCode.length,
            sortOrder: sortedInfo.columnKey === 'storeCode' && sortedInfo.order,
        }, {
            title: 'Store Name',
            dataIndex: 'storeName',
            key: 'storeName',
            sorter: (a, b) => a.storeName.length - b.storeName.length,
            sortOrder: sortedInfo.columnKey === 'storeName' && sortedInfo.order,
        }, {
            title: 'Merchant Name',
            dataIndex: 'merchantName',
            key: 'merchantName',
            sorter: (a, b) => a.merchantName.length - b.merchantName.length,
            sortOrder: sortedInfo.columnKey === 'merchantName' && sortedInfo.order,
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
        }, {
            title: 'Pin',
            dataIndex: 'pin',
            key: 'pin',
            sorter: (a, b) => a.pin.length - b.pin.length,
            sortOrder: sortedInfo.columnKey === 'pin' && sortedInfo.order,
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.length - b.status.length,
            sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
        }, 
        // {
        //     title: 'Store Collaboration',
        //     dataIndex: 'isStoreCollaboration',
        //     key: 'isStoreCollaboration',
        //     sorter: (a, b) => a.isStoreCollaboration.length - b.isStoreCollaboration.length,
        //     sortOrder: sortedInfo.columnKey === 'isStoreCollaboration' && sortedInfo.order,
        // }
    ];

        return(
            <div>
                <div>
                {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                {showMessage ? message.error(alertMessage.toString()) : null}
                    <SweetAlert success={msgType ==='success' ? true : false} danger={msgType ==='danger' ? true : false}
                                show={msgShow} title={msgContent} onConfirm={this.onConfirm.bind(this)}>
                    </SweetAlert>
                    <SweetAlert 
                            show={onDelete}
                            warning
                            showCancel
                            confirmBtnText='Yes, delete it!'
                            confirmButtonStyle="danger"
                            cancelButtonStyle="default"
                            title={msgDelete+' Are you sure ?'}
                            onConfirm={this.deleteStoreProcess.bind(this)}
                            onCancel={this.onCancelDelete.bind(this)}
                    />
                </div>
                {loader === false ?
                    <SearchForm
                        columns={columns}
                        listData={this.props.listStore}
                        title='Store List'
                        placeholder='Search store by store name'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        recordInfo = {this.props.recordInfo}
                        onSearch = {this.handleSearch.bind(this)}
                        filterParam = {filterParam}
                        onView = {this.viewStore.bind(this)}
                        onEdit = {this.editStore.bind(this)}
                        onDelete = {this.deleteStorePopup.bind(this)}
                    />
                    : ''
                }
    
            </div>
            );

    }

}

const mapStateToProps = ({auth, storeState}) => {
    const {authUser} = auth;
    const {listStore, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed, recordInfo} = storeState
    return {authUser, listStore, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed, recordInfo}
};
export default connect(mapStateToProps, {searchStore, filterSortSearch, clearFilterSortSearch, resetStatus, deleteStore})(SearchStore);