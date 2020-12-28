import React, {Component} from "react";
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    viewRoles,
    updateRoles,
    createRoles,
    getListPrivileges,
    resetStatus,
    viewRolesPrivileges
} from "appRedux/actions/Roles";
import {
    viewMerchant
} from "appRedux/actions/Merchant";
import {Button, Card, Form, Input, InputNumber, Select, Table} from "antd";


const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};

class CreateUpdateRole extends Component {
    constructor(props) {
        super(props);

        this.state = {
            merchant: [],
            data : [],
            msgContent : '',
            msgType : '',
            msgShow : false,
            dataSourcePrivileges: [],
            selectedRowKeys : [],
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
    }

    componentWillMount(){
        let credential = this.props.authUser;

        this.props.viewMerchant(credential);

        if (this.props.listPrivileges.length < 1) {
            this.props.getListPrivileges();
        }

        this.props.getListPrivileges(credential);


        if(this.props.match.params.type === 'update'){
            credential.id = this.props.match.params.id;
            this.props.viewRoles(credential);
            this.props.getListPrivileges(credential);
        }else{
            this.props.getListPrivileges(credential);

            let data = [];
            this.setState({
                data : data
            })
        }
    }

    componentWillReceiveProps(nextProps){

        if (nextProps.merchant !== undefined && nextProps.merchant !== this.props.merchant) {
            let request = {
                authToken: localStorage.getItem('a'),
                deviceUniqueId: localStorage.getItem('d'),
                userId: localStorage.getItem('u'),
                merchantId: localStorage.getItem('mt'),
                size: 165,
                page: 0
            };
            this.props.getListPrivileges(request);
        }




        let dataSourceRaw = [];
        if (nextProps.listPrivileges !== undefined) {
            let totalRec = 0;

            nextProps.listPrivileges.forEach((detail, i) => {
                let privileges = {};
                privileges.key = i;
                privileges.unitCode = detail.unitCode;
                privileges.unitName = detail.unitName;
                privileges.unitId = detail.unitId;
                privileges.functionCode = detail.functionCode;
                privileges.functionName = detail.functionName;
                privileges.functionId = detail.functionId;
                dataSourceRaw.push(privileges);
                totalRec++;
            });

        }

        if (this.props.match.params.type === 'update') {
            if(nextProps.data !== undefined){
                this.state.data.name=nextProps.data.name;
                this.state.data.code=nextProps.data.code;
                this.state.data.description=nextProps.data.description;

                let selectedPrivileges= [];
                let dataWithPrivileges = [];
                this.props.listPrivileges.forEach((privileges, i) =>{
                    let wPrivileges = privileges;
                    wPrivileges.key = i;
                    wPrivileges.unitName = privileges.unitName;
                    wPrivileges.unitId = privileges.unitId;
                    wPrivileges.functionId = privileges.functionId;
                    wPrivileges.functionName = privileges.functionName;


                    //Set selected privileges for this roles
                    nextProps.data.privileges.forEach((rolePriv, j) =>{
                        if(privileges.unitId === rolePriv.unitId){
                            wPrivileges.unitName = rolePriv.unitName;
                            wPrivileges.functionId = rolePriv.functionId;
                            wPrivileges.functionName = rolePriv.functionName;
                            selectedPrivileges.push(i);
                        }
                    })

                    // selectedPrivileges.push(1);
                    dataWithPrivileges.push(wPrivileges);
                })

                // const selectedRowKeysx = this.props.data.privileges.map(priv => {
                //     parseInt(priv.privilegeId)
                // });
                const prevPrivileges = this.props.data.privileges.reduce((obj, priv) => {
                    return {
                        ...obj,
                        [`${priv.unitCode}_${priv.functionCode}`]: priv
                    }
                }, {});
                const selectedRowKeys = dataSourceRaw.reduce((arr, priv, i) => {
                    if (prevPrivileges[`${priv.unitCode}_${priv.functionCode}`]) {
                        return [...arr, i]
                    } else return arr
                }, []);
                this.setState({
                    data: this.state.data,
                    selectedRowKeys,
                    dataSourcePrivileges: dataSourceRaw,
                });

            }
        }else{
            let newData = this.state.data;

            this.setState({
                dataSourcePrivileges : dataSourceRaw,
                data : newData,
                id : ''
            })
        }

        if (nextProps.updateSuccess && !nextProps.updateFailed){
            this.setState({
                msgContent : 'Updated Successfully',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.updateSuccess && nextProps.updateFailed){
            this.setState({
                msgContent : 'Update failed',
                msgShow : true,
                msgType : 'danger'
            })
        }

        if (nextProps.createSuccess && !nextProps.createFailed){
            this.setState({
                msgContent : 'Created Roles Successfully',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.createSuccess && nextProps.createFailed){
            this.setState({
                msgContent : 'Create Roles failed',
                msgShow : true,
                msgType : 'danger'
            })
        }
    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let error = false;

                let request = this.props.authUser;
                const {dataSourcePrivileges, selectedRowKeys,} = this.state;

                let privileges = [];
                selectedRowKeys.forEach((index, i)=>{
                    let privilege = {
                        unitId : dataSourcePrivileges[index].unitId,
                        functionId : dataSourcePrivileges[index].functionId
                    }
                    privileges.push(privilege)
                });

                values.privileges = privileges;

                if(values.privileges.length === 0){
                    this.errorNotification('Please select minimal 1 privileges');
                    error = true;
                    return;
                }

                request.data = values;

                if(!error){
                    if(this.props.match.params.type === 'update') {
                        this.props.updateRoles(request);
                    }else{
                        this.props.createRoles(request);
                    }
                }

            }
        });
    };

    errorNotification(message){
        return NotificationManager.error(message, 'Alert', 3000);
    }


    back(){
        this.props.history.goBack();
    }

    onConfirm(){
        this.props.resetStatus();
        if(this.state.msgType === "success"){
            this.props.history.goBack();
        }else{
            this.setState({
                msgShow : false
            })
        }
    }

    onChangeSelector(selectedRowKeys){
        this.setState({
            selectedRowKeys : selectedRowKeys,
        })
    }

    //Action For Privileges
    handleSavePrivileges = (row) => {
        const newData = [...this.state.dataSourcePrivileges];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSourcePrivileges: newData });
    }
    //End - Action For Privileges


    render() {
        const {getFieldDecorator} = this.props.form;
        let {data} = this.state;
        const { msgShow, msgType, msgContent, selectedRowKeys, dataSourcePrivileges} = this.state;


        //For Privileges
        const columnsPrivilegesRaw = [{
            title: 'Unit Code',
            dataIndex: 'unitCode',
            editable: false
        },{
            title: 'Unit Name',
            dataIndex: 'unitName',
            editable: false
        },{
            title: 'Function Code',
            dataIndex: 'functionCode',
            editable: false
        },{
            title: 'Function Name',
            dataIndex: 'functionName',
            editable: false
        }]


        const rowSelectionPrivileges = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.onChangeSelector(selectedRowKeys,selectedRows);
            },
            getCheckboxProps: record => ({
                name: record.name,
            }),
        };


        const componentsPrivileges= {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };


        const columnsPrivileges = columnsPrivilegesRaw.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSavePrivileges,
                    selectedRows : selectedRowKeys
                }),
            };
        });
        //End - For Privileges

        return(
            <Card className="gx-card" title='Role'>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Role Code'>
                        {getFieldDecorator('code', {
                            rules: [{
                                required: true,
                                message: 'Please input role code'
                            }],
                            initialValue: data.code
                        })(
                            <Input placeholder='Role Code'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Role Name'>
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: 'Please input role name'
                            }],
                            initialValue: data.name
                        })(
                            <Input placeholder='Role Name'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Role Description'>
                        {getFieldDecorator('description', {
                            initialValue: data.description
                        })(
                            <Input placeholder='Role Description'/>
                        )}
                    </FormItem>


                    <FormItem {...formItemLayout} label='Privileges List'>
                        <div style={{marginBottom:'20px'}}>
                            <Table
                                className="gx-table-responsive"
                                rowSelection={rowSelectionPrivileges}
                                components={componentsPrivileges}
                                bordered
                                pagination = {true}
                                dataSource={dataSourcePrivileges}
                                columns={columnsPrivileges}
                            />
                        </div>
                    </FormItem>


                    <FormItem {...formTailLayout}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button type="default" onClick={this.back} >Back</Button>
                    </FormItem>

                </Form>
                <SweetAlert success={msgType ==='success' ? true : false} danger={msgType ==='danger' ? true : false}
                            show={msgShow} title={msgContent} onConfirm={this.onConfirm}>
                </SweetAlert>
                <NotificationContainer/>
            </Card>
        );

    }
}




// Create List Table
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    save = (e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            // this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    changeRule = (value) => {
        const { record, handleSave } = this.props;
        handleSave(record, value);
    }

    render() {
        const { editing } = this.state;
        const {
            dataOption,
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            selectedRows,
            ...restProps
        } = this.props;

        const className = !editable ? 'custom-disable' : 'custom-enable';
        restProps.className = className;

        let edit = editable;
        if(selectedRows !== undefined){
            let ix = selectedRows.find(element => element === record.key);
            if(ix === undefined){
                edit = false;
            }
        }

        return (
            <td {...restProps}>
                {edit ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                dataIndex === 'ruleId' ? (
                                    <FormItem style={{ margin: 0 }}
                                              validateStatus={record.flag}
                                              help={record.msg}
                                    >
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(

                                            <Select style={{width:'300px'}}
                                                    onChange={this.changeRule}>
                                                {dataOption}
                                            </Select>
                                        )}
                                    </FormItem>
                                ):(
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <InputNumber
                                                ref={node => (this.input = node)}
                                                min={1}
                                                onPressEnter={this.save}
                                                onBlur={this.save}
                                            />
                                        )}
                                    </FormItem>
                                )
                            )
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

const mapStateToProps = ({auth, rolesState, merchantState}) => {
    const {authUser} = auth;
    const {merchant} = merchantState;
    const {data, updateSuccess, updateFailed, updateData, createSuccess, createFailed,  createData, listPrivileges} = rolesState;
    return {authUser, merchant, data, updateSuccess, updateFailed, updateData, createSuccess, createFailed, createData, listPrivileges}
};

export default connect(mapStateToProps, {viewRoles, viewMerchant, getListPrivileges, updateRoles, createRoles, resetStatus, viewRolesPrivileges})(Form.create()(CreateUpdateRole));


