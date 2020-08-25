import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchTiers,
    filterSortSearch,
    clearFilterSortSearch,
    deleteTier,
    resetStatus
} from "appRedux/actions/Tier";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";

class SearchTiers extends Component {
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
        this.props.searchTiers(credential);
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
        this.props.searchTiers(credential);
    }

    viewTier(id){
        this.props.history.push('/tier/view/'+id);
    }

    editTier(id){
        this.props.history.push('/tier/update/'+id);
    }

    deleteTierPopup(id){
        this.setState({
            onDelete : true,
            idWillDelete : id
        })
    }

    deleteTierProcess(){
        let authCredential = this.props.authUser;
        authCredential.tierStructureId = this.state.idWillDelete;

        this.props.deleteTier(authCredential);
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
        const { msgShow, msgType, msgContent, onDelete } = this.state;
        let {sorter,
            // filters
        } = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        // let filteredInfo = filters || {};

        this.props.listTiers.forEach((tier, i) => {
            tier.key = tier.tierStructureId;
            tier.name = tier.tierName;
        });

        let columns = [{
            title: 'Tier Structure Code',
            dataIndex: 'tierStructureCode',
            key: 'tierStructureCode',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'tierStructureCode' && sortedInfo.order
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
                                confirmBtnText='Yes, delete it!'
                                confirmButtonStyle="danger"
                                cancelButtonStyle="default"
                                title='Are you sure ?'
                                onConfirm={this.deleteTierProcess.bind(this)}
                                onCancel={this.onCancelDelete.bind(this)}
                    />
                </div>
                {loader === false ?
                    <SearchForm
                        columns={columns}
                        listData={this.props.listTiers}
                        title='Tier'
                        placeholder='Search tiers by name'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        onView = {this.viewTier.bind(this)}
                        onEdit = {this.editTier.bind(this)}
                        onDelete = {this.deleteTierPopup.bind(this)}
                    />
                    : ''
                }

            </div>
        );

    }


}

const mapStateToProps = ({auth, tierState}) => {
    const {authUser} = auth;
    const {listTiers, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed} = tierState
    return {authUser, listTiers, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed}
};
export default connect(mapStateToProps, {searchTiers, filterSortSearch, clearFilterSortSearch,deleteTier,resetStatus})(SearchTiers);


