import React, { Component } from "react";
import SearchForm from "../../components/Form/search";
import { connect } from "react-redux";
import {
  searchRules,
  filterSortSearch,
  clearFilterSortSearch,
  deleteRule,
  resetStatus,
  updateRule,
} from "appRedux/actions/Rules";
import { message } from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";

let updateAcceptRule = {
  isApproval: -1,
  status: "Active",
};

class SearchRules extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msgContent: "",
      msgType: "",
      msgShow: false,
      onDelete: false,
      onAccept: false,
      idWillDelete: "",
      msgDelete: "",
      // onAccept: false,
      idWillAccept: "",
      basicRuleStatus: "",
      search : "",
    };
  }

  componentWillMount() {
    this.fetchData(this.props.filterAndSort);
  }

  fetchData =(filterAndSort)=>{
    let credential = this.props.authUser;
    const {pagination, sorter, search} = filterAndSort;
    credential.page = 0;
    credential.search = "";

    if(pagination != null){
        credential.page = pagination.current -1;
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

    this.props.searchRules(credential);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deleteSuccess && !nextProps.deleteFailed) {
      this.setState({
        msgContent: "Deleted Successfully",
        msgShow: true,
        msgType: "success",
        onDelete: false,
      });
    } else if (!nextProps.deleteSuccess && nextProps.deleteFailed) {
      this.setState({
        msgContent: "Delete failed",
        msgShow: true,
        msgType: "danger",
        onDelete: false,
      });
    } else if (nextProps.updateSuccess && !nextProps.updateFailed) {
      this.setState({
        msgContent: "Updated Successfully",
        msgShow: true,
        msgType: "success",
        onAccept: false,
      });
    } else if (!nextProps.updateSuccess && nextProps.updateFailed) {
      this.setState({
        msgContent: "Update failed",
        msgShow: true,
        msgType: "danger",
        onAccept: false,
      });
    } else {
      this.setState({
        msgContent: "",
        msgShow: false,
        msgType: "",
        onAccept: false,
        onDelete: false,
      });
    }

    //Fetch data after change table
    if(this.props.filterAndSort !== nextProps.filterAndSort){
      this.fetchData(nextProps.filterAndSort);
    }
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

  onConfirm() {
    this.props.resetStatus();
    let credential = this.props.authUser;
    this.props.searchRules(credential);
  }

  viewRule(id, ruleType) {
    let type = "";
    if (ruleType === "Basic Rule") {
      type = "basic";
    } else if (ruleType === "Referral Rule") {
      type = "referral";
    } else if (ruleType === "Custom Rule") {
      type = "custom";
    }
    this.props.history.push("/rules/view/" + type + "/" + id);
  }

  editRule(id, ruleType) {
    let type = "";
    if (ruleType === "Basic Rule") {
      type = "basic";
    } else if (ruleType === "Basic Rule Collaboration") {
      type = "basic";
    } else if (ruleType === "Referral Rule") {
      type = "referral";
    } else if (ruleType === "Custom Rule") {
      type = "custom";
    }
    this.props.history.push("/rules/update/" + type + "/" + id);
  }

  deleteRulePopup(id, promotions) {
    let msgDel = "";
    if (promotions.length > 0) {
      let progLen = promotions.length;
      let progName = "";
      promotions.forEach((promotion, i) => {
        if (i !== 0) {
          progName += ", ";
        }
        progName += promotion.promotionName;
      });

      msgDel =
        "There are " +
        progLen +
        " promotions use this product : " +
        progName +
        ". Promotions will be deleted too.";
    }
    this.setState({
      msgDelete: msgDel,
      onDelete: true,
      idWillDelete: id,
    });
  }

  deleteRuleProcess() {
    let authCredential = this.props.authUser;
    authCredential.ruleId = this.state.idWillDelete;
    this.props.deleteRule(authCredential);
  }

  onCancelDelete() {
    this.setState({
      onDelete: false,
      idWillDelete: "",
    });
  }

  acceptRulePopup(id, statusCode) {
    this.setState({
      onAccept: true,
      idWillAccept: id,
      basicRuleStatus: statusCode,
    });
  }

  acceptRuleProcess() {
    let request = this.props.authUser;

    request.id = this.state.idWillAccept;
    request.basicRuleStatus = this.state.basicRuleStatus;
    request.data = updateAcceptRule;
    request.type = "basic";
    this.props.updateRule(request);
  }

  onCancelAccept() {
    this.setState({
      onAccept: false,
      idWillAccept: "",
      basicRuleStatus: "",
    });
  }

  render() {
    let { loader, alertMessage, showMessage } = this.props;
    const {
      msgShow,
      msgType,
      msgContent,
      onDelete,
      onAccept,
      msgDelete,
      search
    } = this.state;
    let { sorter, filters } = this.props.filterAndSort;
    let sortedInfo = sorter || {};
    let filteredInfo = filters || {};

    let filterParam = {
      search : search
  }

    this.props.listRules.forEach((rule) => {
      rule.key = rule.ruleId;
      rule.name = rule.ruleName;
      rule.storeName = rule.store != null ? rule.store.storeName : "";
    });

    let columns = [
      {
        title: "Rule Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
      },
      {
        title: "Type",
        dataIndex: "ruleType",
        key: "ruleType",
        filters: [
          { text: "Basic Rule", value: "Basic Rule" },
          { text: "Referral Rule", value: "Referral Rule" },
          { text: "Custom Rule", value: "Custom Rule" },
        ],
        filteredValue: filteredInfo.ruleType || null,
        onFilter: (value, record) => record.ruleType.includes(value),
        sorter: (a, b) => a.ruleType.length - b.ruleType.length,
        sortOrder: sortedInfo.columnKey === "ruleType" && sortedInfo.order,
      },
      {
        title: "Merchant Name Rule",
        dataIndex: "merchantName",
        key: "merchantName",
        filters: [
          { text: "Active", value: "Active" },
          { text: "Inactive", value: "Inactive" },
        ],
      },
      {
        title: "Store",
        dataIndex: "storeName",
        key: "storeName",
        filters: [
          { text: "Active", value: "Active" },
          { text: "Inactive", value: "Inactive" },
        ],
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filters: [
          { text: "Active", value: "Active" },
          { text: "Waiting", value: "Waiting" },
          { text: "Inactive", value: "Inactive" },
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
        sorter: (a, b) => a.status.length - b.status.length,
        sortOrder: sortedInfo.columnKey === "status" && sortedInfo.order,
      },
    ];

    return (
      <div>
        <div>
          {loader === true ? (
            <div className="gx-loader-view">
              <CircularProgress />
            </div>
          ) : null}
          {showMessage ? message.error(alertMessage.toString()) : null}

          <SweetAlert
            success={msgType === "success" ? true : false}
            danger={msgType === "danger" ? true : false}
            show={msgShow}
            title={msgContent}
            onConfirm={this.onConfirm.bind(this)}
          />

          <SweetAlert
            show={onDelete}
            warning
            showCancel
            confirmBtnText="Yes, Delete it!"
            confirmButtonStyle="danger"
            cancelButtonStyle="default"
            title={msgDelete + " Are you sure ?"}
            onConfirm={this.deleteRuleProcess.bind(this)}
            onCancel={this.onCancelDelete.bind(this)}
          />

          <SweetAlert
            show={onAccept}
            warning
            showCancel
            confirmBtnText={
              this.state.basicRuleStatus == 0 ? "Reject" : "Accept"
            }
            confirmButtonStyle="danger"
            cancelButtonStyle="default"
            title="Are you sure ?"
            onConfirm={this.acceptRuleProcess.bind(this)}
            onCancel={this.onCancelAccept.bind(this)}
          />
        </div>
        {loader === false ? (
          <SearchForm
            columns={columns}
            listData={this.props.listRules}
            title="Rules List"
            placeholder="Search rules by name"
            onFilter={this.filterComponent.bind(this)}
            onClearFilter={this.clearFilterComponent.bind(this)}
            onSearch = {this.handleSearch.bind(this)}
            recordInfo = {this.props.recordInfo}
            filterParam = {filterParam}
            onView={this.viewRule.bind(this)}
            onEdit={this.editRule.bind(this)}
            onDelete={this.deleteRulePopup.bind(this)}
            onAccept={this.acceptRulePopup.bind(this)}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, rules }) => {
  const { authUser } = auth;
  const {
    listRules,
    filterAndSort,
    loader,
    alertMessage,
    showMessage,
    deleteSuccess,
    deleteFailed,
    updateSuccess,
    updateFailed,
    recordInfo,
  } = rules;
  return {
    authUser,
    listRules,
    filterAndSort,
    loader,
    alertMessage,
    showMessage,
    deleteSuccess,
    deleteFailed,
    updateSuccess,
    updateFailed,
    recordInfo,
  };
};
export default connect(mapStateToProps, {
  searchRules,
  filterSortSearch,
  clearFilterSortSearch,
  deleteRule,
  updateRule,
  resetStatus,
})(SearchRules);
