import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Form, Select, Input, Icon, Divider, DatePicker, Row, Col, Button, Card, Checkbox, TimePicker, Alert } from 'antd';
import CircularProgress from "components/CircularProgress";
import {
    getGameTypes, createGamificationQuiz, createGamificationSurvey, createGamificationSpinner, viewGamification
} from 'appRedux/actions/Gamification';
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer} from "react-notifications";
import GamificationType from "../../constants/GamificationType";

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 6 },
    }
};
const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};
const timeFormat = 'HH:mm:ss'
const mandatoryFieldRules = (fieldLabel, additionalRules) => {
    return [
        {
            required: true,
            message: `Please input your ${fieldLabel}!`,
            ...additionalRules
        },
    ]
}
const formProperties = {
    gameType: {
        label: 'Game Type'
    },
    gameName: {
        label: 'Game Name'
    },
    date: {
        label: 'Date'
    },
    point: {
        label: 'Point'
    },
    question: {
        label: 'Question'
    },
    options: {
        label: 'Options'
    }
}

class GamificationCreateUpdateQuiz extends Component {
    constructor(props) {
        super(props);
    this.state = {
        questionsId: [0],
        optionLength: 1
    };
        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
    }

    componentDidMount() {
        const { authToken, deviceId, userId, merchantId } = this.props.authUser;

        this.props.getGameTypes({
            authToken, deviceId, userId, merchantId
        });

        if(this.props.match.params.type === 'update'){
            if (this.props.match.params.id && this.props.match.params.typeName) {
                this.props.viewGamification({
                    authToken, deviceId, userId, merchantId,
                    id: this.props.match.params.id,
                    gameType: this.props.match.params.typeName.toUpperCase()
                })
            }
        }else{
            let data = [];
            // data.adsCategory = AdsCategory.AdsCategory.COMMON.label;
            // this.setState({
            //     rewardDisable : false
            // })


            data.gamificationType = this.props.match.params.gamificationType === 'spinner' ? 1 : data.gamificationType = this.props.match.params.gamificationType === 'survey' ? 2 : 3
            this.setState({
                data : data,
            })
        }

        if (this.props.match.params.id && this.props.match.params.typeName) {
            this.props.viewGamification({
                authToken, deviceId, userId, merchantId,
                id: this.props.match.params.id,
                gameType: this.props.match.params.typeName.toUpperCase()
            })
        }
    };

    findGameTypeById = id => {
        const gameTypes = this.props.gameTypes;

        if (gameTypes && gameTypes.data.length) {
            if (id) {

                return  gameTypes.data.filter(data => data.id === id)[2]
            }

            return gameTypes.data[2]
        }

        return null;
    }
    validateNumber = (rule, value, callback) => {

        if (value >= 0) {
            return callback();
        }
        callback('Please Input correct Point!');
    };
    handleBack = () => this.props.history.push('/gamification');
    addQuestion = () => {
        const questionsId = this.state.questionsId;
        const questionsIdLength = questionsId.length
        const newQuestionsId = [...questionsId, questionsIdLength]
        this.setState({questionsId: newQuestionsId});
    };
    removeQuestion = id => {
        const questionsId = this.state.questionsId;
        const newQuestionsId = Array.from(questionsId)
        newQuestionsId.splice(id, 1);
        this.setState({questionsId: newQuestionsId});
    }
    handleCheck = e => {
        const { setFieldsValue } = this.props.form;
        const { checked, name } = e.target;
        setFieldsValue({
            [name]: checked
        })
    }
    onOptionLenghtChange = e => {
        const value = e.target.value;
        this.setState({ optionLength: value })
    }
    handleSubmit = e => {
        e.preventDefault();

        const { form, createGamificationQuiz, createGamificationSurvey, createGamificationSpinner, authUser } = this.props;
        const questionsId = this.state.questionsId;
        const optionLength = this.state.optionLength;
        const { getFieldValue, validateFields } = form;

        validateFields((err) => {
            if (!err) {
                const { authToken, deviceId, userId, merchantId } = authUser;
                const gameType = getFieldValue('gameType');
                const date = getFieldValue('range-picker')
                const startDate = date && date.length && moment(date[0]).isValid ? date[0].format('YYYY-MM-DD') : null;
                const endDate = date && date.length && moment(date[1]).isValid ? date[1].format('YYYY-MM-DD') : null;
                const data = gameType === 2 || gameType === 3 ? {
                    typeId: gameType,
                    name: getFieldValue('gameName'),
                    startDate,
                    endDate,
                    point: getFieldValue('point'),
                    details: questionsId.map(id => ({
                        data: {
                            question: getFieldValue(`question-${id}`),
                            options: [
                                gameType === 3 ? {
                                    right: (getFieldValue(`correctAnswer-${id}`) || []).includes(1),
                                    value: getFieldValue(`option1-${id}`)
                                } : { value: getFieldValue(`option1-${id}`) },
                                gameType === 3 ? {
                                    right: (getFieldValue(`correctAnswer-${id}`) || []).includes(2),
                                    value: getFieldValue(`option2-${id}`)
                                } : { value: getFieldValue(`option2-${id}`) },
                                gameType === 3 ? {
                                    right: (getFieldValue(`correctAnswer-${id}`) || []).includes(3),
                                    value: getFieldValue(`option3-${id}`)
                                } : { value: getFieldValue(`option3-${id}`) }
                            ]
                        }
                    }))
                } : {
                    typeId: gameType,
                    name: getFieldValue('gameName'),
                    startDate,
                    endDate,
                    startTime1: moment(getFieldValue('startTime1')).format(timeFormat),
                    endTime1: moment(getFieldValue('endTime1')).format(timeFormat),
                    startTime2: moment(getFieldValue('startTime2')).format(timeFormat),
                    endTime2: moment(getFieldValue('endTime2')).format(timeFormat),
                    chance: getFieldValue('chance'),
                    details: [{
                        data: {
                            options: [...Array(optionLength).keys()].map(id => ({
                                value: getFieldValue(`spinnerOption-${id}`)
                            }))
                        }
                    }]
                }

                const submit = gameType === 1 ?
                    createGamificationSpinner : gameType === 2 ? createGamificationSurvey : createGamificationQuiz;

                submit({ authToken, deviceId, userId, merchantId, data, gameType });
            }
        });
    };

    back(){
        this.props.history.goBack();
    }

    onConfirm = () =>
        this.props.history.push('/gamification');
    // this.props.resetStatus();
    // if(this.state.msgType === "success"){
    //     this.props.history.goBack();
    // }else{
    //     this.setState({
    //         msgShow : false
    //     })
    // }

    render() {
        const { gameTypes, createGame, match, updateGame, loader, alertMessage, showMessage } = this.props;
        const isUpdate = match.params.id;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const gameTypesData = gameTypes.data || [];
        const gameType = getFieldValue('gameType');

        if (gameTypes.loader || createGame.loader) {
            return (<div className="gx-loader-view"><CircularProgress/></div>)
        }

        if ((!loader || !createGame.loader) && showMessage) {
            return (
                <Alert
                    message={alertMessage}
                    type="error"
                    closable
                />
            )
        }

        let options = [];
        GamificationType.values().forEach((type, i) => {
            let option = [];
            option.push(
                <Option key={i} value={type.value}>{type.label}</Option>
            );
            options.push(option);
        });

        return (
            <div>
                {createGame.data === 'SUCCESS' &&
                <SweetAlert
                    type="success"
                    show={'true'}
                    title={'Gamification created successfully'}
                    onConfirm={this.onConfirm}>
                </SweetAlert>
                }
                <Form
                    {...formItemLayout}
                    onSubmit={this.handleSubmit}
                >
                    <Card>
                        <h3>Gamification</h3>
                        <FormItem label={formProperties.gameType.label}>
                            {getFieldDecorator('gameType', {
                                initialValue: 3,
                                rules: mandatoryFieldRules(formProperties.gameType.label)
                            })(
                                <Select disabled={true}>
                                    {gameTypesData.map(({ id, name }, index) => (
                                        <Select.Option value={id} key={index}>
                                            {name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                        </FormItem>
                        <Divider type="horizontal" />
                        {/*{gameType && */}
                        <Fragment>
                            <FormItem label={formProperties.gameName.label}>
                                {getFieldDecorator('gameName', {
                                    rules: mandatoryFieldRules(formProperties.gameName.label)
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem label={formProperties.date.label}>
                                {getFieldDecorator('range-picker', {
                                    rules: mandatoryFieldRules(formProperties.date.label, { type: 'array' })
                                })(
                                    <DatePicker.RangePicker />
                                )}
                            </FormItem>
                            <FormItem label={formProperties.point.label}>
                                {getFieldDecorator('point', {
                                    transform: value => {
                                        return Number(value) ? Number(value):0;
                                    },
                                    rules: [{ validator: this.validateNumber, required: true }]
                                })(
                                    <Input name="point" type="number" />
                                )}
                            </FormItem>
                            <Divider type="horizontal" />
                            <h3>QUIZ</h3>
                            {/*<h3>{this.findGameTypeById(gameType).name}</h3>*/}
                            {/*{gameType === 2 || gameType === 3 ?*/}
                                <QuestionForm
                                    getFieldDecorator={getFieldDecorator}
                                    addQuestion={this.addQuestion}
                                    questionsId={this.state.questionsId}
                                    removeQuestion={this.removeQuestion}
                                    gameType={gameType}
                                    onCheck={this.handleCheck}
                                />
                                {/*:*/}
                                {/*<SpinnerForm*/}
                                {/*    getFieldDecorator={getFieldDecorator}*/}
                                {/*    optionLength={parseInt(this.state.optionLength, 10)}*/}
                                {/*    onOptionLenghtChange={this.onOptionLenghtChange}*/}
                                {/*    validateNumber={this.validateNumber}*/}
                                {/*/>}*/}
                        </Fragment>
                        {/*}*/}

                        <FormItem {...formTailLayout}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                            <Button type="default" onClick={this.back} >Back</Button>
                        </FormItem>

                    </Card>
                    {/*<Row style={{ marginTop: '20px' }}>*/}
                    {/*    <Col span={24}>*/}
                    {/*        {gameType && <Button htmlType="submit" type="primary">Submit</Button>}*/}
                    {/*        <Button onClick={this.handleBack} type="primary">Back</Button>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </Form>
                <NotificationContainer/>
            </div>
        )
    }
};

const QuestionForm = ({ getFieldDecorator, addQuestion, questionsId, gameType, removeQuestion }) => {
    return (
        <Fragment>
            {questionsId.map(id => (
                <Fragment>
                    <FormItem
                        label={formProperties.question.label}
                    >
                        {getFieldDecorator(`question-${id}`, {
                            rules: mandatoryFieldRules(formProperties.question.label)
                        })(
                            <Input.TextArea rows={4} type="textarea" style={{ width: '80%', marginRight: 8 }} />
                        )}
                        {questionsId.length > 1 && <Icon
                            type="close-circle"
                            theme="filled"
                            onClick={() => removeQuestion(id)}
                            style={{
                                fontSize: 27,
                                color: 'red',
                                verticalAlign: 'top'
                            }}
                        />}
                    </FormItem>
                    <FormItem label="Option 1">
                        {getFieldDecorator(`option1-${id}`, {
                            rules: mandatoryFieldRules(formProperties.options.label)
                        })(
                            <Input placeholder="Option 1" />
                        )}
                    </FormItem>
                    <FormItem label="Option 2">
                        {getFieldDecorator(`option2-${id}`, {
                            rules: mandatoryFieldRules(formProperties.options.label)
                        })(
                            <Input placeholder="Option 2" />
                        )}
                    </FormItem>
                    <FormItem label="Option 3">
                        {getFieldDecorator(`option3-${id}`, {
                            rules: mandatoryFieldRules(formProperties.options.label)
                        })(
                            <Input name={`option3-${id}`} placeholder="Option 3" />
                        )}
                    </FormItem>
                    {/*{gameType === 3 &&*/}
                    <FormItem label="Correct Answer">
                        {getFieldDecorator(`correctAnswer-${id}`, {
                            rules: mandatoryFieldRules('Correct Answer')
                        })(
                            <Checkbox.Group>
                                <Checkbox value={1}>Option 1</Checkbox>
                                <Checkbox value={2}>Option 2</Checkbox>
                                <Checkbox value={3}>Option 3</Checkbox>
                            </Checkbox.Group>
                        )}
                    </FormItem>
                    {/*}*/}
                </Fragment>
            ))}
            <FormItem
                {...formItemLayoutWithOutLabel}
            >
                <Button onClick={addQuestion} type="primary"><Icon type="plus" /> Add Question</Button>
            </FormItem>
        </Fragment>
    )
};

// const SpinnerForm = ({ getFieldDecorator, optionLength, onOptionLenghtChange, validateNumber }) => {
//
//     return (
//         <Fragment>
//             <FormItem label="Start Time 1">
//                 {getFieldDecorator('startTime1', {
//                     rules: mandatoryFieldRules("Start Time 1")
//                 })(
//                     <TimePicker/>
//                 )}
//             </FormItem>
//             <FormItem label="End Time 1">
//                 {getFieldDecorator('endTime1', {
//                     rules: mandatoryFieldRules("End Time 1")
//                 })(
//                     <TimePicker/>
//                 )}
//             </FormItem>
//             <FormItem label="Start Time 2">
//                 {getFieldDecorator('startTime2', {
//                     rules: mandatoryFieldRules("Start Time 2")
//                 })(
//                     <TimePicker/>
//                 )}
//             </FormItem>
//             <FormItem label="End Time 2">
//                 {getFieldDecorator('endTime2', {
//                     rules: mandatoryFieldRules("End Time 2")
//                 })(
//                     <TimePicker/>
//                 )}
//             </FormItem>
//             <FormItem label="Option Length">
//                 {getFieldDecorator('option', {
//                     transform: value => {
//                         return Number(value) ? Number(value):0;
//                     },
//                     rules: [{ validator: validateNumber, required: true }]
//                 })(
//                     <Input name="optionLength" type="number" onChange={onOptionLenghtChange} />
//                 )}
//             </FormItem>
//             {[...Array(optionLength).keys()].map(id => {
//                 const index = id + 1;
//                 return (
//                     <FormItem label={`Option ${index}`}>
//                         {getFieldDecorator(`spinnerOption-${index}`, {
//                             rules: mandatoryFieldRules(`Option ${index}`)
//                         })(
//                             <Input placeholder={`Option ${index}`}/>
//                         )}
//                     </FormItem>
//                 )
//             })}
//             <FormItem label="Chance">
//                 {getFieldDecorator('chance', {
//                     transform: value => {
//                         return Number(value) ? Number(value):0;
//                     },
//                     rules: [{ validator: validateNumber, required: true }]
//                 })(
//                     <Input name="chance" type="number" />
//                 )}
//             </FormItem`>
//         </Fragment>
//     )
// }

const mapStateToProps = ({ auth, gamificationState }) => {
    const { authUser } = auth;
    const { gameTypes, createGame, updateGame, loader, alertMessage, showMessage } = gamificationState;

    return { authUser, gameTypes, createGame, updateGame, loader, alertMessage, showMessage };
};

const WrappedCreateUpdateForm = Form.create({ name: 'createUpdateGamification' })(GamificationCreateUpdateQuiz);
export default connect(mapStateToProps, {
    getGameTypes, createGamificationQuiz, createGamificationSurvey, createGamificationSpinner, viewGamification
})(WrappedCreateUpdateForm)
