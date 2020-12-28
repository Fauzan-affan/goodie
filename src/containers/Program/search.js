import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    searchPrograms,
    filterSortSearch,
    clearFilterSortSearch,
    deleteProgram,
    resetStatus
} from "appRedux/actions/Program";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";

class SearchPrograms extends Component {
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
        this.props.searchPrograms(credential);
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
        this.props.searchPrograms(credential);
    }

    viewProgram(id){
        this.props.history.push('/reward/view/'+id);
    }

    editProgram(id, source){
        if(source === 'Own Product'){
            this.props.history.push('/reward/update/internal/'+id);
        }else{
            this.props.history.push('/reward/update/external/'+id);
        }
    }

    deleteProgramPopup(id){
        this.setState({
            onDelete : true,
            idWillDelete : id
        })
    }

    deleteProgramProcess(){
        let authCredential = this.props.authUser;
        authCredential.id = this.state.idWillDelete;
        this.props.deleteProgram(authCredential);
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
        let {sorter, filters} = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        let filteredInfo = filters || {};

        this.props.listPrograms.forEach((program, i) => {
            program.key = program.programId;
            program.name = program.programName;
        });

        let columns = [{
            title: 'Reward Code',
            dataIndex: 'programCode',
            key: 'programCode',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'programCode' && sortedInfo.order
        },{
            title: 'Reward Name',
            dataIndex: 'programName',
            key: 'programName',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'programName' && sortedInfo.order
        },{
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'product' && sortedInfo.order
        },{
            title: 'Source Product',
            dataIndex: 'sourceProduct',
            key: 'sourceProduct',
            filters: [
                {text: 'Own Product', value: 'Own Product'},
                {text: 'Collaboration Product', value: 'Collaboration Product'},
            ],
            filteredValue: filteredInfo.sourceProduct || null,
            onFilter: (value, record) => record.sourceProduct.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'sourceProduct' && sortedInfo.order
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
                                onConfirm={this.deleteProgramProcess.bind(this)}
                                onCancel={this.onCancelDelete.bind(this)}
                    />
                </div>
                {console.log(this.props.listPrograms)}
                {loader === false ?
                    <SearchForm
                        columns={columns}
                        listData={this.props.listPrograms}
                        title='Reward List'
                        placeholder='Search rewards by name'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        onView = {this.viewProgram.bind(this)}
                        onEdit = {this.editProgram.bind(this)}
                        onDelete = {this.deleteProgramPopup.bind(this)}
                    />
                    : ''
                }

            </div>
        );

    }
}

const mapStateToProps = ({auth, programState}) => {
    const {authUser} = auth;
    const {listPrograms, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed} = programState
    return {authUser, listPrograms, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed}
};
export default connect(mapStateToProps, {searchPrograms, filterSortSearch, clearFilterSortSearch, deleteProgram, resetStatus})(SearchPrograms);


