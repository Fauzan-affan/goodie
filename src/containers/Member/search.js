import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchMembers,
    filterSortSearch,
    clearFilterSortSearch,
    resetStatus,
    changeStatusMember,
    approvalMember,
    uploadMember,
    uploadTransaction
} from "appRedux/actions/Member";
import {
    Button,
    Col,
    Icon,
    message,
    Modal,
    Row, Table,
    Upload,
    Form,
    Radio
} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import { set } from "nprogress";

const FormItem = Form.Item;

class SearchMembers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            msgContent : '',
            msgType : '',
            msgShow : false,
            onDelete : false,
            msgDelete: '',
            idWillDelete: '',
            memberIdList: [],
            nextStatus: 0,
            search : '',
            searchUsername : '',
            searchMobileNumber : '',
            enableModalUpload : false,
            enableModalUploadTrx : false,
            errorImport : false,
            value : 1,
            disabledBasic : false,
            disabledCustom : false,
            buttonLabel: '',
            selectedMember: {
                rowKeys: [],
                rows: []
            },
            merchantName: '',
            listData: []
        };

        this.errorNotification = this.errorNotification.bind(this);

    }

    componentWillMount(){
        this.fetchData(this.props.filterAndSort);
        this.setState({
            buttonLabel: 'Approval Member'
        })
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.updateSuccess && !nextProps.updateFailed){
            this.setState({
                msgContent : 'Updated Successfully',
                msgShow : true,
                msgType : 'success',
                onDelete : false,
            })
        } else if (!nextProps.updateSuccess && nextProps.updateFailed){
            this.setState({
                msgContent : 'Updated failed.',
                msgShow : true,
                msgType : 'danger',
                onDelete : false,
            })
        } else if (nextProps.uploadSuccess && !nextProps.uploadFailed) {
            this.setState({
                msgContent : 'Upload Member Successfully',
                msgShow : true,
                msgType : 'success',
                onDelete :false
            })
        } else if(!nextProps.uploadSuccess && nextProps.uploadFailed) {
            this.setState({
                msgContent : 'Upload Member failed. '+nextProps.alertMessage,
                msgShow : true,
                msgType : 'danger',
                onDelete : false
            })
        } else if (nextProps.uploadTrxSuccess && !nextProps.uploadTrxFailed) {
            this.setState({
                msgContent : 'Upload Transaction Successfully',
                msgShow : true,
                msgType : 'success',
                onDelete :false
            })
        } else if(!nextProps.uploadTrxSuccess && nextProps.uploadTrxFailed) {
            this.setState({
                msgContent : 'Upload Transaction failed. '+nextProps.alertMessage,
                msgShow : true,
                msgType : 'danger',
                onDelete : false
            })
        }
        else if (nextProps.approvalMemberSuccess && !nextProps.approvalmemberFailed) {
            this.setState({
                msgContent : this.state.api === 'member/approve' ? 'Approve Member Successfully' : 'Reject Member Successfully',
                msgShow : true,
                msgType : 'success',
                onDelete :false,
                selectedMember: {
                    rowKeys: [],
                    rows: []
                },
                memberIdList: []
            })
        } else if(!nextProps.approvalMemberSuccess && nextProps.approvalmemberFailed) {
            this.setState({
                msgContent : this.state.api === 'member/approve' ? 'Approve Member Failed' : 'Reject Member Failed '+nextProps.alertMessage,
                msgShow : true,
                msgType : 'danger',
                onDelete : false,
                selectedMember: {
                    rowKeys: [],
                    rows: []
                },
                memberIdList: []
            })
        } else {
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

        if(nextProps.authUser.merchantName) {
            this.setState({
                merchantName: nextProps.authUser.merchantName
            })
        }

        if (nextProps.listMembers !== this.props.listMembers) {
            this.setState({
                listData: nextProps.listMembers
            })
        }
    }

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }

    fetchData =(filterAndSort)=>{
        let credential = this.props.authUser;
        const {pagination, sorter, search, searchUsername, searchMobileNumber
            // filters
        } = filterAndSort;
        credential.page = 0;
        credential.sortBy = 1;
        credential.sort = 2;
        credential.search = '';
        credential.searchUsername = '';
        credential.searchMobileNumber = '';

        if(pagination != null){
            credential.page = pagination.current - 1;
        }

        if(sorter != null){
            if(sorter.field === 'memberName'){
                credential.sortBy = 4;
            }else if(sorter.field === '"memberUsername"'){
                credential.sortBy = 3;
            }else if(sorter.field === '"pointBalance"'){
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

        if(searchUsername != null){
            credential.searchUsername = searchUsername;
        }

        if(searchMobileNumber != null){
            credential.searchMobileNumber = searchMobileNumber;
        }

        this.props.searchMembers(credential);
    }

    //Filter page
    filterComponent(pagination, filters, sorter){
        const {search, searchUsername, searchMobileNumber} = this.props.filterAndSort;
        this.props.filterSortSearch(pagination, filters, sorter, search, searchUsername, searchMobileNumber);
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

    handleSearch1(searchUsername){
        const {pagination, filters, sorter } = this.props.filterAndSort;
        let value1 = null;
        let value2 = null;
        let newPag = pagination;
        if(pagination != null){
            newPag.current = 1;
        }

        this.setState({
            searchUsername : searchUsername
        })

        this.props.filterSortSearch(newPag, filters, sorter, value1, searchUsername, value2);
    }

    handleSearch2(searchMobileNumber){
        const {pagination, filters, sorter} = this.props.filterAndSort;
        let value1 = null;
        let value2 = null;
        let newPag = pagination;
        if(pagination != null){
            newPag.current = 1;
        }

        this.setState({
            searchMobileNumber : searchMobileNumber
        })

        this.props.filterSortSearch(newPag, filters, sorter, value1, value2, searchMobileNumber );
    }

    clearFilterComponent(){
        this.setState({
            search : '',
            searchUsername : '',
            searchMobileNumber : '',
        })
        this.props.clearFilterSortSearch();
    }

    onConfirm(){
        this.props.resetStatus();
        let credential = this.props.authUser;
        this.props.searchMembers(credential);

        this.setState({
            enableModalUpload : false,
            enableModalUploadTrx : false
        })
    }


    viewMember(id){
        this.props.history.push({
            pathname: '/member/view/'+id,
        });
    }

    changeStatusPopup(id, currentStatus){
        //suspend
        let nextStatus = 1;
        if(currentStatus !== 'Active'){
            nextStatus = -1;
        }

        this.setState({
            onDelete : true,
            idWillDelete : id,
            nextStatus : nextStatus
        })
    }

    changeApprovalPopup(id, api){
        this.setState({
            onDelete : true,
            memberIdList: id,
            api: api
        })
    }

    changeStatusProcess(){
        let authCredential = this.props.authUser;
        authCredential.id =  this.state.idWillDelete;
        authCredential.status = this.state.nextStatus;
        authCredential.memberIdList = this.state.memberIdList;
        authCredential.api = this.state.api;

        this.state.buttonLabel === "Approval Member" ? this.props.changeStatusMember(authCredential) : this.props.approvalMember(authCredential);
    }

    onCancelChangeStatus(){
        this.setState({
            onDelete : false,
            idWillDelete : '',
            memberIdList: [],
            nextStatus : 0,
        })
    }

    handleAddStock(){
        this.setState({
            enableModalUpload : true,
            errorImport : false,
            memberData : []
        })
    }

    handleAddTrx(){
        this.setState({
            enableModalUploadTrx : true,
            errorImport : false,
            transactionData : []
        })
    }

    switchButtonLabel(){
        if (!this.state.buttonLabel) {
            this.setState({
                buttonLabel: 'Approval Member'
            })
        } else if (this.state.buttonLabel === 'Approval Member') {
            this.setState({
                buttonLabel: 'Back to Member List'
            })
        } else {
            this.setState({
                buttonLabel: 'Approval Member'
            })
        }
    }

    handleApproveMember(){
        this.switchButtonLabel()
    }

    handleCancel(){
        this.setState({
            enableModalUpload : false,
            enableModalUploadTrx : false,
            disabledBasic : false,
            disabledCustom : false
        })
        Modal.destroyAll()
    }

    handleupload(info){
        switch (info.file.status) {
            case "done":

                let Papa = require("papaparse/papaparse.min.js");
                Papa.parse(info.file.originFileObj, {
                    header: true,
                    download: true,
                    skipEmptyLines: true,
                    // Here this is also available. So we can call our custom class method
                    complete: this.updateDataFromCsv
                });

                break;

            default:
                // error or removed
                this.setState({
                    memberData : []
                });
        }
    }

    updateDataFromCsv = (result) => {
        const data = result.data;

        let errorId = 0;
        let errorMessage = '';

        //Delete blank record
        let self = this;
        // let quantity = 0;

        data.forEach((voucher, i)=>{
            let defaultMessage = 'must not empty';
            voucher.key = i;

            if(voucher.firstName === '' || voucher.firstName === undefined){
                errorId = i + 1;
                errorMessage = "first name";
            }else{
                if(voucher.firstName.length > 50){
                    errorId = i + 1;
                    errorMessage = "first name";
                    defaultMessage = 'first name length must below 50 characters'
                }
            }

            if(voucher.lastName === '' || voucher.lastName === undefined){
                errorId = i + 1;
                errorMessage = "last name";
            }else{
                if(voucher.lastName.length > 50){
                    errorId = i + 1;
                    errorMessage = "last name";
                    defaultMessage = 'last name length must below 50 characters'
                }
            }

            if(voucher.memberUsername === '' || voucher.memberUsername === undefined){
                errorId = i + 1;
                errorMessage = "user name";
            }else{
                if(voucher.memberUsername.length > 50){
                    errorId = i + 1;
                    errorMessage = "user name";
                    defaultMessage = 'user name length must below 50 characters'
                }
            }

            if(voucher.mobileNumber === '' || voucher.mobileNumber === undefined){
                errorId = i + 1;
                errorMessage = "phone number";
            }else{
                if(voucher.mobileNumber.length > 20){
                    errorId = i + 1;
                    errorMessage = "phone number";
                    defaultMessage = 'phone number length must below 35 characters'
                }
            }

            if(voucher.point === '' || voucher.point === undefined){
                errorId = i + 1;
                errorMessage = "point";
            }

            if(errorMessage !== ''){
                self.errorNotification('Import voucher from csv file was failed. Column '+errorMessage+' on '+errorId+'th row '+defaultMessage+'.');
                return true;
            }

        });

        if(errorMessage === ''){
            this.setState({
                memberData : data,
                errorImport : false
            });
        }else{
            this.setState({
                memberData : [],
                errorImport : true
            });
        }
    }

    // handle upload for form csv transaction
    handleuploadTransaction(info){
        switch (info.file.status) {
            case "done":
                if(this.state.value === 1) {
                let Papa = require("papaparse/papaparse.min.js");
                Papa.parse(info.file.originFileObj, {
                    header: true,
                    download: true,
                    skipEmptyLines: true,
                    // Here this is also available. So we can call our custom class method
                    complete: this.updateDataTransactionFromCsv
                });
                this.setState({
                    disabledCustom : true,
                })
            } else {
                let Papa = require("papaparse/papaparse.min.js");
                Papa.parse(info.file.originFileObj, {
                    header: true,
                    download: true,
                    skipEmptyLines: true,
                    // Here this is also available. So we can call our custom class method
                    complete: this.updateDataTransactionFromCsv
                });
                this.setState({
                    disabledBasic : true,
                })
            }
                break;

            default:
                // error or removed
                this.setState({
                    transactionData : []
                });
        }
    }
    //update data in upload transaction
    updateDataTransactionFromCsv = (result) => {
        const data = result.data;

        let errorId = 0;
        let errorMessage = '';

        //Delete blank record
        let self = this;

        data.forEach((voucher, i)=>{
            let defaultMessage = 'must not empty';
            voucher.key = i;

            if(voucher.ruleType === '' || voucher.ruleType === undefined){
                errorId = i + 1;
                errorMessage = `rule Type`;
                this.setState({
                    disabledBasic : false,
                    disabledCustom : false
                })
            }

            if(voucher.totalTrxAmount === '' || voucher.totalTrxAmount === undefined){
                errorId = i + 1;
                errorMessage = "Total Transaction";
            }

            if(voucher.memberUsername === '' || voucher.memberUsername === undefined){
                errorId = i + 1;
                errorMessage = "user name";
            }else{
                if(voucher.memberUsername.length > 50){
                    errorId = i + 1;
                    errorMessage = "user name";
                    defaultMessage = 'user name length must below 50 characters'
                }
            }
            if(this.state.value === 1 && voucher.issuing === '0') {
                errorId = i + 1;
                errorMessage = "issuing";
                defaultMessage = "Column issuing only in Custom Rule Type"
                this.setState({
                    disabledBasic : false,
                    disabledCustom : false
                })
            } else{
                if(this.state.value === 2 && voucher.issuing === undefined || this.state.value === ''){
                    errorId = i + 1;
                    errorMessage = "issuing";
                    this.setState({
                        disabledBasic : false,
                        disabledCustom : false
                    })
                }
            }

            if(errorMessage !== ''){
                self.errorNotification('Import Transaction from csv file was failed. Column '+errorMessage+' on '+errorId+'th row '+defaultMessage+'.');
                return true;
            }

        });

        if(errorMessage === ''){
            this.setState({
                transactionData : data,
                errorImport : false
            });
        }else{
            this.setState({
                transactionData : [],
                errorImport : true,
            });
        }
    }

    handleOk(){
        if(this.state.memberData.length > 0){
            let authCredential = this.props.authUser;
            authCredential.members = this.state.memberData;
            this.props.uploadMember(authCredential);
        }else{
            if(this.state.errorImport === true){
                this.errorNotification('Imported data was incorrect. Please fix data and re-upload.');
            }else{
                this.errorNotification('Please upload data member.');
            }
        }
    }

    // handle Ok for upload transaction
    handleOkTransaction(){
        if(this.state.transactionData.length > 0){
            if(this.state.transactionData[0].ruleType === '1' && this.state.value === 1){
                this.errorNotification('Submit Transaction from csv file was failed. Column rule Type for Basic Rule on 1th row must value 0.');
            } else if (this.state.transactionData[0].ruleType === '0' && this.state.value === 2){
                this.errorNotification(' Transaction from csv file was failed. Column rule Type for Custom Rule on 1th row must value 1.');
            } else {
                let authCredential = this.props.authUser;
                authCredential.requestList = this.state.transactionData;
                this.props.uploadTransaction(authCredential);
                this.setState({
                    disabledBasic : false,
                    disabledCustom : false
                })
            }
        }else{
            if(this.state.errorImport === true){
                this.errorNotification('Imported data was incorrect. Please fix data and re-upload.');
            }else{
                this.errorNotification('Please upload data Transaction.');
            }
            this.setState({
                msgContent : 'Please upload data Transaction',
                msgShow : true,
                msgType : 'danger',
                onDelete : false
            })
        }
    }

    // on Change Rule on upload transaction
    onChange = e => {
        this.setState({
            value: e.target.value,
        });
    };


    onSelectChange = (selectedRowKeys, rows) => {
        this.setState(prev => ({
            selectedMember: {
                ...prev.selectedMember,
                rowKeys: selectedRowKeys,
                rows: rows
            }
        }))
    }

    render() {
        let {loader, alertMessage, showMessage} = this.props;
        const {
            msgShow, msgType, msgContent, onDelete, search, searchUsername, searchMobileNumber, enableModalUpload, enableModalUploadTrx, memberData, transactionData, disabledBasic, disabledCustom
        } = this.state;
        let {
            sorter, filters
        } = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        let filteredInfo = filters || {};

        let filterParam = {
            search : search,
            search1 : searchUsername,
            search2 : searchMobileNumber
        }

        if(this.props.listMembers.length > 0){
            this.props.listMembers.forEach((member, i) => {
                member.key = member.memberId;
                member.name = member.memberName;
                member.isMarketplace = (member.isMarketplace === -1 ? 'Yes' : 'No');
            });
        }

        const {rowKeys, rows} = this.state.selectedMember

        let tableRowSelection = {
            rowKeys,
            onChange: this.onSelectChange
        }

        let memberListColumns = [{
            title: 'Member Username',
            dataIndex: 'memberUsername',
            key: 'memberUsername',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'memberUsername' && sortedInfo.order
        },{
            title: 'Member Name',
            dataIndex: 'memberName',
            key: 'memberName',
            // sorter: (a, b) => a.name.length - b.name.length,
            // sortOrder: sortedInfo.columnKey === 'memberName' && sortedInfo.order
        },
            {
            title: 'Mobile Number',
            dataIndex: 'mobileNumber',
            key: 'mobileNumber',
        },{
            title: 'Tier',
            dataIndex: 'tier',
            key: 'tier',
        },{
            title: 'Point Balance',
            dataIndex: 'pointBalance',
            key: 'pointBalance',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'pointBalance' && sortedInfo.order
        },{
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'Active',
                    value: 'Active'
                },
                {
                    text: 'Suspended',
                    value: 'Suspended'
                },
                {
                    text: 'Waiting',
                    value: 'Waiting'
                },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status.includes(value),
        }
        ];

        //for upload member
        const dummyRequest = ({ file, onSuccess }) => {
            setTimeout(() => {
                onSuccess("ok");
            }, 0);
        };

        const columnVoucher = [{
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        }, {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        }, {
            title: 'Username',
            dataIndex: 'memberUsername',
            key: 'memberUsername',
        }, {
            title: 'Phone Number',
            dataIndex: 'mobileNumber',
            key: 'mobileNumber',
        }, {
            title: 'Point',
            dataIndex: 'point',
            key: 'point',
        }];

        let columnTransaction = [{
            title: 'Rule Type',
            dataIndex: 'ruleType',
            key: 'ruleType',
        },
        {
            title: 'Total Transaction',
            dataIndex: 'totalTrxAmount',
            key: 'totalTrxAmount',
        },
        {
            title: 'Member Username',
            dataIndex: 'memberUsername',
            key: 'memberUsername',
        },
    ];

        let columnTransactionCustom = [{
            title: 'Rule Type',
            dataIndex: 'ruleType',
            key: 'ruleType',
            },
            {
                title: 'Total Transaction',
                dataIndex: 'totalTrxAmount',
                key: 'totalTrxAmount',
            },
            {
                title: 'Member Username',
                dataIndex: 'memberUsername',
                key: 'memberUsername',
            },
            {
                title: 'Rule Name',
                dataIndex: 'ruleName',
                key: 'ruleName',
            },
            {
                title: 'Issuing',
                dataIndex: 'issuing',
                key: 'issuing',
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
                                title='Are you sure ?'
                                onConfirm={this.changeStatusProcess.bind(this)}
                                onCancel={this.onCancelChangeStatus.bind(this)}
                    />
                </div>

                {loader === false ?
                    <SearchForm
                        columns={memberListColumns}
                        listData={this.state.buttonLabel === "Approval Member" ? this.state.listData : this.state.listData.filter(item => item.status === "Waiting")}
                        title={this.state.buttonLabel === "Approval Member" ? 'Member List' : 'Approval Member'}
                        merchantName={this.state.merchantName}
                        placeholder='Search members by name'
                        placeholder1='Search members by Username'
                        placeholder2='Search members by Mobile Number'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        onView = {this.viewMember.bind(this)}
                        onEdit = {this.changeStatusPopup.bind(this)}
                        recordInfo = {this.props.recordInfo}
                        onSearch = {this.handleSearch.bind(this)}
                        onSearch1 = {this.handleSearch1.bind(this)}
                        onSearch2 = {this.handleSearch2.bind(this)}
                        filterParam = {filterParam}
                        enableUploadMember = {this.state.buttonLabel === "Approval Member" ? true : false}
                        enableUploadTransaction = {true}
                        onAddStock = {this.handleAddStock.bind(this)}
                        onAddTrx = {this.handleAddTrx.bind(this)}
                        onApproveMember = {this.handleApproveMember.bind(this)}
                        buttonLabel = {this.state.buttonLabel}
                        rowSelection = {tableRowSelection}
                        selectedMember = {this.state.selectedMember}
                        onApprovePopup = {this.changeApprovalPopup.bind(this)}
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
                    title="Upload Member"
                    visible={enableModalUpload}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    destroyOnClose={true}
                    footer={[
                        <Button key="back" onClick={this.handleCancel.bind(this)}>Back</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk.bind(this)}>
                            Save
                        </Button>
                    ]}
                >
                    <div>
                        <p>You can upload your members by csv file. Click Download sample format, change sample data and your vouchers are ready to upload.</p>
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12} xs={24} block={true}>
                                <form method="get" action={window.location.origin.toString()+"/uploadMember.csv"}>
                                    <Button key="download" icon="download" htmlType="submit">
                                        Download sample format
                                    </Button>
                                </form>
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={12} xs={24} block={true}>
                                <Upload accept='.csv'
                                        customRequest={dummyRequest}
                                        onChange={this.handleupload.bind(this)}>
                                    <Button type="primary">
                                        <Icon type="upload" /> Click to Upload
                                    </Button>
                                </Upload>
                            </Col>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <FormItem label='Uploaded Member' style={{marginLeft:"0px"}}/>
                                <Table className="gx-table-responsive" pagination = {false} columns={columnVoucher} dataSource={memberData}/>
                            </Col>
                        </Row>
                    </div>
                </Modal>
                : ''}

            <div>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
            </div>
            {loader === false ?
                <Modal
                    width={'70%'}
                    title="Upload Transaction"
                    visible={enableModalUploadTrx}
                    onOk={this.handleOkTransaction.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    destroyOnClose={true}
                    footer={[
                        <Button key="back" onClick={this.handleCancel.bind(this)}>Back</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOkTransaction.bind(this)}>
                            Save
                        </Button>
                    ]}
                >
                    <div>
                        <p>You can upload here</p>
                        <Row>
                            <Col xl={8} xs={24}>
                                <form method="get" action={window.location.origin.toString()+"/uploadTransactionBasicRule.csv"}>
                                    <Button key="download" icon="download" htmlType="submit" block={true}>
                                        Download Sample Basic Rule
                                    </Button>
                                </form>
                            </Col>
                            <Col xl={8} xs={24}>
                                <form method="get" action={window.location.origin.toString()+"/uploadTransactionCustomRule.csv"}>
                                    <Button key="download" icon="download" htmlType="submit" block={true}>
                                        Download Sample Custom Rule
                                    </Button>
                                </form>
                            </Col>
                            <Col xl={8} xs={24}>
                                <Upload accept='.csv'
                                        customRequest={dummyRequest}
                                        onChange={this.handleuploadTransaction.bind(this)}>
                                    <Button type="primary" block={true}>
                                        <Icon type="upload" /> Click to Upload
                                    </Button>
                                </Upload>
                            </Col>
                            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                                <FormItem label='Select Rule Type' style={{marginLeft:"0px", marginBottom:'0px'}}/>
                                <Radio.Group onChange={this.onChange} value={this.state.value}>
                                    <Radio value={1} disabled={disabledBasic}>Basic Rule</Radio>
                                    <Radio value={2} disabled={disabledCustom}>Custom Rule</Radio>
                                </Radio.Group>
                                <FormItem label='Uploaded Member' style={{marginLeft:"0px"}}/>
                                <Table className="gx-table-responsive" pagination = {false} columns={this.state.value === 2 ? columnTransactionCustom : columnTransaction} dataSource={transactionData}/>
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

const mapStateToProps = ({auth, memberState}) => {
    const {authUser} = auth;
    const {listMembers, recordInfo, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, uploadSuccess, uploadFailed, uploadTrxSuccess, uploadTrxFailed, approvalMemberSuccess, approvalmemberFailed} = memberState
    return {authUser, listMembers, recordInfo, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, uploadSuccess, uploadFailed, uploadTrxSuccess, uploadTrxFailed, approvalMemberSuccess, approvalmemberFailed}
};
export default connect(mapStateToProps, {searchMembers, filterSortSearch, clearFilterSortSearch,resetStatus, changeStatusMember, approvalMember, uploadMember, uploadTransaction})(SearchMembers);


