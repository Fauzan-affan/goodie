import React, {Component} from "react";
import SearchForm from '../../components/Form/search';
import {connect} from "react-redux";
import {
    clearFilterSortSearch,
    deleteRoles,
    filterSortSearch,
    resetStatus,
    searchRoles,
    getListPrivileges
} from "appRedux/actions/Roles";
import {
    viewMerchant
} from "appRedux/actions/Merchant";
import {Form, message,
    // Modal, Row, Table, Tooltip, Button, Col, Input
} from "antd";
import CircularProgress from "components/CircularProgress/index";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationManager} from "react-notifications";

// const formItemLayout = {
//     labelCol: {xs: 24, sm: 6},
//     wrapperCol: {xs: 24, sm: 14},
// };
//
// const FormItem = Form.Item;

class SearchRoles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            merchant: [],
            msgContent: '',
            msgType: '',
            msgShow: false,
            onDelete: false,
            idWillDelete: '',
            msgDelete: '',
            search: '',
            enableModalUpload: false,
            errorImport: false,
            cellButtons: []
        };

        this.errorNotification = this.errorNotification.bind(this);

    }

    componentWillMount() {
        let credential = this.props.authUser;
        this.props.searchRoles(credential);
        this.props.viewMerchant(credential);

        if (this.props.listPrivileges.length < 1) {
            this.props.getListPrivileges();
        }
    }

    filterComponent(pagination, filters, sorter) {
        this.props.filterSortSearch(pagination, filters, sorter);
    }

    clearFilterComponent() {
        this.props.clearFilterSortSearch();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.merchant !== undefined && nextProps.merchant !== this.props.merchant) {
            let request = {
                authToken: localStorage.getItem('a'),
                deviceUniqueId: localStorage.getItem('d'),
                userId: localStorage.getItem('u'),
                merchantId: localStorage.getItem('mt'),
                size: 20,
                page: 0
            };
            this.props.getListPrivileges(request);
        }

        if (nextProps.deleteSuccess && !nextProps.deleteFailed) {
            this.setState({
                msgContent: 'Deleted Successfully',
                msgShow: true,
                msgType: 'success',
                onDelete: false
            })
        } else if (!nextProps.deleteSuccess && nextProps.deleteFailed) {
            this.setState({
                msgContent: 'Delete failed',
                msgShow: true,
                msgType: 'danger',
                onDelete: false
            })
        } else {
            this.setState({
                msgContent: '',
                msgShow: false,
                msgType: '',
                onDelete: false
            })
        }

        // this.setState({
        //     cellButtons: [{
        //         "unitId": 2,
        //         "unitCode": "USER_MGMT",
        //         "unitName": "User Management",
        //         "functions": [
        //             {
        //                 "functionId": 1,
        //                 "functionCode": "SEARCH",
        //                 "functionName": "Search Function",
        //                 "activated": false
        //             },
        //             {
        //                 "functionId": 2,
        //                 "functionCode": "CREATE",
        //                 "functionName": "Create Function",
        //                 "activated": true
        //             },
        //             {
        //                 "functionId": 3,
        //                 "functionCode": "UPDATE",
        //                 "functionName": "Update Function",
        //                 "activated": false
        //             },
        //             {
        //                 "functionId": 4,
        //                 "functionCode": "DELETE",
        //                 "functionName": "Delete Function",
        //                 "activated": false
        //             }
        //         ]
        //     },
        //         {
        //             "unitId": 33,
        //             "unitCode": "UPLOAD_ISSUING_POINT",
        //             "unitName": "Upload Issuing Point",
        //             "functions": [
        //                 {
        //                     "functionId": 1,
        //                     "functionCode": "SEARCH",
        //                     "functionName": "Search Function",
        //                     "activated": false
        //                 }
        //             ]
        //         }]
        // })
    }

    onConfirm() {
        this.props.resetStatus();
        let credential = this.props.authUser;
        this.props.searchRoles(credential);

        this.setState({
            enableModalUpload: false
        })
    }

    handleAddStock() {
        this.setState({
            enableModalUpload: true,
            errorImport: false
        })
    }

    handleCancel() {
        this.setState({
            enableModalUpload: false
        })
    }

    handleOk() {
        if (this.state.memberData.length > 0) {
            let authCredential = this.props.authUser;
            authCredential.members = this.state.memberData;

            this.props.uploadMember(authCredential);
        } else {
            if (this.state.errorImport === true) {
                this.errorNotification('Imported data was incorrect. Please fix data and re-upload.');
            } else {
                this.errorNotification('Please upload data member.');
            }
        }
    }

    viewRoles(id) {
        this.props.history.push('/roles/view/' + id);
    }

    editRoles(id) {
        this.props.history.push('roles/' + id + '/update');
        // localStorage.setItem('idForUpdateRoles', id);
    }

    deleteRolesPopup(id) {
        this.setState({
            onDelete: true,
            idWillDelete: id
        })
    }

    errorNotification(message) {
        return NotificationManager.error(message, 'Alert', 3000);
    }

    deleteRolesProcess() {
        let authCredential = this.props.authUser;
        authCredential.id = this.state.idWillDelete;
        this.props.deleteRoles(authCredential);
    }

    onCancelDelete() {
        this.setState({
            onDelete: false,
            idWillDelete: ''
        })
    }

    handleCellButton(func) {
        let cellButton = this.state.cellButtons;
        cellButton[func.rowIndex].functions.map(fun => {
            if (fun.functionId === func.functionId) {
                fun.activated = !fun.activated;
            }
        });
        this.setState({
            cellButtons: cellButton
        })
    }

    render() {
        // let component = [];
        // const {getFieldDecorator} = this.props.form;
        let {loader, alertMessage, showMessage,
            // listRoles
        } = this.props;
        // const {getFieldDecorator} = this.props.form;
        const {msgShow, msgType, msgContent, onDelete,
            // msgDelete, memberData, cellButtons, enableModalUpload,
        } = this.state;
        let {sorter,
            // filters
        } = this.props.filterAndSort;
        let sortedInfo = sorter || {};
        // let filteredInfo = filters || {};


        if (this.props.listRoles.length > 0) {
            this.props.listRoles.forEach((data, i) => {
                data.key = data.id;
                // data.name = data.name;
            });
        }

        let column = [{
            title: 'Role Code',
            dataIndex: 'code',
            key: 'code',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'code' && sortedInfo.order
        }, {
            title: 'Role Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
        }, {
            title: 'Role Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order
        }];

        // for privileges
        // const privilegesHeader = [{
        //     title: 'Name',
        //     dataIndex: 'name',
        //     key: 'name',
        // }, {
        //     title: 'Function',
        //     dataIndex: 'function',
        //     key: 'buttonFunction',
        //     render: buttonFunction => (
        //         buttonFunction.map(func => {
        //             return (
        //                 <Tooltip title={func.functionName}>
        //                     <Button key={func.functionId} value={func.functionId}
        //                             onClick={() => this.handleCellButton(func)}
        //                             type={func.activated ? 'danger' : 'default'}>
        //                         {func.functionCode}
        //                     </Button>
        //                 </Tooltip>
        //             );
        //         })
        //     )
        // }];

        // let privilegesData = [];
        // this.state.cellButtons.forEach((btn, i) => {
        //     let func = btn.functions;
        //     func.forEach(fun => {
        //         fun.rowIndex = i;
        //     });
        //     let privilege = {
        //         'name': btn.unitName,
        //         'function': func
        //     };
        //     privilegesData.push(privilege);
        // });

        return (
            <div>
                <div>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                    <SweetAlert success={msgType === 'success' ? true : false}
                                danger={msgType === 'danger' ? true : false}
                                show={msgShow} title={msgContent} onConfirm={this.onConfirm.bind(this)}>
                    </SweetAlert>
                    <SweetAlert show={onDelete}
                                warning
                                showCancel
                                confirmBtnText='Yes, delete it!'
                                confirmButtonStyle="danger"
                                cancelButtonStyle="default"
                                title={'Are you sure delete this role ?'}
                                onConfirm={this.deleteRolesProcess.bind(this)}
                                onCancel={this.onCancelDelete.bind(this)}
                    />
                </div>
                {loader === false ?
                    <SearchForm
                        columns={column}
                        listData={this.props.listRoles}
                        title='Role List'
                        placeholder='Search role by name'
                        onFilter={this.filterComponent.bind(this)}
                        onClearFilter={this.clearFilterComponent.bind(this)}
                        onView={this.viewRoles.bind(this)}
                        onEdit={this.editRoles.bind(this)}
                        onDelete={this.deleteRolesPopup.bind(this)}
                        // enableCreateRoles={true}
                        onAddStock={this.handleAddStock.bind(this)}
                    />
                    : ''
                }

                {/*<div>*/}
                {/*    {loader == true ? <div className="gx-loader-view"><CircularProgress/></div> : null}*/}
                {/*    {showMessage ? message.error(alertMessage.toString()) : null}*/}
                {/*</div>*/}
                {/*{loader == false ?*/}
                {/*    <Modal*/}
                {/*        width={'70%'}*/}
                {/*        title="Create New Roles"*/}
                {/*        visible={enableModalUpload}*/}
                {/*        onOk={this.handleOk.bind(this)}*/}
                {/*        onCancel={this.handleCancel.bind(this)}*/}
                {/*        footer={[*/}
                {/*            <Button key="back" onClick={this.handleCancel.bind(this)}>Back</Button>,*/}
                {/*            <Button key="submit" type="primary" onClick={this.handleOk.bind(this)}>*/}
                {/*                Save*/}
                {/*            </Button>*/}
                {/*        ]}*/}
                {/*    >*/}
                {/*        <div>*/}
                {/*            <FormItem {...formItemLayout} label='Role Code'>*/}
                {/*                {getFieldDecorator('code', {*/}
                {/*                    rules: [{*/}
                {/*                        required: true,*/}
                {/*                        message: 'Please input merchant name'*/}
                {/*                    }],*/}
                {/*                    // initialValue: merchant.merchantName*/}
                {/*                })(*/}
                {/*                    <Input placeholder='Role Code'/>*/}
                {/*                )}*/}
                {/*            </FormItem>*/}
                {/*            <FormItem {...formItemLayout} label='Role Name'>*/}
                {/*                {getFieldDecorator('name', {*/}
                {/*                    rules: [{*/}
                {/*                        required: true,*/}
                {/*                        message: 'Please input Role Name'*/}
                {/*                    }],*/}
                {/*                    // initialValue: merchant.merchantName*/}
                {/*                })(*/}
                {/*                    <Input placeholder='Role Name'/>*/}
                {/*                )}*/}
                {/*            </FormItem>*/}
                {/*            <FormItem {...formItemLayout} label='Role Description'>*/}
                {/*                {getFieldDecorator('description', {*/}
                {/*                    rules: [{*/}
                {/*                        required: true,*/}
                {/*                        message: 'Please input Role Description'*/}
                {/*                    }],*/}
                {/*                    // initialValue: merchant.merchantName*/}
                {/*                })(*/}
                {/*                    <Input placeholder='Role Description'/>*/}
                {/*                )}*/}
                {/*            </FormItem>*/}
                {/*            /!*<Row>*!/*/}
                {/*            /!*    <Col xl={24} lg={24} md={24} sm={24} xs={24}>*!/*/}
                {/*            /!*        <FormItem label='Privileges' style={{marginLeft: "0px"}}/>*!/*/}
                {/*            /!*        <Table className="gx-table-responsive" pagination={false} columns={privilegesHeader}*!/*/}
                {/*            /!*               dataSource={privilegesData}/>*!/*/}
                {/*            /!*    </Col>*!/*/}
                {/*            /!*</Row>*!/*/}
                {/*        </div>*/}
                {/*    </Modal>*/}
                {/*    : ''}*/}

            </div>
        );

    }


}

const mapStateToProps = ({auth, merchantState, rolesState}) => {
    const {authUser} = auth;
    const {merchant} = merchantState;
    const {listRoles, filterAndSort, loader, alertMessage, showMessage, deleteSuccess, deleteFailed, listPrivileges} = rolesState;
    return {
        authUser,
        merchant,
        listRoles,
        filterAndSort,
        loader,
        alertMessage,
        showMessage,
        deleteSuccess,
        deleteFailed,
        listPrivileges
    }
};
export default connect(mapStateToProps, {
    searchRoles,
    viewMerchant,
    filterSortSearch,
    clearFilterSortSearch,
    getListPrivileges,
    deleteRoles,
    resetStatus
})(Form.create()(SearchRoles));


