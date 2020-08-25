import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    // searchGamification,
    searchGami,
    filterSortSearch,
    clearFilterSortSearch,
    deleteGamification,
    resetStatus,
} from "appRedux/actions/Gamification";
import {
    message,
    // Form, Modal, Button, Row, Col, Upload, Icon, Table,

} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationManager} from "react-notifications";

// const FormItem = Form.Item;
//
// const formItemLayout = {
//     labelCol: {xs: 24, sm: 10},
//     wrapperCol: {xs: 24, sm: 14},
// };
//
// const formTailLayout = {
//     labelCol: {xs: 24, sm: 6},
//     wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
// };

class SearchGamification extends Component {
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
            if(sorter.field === 'name'){
                credential.sortBy = 4;
            }else if(sorter.field === '"gameType"'){
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

        // this.props.searchGamification(credential);
        this.props.searchGami(credential);
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
        // this.props.searchGamification(credential);
        this.props.searchGami(credential);
    }

    viewGamification(id){
        this.props.history.push('/gamification/view/'+id);
    }

    editGamification(id){
        this.props.history.push(id + '/update');
    }

    deleteGamificationPopup(id){
        this.setState({
            onDelete : true,
            idWillDelete : id
        })
    }

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }

    deleteGamificationProcess(){
        let authCredential = this.props.authUser;
        authCredential.id = this.state.idWillDelete;
        this.props.deleteGamification(authCredential);
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
            filters
        } = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        let filteredInfo = filters || {};

        let filterParam = {
            search : search
        }

        if(this.props.listGamification !== undefined) {
            if(this.props.listGamification.length > 0){
                this.props.listGamification.forEach((game, i) => {
                    game.key = game.gameId;
                    game.name = game.gameName;
                });
            }
        }

        let columns = [{
            title: 'Game Name',
            dataIndex: 'gameName',
            key: 'gameName',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'gameName' && sortedInfo.order
        },{
            title: 'Game Type',
            dataIndex: 'typeName',
            key: 'typeName',
            // filters: [
            //     {text: 'SPINNER', value: 'SPINNER'},
            //     {text: 'SURVEY', value: 'SURVEY'},
            //     {text: 'QUIZ', value: 'QUIZ'},
            // ],
            // filteredValue: filteredInfo.typeName || null,
            // onFilter: (value, record) => record.typeName.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'typeName' && sortedInfo.order
        },{
            title: 'Status',
            dataIndex: 'statusName',
            key: 'statusName',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'statusName' && sortedInfo.order
        },
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
                                title={'Are you sure delete this game ?'}
                                onConfirm={this.deleteGamificationProcess.bind(this)}
                                onCancel={this.onCancelDelete.bind(this)}
                    />
                </div>
                {loader === false ?
                    <SearchForm
                        columns={columns}
                        listData={this.props.listGamification}
                        title='Gamification List'
                        placeholder='Search by game name'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        recordInfo = {this.props.recordInfo}
                        onSearch = {this.handleSearch.bind(this)}
                        filterParam = {filterParam}
                        onView = {this.viewGamification.bind(this)}
                        onEdit = {this.editGamification.bind(this)}
                        onDelete = {this.deleteGamificationPopup.bind(this)}
                    />
                    : ''
                }
            </div>
        );

    }


}

const mapStateToProps = ({auth, gamificationState}) => {
    const {authUser} = auth;
    const {listGamification, recordInfo, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed,updateSuccess, updateFailed} = gamificationState
    return {authUser, listGamification, recordInfo, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed,updateSuccess, updateFailed}
};
export default connect(mapStateToProps, {
    // searchGamification,
    searchGami, filterSortSearch, clearFilterSortSearch,deleteGamification,resetStatus})(SearchGamification);


