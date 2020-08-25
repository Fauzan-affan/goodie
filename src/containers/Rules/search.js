import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchRules,
    filterSortSearch,
    clearFilterSortSearch,
    deleteRule,
    resetStatus
} from "appRedux/actions/Rules";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";

class SearchRules extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msgContent : '',
            msgType : '',
            msgShow : false,
            onDelete : false,
            idWillDelete: '',
            msgDelete : ''
        };

    }

    componentWillMount(){
        let credential = this.props.authUser;
        this.props.searchRules(credential);
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
        this.props.searchRules(credential);
    }

    viewRule(id,ruleType){
        let type = ''
        if(ruleType === 'Basic Rule'){
            type = 'basic';
        }else if(ruleType === 'Referral Rule'){
            type = 'referral';
        }else if(ruleType === 'Custom Rule') {
            type = 'custom';
        }
        this.props.history.push('/rules/view/'+type+'/'+id);
    }

    editRule(id,ruleType){
        let type = ''
        if(ruleType === 'Basic Rule'){
            type = 'basic';
        }else if(ruleType === 'Referral Rule'){
            type = 'referral';
        }else if(ruleType === 'Custom Rule') {
            type = 'custom';
        }
        this.props.history.push('/rules/update/'+type+'/'+id);
    }

    deleteRulePopup(id, promotions){
        let msgDel = '';
        if(promotions.length > 0){
            let progLen = promotions.length;
            let progName = '';
            promotions.forEach((promotion, i) => {
                if(i !== 0){
                    progName += ', ';
                }
                progName += promotion.promotionName;
            })

            msgDel = 'There are '+progLen+' promotions use this product : '+progName+'. Promotions will be deleted too.';
        }
        this.setState({
            msgDelete: msgDel,
            onDelete : true,
            idWillDelete : id
        })
    }

    deleteRuleProcess(){
        let authCredential = this.props.authUser;
        authCredential.ruleId = this.state.idWillDelete;
        this.props.deleteRule(authCredential);
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
        const { msgShow, msgType, msgContent, onDelete, msgDelete } = this.state;
        let {sorter, filters} = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        let filteredInfo = filters || {};

        this.props.listRules.forEach((rule, i) => {
            rule.key = rule.ruleId;
            rule.name = rule.ruleName;
        });

        let columns = [{
            title: 'Rule Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
        }, {
            title: 'Type',
            dataIndex: 'ruleType',
            key: 'ruleType',
            filters: [
                {text: 'Basic Rule', value: 'Basic Rule'},
                {text: 'Referral Rule', value: 'Referral Rule'},
                {text: 'Custom Rule', value: 'Custom Rule'}
            ],
            filteredValue: filteredInfo.ruleType || null,
            onFilter: (value, record) => record.ruleType.includes(value),
            sorter: (a, b) => a.ruleType.length - b.ruleType.length,
            sortOrder: sortedInfo.columnKey === 'ruleType' && sortedInfo.order,
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {text: 'Active', value: 'Active'},
                {text: 'Inactive', value: 'Inactive'},
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status.includes(value),
            sorter: (a, b) => a.status.length - b.status.length,
            sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
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
                            title={msgDelete+'Are you sure ?'}
                            onConfirm={this.deleteRuleProcess.bind(this)}
                            onCancel={this.onCancelDelete.bind(this)}
                />
            </div>
            {loader === false ?
                <SearchForm
                    columns={columns}
                    listData={this.props.listRules}
                    title='Rules List'
                    placeholder='Search rules by name'
                    onFilter={this.filterComponent.bind(this)}
                    onClearFilter={this.clearFilterComponent.bind(this)}
                    onView = {this.viewRule.bind(this)}
                    onEdit = {this.editRule.bind(this)}
                    onDelete = {this.deleteRulePopup.bind(this)}
                />
                : ''
            }

        </div>
        );

    }


}

const mapStateToProps = ({auth, rules}) => {
    const {authUser} = auth;
    const {listRules, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed} = rules
    return {authUser, listRules, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed}
};
export default connect(mapStateToProps, {searchRules, filterSortSearch, clearFilterSortSearch,deleteRule,resetStatus})(SearchRules);


