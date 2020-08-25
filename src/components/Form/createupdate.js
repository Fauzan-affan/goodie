import React, {Component} from "react";
import moment from 'moment';
import {Button, Card, Form, Icon, Input, DatePicker, InputNumber, Radio, Rate, Select, Slider, Switch, Upload} from "antd";
import {convertToRaw, EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};

class CreateUpdateForm extends Component {
    constructor(props) {
        super(props);

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
            }
        });
    };

    changeListbox = (value,option) =>{
        this.props.onChangeListbox(value,option);
    }


    render() {
        return (
            <Card className="gx-card" title={this.props.title}>
                <Form onSubmit={this.handleSubmit}>

                    {this.createContent(this.props.component)}

                    <FormItem {...formTailLayout}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </FormItem>

                </Form>
            </Card>
        );
    }

    createContent = (formContents) =>{
        const {getFieldDecorator} = this.props.form;

        let content = [];
        // let formContents = this.props.component;

        formContents.forEach((formContent, i) => {
            var comp = [];

            //For input component
            if(formContent.type === 'text' ||
                formContent.type === 'email' ||
                formContent.type === 'phone'){

                comp.push(
                    <FormItem {...formItemLayout} label={formContent.label} key={i}>
                        {getFieldDecorator(formContent.id, {
                            rules: [{
                                required: formContent.required,
                                message: formContent.message
                            }],
                            initialValue: formContent.value
                        })(
                            <Input placeholder={formContent.placeholder} disabled={formContent.disabled}/>
                        )}
                    </FormItem>
                );

            };

            // For number component
            if(formContent.type === 'number'){
                let minParam = '';
                let maxParam = '';

                if(formContent.min !== null){
                    minParam = ' min ='+formContent.min+' ';
                }

                if(formContent.max !== null){
                    maxParam = ' max ='+formContent.max+' ';
                }

                comp.push(
                    <FormItem {...formItemLayout} label={formContent.label} key={i}>
                        {getFieldDecorator(formContent.id,{
                            rules: [{
                                required: formContent.required,
                                message: formContent.message
                            }],
                            initialValue: formContent.value
                        })(
                            <InputNumber
                                minParam
                                maxParam
                                disabled={formContent.disabled}
                            />
                        )}
                    </FormItem>
                );
            }
            //
            // //For datePicker component
            // if(formContent.type === 'datepicker'){
            //     const dateFormat = 'YYYY/MM/DD';
            //     let defvalue = '';
            //     if(formContent.value !== null){
            //         defvalue = 'defaultValue=moment('+formContent.value+', dateFormat)';
            //     }
            //     comp.push(
            //         <FormItem {...formItemLayout} label={formContent.label} key={i}>
            //             {getFieldDecorator(formContent.id, {
            //                 rules: [{
            //                     required: formContent.required,
            //                     message: formContent.message
            //                 }],
            //             })(
            //                 <DatePicker defvalue format={dateFormat} />
            //             )}
            //         </FormItem>
            //     );
            // }
            //
            // //For rangePicker component
            // if(formContent.type === 'rangepicker'){
            //     const dateFormat = 'YYYY/MM/DD';
            //     let defvalue = '';
            //     if(formContent.value !== null){
            //         defvalue = 'defaultValue={[moment('+formContent.startDate+', dateFormat), moment('+formContent.endDate+', dateFormat)]}';
            //     }
            //     comp.push(
            //         <FormItem {...formItemLayout} label={formContent.label} key={i}>
            //             {getFieldDecorator(formContent.id, {
            //                 rules: [{
            //                     required: formContent.required,
            //                     message: formContent.message
            //                 }],
            //             })(
            //                 <RangePicker defvalue format={dateFormat} />
            //             )}
            //         </FormItem>
            //     );
            // }
            //
            // //For checkbox component
            // if(formContent.type === 'checkbox'){
            //     comp.push(
            //         <FormItem {...formItemLayout} label={formContent.label} key={i}>
            //             {getFieldDecorator(formContent.id, {valuePropName: 'checked'})(
            //             <Switch defaultChecked={formContent.value}
            //                     checkedChildren='ON' unCheckedChildren='OFF'/>
            //             )}
            //         </FormItem>
            //     );
            // }
            //
            // //For radio component
            // if(formContent.type === 'radio'){
            //
            //     comp.push(
            //         <FormItem {...formItemLayout} label={formContent.label} key={i}>
            //             {getFieldDecorator(formContent.id, {valuePropName: 'checked'})(
            //                 <RadioGroup options={formContent.lisitem} defaultValue={formContent.value}/>
            //             )}
            //         </FormItem>
            //     );
            // }

            //For textbox component
            // if(formContent.type === 'textbox'){
            //     let editorState = EditorState.createEmpty();
            //     if(formContent.value !== null || formContent.value !== ''){
            //         const blocksFromHTML = convertFromHTML(sampleMarkup);
            //         const state = ContentState.createFromBlockArray(
            //             blocksFromHTML.contentBlocks,
            //             blocksFromHTML.entityMap
            //         );
            //         editorState = EditorState.createWithContent(state);
            //     }
            //
            //     comp.push(
            //         <FormItem {...formItemLayout} label={formContent.label} key={i}>
            //             {getFieldDecorator(formContent.id, {
            //                 valuePropName: 'editorState',
            //             })(
            //                 <Editor editorStyle={{
            //                     width: '100%',
            //                     minHeight: 100,
            //                     borderWidth: 1,
            //                     borderStyle: 'solid',
            //                     borderColor: 'lightgray'
            //                 }}
            //                         editorState={editorState}
            //                         wrapperClassName="demo-wrapper"
            //                         // onEditorStateChange={this.onEditorStateChange}
            //                 />
            //             )}
            //         </FormItem>
            //     );Z
            // }

            //For list component
            if(formContent.type === 'list'){

                let options = [];

                formContent.listitem.forEach((item, i) => {
                    let option = [];
                    option.push(
                        <Option value={item.value}>{item.label}</Option>
                    );

                    options.push(option);
                });

                comp.push(
                    <FormItem {...formItemLayout} label={formContent.label} key={i}>
                        {getFieldDecorator(formContent.id,{
                            initialValue: formContent.value.changeListbox()
                        })(
                            <Select style={{width: '50%'}} onChange={this.changeListbox} key={formContent.id}>
                                {options}
                            </Select>
                        )}
                    </FormItem>
                );

            };

            content.push(comp);
        });

        return content;
    }


}

const WrappedDynamicRule = Form.create()(CreateUpdateForm);




export default (WrappedDynamicRule);

