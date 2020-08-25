import React, {Component} from "react";
import {connect} from "react-redux";
import BasicRuleType from '../../constants/BasicRuleType';
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    viewRule,
    updateRule,
    createRule,
    resetStatus
} from "appRedux/actions/Rules";
import {Button, Card, Form, Input, InputNumber, Select, Popconfirm, Table} from "antd";


const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};

class CreateUpdateReferral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            referralRule : [],
            dataSource : [],
            count : 1,
            msgContent : '',
            msgType : '',
            msgShow : false
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);

    }

    componentWillMount(){
        if(this.props.match.params.type === 'update'){
            let credential = this.props.authUser;
            credential.type = 'referral'
            credential.id = this.props.match.params.id;
            this.props.viewRule(credential);
        }else{
            let referral = [];
            this.setState({
                referralRule : referral
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.match.params.type === 'update') {
            if (nextProps.referralRule !== this.props.referralRule) {

                let dataSourceRaw = [];
                let totalRec = 0;
                nextProps.referralRule.referralRuleDetail.forEach((detail, i) => {
                    detail.key = i;
                    dataSourceRaw.push(detail);
                    totalRec++;
                });

                this.setState({
                    referralRule: nextProps.referralRule,
                    dataSource: dataSourceRaw,
                    count: totalRec + 1
                });
            }
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
                msgContent : 'Created Successfully',
                msgShow : true,
                msgType : 'success'
            })
        }else if (!nextProps.createSuccess && nextProps.createFailed){
            this.setState({
                msgContent : 'Create failed',
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

                if(this.state.dataSource.length < 1 ){
                    this.errorNotification('Referer point rule detail must not empty');
                    error = true;
                }

                let maxRefBefore = 0;
                this.state.dataSource.forEach((product,i) => {
                    if(product.minReference < 1){
                        this.errorNotification('Minimum reference must greater than 0');
                        error = true;
                        return;
                    }

                    if(product.maxReference < 1){
                        this.errorNotification('Maximum reference must greater than 0');
                        error = true;
                        return;
                    }

                    if(product.point < 1){
                        this.errorNotification('Point must greater than 0');
                        error = true;
                        return;
                    }

                    if(product.minReference !== maxRefBefore + 1){
                        this.errorNotification('Referer point rule must in consecutive order');
                        error = true;
                        return;
                    }

                    if(product.minReference > product.maxReference){
                        this.errorNotification('Minimum reference must lower than maximum reference');
                        error = true;
                        return;
                    }

                    maxRefBefore = product.maxReference;
                })

                values.referralRuleDetail = this.state.dataSource;
                // console.log(values);

                let request = this.props.authUser;
                request.data = values;
                request.type = 'referral';
                // console.log(request);

                if(!error){
                    if(this.props.match.params.type === 'update') {
                        this.props.updateRule(request);
                    }else{
                        this.props.createRule(request);
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


    //Action For List
    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }

    handleAdd = () => {
        const { count, dataSource } = this.state;
        let lastRec = dataSource[dataSource.length - 1];
        // console.log(lastRec);

        let lastMaxRef = 0
        if(lastRec){
            lastMaxRef = lastRec.maxReference;
        }

        let newData = {
            key: count,
            minReference: lastMaxRef + 1,
            maxReference: lastMaxRef + 2,
            point: 1
        };

        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        let {referralRule} = this.state;
        const { msgShow, msgType, msgContent, dataSource } = this.state;

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        let columnsComp = [{
            title: 'Minimal Reference (Member)',
            dataIndex: 'minReference',
            editable: true,
        }, {
            title: 'Max Reference (Member)',
            dataIndex: 'maxReference',
            editable: true,
        }, {
            title: 'Referer Point',
            dataIndex: 'point',
            editable: !this.state.discountDisable
        },  {
            title: 'Action',
            dataIndex: 'operation',
            render: (text, record) => (
                this.state.dataSource.length >= 1
                    ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;">Delete</a>
                        </Popconfirm>
                    ) : null
            ),
        }];

        const columns = columnsComp.map((col) => {
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
                    handleSave: this.handleSave,
                }),
            };
        });

        return(
            <Card className="gx-card" title='Referral Rule'>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Rule Name'>
                        {getFieldDecorator('referralRuleName', {
                            rules: [{
                                required: true,
                                message: 'Please input rule name'
                            }],
                            initialValue: referralRule.referralRuleName
                        })(
                            <Input placeholder='Rule Name'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Rule Description'>
                        {getFieldDecorator('referralRuleDesc', {
                            rules: [{
                                required: true,
                                message: 'Please input rule description'
                            }],
                            initialValue: referralRule.referralRuleDesc
                        })(
                            <Input placeholder='Rule Description'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Referee Point'>
                        {getFieldDecorator('refereePoint',{
                            rules: [{
                                required: true,
                                message: 'Please input referee point',
                            }],
                            initialValue: referralRule.refereePoint ? referralRule.refereePoint : 0
                        })(
                            <InputNumber min={1}/>
                        )}
                    </FormItem>

                    <div style={{marginBottom:'20px'}}>
                        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                            Add referer point rule detail
                        </Button>
                        <Table
                            className="gx-table-responsive"
                            components={components}
                            rowClassName={() => 'editable-row'}
                            bordered
                            pagination = {false}
                            dataSource={dataSource}
                            columns={columns}
                        />
                    </div>

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
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;

        const className = !editable ? 'custom-disable' : 'custom-enable';
        restProps.className = className;

        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
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
                                ) : (
                                    <div
                                        className="editable-cell-value-wrap"
                                        style={{ paddingRight: 24 }}
                                        onClick={this.toggleEdit}
                                    >
                                        {restProps.children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

const mapStateToProps = ({auth, rules}) => {
    const {authUser} = auth;
    const {referralRule, updateSuccess, updateFailed, updateData, createSuccess, createFailed,  createData} = rules
    return {authUser, referralRule, updateSuccess, updateFailed, updateData, createSuccess, createFailed, createData}
};

export default connect(mapStateToProps, {viewRule, updateRule, createRule, resetStatus})(Form.create()(CreateUpdateReferral));


