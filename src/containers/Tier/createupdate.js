import React, {Component} from "react";
import update from 'immutability-helper';
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    viewTier,
    updateTier,
    createTier,
    resetStatus
} from "appRedux/actions/Tier";
import {
    uploadImage,
    resetFilePath
} from "appRedux/actions/Common";
import {Button, Card, Form, DatePicker, Input, InputNumber, Popconfirm, Table, Upload, Icon, Modal, Switch} from "antd";
import UpdatePopup from "../Program/updatePopup";
import UpdatePromotionNullPopup from "../Program/updatePromotionNullPopup";
import UpdateProgramNullPopup from "../Program/updateProgramNullPopup";
import moment from "moment";
// import { red } from "ansi-colors";

const dateFormatList = ['DD/MM', 'DD/MM'];

const FormItem = Form.Item;
// const Option = Select.Option;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};

class CreateUpdateTier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tier : [],
            dataSource : [],
            count : 1,
            msgContent : '',
            msgType : '',
            msgShow : false,
            filePath : '',
            detailId : '',
            modalUpdatePro : false,
            modalUpdateNullPromotion : false,
            modalUpdateNullReward : false,
            request : []
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
        this.onChangeSwitchIsDowngrade = this.onChangeSwitchIsDowngrade.bind(this);
        this.onChangeSwitchIsImmediatelyDowngrade = this.onChangeSwitchIsImmediatelyDowngrade.bind(this);
    }

    componentWillMount(){
        if(this.props.match.params.type === 'update'){
            let credential = this.props.authUser;
            credential.id = this.props.match.params.id;
            this.props.viewTier(credential);
        }else{
            let tierRaw = [];
            this.setState({
                tier : tierRaw
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.match.params.type === 'update') {
            if (nextProps.tier !== this.props.tier) {

                let dataSourceRaw = [];
                let totalRec = 0;

                nextProps.tier.newPromotionTiers = nextProps.tier.promotionTiers;
                nextProps.tier.newProgramTiers = nextProps.tier.programTiers;

                nextProps.tier.tierDetails.forEach((detail, i) => {
                    detail.key = i;
                    dataSourceRaw.push(detail);
                    totalRec++;
                });

                this.setState({
                    tier: nextProps.tier,
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
                msgContent : 'Update failed, ' +nextProps.alertMessage,
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

        if(nextProps.filePath !== this.props.filePath && this.state.detailId !== '' && nextProps.filePath!== ''){
            let filePath = nextProps.filePath;
            let id = this.state.detailId;

            var existingArray = this.state.dataSource.filter(function(c) { return c.key === id; })[0];
            var updatedValue=Object.assign({}, existingArray, {['tierImage']:filePath});
            var index = this.state.dataSource.indexOf(existingArray);

            var newState = update(this.state, {dataSource: {$splice: [[index,1,updatedValue]]}});
            this.setState(newState);

            this.props.resetFilePath();
        }

        if(nextProps.tier.downgradeTimeSet != null ||
            nextProps.tier.downgradeTimeSet !== ''){
            nextProps.tier.downgradeTimeSet = moment(nextProps.tier.downgradeTimeSet, 'DD/MM');
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let error = false;

                if(this.state.dataSource.length < 1 ){
                    this.errorNotification('Tier detail must not empty');
                    error = true;
                }

                let maxRefBefore = 0;

                this.state.dataSource.forEach((tierDetail,i) => {
                    if(tierDetail.tierImage != null){
                        if(tierDetail.tierImage.substr(0,4) === 'http'){
                            tierDetail.tierImage = '';
                        }
                    }else{
                        tierDetail.tierImage = '';
                    }

                    if(tierDetail.lowerBoundPoint < 0){
                        this.errorNotification('Minimum reference must greater or equals 0');
                        error = true;
                        return;
                    }

                    if(tierDetail.upperBoundPoint < 1){
                        this.errorNotification('Maximum reference must greater than 0');
                        error = true;
                        return;
                    }

                    if(tierDetail.lowerBoundPoint !== 0 && tierDetail.lowerBoundPoint !== maxRefBefore + 1){
                        this.errorNotification('Referer point tier must in consecutive order');
                        error = true;
                        return;
                    }

                    if(tierDetail.lowerBoundPoint > tierDetail.upperBoundPoint){
                        this.errorNotification('Minimum reference must lower than maximum reference');
                        error = true;
                        return;
                    }

                    maxRefBefore = tierDetail.upperBoundPoint;
                })

                // if(values.isDowngrade == false){
                //     values.isDowngrade = 0;
                // }else if(values.isDowngrade == true){
                //     values.isDowngrade = -1;
                // }

                // if(values.isImmediatelyDowngrade == false){
                //     values.isImmediatelyDowngrade = 0;
                // }else if(values.isImmediatelyDowngrade == true){
                //     values.isImmediatelyDowngrade = -1;
                // }

                values.tierDetail = this.state.dataSource;

                let request = this.props.authUser;
                request.data = values;
                values.isDowngrade = (this.state.tier.isDowngrade);
                values.isImmediatelyDowngrade = (this.state.tier.isImmediatelyDowngrade);
                values.downgradeTimeSet = (this.state.tier.isImmediatelyDowngrade === 0 ? moment(values.downgradeTimeSet).format('DD-MM', dateFormatList[0]) : null);

                if(!error){

                    if(this.props.match.params.type === 'update') {

                        let tier = this.state.tier;
                        tier.tierDetails = this.state.dataSource;
                        this.setState({
                            tier : tier
                        })
                        if(this.props.tier.promotionTiers==null){
                            // alert('promotion kosong');
                            this.modalPromotionNullShow(request)
                        }else if(this.props.tier.programTiers==null){
                            // alert('reward kosong');
                            this.modalRewardNullShow(request)

                        }else{

                            this.modalShow(request);
                        }
                        // this.props.updateTier(request);
                    }else{
                        this.props.createTier(request);
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

    onChangeDowngradeTimeSet(date, dateString) {
        if(dateString !== undefined){
            let newDowngradeTimeSet = this.state.tier;
            newDowngradeTimeSet.downgradeTimeSet = date;
            this.setState({
                tier : newDowngradeTimeSet
            });
        }
    }

    // onChangeEndDate(date, dateString) {
    //     if(dateString !== undefined){
    //         let newPromotion = this.state.promotion;
    //         newPromotion.endDate = date;
    //         this.setState({
    //             promotion : newPromotion
    //         });
    //     }
    // }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    // handleEndOpenChange = (open) => {
    //     this.setState({ endOpen: open });
    // }

    disabledDowngradeTimeSet = (startValue) => {
        const endValue = moment(this.state.tier.downgradeTimeSet, 'DD/MM');
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    // disabledEndDate = (endValue) => {
    //     const startValue = moment(this.state.promotion.startDate, 'YYYY/MM/DD');
    //     if (!endValue || !startValue) {
    //         return false;
    //     }
    //     return endValue.valueOf() <= startValue.valueOf();
    // }

    onChangeSwitchIsDowngrade(checked) {
        let value = 0;
        if(checked === true){
            value = -1;
        }
        let newTier = this.state.tier;
        newTier.isDowngrade = value;
        this.setState({
            tier : newTier
        })
    }

    onChangeSwitchIsImmediatelyDowngrade(checked) {
        let value = 0;
        if(checked === true){
            value = -1;
        }
        
        let newsTier = this.state.tier;
        newsTier.isImmediatelyDowngrade = value;
        this.setState({
            tier : newsTier
        })
    }


    //Action For List
    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }

    handleAdd = () => {
        const { count, dataSource } = this.state;
        let lastRec = dataSource[dataSource.length - 1];

        let lastMaxRef = 0
        if(lastRec){
            lastMaxRef = lastRec.upperBoundPoint;
        }

        let newData = {};

        if(this.props.match.params.type === 'update'){
            const uuidv4 = require('uuid/v4');
            let tierDetailId = uuidv4().toUpperCase();

            newData = {
                key: count,
                tierDetailId: tierDetailId,
                tierCode: 'Tier Code',
                tierName: 'Tier Name',
                lowerBoundPoint: lastMaxRef + 1,
                upperBoundPoint: lastMaxRef + 2
            };
        }
        else if(this.props.match.params.type === 'create'){
            newData = {
                key: count,
                tierCode: 'Tier Code',
                tierName: 'Tier Name',
                lowerBoundPoint: lastMaxRef + 1,
                upperBoundPoint: lastMaxRef + 2
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

    imageSave = (id) => {
        this.setState(
            {
                detailId : id
            }
        )
    }

    uploadImage = (file) => {
        let credential = this.props.authUser;
        credential.file = file;
        this.props.uploadImage(credential);
    }


    //Action for modal
    modalShow = (request) => {
        this.setState({
            request : request,
            modalUpdatePro : true
        })
    }

    modalPromotionNullShow = (request) => {
        this.setState({
            request : request,
            modalUpdateNullPromotion : true
        })
    }

    modalRewardNullShow = (request) => {
        this.setState({
            request : request,
            modalUpdateNullReward : true
        })
    }

    updateProgram = (programs) =>{

        let newTier = this.state.tier;
        newTier.newProgramTiers = programs;

        this.setState({
            tier : newTier
        })

    }

    updateProgram = (programs) =>{

        let newsTier = this.state.tier;
        newsTier.newProgramTiers = programs;

        this.setState({
            tier : newsTier
        })

    }

    updatePromotion = (promotions) => {

        let newTier = this.state.tier;
        newTier.newPromotionTiers = promotions;

        this.setState({
            tier : newTier
        })
    }

    updatePromotion = (promotions) => {

        let newsTier = this.state.tier;
        newsTier.newPromotionTiers = promotions;

        this.setState({
            tier : newsTier
        })
    }

    handleOk = (e) =>{
        e.preventDefault();

        let request = this.state.request;
        request.data.newPromotionTiers = this.state.tier.newPromotionTiers;

        let newPrograms = [];
        let programTiers = [];


        if (programTiers.length > 0 ) {
            this.state.tier.newProgramTiers.forEach((programTiers,i)=>{
                let program = {};
                program.programId = programTiers.programId;
                program.tierDetailId = [];

                programTiers.tierDetails.forEach((tier,i)=>{
                    program.tierDetailId.push(tier.tierDetailId);
                })
                newPrograms.push(program);
            })
            request.data.newProgramTiers = newPrograms;
        }

        let newPromotions = [];
        this.state.tier.newPromotionTiers.forEach((promotionTier, i)=>{
            delete promotionTier.promotionName;

            promotionTier.tierDetails.forEach((detail, i)=>{
                delete detail.tierName;
                delete detail.key;
            })

            newPromotions.push(promotionTier);
        })
        request.data.newPromotionTiers = newPromotions;


        this.props.updateTier(request);
    }


    handleCancel = (e) =>{
        this.setState({
            request : [],
            modalUpdatePro : false
        })
    }

    handleCancelProNull = (e) =>{
        this.setState({
            request : [],
            modalUpdateNullPromotion : false
        })
    }

    handleCancelRewNull = (e) =>{
        this.setState({
            request : [],
            modalUpdateNullReward : false
        })
    }



    render() {
        const {getFieldDecorator} = this.props.form;
        let {tier, modalUpdatePro, modalUpdateNullPromotion, modalUpdateNullReward} = this.state;
        let tierInit = this.props.tier;
        const { msgShow, msgType, msgContent, dataSource } = this.state;

        let enableSwitchIsDowngrade = false;
        if(this.props.match.params.type === 'update'){
            enableSwitchIsDowngrade = true;
        }

        // let enableSwitchIsImmediatelyDowngrade = false;
        // if(this.props.match.params.type === 'update'){
        //     enableSwitchIsImmediatelyDowngrade = true;
        // }

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        let columnsComp = [{
            title: 'Tier Code',
            dataIndex: 'tierCode',
            editable: true,
        },{
            title: 'Tier Name',
            dataIndex: 'tierName',
            editable: true,
        },{
            title: 'Lower Bound Point',
            dataIndex: 'lowerBoundPoint',
            editable: true,
        }, {
            title: 'Upper Bound Point',
            dataIndex: 'upperBoundPoint',
            editable: true,
        }, {
            title: 'Tier Image',
            dataIndex: 'tierImage',
            editable: true,
            render: (text, record) => (
                    (<img src={text} alt="avatar" width={'100px'}/>)
            ),
        }, {
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
                    imageSave : this.imageSave,
                    upload : this.uploadImage
                }),
            };
        });

        return(
            <Card className="gx-card" title='Tier'>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Tier Code'>
                        {getFieldDecorator('tierStructureCode', {
                            tiers: [{
                                required: true,
                                message: 'Please input tier structure code'
                            }],
                            initialValue: tier.tierStructureCode
                        })(
                            <Input placeholder='Tier Name'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Downgrade Tier'>
                        {getFieldDecorator('isDowngrade',{
                            // rules: [{
                            //     required: true,
                            //     message: 'Please input downgrade tier',
                            // }],
                            // initialValue: tier.isDowngrade == -1
                        })(
                            <Switch checkedChildren="Yes" unCheckedChildren="No"
                                    disabled={enableSwitchIsDowngrade}
                                    onChange={this.onChangeSwitchIsDowngrade} checked={tier.isDowngrade === -1}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Downgrade Tier Immediately'>
                        {getFieldDecorator('isImmediatelyDowngrade',{
                            // rules: [{
                            //     required: true,
                            //     message: 'Please input downgrade tier',
                            // }],
                            // initialValue: tier.isImmediatelyDowngrade == -1
                        })(
                            <Switch checkedChildren="Yes" unCheckedChildren="No" 
                            // disabled={true}
                            disabled={this.props.match.params.type === 'update' ? true : tier.isDowngrade === 0 || tier.isDowngrade === undefined} 
                            onChange={this.onChangeSwitchIsImmediatelyDowngrade} checked={tier.isImmediatelyDowngrade === -1}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label=' Downgrade Tier Time set '>
                        {getFieldDecorator('downgradeTimeSet', {
                            // rules: [{
                            //     required: true,
                            //     message: 'Please input downgrade time set'
                            // }],
                            initialValue: tier.downgradeTimeSet

                        })(
                            <DatePicker className="gx-mb-3 gx-w-20"
                            
                                        disabledDate={this.disabledDowngradeTimeSet}
                                        onChange={this.onChangeDowngradeTimeSet.bind(this)}
                                        onOpenChange={this.handleStartOpenChange}
                                        // disabled={true}
                                        disabled={this.props.match.params.type === 'update' ? true : tier.isDowngrade === 0 || tier.isDowngrade === undefined ? true : !(tier.isImmediatelyDowngrade === 0 || tier.isImmediatelyDowngrade === undefined)}
                                        format={dateFormatList}
                            />
                        )}
                        <span style={{ fontSize: '12px', color: 'red', paddingLeft: '10px' }}>* Only set once</span>
                    </FormItem>

                    <div style={{marginBottom:'20px'}}>
                        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                            Add tier detail
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


                <Modal
                    title="Update these tiers and promotions to complete update your tier"
                    width='70%'
                    visible={modalUpdatePro}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel.bind(this)}>Back</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk.bind(this)}>
                            Save
                        </Button>,
                    ]}
                >

                    <UpdatePopup init={tierInit} diff={tier} onChangeProgram={this.updateProgram} onChangePromotion={this.updatePromotion} />

                </Modal>

                <Modal
                    // title="Promotion"
                    width='30%'
                    style={{paddingTop : '100px'}}
                    visible={modalUpdateNullPromotion}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancelProNull}
                    footer={[
                        <Button key="back" onClick={this.handleCancelProNull.bind(this)}>Back</Button>,
                    ]}
                >

                    <UpdatePromotionNullPopup/>

                </Modal>


                <Modal
                    // title="Promotion"
                    width='30%'
                    style={{paddingTop : '100px'}}
                    visible={modalUpdateNullReward}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancelRewNull}
                    footer={[
                        <Button key="back" onClick={this.handleCancelRewNull.bind(this)}>Back</Button>,
                    ]}
                >

                    <UpdateProgramNullPopup/>

                </Modal>

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
        previewVisible: false,
        previewImage: '',
        fileList: []
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                // this.input.focus();
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

    handleCancel = () => this.setState({ previewVisible: false })


    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ info, fileList }) => {

        const { record, imageSave } = this.props;
        // if(fileList[0] !== undefined) {
        //     let data = fileList[0];
        //     imageSave(record.key, data);
        // }
        // this.setState({
        //     fileList
        // })

        imageSave(record.key);

        this.setState({
            fileList
        })
    }

    componentWillMount(){
        if(this.props.record){
            if(this.props.record['tierImage'] != null && this.props.record['tierImage'] !== ''){
                this.setState({
                    fileList : [{
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: this.props.record.tierImage,
                    }]
                })
            }
        }

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
            imageSave,
            upload,
            ...restProps
        } = this.props;

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const { previewVisible, previewImage, fileList } = this.state;

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
                                    dataIndex === 'tierCode' || dataIndex === 'tierName' ? (
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
                                                    min={0}
                                                    onPressEnter={this.save}
                                                    onBlur={this.save}
                                                />
                                            )}
                                        </FormItem>
                                    )
                                ) : (
                                    dataIndex === 'tierImage' ? (
                                        <div className="clearfix">
                                            <Upload
                                                listType="picture-card"
                                                fileList={fileList}
                                                action={upload}
                                                onPreview={this.handlePreview}
                                                onChange={this.handleChange}
                                            >
                                                {fileList.length >= 1 ? null : uploadButton}
                                            </Upload>
                                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                            </Modal>
                                        </div>
                                    ) : (

                                        <div
                                            className="editable-cell-value-wrap"
                                            style={{ paddingRight: 24 }}
                                            onClick={this.toggleEdit}
                                        >
                                            {restProps.children}
                                        </div>
                                    )
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

const mapStateToProps = ({auth, tierState,commonState}) => {
    const {authUser} = auth;
    const {filePath} = commonState;
    const {tier, alertMessage, updateSuccess, updateFailed, updateData, createSuccess, createFailed,  createData} = tierState
    return {authUser, tier, alertMessage, updateSuccess, updateFailed, updateData, createSuccess, createFailed, createData, filePath}
};

export default connect(mapStateToProps, {viewTier, updateTier, createTier, resetStatus, uploadImage, resetFilePath})(Form.create()(CreateUpdateTier));


