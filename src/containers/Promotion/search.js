import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchPromotions,
    filterSortSearch,
    clearFilterSortSearch,
    deletePromotion,
    resetStatus
} from "appRedux/actions/Promotion";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";

class SearchPromotions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msgContent : '',
            msgType : '',
            msgShow : false,
            onDelete : false,
            idWillDelete: ''
        };

    }

    componentWillMount(){
        let credential = this.props.authUser;
        this.props.searchPromotions(credential);
    }

    filterComponent(pagination, filters, sorter){
        this.props.filterSortSearch(pagination, filters, sorter);
    }

    clearFilterComponent(){
        this.props.clearFilterSortSearch();
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
                msgContent : 'Delete failed',
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
    }

    onConfirm(){
        this.props.resetStatus();
        let credential = this.props.authUser;
        this.props.searchPromotions(credential);
    }

    viewPromotion(id){
        this.props.history.push('/promotion/view/'+id);
    }

    editPromotion(id){
        this.props.history.push('/promotion/update/0/'+id);
    }

    deletePromotionPopup(id){
        this.setState({
            onDelete : true,
            idWillDelete : id
        })
    }

    deletePromotionProcess(){
        let authCredential = this.props.authUser;
        authCredential.promotionStructureId = this.state.idWillDelete;
        this.props.deletePromotion(authCredential);
    }

    onCancelDelete(){
        this.setState({
            onDelete : false,
            idWillDelete : ''
        })
    }

    render() {
        // let component = [];
        let {loader, alertMessage, showMessage, listPromotions} = this.props;
        const { msgShow, msgType, msgContent, onDelete } = this.state;
        let {sorter, filters} = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        let filteredInfo = filters || {};

        listPromotions.forEach((promotion, i) => {
            promotion.key = promotion.promotionId;
            promotion.name = promotion.promotionName;
        });

        let columns = [{
            title: 'Promotion Code',
            dataIndex: 'promotionCode',
            key: 'promotionCode',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'promotionCode' && sortedInfo.order
        },{
            title: 'Promotion Name',
            dataIndex: 'promotionName',
            key: 'promotionName',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'promotionName' && sortedInfo.order
        },{
            title: 'Start Date',
            dataIndex: 'periodStartDate',
            key: 'periodStartDate',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'periodStartDate' && sortedInfo.order
        },{
            title: 'End Date',
            dataIndex: 'periodEndDate',
            key: 'periodEndDate',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'periodEndDate' && sortedInfo.order
        },{
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {text: 'Active', value: 'Active'},
                {text: 'Inactive', value: 'Inactive'},
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status.includes(value),
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
                                title='Are you sure ?'
                                onConfirm={this.deletePromotionProcess.bind(this)}
                                onCancel={this.onCancelDelete.bind(this)}
                    />
                </div>
                {loader === false ?
                    <SearchForm
                        columns={columns}
                        listData={this.props.listPromotions}
                        title='Promotion List'
                        placeholder='Search promotions by name'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        onView = {this.viewPromotion.bind(this)}
                        onEdit = {this.editPromotion.bind(this)}
                        onDelete = {this.deletePromotionPopup.bind(this)}
                    />
                    : ''
                }

            </div>
        );

    }


}

const mapStateToProps = ({auth, promotionState}) => {
    const {authUser} = auth;
    const {listPromotions, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed} = promotionState;
    return {authUser, listPromotions, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed}
};
export default connect(mapStateToProps, {searchPromotions, filterSortSearch, clearFilterSortSearch,deletePromotion,resetStatus})(SearchPromotions);


