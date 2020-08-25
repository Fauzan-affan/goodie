import React, {Component} from "react";
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    viewProgram,
    updateProgram,
    createProgram,
    resetStatus
} from "appRedux/actions/Program";
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

class CreateUpdateProgram extends Component {
    constructor(props) {
        super(props);

        this.state = {
            program : [],
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
            credential.id = this.props.match.params.id;
            this.props.viewProgram(credential);
        }else{
            let program = [];
            this.setState({
                program : program
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.match.params.type === 'update') {
            if (nextProps.program !== this.props.program) {

                this.setState({
                    program: nextProps.program,
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

                let request = this.props.authUser;
                request.data = values;

                if(!error){
                    if(this.props.match.params.type === 'update') {
                        this.props.updateProgram(request);
                    }else{
                        this.props.createProgram(request);
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
        // this.setState({
        //     msgContent : '',
        //     msgType : '',
        //     msgShow : false
        // })
        this.props.resetStatus();
        this.props.history.goBack();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        let {program, programTrigger} = this.state;
        const { msgShow, msgType, msgContent, dataSource } = this.state;

        let options = [];
        BasicProgramType.values().forEach((programType, i) => {
            let option = [];
            if(programTrigger !== 'Issuing' || programType.label !== 'Percentage Amount' ){
                option.push(
                    <Option key={i} value={programType.value}>{programType.label}</Option>
                );
            }
            options.push(option);
        });

        let optionsTrigger=[];
        CustomProgramTrigger.values().forEach((programTrigger, i) => {
            let optionTrigger = [];
            optionTrigger.push(
                <Option key={i} value={programTrigger.value}>{programTrigger.label}</Option>
            );

            optionsTrigger.push(optionTrigger);
        });

        return(
            <Card className="gx-card" title='Custom Program'>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Reward Name'>
                        {getFieldDecorator('programName', {
                            program: [{
                                required: true,
                                message: 'Please input Reward Name'
                            }],
                            initialValue: program.programName
                        })(
                            <Input placeholder='Reward Name'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Program Description'>
                        {getFieldDecorator('programDesc', {
                            program: [{
                                required: true,
                                message: 'Please input program description'
                            }],
                            initialValue: program.programDesc
                        })(
                            <Input placeholder='Program Description'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Custom Program Trigger'>
                        {getFieldDecorator('programTrigger',{
                            initialValue: CustomProgramTrigger.getValue(program.programTrigger),
                            required: true,
                            message: 'Please input custom program trigger',
                        })(
                            <Select style={{width: '50%'}} onChange={this.changeTriggerListbox.bind(this)}>
                                {optionsTrigger}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Custom Program Type'>
                        {getFieldDecorator('programType',{
                            initialValue: BasicProgramType.getValue(program.programType),
                            required: true,
                            message: 'Please input custom program type',
                        })(
                            <Select style={{width: '50%'}} onChange={this.changeListbox.bind(this)}>
                                {options}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Base Loyalty Discount (%)'>
                        {getFieldDecorator('baseLoyaltyDiscount',{
                            program: [{
                                required: false,
                                message: 'Please input base loyalty discount',
                            }],
                            initialValue: program.baseLoyaltyDiscount ? program.baseLoyaltyDiscount : 0
                        })(
                            <InputNumber min={0} disabled={this.state.discountDisable} />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Base Loyalty Point'>
                        {getFieldDecorator('baseLoyaltyPoint',{
                            program: [{
                                required: false,
                                message: 'Please input base loyalty point',
                            }],
                            initialValue: program.baseLoyaltyPoint ? program.baseLoyaltyPoint : 0
                        })(
                            <InputNumber min={0} disabled={this.state.pointDisable}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='For Each Amount Of (Rp)'>
                        {getFieldDecorator('amountReq',{
                            program: [{
                                required: false,
                                message: 'Please input for each amount of',
                            }],
                            initialValue: program.amountReq ? program.amountReq : 0
                        })(
                            <InputNumber min={0} disabled={this.state.amountReqDisable}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Maximum Points'>
                        {getFieldDecorator('capPerTrx',{
                            program: [{
                                required: false,
                                message: 'Please input maximum points',
                            }],
                            initialValue: program.capPerTrx ? program.capPerTrx : 0
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

const mapStateToProps = ({auth, programState}) => {
    const {authUser} = auth;
    const {program, updateSuccess, updateFailed, updateData, createSuccess, createFailed,  createData} = programState
    return {authUser, program, updateSuccess, updateFailed, updateData, createSuccess, createFailed, createData}
};

export default connect(mapStateToProps, {viewProgram, updateProgram, createProgram, resetStatus})(Form.create()(CreateUpdateProgram));


