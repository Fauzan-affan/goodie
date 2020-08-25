import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchBlast,
    filterSortSearch,
    clearFilterSortSearch,
    deleteBlast,
    resetStatus,
} from "appRedux/actions/Blast";
import {
    message,
    // Form,
    Modal, Button, Row, Col,
    // Upload, Icon, Table,

} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";

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

class SearchBlast extends Component {
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
            if(sorter.field === 'subject'){
                credential.sortBy = 4;
            }else if(sorter.field === '"messageType"'){
                credential.sortBy = 3;
            }else if(sorter.field === '"createdDate"'){
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

        this.props.searchBlast(credential);
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
                msgContent : 'Delete failed. '+ nextProps.alertMessage + '. Please Create New Message Blast',
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
        this.props.searchBlast(credential);
    }

    viewBlast(id){
        this.props.history.push('/blast/view/'+id);
    }

    editBlast(id, source){
        if(source === 'Email'){
            this.props.history.push('/blast/update/email/'+id);
        }else{
            this.props.history.push('/blast/update/sms/'+id);
        }
    }

    deleteBlastPopup(id){
        this.setState({
            onDelete : true,
            idWillDelete : id
        })
    }

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }

    deleteBlastProcess(){
        let authCredential = this.props.authUser;
        authCredential.id = this.state.idWillDelete;
        this.props.deleteBlast(authCredential);
    }

    onCancelDelete(){
        this.setState({
            onDelete : false,
            idWillDelete : ''
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


    render() {
        // let component = [];
        let {loader, alertMessage, showMessage} = this.props;
        const { msgShow, msgType, msgContent, onDelete,
            // msgDelete,
            search, enableModalUpload,
            // memberData
        } = this.state;
        let {sorter, filters} = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        let filteredInfo = filters || {};

        let filterParam = {
            search : search
        }

        if(this.props.listBlast !== undefined) {
            if(this.props.listBlast.length > 0){
                this.props.listBlast.forEach((blast, i) => {
                    blast.key = blast.messageBlastId;
                    blast.name = blast.subject;
                });
            }
        }

        let columns = [{
            title: 'Message Name',
            dataIndex: 'subject',
            key: 'subject',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'subject' && sortedInfo.order
        },{
            title: 'Message Type',
            dataIndex: 'messageType',
            key: 'messageType',
            filters: [
                {text: 'Email', value: 'Email'},
                {text: 'SMS', value: 'SMS'},
            ],
            filteredValue: filteredInfo.messageType || null,
            onFilter: (value, record) => record.messageType.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'messageType' && sortedInfo.order
        },{
            title: 'Date & Time',
            dataIndex: 'createdDate',
            key: 'createdDate',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'createdDate' && sortedInfo.order
        },{
            title: 'Delivery Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'deliveryStatus' && sortedInfo.order
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
                                title={'Are you sure delete this blast ?'}
                                onConfirm={this.deleteBlastProcess.bind(this)}
                                onCancel={this.onCancelDelete.bind(this)}
                    />
                </div>
                {loader === false ?
                    <SearchForm
                        columns={columns}
                        listData={this.props.listBlast}
                        title='Message Blast List'
                        placeholder='Search by message name'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        recordInfo = {this.props.recordInfo}
                        onSearch = {this.handleSearch.bind(this)}
                        filterParam = {filterParam}
                        onView = {this.viewBlast.bind(this)}
                        onEdit = {this.editBlast.bind(this)}
                        onDelete = {this.deleteBlastPopup.bind(this)}
                        enableUploadReceivers = {true}
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
                        title="Download Example Receivers"
                        visible={enableModalUpload}
                        onCancel={this.handleCancel.bind(this)}
                        footer={[
                            <Button key="back" onClick={this.handleCancel.bind(this)}>Back</Button>
                        ]}
                    >
                        <div>
                            <p>You can download receivers for create sample format.</p>
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                    <form method="get" action={window.location.origin.toString()+"/uploadReceiversEmail.csv"}>
                                        <Button key="download" icon="download" htmlType="submit">
                                            Sample for Email
                                        </Button>
                                    </form>
                                </Col>
                                <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                                    <form method="get" action={window.location.origin.toString()+"/uploadReceiversSms.csv"}>
                                        <Button key="download" icon="download" htmlType="submit">
                                            Sample for Sms
                                        </Button>
                                    </form>
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

const mapStateToProps = ({auth, blastState}) => {
    const {authUser} = auth;
    const {listBlast, recordInfo, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed,updateSuccess, updateFailed} = blastState
    return {authUser, listBlast, recordInfo, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed,updateSuccess, updateFailed}
};
export default connect(mapStateToProps, {searchBlast, filterSortSearch, clearFilterSortSearch,deleteBlast,resetStatus})(SearchBlast);


