import React, {Component} from "react";
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    viewPromotion,
    updatePromotion,
    createPromotion,
    resetStatus,
    viewPromotionTierRule
} from "appRedux/actions/Promotion";
import {
    searchRules
} from "appRedux/actions/Rules";
import {
    getTierDetails
} from "appRedux/actions/Tier";
import ExpiryPointType from '../../constants/ExpiryPointType';
import {Button, Card, DatePicker, Form, Input, InputNumber, Popconfirm, Select, Table} from "antd";
import moment from "moment";


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

class CreateUpdatePromotion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            promotion : [],
            msgContent : '',
            msgType : '',
            msgShow : false,
            disableDay : false,
            disableDate : false,
            dataSourceTier: [],
            dataSourceRule: [],
            selectedRowKeys : [],
            selectedRule:[],
            count: 0,
            endOpen: false,
            showDay : {},
            showDate : {}
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
    }

    componentWillMount(){
        let credential = this.props.authUser;

        this.props.searchRules(credential);
        this.props.getTierDetails(credential);


        if(this.props.match.params.type === 'update'){
            credential.id = this.props.match.params.id;
            this.props.viewPromotion(credential);
            this.props.viewPromotionTierRule(credential);
        }else{
            this.props.searchRules(credential);
            this.props.getTierDetails(credential);

            let promotion = [];
            this.setState({
                promotion : promotion
            })
        }
    }

    componentWillReceiveProps(nextProps){

        if (nextProps.listRules !== undefined) {

            let dataRaw = [];
            let totalRec = 0;

            nextProps.listRules.forEach((rule, i) => {
                let ruleDetail = {};
                ruleDetail.key = i;
                ruleDetail.ruleName = rule.ruleName;
                ruleDetail.ruleId = rule.ruleId;
                ruleDetail.ruleType = rule.ruleType;
                dataRaw.push(ruleDetail);
                totalRec++;
            });

            this.setState({
                dataSourceRule : dataRaw
            })

        }

        let showDay = {};
        let showDate = {};
        let disableDate = true;
        let disableDay = true;

        if(this.props.match.params.type === 'update') {
            if (nextProps.promotion !== this.props.promotion) {
                if(nextProps.promotion !== undefined){

                    let newDisableDate = true;
                    let newDisableDay = true;
                    if (nextProps.promotion.expiredPointType == 1){
                        newDisableDate = false;
                    }else if(nextProps.promotion.expiredPointType == 2){
                        newDisableDay = false;
                    }

                    let selectedTier = [];
                    let dataWithLoyaltyFactor = [];
                    this.props.tierDetails.tierDetails.forEach((detail, i) =>{
                        let wLoyaltyFactor = detail;
                        wLoyaltyFactor.key = i;
                        wLoyaltyFactor.tierName = detail.tierName;
                        wLoyaltyFactor.tierDetailId = detail.tierDetailId;
                        wLoyaltyFactor.loyaltyFactor = 1;

                        //Set selected tier for this promotion
                        nextProps.promotion.memberTiers[0].tierDetails.forEach((promoTier, j) =>{
                            if(detail.tierDetailId === promoTier.tierDetailId){
                                wLoyaltyFactor.loyaltyFactor = promoTier.loyaltyFactor;
                                selectedTier.push(i);
                            }
                        })

                        dataWithLoyaltyFactor.push(wLoyaltyFactor);
                    })


                    let rules= [];
                    let count = 1;
                    nextProps.promotion.rules.forEach((detail, i) => {
                        let rule = detail;
                        rule.flag = 'success';
                        rule.msg = '';
                        rule.key = count;
                        rules.push(rule);
                        count++;
                    })

                    if(nextProps.promotion.startDate != null ||
                        nextProps.promotion.startDate !== ''){
                        nextProps.promotion.startDate = moment(nextProps.promotion.startDate, 'YYYY/MM/DD');
                    }

                    if(nextProps.promotion.endDate != null ||
                        nextProps.promotion.endDate !== ''){
                        nextProps.promotion.endDate = moment(nextProps.promotion.endDate, 'YYYY/MM/DD');
                    }

                    if(nextProps.promotion.expiredPointType == 0) {

                        showDay = {display: 'none'};
                        showDate = {display: 'none'};
                    }else if(nextProps.promotion.expiredPointType == 1){

                        showDate = {display:'none'};
                        disableDay = true;

                    }else if(nextProps.promotion.expiredPointType == 2){

                        showDay = {display:'none'};
                        disableDate = true;

                    }

                    this.setState({
                        promotion: nextProps.promotion,
                        // disableDay: newDisableDay,
                        // disableDate: newDisableDate,
                        selectedRowKeys : selectedTier,
                        selectedRule: rules,
                        dataSourceTier: dataWithLoyaltyFactor,
                        count : count,
                        showDay : showDay,
                        showDate : showDate,
                        disableDay : disableDay,
                        disableDate : disableDate,
                    });
                }
            }

        }else{
            let newPromotion = this.state.promotion;
            // let showDay = {};
            // let showDate = {};
            // let disableDate = true;
            // let disableDay = true;

            if(this.props.match.params.period === 'lifetime') {
                newPromotion.expiredPointType = 0;
                showDay = {display: 'none'};
                showDate = {display: 'none'};
            }else if(this.props.match.params.period === 'period'){
                newPromotion.expiredPointType = 1;
                showDate = {display:'none'};
                disableDay = false;
            }else if(this.props.match.params.period === 'date'){
                newPromotion.expiredPointType = 2;
                showDay = {display:'none'};
                disableDate = false;
            }

            let dataSourceRaw = [];
            if (nextProps.tierDetails.tierDetails !== undefined) {
                let totalRec = 0;

                nextProps.tierDetails.tierDetails.forEach((detail, i) => {
                    let tierDetail = {};
                    tierDetail.key = i;
                    tierDetail.tierName = detail.tierName;
                    tierDetail.tierDetailId = detail.tierDetailId;
                    tierDetail.loyaltyFactor = 1;
                    dataSourceRaw.push(tierDetail);
                    totalRec++;
                });

            }

            this.setState({
                dataSourceTier : dataSourceRaw,
                promotion : newPromotion,
                showDay : showDay,
                showDate : showDate,
                disableDay : disableDay,
                disableDate : disableDate,
                promotionId : ''
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

                let request = this.props.authUser;
                const {promotion, dataSourceTier, selectedRowKeys, selectedRule} = this.state;

                values.expiredPointType = promotion.expiredPointType;
                values.startDate = moment(values.startDate).format('YYYY-MM-DD')
                values.endDate = moment(values.endDate).format('YYYY-MM-DD')
                values.isIgnoreMemberTierRules = 0;
                values.expiredDate = values.expiredDate == null ? '': values.expiredDate;
                values.expiredDay = values.expiredDay == null ? 0 : values.expiredDay;

                //Build tier request
                let memberTier = {
                    tierId : this.props.tierDetails.tierStructureId,
                    tierDetails : []
                };

                selectedRowKeys.forEach((index, i)=>{
                    let tierDetail = {
                        tierDetailId : dataSourceTier[index].tierDetailId,
                        loyaltyFactor : dataSourceTier[index].loyaltyFactor
                    }
                    memberTier.tierDetails.push(tierDetail);
                });

                values.memberTiers = memberTier;

                //Build rule request
                let rules = [];
                selectedRule.forEach((rule,i)=>{
                    let r = {
                        ruleId : rule.ruleId,
                        ruleType : rule.ruleType
                    }

                    rules.push(r);
                })
                values.rules = rules;

                if(values.memberTiers.tierDetails.length == 0){
                    this.errorNotification('Please select minimal 1 tier');
                    error = true;
                    return;
                }

                if(values.rules.length == 0){
                    this.errorNotification('Please add minimal 1 rule');
                    error = true;
                    return;
                }

                request.data = values;

                if(!error){
                    if(this.props.match.params.type === 'update') {
                        this.props.updatePromotion(request);
                    }else{
                        this.props.createPromotion(request);
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

    changeListbox(value){
        if(value === ExpiryPointType.ExpiryPointType.NO_EXPIRY.value){
            this.setState({
                disableDate: true,
                disableDay: true
            });

            this.props.form.setFieldsValue({
                expiredDate: null,
                expiredDay: 0
            });
        }else if(value === ExpiryPointType.ExpiryPointType.EXPIRY_DAY.value){
            this.setState({
                disableDate: true,
                disableDay: false
            });

            this.props.form.setFieldsValue({
                expiredDate: null
            });
        }else if(value === ExpiryPointType.ExpiryPointType.EXPIRY_DATE.value){
            this.setState({
                disableDate: false,
                disableDay: true
            });

            this.props.form.setFieldsValue({
                expiredDay: 0
            });
        }
    }

    onChangeSelector(selectedRowKeys, selectedData){
        // let dataSourceTierRaw = this.state.dataSourceTier;
        // dataSourceTierRaw.forEach((tier,i)=>{
        //     let x=0;
        //     selectedData.forEach((data, i)=>{
        //         if(data.tierDetailId === tier.tierDetailId){
        //             x = 1;
        //             if(tier.loyaltyFactor == 0 ){
        //                 tier.loyaltyFactor = 1;
        //             }
        //             return;
        //         }
        //     })
        //     if(x==0){
        //         tier.loyaltyFactor = 0;
        //     }
        // })

        this.setState({
            selectedRowKeys : selectedRowKeys,
            // dataSourceTier: dataSourceTierRaw
        })
    }

    // onChangeDatePicker(date, dateString) {
    //     if(dateString !== undefined){
    //         let newPromotion = this.state.promotion;
    //         newPromotion.expiredDate = dateString;
    //         this.setState({
    //             promotion : newPromotion
    //         });
    //     }
    // }

    onChangeStartDate(date, dateString) {
        if(dateString !== undefined){
            let newPromotion = this.state.promotion;
            newPromotion.startDate = date;
            this.setState({
                promotion : newPromotion
            });
        }
    }

    onChangeEndDate(date, dateString) {
        if(dateString !== undefined){
            let newPromotion = this.state.promotion;
            newPromotion.endDate = date;
            this.setState({
                promotion : newPromotion
            });
        }
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    disabledStartDate = (startValue) => {
        const endValue = moment(this.state.promotion.endDate, 'YYYY/MM/DD');
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = moment(this.state.promotion.startDate, 'YYYY/MM/DD');
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    //Action For Tier
    handleSaveTier = (row) => {
        const newData = [...this.state.dataSourceTier];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSourceTier: newData });
    }
    //End - Action For Tier


    //Action For Rule
    handleDelete = (key) => {
        const selectedRule = [...this.state.selectedRule];
        this.setState({ selectedRule: selectedRule.filter(item => item.key !== key) });
    }

    handleAdd = () => {
        const { count, selectedRule } = this.state;

        let newData = {
            key: count,
            ruleId: '',
            ruleName: '',
            ruleType: '',
            flag: 'success',
            msg: ''
        };


        this.setState({
            selectedRule: [...selectedRule, newData],
            count: count + 1,
        });

    }

    handleSaveRule = (record ,row) => {
        const {dataSourceRule, selectedRule, count} = this.state;
        let status = 0;
        let itemSource = {};
        let newData = [...this.state.selectedRule];

        //Validate if rule already choose
        const validData = [...this.state.selectedRule];
        const indexValid = validData.findIndex(item => row === item.ruleId);

        if(indexValid < 0){

            let indexSource = dataSourceRule.findIndex(item => row === item.ruleId);
            itemSource = dataSourceRule[indexSource];
            itemSource.flag = 'success';
            itemSource.msg = '';
            itemSource.key = record.key;

            //Validate basic/referral rule
            if(itemSource.ruleType !== 'Custom Rule'){
                const indexValidType = validData.findIndex(item => itemSource.ruleType === item.ruleType);
                if(indexValidType >= 0){
                    status = 2;
                }
            }
        }else{
            status = 1;
        }

        if(status == 0){
            const index = newData.findIndex(item => record.key === item.key);
            const item = newData[index];

            newData.splice(index, 1, {
                ...item,
                ...itemSource,
            });
        }

        if(status == 1){
            itemSource = {
                key: record.key,
                ruleId: '',
                ruleName: '',
                ruleType: '',
                flag: 'error',
                msg: 'Rule cannot be duplicate'
            };

            const index = newData.findIndex(item => record.key === item.key);
            const item = newData[index];

            newData.splice(index, 1, {
                ...item,
                ...itemSource,
            });
        }

        if(status == 2){
            itemSource = {
                key: record.key,
                ruleId: '',
                ruleName: '',
                ruleType: '',
                flag: 'error',
                msg: 'Only 1 basic/referral rule allow in a promotion'
            };

            const index = newData.findIndex(item => record.key === item.key);
            const item = newData[index];

            newData.splice(index, 1, {
                ...item,
                ...itemSource,
            });
        }

        this.setState({
            selectedRule: newData
        });
    }
    //End - Action For Rule


    render() {
        const {getFieldDecorator} = this.props.form;
        let {promotion, promotionTrigger} = this.state;
        const { msgShow, msgType, msgContent, disableDate, disableDay, selectedRowKeys, dataSourceTier,
            dataSourceRule, selectedRule, endOpen, showDay, showDate} = this.state;

        let options = [];
        ExpiryPointType.values().forEach((expType, i) => {
            let option =
                <Option key={i} value={expType.value}>{expType.label}</Option>;
            options.push(option);
        });

        let optionsRule = [];
        dataSourceRule.forEach((rule, i) => {
            let optionR =
                <Option key={i} value={rule.ruleId}>{rule.ruleName}</Option>;
            optionsRule.push(optionR);
        });


        //For Tier
        const columnsTierRaw = [{
            title: 'Tier Name',
            dataIndex: 'tierName',
            editable: false
        },{
            title: 'Loyalty Factor',
            dataIndex: 'loyaltyFactor',
            editable: true
        }]

        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.onChangeSelector(selectedRowKeys,selectedRows);
            },
            getCheckboxProps: record => ({
                name: record.name,
            }),
        };

        const componentsTier= {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columnsTier = columnsTierRaw.map((col) => {
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
                    handleSave: this.handleSaveTier,
                    selectedRows : selectedRowKeys
                }),
            };
        });
        //End - For Tier

        //For Rule
        const componentsRule = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };


        let columnsComp = [{
            title: 'Rule Name',
            dataIndex: 'ruleId',
            editable: true
        }, {
            title: 'Rule Type',
            dataIndex: 'ruleType',
            editable: false
        },  {
            title: 'Action',
            dataIndex: 'operation',
            render: (text, record) => (
                this.state.selectedRule.length >= 1
                    ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;">Delete</a>
                        </Popconfirm>
                    ) : null
            ),
        }];


        const columnsRule = columnsComp.map((col) => {
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
                    handleSave: this.handleSaveRule,
                    dataOption: optionsRule
                }),
            };
        });
        //End - For Rule

        console.log("this.state")
        console.log(this.state)

        return(
            <Card className="gx-card" title='Promotion'>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Promotion Code'>
                        {getFieldDecorator('promotionCode', {
                            rules: [{
                                required: true,
                                message: 'Please input promotion code'
                            }],
                            initialValue: promotion.promotionCode
                        })(
                            <Input placeholder='Promotion Code'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Promotion Name'>
                        {getFieldDecorator('promotionName', {
                            rules: [{
                                required: true,
                                message: 'Please input promotion name'
                            }],
                            initialValue: promotion.promotionName
                        })(
                            <Input placeholder='Promotion Name'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Promotion Description'>
                        {getFieldDecorator('description', {
                            rules: [{
                                required: true,
                                message: 'Please input promotion description'
                            }],
                            initialValue: promotion.description
                        })(
                            <Input placeholder='Promotion Description'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Start Date'>
                        {getFieldDecorator('startDate', {
                            rules: [{
                                required: true,
                                message: 'Please input start date'
                            }],
                            initialValue: promotion.startDate

                        })(
                            <DatePicker className="gx-mb-3 gx-w-100"
                                        disabledDate={this.disabledStartDate}
                                        onChange={this.onChangeStartDate.bind(this)}
                                        onOpenChange={this.handleStartOpenChange}
                                        disabled = {(this.props.match.params.type === 'update')}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='End Date'>
                        {getFieldDecorator('endDate', {
                            rules: [{
                                required: true,
                                message: 'Please input end date'
                            }],
                            initialValue: promotion.endDate

                        })(
                            <DatePicker className="gx-mb-3 gx-w-100"
                                        disabledDate={this.disabledEndDate}
                                        onChange={this.onChangeEndDate.bind(this)}
                                        onOpenChange={this.handleEndOpenChange}
                                        open={endOpen}
                                        disabled = {(this.props.match.params.type === 'update')}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Expired Point Type'>
                        {getFieldDecorator('promotionType',{
                            initialValue: promotion.expiredPointType,
                            rules: [{
                                required: true,
                                message: 'Please input expired point type'
                            }]
                        })(
                            <Select style={{width: '50%'}} onChange={this.changeListbox.bind(this)}
                                    disabled = {(this.props.match.params.type === 'create' || this.props.match.params.type === 'update')}>
                                    {/*disabled={true}>*/}
                                {options}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} style={showDay} label='Expired Point Day' extra="Days after issuing point">
                        {getFieldDecorator('expiredDay', {
                            rules: [{
                                required: (disableDay == true ? false : true),
                                message: 'Please input expired point day'
                            }],
                            initialValue: promotion.expiredDay
                        })(
                            <InputNumber min={1}  placeholder='Expired Day' disabled ={this.props.match.params.type === 'update'?false:disableDay}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} style={showDate} label='Expired Point Date'>
                        {getFieldDecorator('expiredDate', {
                            rules: [{
                                required: (disableDate == true ? false : true),
                                message: 'Please input expired point date'
                            }],
                            initialValue: promotion.expiredDate ? moment(promotion.expiredDate, 'YYYY/MM/DD') : null

                        })(
                            <DatePicker className="gx-mb-3 gx-w-100" disabled={this.props.match.params.type === 'update'?false:disableDate}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Applicable Tier'>
                        <div style={{marginBottom:'20px'}}>
                            <Table
                                className="gx-table-responsive"
                                rowSelection={rowSelection}
                                components={componentsTier}
                                bordered
                                pagination = {false}
                                dataSource={dataSourceTier}
                                columns={columnsTier}
                            />
                        </div>
                    </FormItem>


                    <FormItem {...formItemLayout} label='Rules'>
                        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                            Add point rule for this promotion
                        </Button>
                        <Table
                            className="gx-table-responsive"
                            components={componentsRule}
                            rowClassName={() => 'editable-row'}
                            bordered
                            dataSource={selectedRule}
                            columns={columnsRule}
                        />
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
            let ix = selectedRows.find(element => element == record.key);
            if(ix == undefined){
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

const mapStateToProps = ({auth, promotionState, rules, tierState}) => {
    const {authUser} = auth;
    const {listRules} = rules;
    const {tierDetails} = tierState
    const {promotion, updateSuccess, updateFailed, updateData, createSuccess, createFailed,  createData} = promotionState;
    return {authUser, promotion, updateSuccess, updateFailed, updateData, createSuccess, createFailed, createData, listRules, tierDetails}
};

export default connect(mapStateToProps, {viewPromotion, updatePromotion, createPromotion, resetStatus, searchRules, getTierDetails, viewPromotionTierRule})(Form.create()(CreateUpdatePromotion));


