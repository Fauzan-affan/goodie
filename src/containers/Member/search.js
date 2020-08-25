import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchMembers,
    filterSortSearch,
    clearFilterSortSearch,
    resetStatus,
    changeStatusMember,
    uploadMember
} from "appRedux/actions/Member";
import {
    Button,
    Col,
    Icon,
    message,
    Modal,
    Row, Table,
    Upload,
    Form
} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";

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
            nextStatus: 0,
            search : '',
            enableModalUpload : false,
            errorImport : false
        };

        this.errorNotification = this.errorNotification.bind(this);

    }

    componentWillMount(){
        this.fetchData(this.props.filterAndSort);
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
        credential.sortBy = 1;
        credential.sort = 2;
        credential.search = '';

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

        this.props.searchMembers(credential);
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
        } else if (!nextProps.updateSuccess && nextProps.updateFailed){
            this.setState({
                msgContent : 'Updated failed.',
                msgShow : true,
                msgType : 'danger',
                onDelete : false
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
        } else{
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
        this.props.searchMembers(credential);

        this.setState({
            enableModalUpload : false
        })
    }

    viewMember(id){
        this.props.history.push('/member/view/'+id);
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

    changeStatusProcess(){
        let authCredential = this.props.authUser;
        authCredential.id = this.state.idWillDelete;
        authCredential.status = this.state.nextStatus;

        this.props.changeStatusMember(authCredential);
    }

    onCancelChangeStatus(){
        this.setState({
            onDelete : false,
            idWillDelete : '',
            nextStatus : 0
        })
    }

    handleAddStock(){
        this.setState({
            enableModalUpload : true,
            errorImport : false
        })
    }

    handleCancel(){
        this.setState({
            enableModalUpload : false
        })
    }

    handleupload(info){
        // const nextState = {};

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
            // else{
            //     if(voucher.point.length > 35){
            //         errorId = i + 1;
            //         errorMessage = "point";
            //         defaultMessage = 'point length must below 35 characters'
            //     }
            // }

            if(errorMessage !== ''){
                self.errorNotification('Import voucher from csv file was failed. Column '+errorMessage+' on '+errorId+'th row '+defaultMessage+'.');
                return true;
            }

            // quantity ++;
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

    handleOk(){
        if(this.state.memberData.length > 0){
            let authCredential = this.props.authUser;
            authCredential.members = this.state.memberData;
            console.log('berhasil update data')
            this.props.uploadMember(authCredential);
        }else{
            console.log('gagal update data', this.state.errorImport)
            if(this.state.errorImport === true){
                this.errorNotification('Imported data was incorrect. Please fix data and re-upload.');
            }else{
                this.errorNotification('Please upload data member.');
            }
        }
    }

    render() {
        // let component = [];
        let {loader, alertMessage, showMessage} = this.props;
        const { msgShow, msgType, msgContent, onDelete, search, enableModalUpload, memberData,
            // msgDelete
        } = this.state;
        let {sorter,
            // filters
        } = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        // let filteredInfo = filters || {};

        let filterParam = {
            search : search
        }

        if(this.props.listMembers.length > 0){
            this.props.listMembers.forEach((member, i) => {
                member.key = member.memberId;
                member.name = member.memberName;
                member.isMarketplace = (member.isMarketplace === -1 ? 'Yes' : 'No');
            });
        }

        let columns = [{
            title: 'Member Username',
            dataIndex: 'memberUsername',
            key: 'memberUsername',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'memberUsername' && sortedInfo.order
        },{
            title: 'Member Name',
            dataIndex: 'memberName',
            key: 'memberName',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'memberName' && sortedInfo.order
        },
        //     {
        //     title: 'Gender',
        //     dataIndex: 'gender',
        //     key: 'gender',
        // },
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
                        columns={columns}
                        listData={this.props.listMembers}
                        title='Member List'
                        placeholder='Search members by name'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        onView = {this.viewMember.bind(this)}
                        onEdit = {this.changeStatusPopup.bind(this)}
                        recordInfo = {this.props.recordInfo}
                        onSearch = {this.handleSearch.bind(this)}
                        filterParam = {filterParam}
                        enableUploadMember = {true}
                        onAddStock = {this.handleAddStock.bind(this)}
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
                            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                <form method="get" action={window.location.origin.toString()+"/uploadMember.csv"}>
                                    <Button key="download" icon="download" htmlType="submit">
                                        Download sample format
                                    </Button>
                                </form>
                            </Col>
                            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
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
                <NotificationContainer/>
            </div>
        );

    }



}

const mapStateToProps = ({auth, memberState}) => {
    const {authUser} = auth;
    const {listMembers, recordInfo, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, uploadSuccess, uploadFailed} = memberState
    return {authUser, listMembers, recordInfo, filterAndSort, loader, alertMessage, showMessage, updateSuccess, updateFailed, uploadSuccess, uploadFailed}
};
export default connect(mapStateToProps, {searchMembers, filterSortSearch, clearFilterSortSearch,resetStatus, changeStatusMember, uploadMember})(SearchMembers);


