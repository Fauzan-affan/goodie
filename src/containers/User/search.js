import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchUser,
    filterSortSearch,
    clearFilterSortSearch,
    resetStatus,
    changeStatusUser
} from "appRedux/actions/User";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationManager} from "react-notifications";

class SearchUser extends Component {
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
            nextLocked: false,
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
            if(sorter.field === 'loginName'){
                credential.sortBy = 4;
            }else if(sorter.field === '"fullName"'){
                credential.sortBy = 3;
            }else if(sorter.field === '"loginName"'){
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

        this.props.searchUser(credential);
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

        if (nextProps.updateSuccess && !nextProps.updateFailed){
            this.setState({
                msgContent : 'Updated Successfully',
                msgShow : true,
                msgType : 'success',
                onDelete :false
            })
        }else if (!nextProps.updateSuccess && nextProps.updateFailed){
            this.setState({
                msgContent : 'Update failed',
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

    onConfirm(){
        this.props.resetStatus();
        let credential = this.props.authUser;
        this.props.searchUser(credential);
    }

    changeStatusLockedPopup(id, currentLocked){
        //suspend
        let nextLocked = true;
        if(currentLocked === 'Active'){
            nextLocked = false;
        }

        this.setState({
            onDelete : true,
            idWillDelete : id,
            nextLocked : nextLocked
        })
    }

    changeStatusLockedProcess(){
        let authCredential = this.props.authUser;
        authCredential.id = this.state.idWillDelete;
        authCredential.locked = this.state.nextLocked;

        this.props.changeStatusUser(authCredential);
    }

    onCancelChangeStatusUser(){
        this.setState({
            onDelete : false,
            idWillDelete : '',
            nextLocked : true
        })
    }

    viewUser(id){
        this.props.history.push('/user/view/'+id);
    }

    editUser(id){
        this.props.history.push(id + '/update');
        localStorage.setItem('idForUpdate', id);
    }

    changePasswordUser(id){
        this.props.history.push(id + '/password')
    }

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }

    deleteUserProcess(){
        let authCredential = this.props.authUser;
        authCredential.id = this.state.idWillDelete;
        this.props.deleteUser(authCredential);
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
        const { msgShow, msgType, msgContent, onDelete, search } = this.state;
        let {sorter,
            // filters
        } = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        // let filteredInfo = filters || {};

        let filterParam = {
            search : search
        }


        if(this.props.listUsers.length > 0){
            this.props.listUsers.forEach((user, i) => {
                user.key = user.userId;
                user.name = user.loginName;
            });
        }


        let columns = [{
            title: 'Login Name',
            dataIndex: 'loginName',
            key: 'loginName',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'loginName' && sortedInfo.order
        }, {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'fullName' && sortedInfo.order
        },{
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order
        },{
            title: 'Status',
            dataIndex: 'userNonLockedLabel',
            key: 'userNonLockedLabel',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'userNonLockedLabel' && sortedInfo.order
        }];

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
                                confirmBtnText='Yes'
                                confirmButtonStyle="danger"
                                cancelButtonStyle="default"
                                title={'Are you sure'}
                                onConfirm={this.changeStatusLockedProcess.bind(this)}
                                onCancel={this.onCancelChangeStatusUser.bind(this)}
                    />
                </div>
                {loader === false ? localStorage.setItem("listUser", this.props.listUsers):''
                }
                {loader === false ?

                    <SearchForm
                        columns={columns}
                        listData={this.props.listUsers}
                        title='User List'
                        placeholder='Search user by full name'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        recordInfo = {this.props.recordInfo}
                        onSearch = {this.handleSearch.bind(this)}
                        filterParam = {filterParam}
                        onView = {this.viewUser.bind(this)}
                        onEdit = {this.editUser.bind(this)}
                        onChanges = {this.changePasswordUser.bind(this)}
                        onDelete = {this.changeStatusLockedPopup.bind(this)}
                    />
                    : ''
                }
            </div>
    );

    }


}

const mapStateToProps = ({auth, userState}) => {
    const {authUser} = auth;
    const {listUsers, recordInfo, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed, updateSuccess, updateFailed} = userState
    return {authUser, listUsers, recordInfo, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed, updateSuccess, updateFailed,}
};
export default connect(mapStateToProps, {searchUser, filterSortSearch, clearFilterSortSearch,resetStatus, changeStatusUser})(SearchUser);


