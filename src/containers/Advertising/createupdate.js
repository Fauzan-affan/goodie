import React, {Component} from "react";
import CKEditor from "react-ckeditor-component";
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import AdvertisingType from '../../constants/AdvertisingType';
import {NotificationContainer, NotificationManager} from "react-notifications";
import ArticleCategory from '../../constants/ArticleCategory';
import AdsCategory from '../../constants/AdsCategory';
import {
    viewAdvertising,
    updateAdvertising,
    createAdvertising,
    resetStatus
} from "appRedux/actions/Advertising";
import {
    uploadImage,
    resetFilePath
} from "appRedux/actions/Common";
import {
    searchPrograms
} from "appRedux/actions/Program";
import {
    getListProvince,
    getListCity
} from "appRedux/actions/Common";
import {
    viewMerchant,
} from "appRedux/actions/Merchant";
import {Button, Card, Form, Input, Modal, Select, Upload, Icon, DatePicker,
    Table, Popconfirm, InputNumber,
} from "antd";
// import update from "immutability-helper";
import moment from "moment";


const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formItemLayout1 = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formTailLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: {span: 14, offset: 6}},
};

class CreateUpdateAdvertising extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : [],
            merchant: [],
            stateProv: [],
            listCity : [],
            programList : [],
            countryId : [],
            msgContent : '',
            msgType : '',
            rewardDisable : false,
            msgShow : false,
            previewVisible: false,
            previewImage: '',
            dataSourceCities: [],
            selectedCities:[],
            count: 0,
            endOpen: false,
            fileList: []
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
    }

    componentWillMount(){
        let credential = this.props.authUser;
        this.props.viewMerchant(credential);
        this.props.searchPrograms(credential);

        if(this.props.listProvince.length < 1){
            this.props.getListProvince();
        }

        if(this.props.match.params.type === 'update'){
            credential.id = this.props.match.params.id;
            this.props.viewAdvertising(credential);
        }else{
            let data = [];
            data.adsCategory = AdsCategory.AdsCategory.COMMON.label;
            this.setState({
                rewardDisable : false
            })


            data.advertisingType = this.props.match.params.advertisingType === 'splashscreen' ? 1 : data.advertisingType = this.props.match.params.advertisingType === 'bannerhome' ? 2 : data.advertisingType = this.props.match.params.advertisingType === 'introduction' ? 3 : 4
            this.setState({
                data : data,
            })
        }
    }

    componentWillReceiveProps(nextProps){

        if (nextProps.merchant !== undefined && nextProps.merchant != this.props.merchant) {
            let request = {
                id: nextProps.merchant.address.country
            };
            this.props.getListProvince(request);
        }

        if (nextProps.listCity !== undefined) {
            let dataRaw = [];
            // let totalRec = 0;

            nextProps.listCity.forEach((cities, i) => {
                let citiesDetail = {};
                citiesDetail.key = i;
                citiesDetail.cityName = cities.cityName;
                citiesDetail.cityId = cities.cityId;
                citiesDetail.stateProvId = cities.stateProvId;
                dataRaw.push(citiesDetail);
                // totalRec++;
            });

            this.setState({
                dataSourceCities : dataRaw
            })

        }

        if (nextProps.listCity !== this.props.listCity) {
            this.setState({
                listCity : nextProps.listCity
            })
        }

        if (nextProps.listPrograms !== undefined) {

            let programListRaw = [];
            let totalRec = 0;

            nextProps.listPrograms.forEach((program, i) => {
                program.key = i;
                programListRaw.push(program);
                totalRec++;
            });

            this.setState({
                programList: programListRaw
            })
        }


        if(this.props.match.params.type === 'update') {

            if (nextProps.data !== this.props.data) {
                if(nextProps.data !== undefined){


                    let cities= [];
                    let count = 1;
                    nextProps.data.cities.forEach((detail, i) => {
                        let city = detail;
                        city.flag = 'success';
                        city.msg = '';
                        city.key = count;
                        cities.push(city);
                        count++;
                    })

                    this.setState({
                        data: nextProps.data,
                        selectedCities: cities,
                        count : count,
                        // stateProv : cities[0].stateProvId
                    });
                }
            }

            if (nextProps.data !== undefined && nextProps.data !== this.props.data) {
                this.setState({
                    data: nextProps.data,
                    previewImage: nextProps.data.image
                    // count: totalRec + 1
                });

                if(nextProps.data.image !== null){
                    let fileListRaw = [{
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: nextProps.data.image,
                    }]

                    this.setState({
                        fileList: fileListRaw
                    })
                }
            }

            // if (nextProps.data.adsCategory === AdsCategory.AdsCategory.COMMON.label)
            // else if (nextProps.data.adsCategory === AdsCategory.AdsCategory.REWARD.label)
            // else if (nextProps.data.adsCategory === AdsCategory.AdsCategory.POST.label)

            if (nextProps.data.adsCategory === AdsCategory.AdsCategory.COMMON.label) {
                this.setState({
                    data: nextProps.data,
                    rewardDisable: true,
                });
            } else if (nextProps.data.adsCategory === AdsCategory.AdsCategory.REWARD.label) {
                this.setState({
                    data: nextProps.data,
                    rewardDisable: false,
                });
            } else if (nextProps.data.adsCategory === AdsCategory.AdsCategory.POST.label) {
                this.setState({
                    data: nextProps.data,
                    rewardDisable: true,
                });
            }

        }
        else{
            let newData = this.state.data;

            this.setState({
                data : newData,
                id : ''
            })
        }

        if(nextProps.filePath !== this.props.filePath && this.state.data.name !== '' && nextProps.filePath!== ''){
            let filePath = nextProps.filePath;

            let dataNew = this.state.data;
            dataNew.image = filePath;
            this.setState({
                data : dataNew
            })

            this.props.resetFilePath();
        }

        if(nextProps.data.startDate != null ||
            nextProps.data.startDate !== ''){
            nextProps.data.startDate = moment(nextProps.data.startDate, 'YYYY/MM/DD');
        }

        if(nextProps.data.endDate != null ||
            nextProps.data.endDate !== ''){
            nextProps.data.endDate = moment(nextProps.data.endDate, 'YYYY/MM/DD');
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
        if(value === 1){

            this.setState({
                rewardDisable: false,
            });

            this.props.form.setFieldsValue({
                rewardId: undefined,
            });
        }else if(value === 2){

            this.setState({
                rewardDisable: false,
            });

            this.props.form.setFieldsValue({
                rewardId: this.state.rewardId,
            });
        }else if(value === 3){

            this.setState({
                rewardDisable: true,
            });

            this.props.form.setFieldsValue({
                rewardId: undefined,
            });
        }

    }

    changeProvince(value){
        let request = {
            id : value
        }
        this.props.getListCity(request);
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let error = false;

                let image = this.state.data.image;

                if(this.state.data.image !== undefined){
                    if(this.state.data.image.substr(0,4) === 'http'){
                        image = '';
                    }
                }else{
                    image = '';
                }

                let request = this.props.authUser;

                const {selectedCities} = this.state;


                //Build city request
                let cities = [];
                selectedCities.forEach((city,i)=>{
                    let c = {
                        // cityId : city.id,
                        // cityName : city.cityName,
                        // stateProvId : city.stateProvId,
                        city
                    }
                    cities.push(c);
                })
                values.cities = cities;

                // if(values.cities.length === 0){
                //     this.errorNotification('Please add minimal 1 city');
                //     error = true;
                //     return;
                // }

                let cityId = '';
                cityId = localStorage.getItem('cityId')

                values.description = this.state.data.description;
                values.image = image;
                values.cityId = [cityId];
                // values.cityId = listCityId;
                values.startDate = moment(values.startDate).format('YYYY-MM-DD')
                values.endDate = moment(values.endDate).format('YYYY-MM-DD')
                request.data = values;

                let listCityId = [];

                for(let i=0;i<request.data.cities.length;){
                    listCityId.push(request.data.cities[i].city.cityId);
                    i++;
                }

                values.cityId = listCityId;

                let adsCategory = values.adsCategory;
                adsCategory = AdsCategory.getValue(adsCategory);
                values.adsCategory = (adsCategory!=null)?adsCategory:values.adsCategory;

                request.data = values;

                if(!error){
                    if(this.props.match.params.type === 'update') {
                        this.props.updateAdvertising(request);
                    }else{
                        this.props.createAdvertising(request);
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

    //Action For Cities
    handleDelete = (key) => {
        const selectedCities = [...this.state.selectedCities];
        this.setState({
            selectedCities: selectedCities.filter(item => item.key !== key),
            isButtonDisabled: false,
        });
    }

    handleAdd = () => {
        const { count, selectedCities } = this.state;
        let newData = {
            key: count,
            cityId: '',
            cityName: '',
            stateProvId: '',
            flag: 'success',
            msg: ''
        };

        this.setState({
            selectedCities: [...selectedCities, newData],
            count: count + 1,
            isButtonDisabled:true,
        });
    }

    handleSaveCities = (record ,row) => {
        // const {dataSourceRoles, selectedRule, count} = this.state;
        // let status = 0;
        let itemSource = {};
        let newData = [...this.state.selectedCities];

        //Validate if city already choose
        const validData = [...this.state.selectedCities];
        const indexValid = validData.findIndex(item => row === item.cityId);

        localStorage.setItem('cityId',row);

        itemSource = {
            key: record.key,
            cityId: row,
            cityName: '',
            // stateProvId: localStorage.getItem('stateProvId'+row),
            // description: localStorage.getItem('roleDesc'+row),
            flag: '',
            msg: ''
        };

        const index = newData.findIndex(item => record.key === item.key);
        const item = newData[index];

        newData.splice(index, 1, {
            ...item,
            ...itemSource,
        });

        this.setState({
            selectedCities: newData
        });
    }

    disabledButtonAddCities = () => {

        if(this.state.validationButtonAddRoleson === -1) {
            return true;
        }else{
            return false;
        }
    }

    //End - Action For Cities

    onChangeStartDate(date, dateString) {
        if(dateString !== undefined){
            let newData = this.state.data;
            newData.startDate = date;
            this.setState({
                data : newData
            });
        }
    }

    onChangeEndDate(date, dateString) {
        if(dateString !== undefined){
            let newData = this.state.data;
            newData.endDate = date;
            this.setState({
                data : newData
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
        const endValue = moment(this.state.data.endDate, 'YYYY/MM/DD');
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate = (endValue) => {
        const startValue = moment(this.state.data.startDate, 'YYYY/MM/DD');
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    uploadImage = (image) => {
        let credential = this.props.authUser;
        credential.file = image;
        this.props.uploadImage(credential);
    }

    handlePreview = (image) => {
        this.setState({
            previewImage: image.url || image.thumbUrl,
            previewVisible: true,
        });
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handleChange = ({ fileList }) => this.setState({ fileList })

    onChange(evt) {
        const newContent = evt.editor.getData();
        let newData = this.state.data;
        newData.description = newContent;
        this.setState({
            data : newData
        })
    }

    onBlur(evt) {
        // console.log('onBlur event called with event info: ', evt);
    }

    afterPaste(evt) {
        // console.log('afterPaste event called with event info: ', evt);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        let {data} = this.state;
        const { msgShow, msgType, msgContent, previewVisible, previewImage, fileList, endOpen, programList, selectedCities, stateProv } = this.state;


        let optionProvince= [];
        this.props.listProvince.forEach((province,i)=>{
            let option =
                <Option key={i} value={province.id}>{province.label}</Option>
            ;
            optionProvince.push(option);
        })

        let optionCity= [];
        this.state.listCity.forEach((city,i)=>{
            let option =
                <Option key={i} value={city.id}>{city.label}</Option>
            ;
            optionCity.push(option);
        })

        let optionsPrograms = [];
        programList.forEach((role, i) => {
            let optionProgram =
                <Option key={i} value={role.programId}>{role.programName}</Option>;
            optionsPrograms.push(optionProgram);
        });


        let options = [];
        AdvertisingType.values().forEach((type, i) => {
            let option = [];
            option.push(
                <Option key={i} value={type.value}>{type.label}</Option>
            );
            options.push(option);
        });

        let optionsArticle = [];
        ArticleCategory.values().forEach((artic, i) => {
            let optionArticle = [];
            optionArticle.push(
                <Option key={i} value={artic.value}>{artic.label}</Option>
            );
            optionsArticle.push(optionArticle);
        });

        let optionsAdsCategory = [];
        AdsCategory.values().forEach((ads, i) => {
            let optionAdsCategory = [];
            optionAdsCategory.push(
                <Option key={i} value={ads.value}>{ads.label}</Option>
            );
            optionsAdsCategory.push(optionAdsCategory);
        });

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        //For City
        const componentsCities = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        let columnsComp = [{
            title: 'City Name',
            dataIndex: 'cityName',
            editable: true
        },
        //     {
        //     title: 'City Name',
        //     dataIndex: 'cityName',
        //     editable: false
        // },
        //     {
        //     title: 'State Prov ID',
        //     dataIndex: 'stateProvId',
        //     editable: false
        // },
            {
            title: 'Action',
            dataIndex: 'operation',
            render: (text, record) => (
                this.state.selectedCities.length >= 1
                    ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;">Delete</a>
                        </Popconfirm>
                    ) : null
            ),
        }];

        const columnsCities = columnsComp.map((col) => {
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
                    handleSave: this.handleSaveCities,
                    dataOption: optionCity
                }),
            };
        });
        //End - For Cities


        return(
            <Card className="gx-card" title='Advertising'>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Advertising Name'>
                        {getFieldDecorator('advertisingName', {
                            // rules: [{
                            //     required: true,
                            //     message: 'Please input advertising name'
                            // }],
                            initialValue: data.name
                        })(
                            <Input placeholder='Advertising Name'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Start Date'>
                        {getFieldDecorator('startDate', {
                            // rules: [{
                            //     required: true,
                            //     message: 'Please input start date'
                            // }],
                            initialValue: data.startDate

                        })(
                            <DatePicker className="gx-mb-3 gx-w-100"
                                        disabledDate={this.disabledStartDate}
                                        onChange={this.onChangeStartDate.bind(this)}
                                        onOpenChange={this.handleStartOpenChange}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='End Date'>
                        {getFieldDecorator('endDate', {
                            // rules: [{
                            //     required: true,
                            //     message: 'Please input end date'
                            // }],
                            initialValue: data.endDate

                        })(
                            <DatePicker className="gx-mb-3 gx-w-100"
                                        disabledDate={this.disabledEndDate}
                                        onChange={this.onChangeEndDate.bind(this)}
                                        onOpenChange={this.handleEndOpenChange}
                                        open={endOpen}
                            />
                        )}
                    </FormItem>

                    {/* <FormItem {...formItemLayout} label='Province Id'>
                        {getFieldDecorator('stateProvId',{
                            // rules: [{
                            //     required: true,
                            //     message: 'Please input province'
                            // }],
                            initialValue: stateProv
                        })(
                            <Select
                                onChange={this.changeProvince.bind(this)}
                                placeholder={
                                    <div>
                                        <div style={{display:'inline-block'}} className="icon icon-map-drawing"></div>
                                        <span style={{marginLeft:'5px'}}>Province</span>
                                    </div>
                                }
                            >
                                {optionProvince}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout1} label='Cities'>
                        <Button
                            // disabled={this.state.isButtonDisabled}
                            onClick={this.handleAdd.bind(this)} type="primary" style={{ marginBottom: 16 }}>
                            Add City
                        </Button>
                        <Table
                            className="gx-table-responsive"
                            components={componentsCities}
                            rowClassName={() => 'editable-row'}
                            bordered
                            dataSource={selectedCities}
                            columns={columnsCities}
                        />
                    </FormItem> */}

                    {/*<FormItem {...formItemLayout} label='City Id'>*/}
                    {/*    {getFieldDecorator('cityId',{*/}
                    {/*        // rules: [{*/}
                    {/*        //     required: true,*/}
                    {/*        //     message: 'Please input city'*/}
                    {/*        // }],*/}
                    {/*        initialValue: data.cityId*/}
                    {/*    })(*/}
                    {/*        <Select placeholder={*/}
                    {/*            <div>*/}
                    {/*                <div style={{display:'inline-block'}} className="icon icon-navigation"></div>*/}
                    {/*                <span style={{marginLeft:'5px'}}>City</span>*/}
                    {/*            </div>*/}
                    {/*        }*/}
                    {/*        >*/}
                    {/*            {optionCity}*/}
                    {/*        </Select>*/}
                    {/*    )}*/}
                    {/*</FormItem>*/}

                    <FormItem {...formItemLayout} label='Article Category'>
                        {getFieldDecorator('articleCategory', {
                            initialValue: data.articleCategory,
                            // rules: [{
                            //     required: true,
                            //     message: 'Please input article category',
                            // }],
                        })(
                            <Select style={{width: '30%'}}
                                    placeholder={
                                        <div>
                                            <div style={{display:'inline-block'}} className="icon icon-map-drawing"></div>
                                            <span style={{marginLeft:'5px'}}>Article Category</span>
                                        </div>
                                    }>
                                {optionsArticle}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Ads Category'>
                        {getFieldDecorator('adsCategory', {
                            initialValue: AdsCategory.getLabel(data.adsCategory),
                            // rules: [{
                            //     required: true,
                            //     message: 'Please input ads category',
                            // }],
                        })(
                            <Select style={{width: '30%'}} 
                                    onChange={this.changeListbox.bind(this)}
                                    placeholder={
                                        <div>
                                            <div style={{display:'inline-block'}} className="icon icon-map-drawing"></div>
                                            <span style={{marginLeft:'5px'}}>Article Category</span>
                                        </div>
                                    }>
                                {optionsAdsCategory}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Reward'>
                        {getFieldDecorator('rewardId', {
                            initialValue: data.rewardName,
                            // rules: [{
                            //     required: true,
                            //     message: 'Please input reward',
                            // }],
                        })(
                            <Select style={{width: '50%'}} 
                                disabled={this.state.rewardDisable}
                                placeholder={
                                    <div>
                                        <div style={{display:'inline-block'}} className="icon icon-map-drawing"></div>
                                        <span style={{marginLeft:'5px'}}>Reward</span>
                                    </div>
                                }>
                                {optionsPrograms}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Advertising type'>
                        {getFieldDecorator('advertisingType',{
                            initialValue: data.advertisingType,
                            rules: [{
                                required: true,
                                message: 'Please input advertising type',
                            }],
                        })(
                            <Select style={{width: '50%'}} disabled={true}>
                                {options}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Image'>
                        <div className="clearfix">
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                action={this.uploadImage}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                            <p style={{marginBottom: '0px', color: 'red'}}>* Maximum upload file size: 2 MB.</p>
                        </div>
                    </FormItem>

                    <FormItem {...formItemLayout} label='Description'>

                        <CKEditor
                            activeClass="p10"
                            content={data.description}
                            events={{
                                'blur': this.onBlur.bind(this),
                                'afterPaste': this.afterPaste.bind(this),
                                'change': this.onChange.bind(this)
                            }}
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

    changeCity = (value) => {
        const { record, handleSave } = this.props;
        handleSave(record, value);
    }

    render() {
        // const { editing } = this.state;
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
                                dataIndex === 'cityName' ? (
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
                                                    onChange={this.changeCity}>
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

const mapStateToProps = ({auth, advertisingState, commonState, programState, merchantState}) => {
    const {authUser} = auth;
    const {
        filePath,
        listProvince,
        listCity
    } = commonState;
    const {listPrograms} = programState;
    const {merchant} = merchantState;
    const {data, updateSuccess, updateFailed, updateData, createSuccess, createFailed,  createData} = advertisingState
    return {authUser, merchant,
        listProvince,
        listCity,
        data, updateSuccess, updateFailed, updateData, createSuccess, createFailed, createData, filePath, listPrograms}
};

export default connect(mapStateToProps, {viewAdvertising, updateAdvertising, searchPrograms, viewMerchant, createAdvertising, resetStatus, uploadImage, resetFilePath,
    getListProvince,
    getListCity
})(Form.create()(CreateUpdateAdvertising));


