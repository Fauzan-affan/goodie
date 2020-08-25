import React, {Component} from "react";
import {connect} from "react-redux";
import BasicRuleType from '../../constants/BasicRuleType';
import CustomRuleTrigger from '../../constants/CustomRuleTrigger';
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    viewRule,
    updateRule,
    createRule,
    resetStatus
} from "appRedux/actions/Rules";
import {Button, Card, Form, Input, InputNumber, Select} from "antd";


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

class CreateUpdateCustom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customRule : [],
            discountDisable : false,
            pointDisable : false,
            amountReqDisable : false,
            capPerTrxDisable : false,
            ruleTrigger : '',
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
            credential.type = 'custom'
            credential.id = this.props.match.params.id;
            this.props.viewRule(credential);
        }else{
            let custom = [];
            custom.customRuleType = BasicRuleType.BasicRuleType.FIXED.label;
            custom.customRuleTrigger = CustomRuleTrigger.CustomRuleTrigger.AMOUNT.label;
            this.setState({
                customRule : custom,
                pointDisable: false,
                discountDisable: true,
                amountReqDisable : false,
                ruleTrigger: 'Amount'
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.match.params.type === 'update') {
            if (nextProps.customRule !== this.props.customRule) {

                if(nextProps.customRule.customRuleTrigger === CustomRuleTrigger.CustomRuleTrigger.ISSUING.label){
                    this.setState({
                        customRule: nextProps.customRule,
                        discountDisable: true,
                        pointDisable: false,
                        amountReqDisable: true,
                        capPerTrxDisable: true
                    });
                }else{
                    if (nextProps.customRule.customRuleType === BasicRuleType.BasicRuleType.PERCENTAGE.label) {
                        this.setState({
                            customRule: nextProps.customRule,
                            discountDisable: false,
                            pointDisable: true,
                            amountReqDisable: true,
                            capPerTrxDisable: false
                        });
                    } else if (nextProps.customRule.customRuleType === BasicRuleType.BasicRuleType.FIXED.label) {
                        this.setState({
                            customRule: nextProps.customRule,
                            discountDisable: true,
                            pointDisable: false,
                            amountReqDisable: false,
                            capPerTrxDisable: false
                        });
                    }
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

            this.setState({
                pointDisable: true,
                discountDisable: false,
                amountReqDisable : true
            });

            this.props.form.setFieldsValue({
                baseLoyaltyPoint: 0,
                amountReq: 0
            });
        }else if(value === 1){

            this.setState({
                pointDisable: false,
                discountDisable: true,
                amountReqDisable : false
            });

            this.props.form.setFieldsValue({
                baseLoyaltyDiscount: 0
            });
        }

    }

    changeTriggerListbox(value){
        if(value === 0){

            this.setState({
                pointDisable: false,
                discountDisable: true,
                amountReqDisable : true,
                capPerTrxDisable : true,
                ruleTrigger: 'Issuing'
            });

            this.props.form.setFieldsValue({
                customRuleType: 1,
                baseLoyaltyPoint: 0,
                amountReq: 0,
                capPerTrx: 0
            });
        }else if(value === 1){

            this.setState({
                pointDisable: false,
                discountDisable: true,
                amountReqDisable : false,
                capPerTrxDisable : false,
                ruleTrigger: 'Amount'
            });

            this.props.form.setFieldsValue({
                customRuleType: 1,
                baseLoyaltyDiscount: 0
            });
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let error = false;

                let request = this.props.authUser;
                request.data = values;
                request.type = 'custom';

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

    render() {
        const {getFieldDecorator} = this.props.form;
        let {customRule, ruleTrigger} = this.state;
        const { msgShow, msgType, msgContent,
            // dataSource
        } = this.state;

        let options = [];
        BasicRuleType.values().forEach((ruleType, i) => {
            let option = [];
            if(ruleTrigger !== 'Issuing' || ruleType.label !== 'Percentage Amount' ){
                option.push(
                    <Option key={i} value={ruleType.value}>{ruleType.label}</Option>
                );
            }
            options.push(option);
        });

        let optionsTrigger=[];
        CustomRuleTrigger.values().forEach((ruleTrigger, i) => {
            let optionTrigger = [];
            optionTrigger.push(
                <Option key={i} value={ruleTrigger.value}>{ruleTrigger.label}</Option>
            );

            optionsTrigger.push(optionTrigger);
        });

        return(
            <Card className="gx-card" title='Custom Rule'>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Rule Name'>
                        {getFieldDecorator('customRuleName', {
                            rules: [{
                                required: true,
                                message: 'Please input rule name'
                            }],
                            initialValue: customRule.customRuleName
                        })(
                            <Input placeholder='Rule Name'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Rule Description'>
                        {getFieldDecorator('customRuleDesc', {
                            rules: [{
                                required: true,
                                message: 'Please input rule description'
                            }],
                            initialValue: customRule.customRuleDesc
                        })(
                            <Input placeholder='Rule Description'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Custom Rule Trigger'>
                        {getFieldDecorator('customRuleTrigger',{
                            initialValue: CustomRuleTrigger.getValue(customRule.customRuleTrigger),
                            required: true,
                            message: 'Please input custom rule trigger',
                        })(
                            <Select style={{width: '50%'}} onChange={this.changeTriggerListbox.bind(this)}>
                                {optionsTrigger}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Custom Rule Type'>
                        {getFieldDecorator('customRuleType',{
                            initialValue: BasicRuleType.getValue(customRule.customRuleType),
                            required: true,
                            message: 'Please input custom rule type',
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
                            initialValue: customRule.baseLoyaltyDiscount ? customRule.baseLoyaltyDiscount : 0
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
                            initialValue: customRule.baseLoyaltyPoint ? customRule.baseLoyaltyPoint : 0
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
                            initialValue: customRule.amountReq ? customRule.amountReq : 0
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
                            initialValue: customRule.capPerTrx ? customRule.capPerTrx : 0
                        })(
                            <InputNumber min={0} disabled={this.state.capPerTrxDisable}/>
                        )}
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

const mapStateToProps = ({auth, rules}) => {
    const {authUser} = auth;
    const {customRule, updateSuccess, updateFailed, updateData, createSuccess, createFailed,  createData} = rules
    return {authUser, customRule, updateSuccess, updateFailed, updateData, createSuccess, createFailed, createData}
};

export default connect(mapStateToProps, {viewRule, updateRule, createRule, resetStatus})(Form.create()(CreateUpdateCustom));


