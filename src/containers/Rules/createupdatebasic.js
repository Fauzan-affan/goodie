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

class CreateUpdateBasic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            basicRule : [],
            discountDisable : false,
            pointDisable : false,
            amountReqDisable : false,
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
            credential.type = 'basic'
            credential.id = this.props.match.params.id;
            this.props.viewRule(credential);
        }else{
            let basic = [];
            basic.basicRuleType = BasicRuleType.BasicRuleType.FIXED.label;
            this.setState({
                basicRule : basic,
                pointDisable: false,
                discountDisable: true,
                amountReqDisable : false
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.match.params.type === 'update') {
            if (nextProps.basicRule !== this.props.basicRule) {

                let dataSourceRaw = [];
                let totalRec = 0;
                nextProps.basicRule.basicRuleDetailList.forEach((detail, i) => {
                    detail.key = i;
                    dataSourceRaw.push(detail);
                    totalRec++;
                });

                if (nextProps.basicRule.basicRuleType === BasicRuleType.BasicRuleType.PERCENTAGE.label) {
                    this.setState({
                        basicRule: nextProps.basicRule,
                        discountDisable: false,
                        pointDisable: true,
                        amountReqDisable: true,
                        dataSource: dataSourceRaw,
                        count: totalRec + 1
                    });
                } else if (nextProps.basicRule.basicRuleType === BasicRuleType.BasicRuleType.FIXED.label) {
                    this.setState({
                        basicRule: nextProps.basicRule,
                        discountDisable: true,
                        pointDisable: false,
                        amountReqDisable: false,
                        dataSource: dataSourceRaw,
                        count: totalRec + 1
                    });
                }
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

    changeListbox(value){
        if(value === 0){
            let data = [];
            this.state.dataSource.forEach((product,i) => {
                product.baseLoyaltyPoint = 0;
                product.amountReq = 0;
                data.push(product);
            })

            this.setState({
                pointDisable: true,
                discountDisable: false,
                amountReqDisable : true,
                dataSource : data
            });

            this.props.form.setFieldsValue({
                baseLoyaltyPoint: 0,
                amountReq: 0
            });
        }else if(value === 1){
            let data = [];
            this.state.dataSource.forEach((product,i) => {
                product.baseLoyaltyDiscount = 0;
                data.push(product);
            })

            this.setState({
                pointDisable: false,
                discountDisable: true,
                amountReqDisable : false,
                dataSource : data
            });

            this.props.form.setFieldsValue({
                baseLoyaltyDiscount: 0
            });
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let error = false;
                this.state.dataSource.forEach((product,i) => {
                    if(values.basicRuleType === 0){
                        if(product.baseLoyaltyDiscount < 1){
                            this.errorNotification('Base loyalty discount in product must greater than 0');
                            error = true;
                            return;
                        }
                    }

                    if(values.basicRuleType === 1){
                        if(product.baseLoyaltyPoint < 1){
                            this.errorNotification('Base loyalty point in product must greater than 0');
                            error = true;
                            return;
                        }

                        if(product.amountReq < 1){
                            this.errorNotification('For each amount in product must greater than 0');
                            error = true;
                            return;
                        }
                    }

                    if(product.capPerTrx < 1){
                        this.errorNotification('Maximum point in product must greater than 0');
                        error = true;
                        return;
                    }
                })

                values.basicRuleDetail = this.state.dataSource;
                values.paymentRule = 1;
                // console.log(values);

                let request = this.props.authUser;
                request.data = values;
                request.type = 'basic';
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
        let newData = [];
        if(this.state.discountDisable === true){
            newData = {
                key: count,
                productCode: 'New Product Code',
                productName: 'New Product Name',
                baseLoyaltyDiscount: 0,
                baseLoyaltyPoint: 1,
                amountReq: 1000,
                capPerTrx: 100
            };
        }else{
            newData = {
                key: count,
                productCode: 'New Product Code',
                productName: 'New Product Name',
                baseLoyaltyDiscount: 10,
                baseLoyaltyPoint: 0,
                amountReq: 0,
                capPerTrx: 100
            };
        }

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
        let {basicRule} = this.state;
        const { msgShow, msgType, msgContent, dataSource } = this.state;

        let options = [];

        BasicRuleType.values().forEach((ruleType, i) => {
            let option = [];
            option.push(
                <Option key={i} value={ruleType.value}>{ruleType.label}</Option>
            );

            options.push(option);
        });

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        let columnsComp = [{
            title: 'Product Code',
            dataIndex: 'productCode',
            width: '15%',
            editable: true,
        }, {
            title: 'Product Name',
            dataIndex: 'productName',
            width: '25%',
            editable: true,
        }, {
            title: 'Base Loyalty Discount (%)',
            dataIndex: 'baseLoyaltyDiscount',
            editable: !this.state.discountDisable
        }, {
            title: 'Base Loyalty Point',
            dataIndex: 'baseLoyaltyPoint',
            editable: !this.state.pointDisable,
        },  {
            title: 'For Each Amount Of (Rp)',
            dataIndex: 'amountReq',
            editable: !this.state.amountReqDisable
        },  {
            title: 'Maximum Points',
            dataIndex: 'capPerTrx',
            editable: true
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
            <Card className="gx-card" title='Basic Rule'>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Rule Name'>
                        {getFieldDecorator('basicRuleName', {
                            rules: [{
                                required: true,
                                message: 'Please input rule name'
                            }],
                            initialValue: basicRule.basicRuleName
                        })(
                            <Input placeholder='Rule Name'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Rule Description'>
                        {getFieldDecorator('basicRuleDesc', {
                            rules: [{
                                required: true,
                                message: 'Please input rule description'
                            }],
                            initialValue: basicRule.basicRuleDesc
                        })(
                            <Input placeholder='Rule Description'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Basic Rule Type'>
                        {getFieldDecorator('basicRuleType',{
                            initialValue: BasicRuleType.getValue(basicRule.basicRuleType),
                            required: true,
                            message: 'Please input basic rule type',
                        })(
                            <Select style={{width: '50%'}} onChange={this.changeListbox.bind(this)}>
                                {options}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Base Loyalty Discount (%)'>
                        {getFieldDecorator('baseLoyaltyDiscount',{
                            rules: [{
                                required: false,
                                message: 'Please input base loyalty discount',
                            }],
                            initialValue: basicRule.baseLoyaltyDiscount ? basicRule.baseLoyaltyDiscount : 0
                        })(
                            <InputNumber min={0} disabled={this.state.discountDisable} />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Base Loyalty Point'>
                        {getFieldDecorator('baseLoyaltyPoint',{
                            rules: [{
                                required: false,
                                message: 'Please input base loyalty point',
                            }],
                            initialValue: basicRule.baseLoyaltyPoint ? basicRule.baseLoyaltyPoint : 0
                        })(
                            <InputNumber min={0} disabled={this.state.pointDisable}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='For Each Amount Of (Rp)'>
                        {getFieldDecorator('amountReq',{
                            rules: [{
                                required: false,
                                message: 'Please input for each amount of',
                            }],
                            initialValue: basicRule.amountReq ? basicRule.amountReq : 0
                        })(
                            <InputNumber min={0} disabled={this.state.amountReqDisable}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Maximum Points'>
                        {getFieldDecorator('capPerTrx',{
                            rules: [{
                                required: false,
                                message: 'Please input maximum points',
                            }],
                            initialValue: basicRule.capPerTrx ? basicRule.capPerTrx : 0
                        })(
                            <InputNumber min={0} />
                        )}
                    </FormItem>

                    <div style={{marginBottom:'20px'}}>
                        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                            Add rule for specific product
                        </Button>
                        <Table
                            className="gx-table-responsive"
                            components={components}
                            rowClassName={() => 'editable-row'}
                            bordered
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
                                        dataIndex === 'productCode' || dataIndex === 'productName' ? (
                                            <FormItem style={{ margin: 0 }}>
                                                {form.getFieldDecorator(dataIndex, {
                                                    rules: [{
                                                        required: true,
                                                        message: `${title} is required.`,
                                                    }],
                                                    initialValue: record[dataIndex],
                                                })(
                                                    <Input
                                                        ref={node => (this.input = node)}
                                                        onPressEnter={this.save}
                                                        onBlur={this.save}
                                                    />
                                                )}
                                            </FormItem>
                                        ) : (
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
    const {basicRule, updateSuccess, updateFailed, updateData, createSuccess, createFailed,  createData} = rules
    return {authUser, basicRule, updateSuccess, updateFailed, updateData, createSuccess, createFailed, createData}
};

export default connect(mapStateToProps, {viewRule, updateRule, createRule, resetStatus})(Form.create()(CreateUpdateBasic));


