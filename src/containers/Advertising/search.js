import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchAdvertising,
    filterSortSearch,
    clearFilterSortSearch,
    deleteAdvertising,
    resetStatus,
} from "appRedux/actions/Advertising";
import {
    message,
    // Form,
    // Modal, Button, Row, Col, Upload, Icon, Table,

} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";
import {
    // NotificationContainer,
    NotificationManager} from "react-notifications";


class SearchAdvertising extends Component {
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
        const {pagination,
            // filters,
            sorter, search} = filterAndSort;
        credential.page = 0;
        credential.sortBy = 1;
        credential.sort = 2;
        credential.search = '';

        if(pagination != null){
            credential.page = pagination.current -1;
        }

        if(sorter != null){
            if(sorter.field === 'name'){
                credential.sortBy = 4;
            }else if(sorter.field === '"description"'){
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

        this.props.searchAdvertising(credential);
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
        this.props.searchAdvertising(credential);
    }

    viewAdvertising(id){
        this.props.history.push('/advertising/view/'+id);
    }

    editAdvertising(id, source){
        if(source === 'Splash Screen'){
            this.props.history.push('/advertising/update/advertising/'+id);
        }else if (source === 'Banner Home'){
            this.props.history.push('/advertising/update/advertising/'+id);
        } else if (source === 'Introduction'){
            this.props.history.push('/advertising/update/advertising/'+id);
        } else{
            this.props.history.push('/advertising/update/advertising/'+id);
        }

        // this.props.history.push(id + '/update');
    }

    deleteAdvertisingPopup(id){
        this.setState({
            onDelete : true,
            idWillDelete : id
        })
    }

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }

    deleteAdvertisingProcess(){
        let authCredential = this.props.authUser;
        authCredential.id = this.state.idWillDelete;
        this.props.deleteAdvertising(authCredential);
    }

    onCancelDelete(){
        this.setState({
            onDelete : false,
            idWillDelete : ''
        })
    }


    render() {
        let component = [];
        let {loader, alertMessage, showMessage} = this.props;
        const { msgShow, msgType, msgContent, onDelete, search,
            msgDelete, enableModalUpload, memberData
        } = this.state;
        let {sorter, filters} = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        let filteredInfo = filters || {};

        let filterParam = {
            search : search
        }

        if(this.props.listAdvertisings !== undefined) {
            if(this.props.listAdvertisings.length > 0){
                this.props.listAdvertisings.forEach((advertising, i) => {
                    advertising.key = advertising.advertisingId;
                    advertising.name = advertising.name;
                });
            }
        }

        let columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
        },
        //     {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     key: 'description',
        //     sorter: (a, b) => a.name.length - b.name.length,
        //     sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order
        // },
            {
            title: 'Advertising Type',
            dataIndex: 'advertisingTypeName',
            key: 'advertisingTypeName',
            filters: [
                {text: 'Splash Screen', value: 'Splash Screen'},
                {text: 'Banner Home', value: 'Banner Home'},
                {text: 'Introduction', value: 'Introduction'},
                {text: 'Pop Up', value: 'Pop Up'},
            ],
            filteredValue: filteredInfo.advertisingTypeName || null,
            onFilter: (value, record) => record.advertisingTypeName.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'advertisingTypeName' && sortedInfo.order
        },{
            title: 'Article Category',
            dataIndex: 'articleCategory',
            key: 'articleCategory',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'articleCategory' && sortedInfo.order
        },{
            title: 'Ads Category',
            dataIndex: 'adsCategoryName',
            key: 'adsCategoryName',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'adsCategoryName' && sortedInfo.order
        },{
            title: 'Content',
            dataIndex: 'adsContent',
            key: 'adsContent',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'adsContent' && sortedInfo.order
        },{
            title: 'Reward Name',
            dataIndex: 'rewardName',
            key: 'rewardName',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'rewardName' && sortedInfo.order
        },
        //     {
        //     title: 'Start Date',
        //     dataIndex: 'startDate',
        //     key: 'startDate',
        //     sorter: (a, b) => a.name.length - b.name.length,
        //     sortOrder: sortedInfo.columnKey === 'startDate' && sortedInfo.order
        // },{
        //     title: 'End Date',
        //     dataIndex: 'endDate',
        //     key: 'endDate',
        //     sorter: (a, b) => a.name.length - b.name.length,
        //     sortOrder: sortedInfo.columnKey === 'endDate' && sortedInfo.order
        // },
            {
            title: 'Status',
            dataIndex: 'statusName',
            key: 'statusName',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'statusName' && sortedInfo.order
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
                                title={'Are you sure delete this advertising ?'}
                                onConfirm={this.deleteAdvertisingProcess.bind(this)}
                                onCancel={this.onCancelDelete.bind(this)}
                    />
                </div>
                {loader === false ?
                    <SearchForm
                        columns={columns}
                        listData={this.props.listAdvertisings}
                        title='Advertising List'
                        placeholder='Search by name'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        recordInfo = {this.props.recordInfo}
                        onSearch = {this.handleSearch.bind(this)}
                        filterParam = {filterParam}
                        onView = {this.viewAdvertising.bind(this)}
                        onEdit = {this.editAdvertising.bind(this)}
                        onDelete = {this.deleteAdvertisingPopup.bind(this)}
                    />
                    : ''
                }
            </div>
        );

    }


}

const mapStateToProps = ({auth, advertisingState}) => {
    const {authUser} = auth;
    const {listAdvertisings, recordInfo, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed,updateSuccess, updateFailed} = advertisingState
    return {authUser, listAdvertisings, recordInfo, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed,updateSuccess, updateFailed}
};
export default connect(mapStateToProps, {searchAdvertising, filterSortSearch, clearFilterSortSearch,deleteAdvertising,resetStatus})(SearchAdvertising);


