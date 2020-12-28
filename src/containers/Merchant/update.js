import React, {Component} from "react";
import moment from 'moment';
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "components/CircularProgress/index";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    viewMerchant,
    updateMerchant,
    getListCurrency,
    resetStatus,
    getCurrencyMerchant,
} from "appRedux/actions/Merchant";
import {
    uploadImage,
    resetFilePath,
    getListCountry,
    getListProvince,
    getListCity
} from "appRedux/actions/Common";
import {Button, Card, Form, Input, Table, Modal, Select, Switch, Upload, Icon, Radio, Checkbox, message, Popconfirm} from "antd";

// import update from "immutability-helper";
// import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";

const RadioGroup = Radio.Group;
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

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            merchant: [],
            listProvince : [],
            listCity: [],
            msgContent: '',
            msgType: '',
            msgShow: false,
            previewVisible: false,
            previewImage: '',
            fileList: [],
            labelType: '',
            currency: [],
            logoPoint: [],
            selectedMemberFields: [],
            approvalMembershipTable: "none",
            count : 1,
            isApproval : '',
            msgDelete: '',
            onDelete : false,
            idWillDelete: '',
            // checkedField: false
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.onChangeSwitchIsRequiredVerification = this.onChangeSwitchIsRequiredVerification.bind(this);
        this.onChangeSwitchIsRedeemOtp = this.onChangeSwitchIsRedeemOtp.bind(this);

    }

    componentWillMount() {
        let credential = this.props.authUser;
        this.props.viewMerchant(credential);

        if (this.props.listCountry.length < 1) {
            this.props.getListCountry();
        }

        if (this.props.listCurrency.length < 1) {
            this.props.getListCurrency();
        }

        if (this.props.listCurrency.length < 1) {
            this.props.getCurrencyMerchant();
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.listProvince !== this.props.listProvince) {
            this.setState({
                listProvince: nextProps.listProvince
            })
        }

        if (nextProps.listCity !== this.props.listCity) {
            this.setState({
                listCity: nextProps.listCity
            })
        }

        if (nextProps.listCurrency !== this.props.listCurrency) {
            this.setState({
                listCurrency: nextProps.listCurrency
            })
        }

        if (nextProps.merchant !== undefined && nextProps.merchant != this.props.merchant) {
            let request = {
                id: nextProps.merchant.address.country
            };
            this.props.getListProvince(request);

            this.setState({
                merchant: nextProps.merchant,
                previewImage: nextProps.merchant.merchantLogo
            });

            if (nextProps.merchant.merchantLogo !== null) {
                let fileListRaw = [{
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: nextProps.merchant.merchantLogo,
                }];

                this.setState({
                    fileList: fileListRaw
                })
            }

        }

        if (nextProps.merchant !== undefined && nextProps.merchant != this.props.merchant) {
            let request = {
                id: nextProps.merchant.address.provinceId
            };
            this.props.getListCity(request);

            this.setState({
                merchant: nextProps.merchant,
                previewImage: nextProps.merchant.merchantLogo
            });

            if (nextProps.merchant.merchantLogo !== null) {
                let fileListRaw = [{
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: nextProps.merchant.merchantLogo,
                }];

                this.setState({
                    fileList: fileListRaw
                })
            }

        }

        if (nextProps.merchant !== undefined && nextProps.merchant !== this.props.merchant) {
            let request = {
                authToken: localStorage.getItem('a'),
                deviceId: localStorage.getItem('d'),
                userId: localStorage.getItem('u'),
                merchantId: localStorage.getItem('mt'),
                paramCurrencyPoint: nextProps.merchant.paramCurrencyPoint
            };
            this.props.getListCurrency(request);
        }

        if (nextProps.merchant.currency !== this.props.merchant.currency) {
            this.setState({
                currency: nextProps.merchant.currency
            });
        }

        if (nextProps.merchant.logoPoint !== this.props.merchant.logoPoint) {
            this.setState({
                logoPoint: nextProps.merchant.logoPoint
            });
        }

        if (nextProps.filePath !== this.props.filePath && this.state.merchant.merchantCode !== '' && nextProps.filePath !== '') {
            let filePath = nextProps.filePath;

            let merchantNew = this.state.merchant;
            merchantNew.merchantLogo = filePath;
            this.setState({
                merchant: merchantNew
            });

            this.props.resetFilePath();
        }

        if (nextProps.updateDeleteSuccess && !nextProps.updateDeleteFailed) {
            this.setState({
                msgContent: 'Delete Successfully',
                msgShow: true,
                msgType: 'delete',
                onDelete : false,
            })
            console.log(this.state.msgType)
        } else if (nextProps.updateSuccess && !nextProps.updateFailed) {
            this.setState({
                msgContent: 'Updated Successfully',
                msgShow: true,
                msgType: 'success'
            })
        } else if (!nextProps.updateSuccess && nextProps.updateFailed) {
            this.setState({
                msgContent: 'Update failed',
                msgShow: true,
                msgType: 'danger'
            })
        }
        
        if (nextProps.merchant.additionalFields !== undefined && nextProps.merchant.additionalFields === this.props.merchant.additionalFields) {
            let dataSourceRaw = [];
            let totalRec = 0;
    
            nextProps.merchant.additionalFields.forEach((detail, i) => {
                // console.log(detail)
                detail.key = i;
                dataSourceRaw.push(detail);
                totalRec++;
            })
                this.setState({
                selectedMemberFields: dataSourceRaw,
                count: totalRec + 1
            });
        }

        if (nextProps.merchant.isApproval !== undefined && nextProps.merchant.isApproval === this.props.merchant.isApproval) {
            this.setState({
                isApproval: nextProps.merchant.isApproval,
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let error = false;
                let { selectedMemberFields } = this.state;

                //Build member request
                let members = [];
                selectedMemberFields.forEach((item,i)=>{
                    let r = {
                        fieldId :item.fieldId,
                        fieldName : item.fieldName,
                        fieldType : item.fieldType,
                        status : item.status,
                        showCard : item.showCard
                    }

                    members.push(r);
                })
                // values.members = members;

                if (values.isRequiredVerification === false) {
                    values.isRequiredVerification = 0;
                } else {
                    values.isRequiredVerification = -1;
                }

                if (values.isRedeemOtp == false) {
                    values.isRedeemOtp = 0;
                } else {
                    values.isRedeemOtp = -1;
                }

                let image = this.state.merchant.merchantLogo;


                if (this.state.merchant.merchantLogo != undefined) {
                    if (this.state.merchant.merchantLogo.substr(0, 4) === 'http') {
                        image = '';
                    }
                } else {
                    image = '';
                }

                let address = {
                    addressLine1: values.address,
                    addressLine2: '',
                    addressLine3: '',
                    countryId: values.countryId,
                    provinceId: values.stateProvinceId,
                    cityId: values.cityId,
                    postalCode: values.postalCode,
                };

                let contact = [
                    {
                        contactFirstName: values.contactFirstName,
                        contactLastName: values.contactLastName,
                        emailAddress: this.state.merchant.contacts[0].emailAddress,
                        mobileNumber: values.mobileNumber,
                    }
                ];


                let formData = {
                    merchantName: values.merchantName,
                    isRequiredVerification: values.isRequiredVerification,
                    isRedeemOtp: values.isRedeemOtp,
                    issuingReferral: values.issuingReferral,
                    paramCurrencyPoint: values.paramCurrencyPoint,
                    merchantWebsite: values.merchantWebsite,
                    merchantLogo: image,
                    currencyId: values.currencyId,
                    lookupDtlId: values.lookupDtlId,
                    lookupHdrId: values.lookupHdrId,
                    lookupCode: values.lookupCode,
                    lookupValue: values.lookupValue,
                    description: values.description,
                    icon: values.icon,
                    address: address,
                    contact: contact,
                    additionalFields: this.state.selectedMemberFields,
                    isApproval : this.state.isApproval
                };

                console.log(formData,'submit')

                let request = this.props.authUser;
                request.data = formData;
                // values.isRequiredVerification = (this.state.product.isRequiredVerification)
                // values.isRedeemOtp = (this.state.product.isRedeemOtp);

                if (!error) {
                    this.props.updateMerchant(request);
                }

            }
        });
    };

    //Action For List Contact
    handleDelete = (key) => {
        const selectedMemberFields = [...this.state.selectedMemberFields];
        this.setState({ selectedMemberFields: selectedMemberFields.filter(item => item.key !== key) });
    }

    // handleDelete = (record) => {
    //     this.setState({
    //         onDelete : true,
    //         msgType : "delete"
    //     })
        
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             let error = false;
    //             let { selectedMemberFields } = this.state;

    //             //Build member request
    //             let members = [];
    //             selectedMemberFields.forEach((item,i)=>{
    //                 let r = {
    //                     fieldId :item.fieldId,
    //                     fieldName : item.fieldName,
    //                     fieldType : item.fieldType,
    //                     status : item.status
    //                 }

    //                 members.push(r);
    //             })
    //             // values.members = members;

    //             if (values.isRequiredVerification === false) {
    //                 values.isRequiredVerification = 0;
    //             } else {
    //                 values.isRequiredVerification = -1;
    //             }

    //             if (values.isRedeemOtp == false) {
    //                 values.isRedeemOtp = 0;
    //             } else {
    //                 values.isRedeemOtp = -1;
    //             }

    //             let image = this.state.merchant.merchantLogo;


    //             if (this.state.merchant.merchantLogo != undefined) {
    //                 if (this.state.merchant.merchantLogo.substr(0, 4) === 'http') {
    //                     image = '';
    //                 }
    //             } else {
    //                 image = '';
    //             }

    //             let address = {
    //                 addressLine1: values.address,
    //                 addressLine2: '',
    //                 addressLine3: '',
    //                 countryId: values.countryId,
    //                 provinceId: values.stateProvinceId,
    //                 cityId: values.cityId,
    //                 postalCode: values.postalCode,
    //             };

    //             let contact = [
    //                 {
    //                     contactFirstName: values.contactFirstName,
    //                     contactLastName: values.contactLastName,
    //                     emailAddress: this.state.merchant.contacts[0].emailAddress,
    //                     mobileNumber: values.mobileNumber,
    //                 }
    //             ];


    //             let formData = {
    //                 merchantName: values.merchantName,
    //                 isRequiredVerification: values.isRequiredVerification,
    //                 isRedeemOtp: values.isRedeemOtp,
    //                 issuingReferral: values.issuingReferral,
    //                 paramCurrencyPoint: values.paramCurrencyPoint,
    //                 merchantWebsite: values.merchantWebsite,
    //                 merchantLogo: image,
    //                 currencyId: values.currencyId,
    //                 lookupDtlId: values.lookupDtlId,
    //                 lookupHdrId: values.lookupHdrId,
    //                 lookupCode: values.lookupCode,
    //                 lookupValue: values.lookupValue,
    //                 description: values.description,
    //                 icon: values.icon,
    //                 address: address,
    //                 contact: contact,
    //                 additionalFields: [{
    //                     fieldId : record.fieldId,
    //                     fieldName : record.fieldName,
    //                     fieldType : record.fieldType,
    //                     status : 4
    //                 }],
    //                 isApproval : this.state.isApproval
    //             };

    //             let request = this.props.authUser;
    //             request.data = formData;

    //             if (!error) {
    //                 this.props.updateMerchant(request);
    //                 Location.reload();
    //             }
    //         }
    //     });
    // }

    onCancelDelete(){
        this.setState({
            onDelete : false,
        })
    }

    handleAdd = () => {
        const { count, selectedMemberFields } = this.state;

        let newData = {
                key: count,
                fieldId : '',
                fieldName: '',
                fieldType: '',
                status: '',
                showCard: '',
            };

        this.setState({
            selectedMemberFields: [...selectedMemberFields, newData],
            count: count + 1,
        });
    }

    handleSave = (record, row) => {
        console.log(record.showCard,'handleSave showcad')
        console.log(record.fieldName,'handleSave field Name')
        const newData = [...this.state.selectedMemberFields];
        let itemSource = {
            key: record.key,
            fieldName : record.fieldName,
            fieldType :  record.fieldType,
            status : record.status,
            showCard : record.showCard
        }
        const index = newData.findIndex(item => record.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...itemSource,
        });
        this.setState({ 
            selectedMemberFields: newData
        });
    }

    errorNotification(message) {
        return NotificationManager.error(message, 'Alert', 3000);
    }


    back() {
        this.props.history.goBack();
    }

    onChangeSwitchIsRequiredVerification(checked) {
        let value = 0;
        if(checked == true){
            value = -1;
        }
        let newMerchant = this.state.merchant;
        newMerchant.isRequiredVerification = value;
        this.setState({
            merchant : newMerchant
        })
    }

    onChangeSwitchIsRedeemOtp(checked) {
        let value = 0;
        if(checked == true){
            value = -1;
        }
        let newMerchant = this.state.merchant;
        newMerchant.isRedeemOtp = value;
        this.setState({
            merchant : newMerchant
        })
    }

    onConfirm() {
        this.props.resetStatus();
        if (this.state.msgType === "success") {
            this.props.history.goBack();
        } else {
            this.setState({
                msgShow: false
            })
        }
    }

    uploadImage = (file) => {
        let credential = this.props.authUser;
        credential.file = file;
        this.props.uploadImage(credential);
    };

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    changeCountry(value) {
        let request = {
            id: value
        };
        this.props.getListProvince(request);

        this.props.form.setFieldsValue({
            stateProvinceId: ''
        });
    }

    changeProvince(value) {
        let request = {
            id: value
        };
        this.props.getListCity(request);

        this.props.form.setFieldsValue({
            cityId: ''
        });
    }

    changeCurrency(value) {
        this.props.form.setFieldsValue({
            lookupDtlId: value
        });
    }

    changeCurrencyId(value) {
        this.props.form.setFieldsValue({
            currencyId: value
        });
    }

    changeList = (value) => {
        let newLabelType;
        if (value.target.value === 0) {
            newLabelType = 'Point Type';
        } else {
            newLabelType = 'Currency Type';
        }
        this.props.form.setFieldsValue({
            lookupDtlId: undefined
        });
        this.state.labelType = newLabelType;

        let request = {
            authToken: localStorage.getItem('a'),
            deviceId: localStorage.getItem('d'),
            userId: localStorage.getItem('u'),
            merchantId: localStorage.getItem('mt'),
            paramCurrencyPoint: value.target.value
        };
        this.props.getListCurrency(request);
    };

    handleCancel = () => this.setState({previewVisible: false});

    handleChange = ({fileList}) => this.setState({fileList});

    onChangeSwitch(checked) {
        let value = 0;
        if(checked === true){
            value = -1;
            this.setState({approvalMembershipTable: "block"})
        } else if (checked === false) {
            value = 0;
            this.setState({approvalMembershipTable: "none"})
        } else {
            this.setState({approvalMembershipTable: "none"})
        }
        this.setState({
            isApproval : value
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        let {loader, alertMessage, showMessage} = this.props;
        const {merchant, msgShow, msgType, msgContent, previewVisible, previewImage, fileList, labelType, logoPoint, selectedMemberFields, msgDelete, onDelete} = this.state;

        var statChecked = '';
        if(this.state.isApproval === -1){
            statChecked = true;
            this.state.approvalMembershipTable = 'block';
        }else if(this.state.isApproval === 0){
            statChecked = false;
            this.state.approvalMembershipTable = 'none'
        }

        let address = {
            addressLine1: '',
            countryId : '',
            country : '',
            provinceId: '',
            province: '',
            cityId: '',
            cityTown: '',
            postalCode: ''
        };

        let contacts = {
            contactFirstName: '',
            contactLastName: '',
            mobileNumber: '',
            emailAddress: ''
        };

        

        let optionCountry = [];
        this.props.listCountry.forEach((country, i) => {
            let option =
                <Option key={i} value={country.id}>{country.label}</Option>
            ;
            optionCountry.push(option);
        });

        let optionProvince = [];
        this.state.listProvince.forEach((province, i) => {
            let option =
                <Option key={i} value={province.id}>{province.label}</Option>
            ;
            optionProvince.push(option);
        });

        let optionCity = [];
        this.state.listCity.forEach((city, i) => {
            let option =
                <Option key={i} value={city.id}>{city.label}</Option>
            ;
            optionCity.push(option);
        });

        let optionCurrency = [];
        this.props.listCurrency.forEach((currency, i) => {
            let option =
                <Option key={i} value={currency.lookupDtlId}>{currency.description}</Option>;
            optionCurrency.push(option);
        });

        let optionCurrencyId = [];
        this.props.listCurrency.forEach((logoPoint, i) => {
            let option =
                <Option key={i} value={logoPoint.lookupDtlId}>{logoPoint.description}</Option>;
            optionCurrencyId.push(option);
        });

        let optionFieldName = [];
        this.state.selectedMemberFields.forEach((fieldName, i) => {
            let option =
                <Option key={i} value={fieldName.fieldName}>{fieldName.fieldName}</Option>;
            optionFieldName.push(option);
        });

        let optionfieldType = [];
            let option =
                <Option key={1} value={1}>Mandatory</Option>
                optionfieldType.push(option);
                option = <Option key={2} value={0}>Optional</Option>;
                optionfieldType.push(option);

            let optionStatus = [];
                let optionstatus =
                    <Option key={1} value={-1}>Activate</Option>
                    optionStatus.push(optionstatus);
                    optionstatus = 
                    <Option key={2} value={1}>Suspend</Option>;
                    optionStatus.push(optionstatus);
                    optionstatus = 
                    <Option key={3} value={4}>Delete</Option>;
                    optionStatus.push(optionstatus);

            let optionShowCard = [];
            let optionshowcard =
                <Option key={1} value={-1}>Yes</Option>
                optionShowCard.push(optionshowcard);
                optionshowcard = 
                <Option key={2} value={0}>No</Option>;
                optionShowCard.push(optionshowcard);

        //For Member Field
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        let newMemberColumns = [{
            title: 'Name',
            dataIndex: 'fieldName',
            width: '25%',
            editable: true,
        }, {
            title: 'Requirement',
            dataIndex: 'fieldType',
            width: '25%',
            editable: true,
        }, {
            title: 'Status',
            dataIndex: 'status',
            width: '25%',
            editable: true,
        },{
            title: 'Show Card',
            dataIndex: 'showCard',
            width: '25%',
            editable: true,
        }, {
            title: "Action",
            dataIndex: "",
            key: "action",
            render: (text, record) => (
                this.state.selectedMemberFields.length >= 1
                    ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;" >Delete</a>
                        </Popconfirm>
                    ) : null
            ),
        }];

        const columsAdditionalField = newMemberColumns.map((col) => {
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
                    dataOptionName: optionFieldName,
                    dataOptionType: optionfieldType,
                    dataOptionStatus: optionStatus,
                    dataOptionShowCard: optionShowCard,
                }),
            };
        });
        //End - For Role
        
        if (merchant.contacts !== undefined) {
            contacts = merchant.contacts[0];
        }

        if (merchant.address !== undefined) {
            address = merchant.address;
        }

        // if (labelType === '') {
            // labelType = merchant.paramCurrencyPoint === 0 ? 'Point Type' : 'Currency Type';
            // this.labelType = merchant.paramCurrencyPoint === 0 ? 'Point Type' : 'Currency Type';
        // }

        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <Card className="gx-card" title='Merchant'>
                <div>
                    {loader == true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                </div>
                <Form onSubmit={this.handleSubmit}>

                    <h5 className='gx-mb-3' style={{marginTop: '30px'}}>Profile</h5>
                    <div className='custom-box'>

                        <FormItem {...formItemLayout} label='Merchant Name'>
                            {getFieldDecorator('merchantName', {
                                rules: [{
                                    required: true,
                                    message: 'Please input merchant name'
                                }],
                                initialValue: merchant.merchantName
                            })(
                                <Input placeholder='Merchant Name'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Merchant Logo'>
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
                                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                                </Modal>
                            </div>
                        </FormItem>

                        <FormItem {...formItemLayout} label='Required Verification'>
                            {getFieldDecorator('isRequiredVerification', {
                                rules: [{
                                    required: true,
                                    message: 'Please input required verification',
                                }],
                                initialValue: merchant.isRequiredVerification == 0 ? false : true
                            })(
                                <Switch checkedChildren="Yes" unCheckedChildren="No"
                                    onChange={this.onChangeSwitchIsRequiredVerification} checked={merchant.isRequiredVerification === -1}
                                />
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Required Otp For Redeem'>
                            {getFieldDecorator('isRedeemOtp', {rules: [{
                                    required: true,
                                    message: 'Please input required verification',
                                }],
                                initialValue: merchant.isRedeemOtp == 0 ? false : true
                            })(
                                <Switch checkedChildren="Yes" unCheckedChildren="No"
                                    onChange={this.onChangeSwitchIsRedeemOtp} checked={merchant.isRedeemOtp === -1}
                                />
                            )}
                        </FormItem>

                        <FormItem label='Trigger Issuing Point Referral On' style={{marginLeft: '15px'}}>
                            {getFieldDecorator('issuingReferral', {
                                rules: [{
                                    required: true,
                                    message: 'Please select issuing point referral'
                                }],
                                initialValue: merchant.issuingReferral
                            })(
                                <RadioGroup>
                                    <Radio value={0}> Register </Radio>
                                    <Radio value={1}> Verification Member </Radio>
                                </RadioGroup>
                            )}
                        </FormItem>

                        <FormItem label='Trigger Display On Payment' style={{marginLeft: '15px'}}>
                            {getFieldDecorator('paramCurrencyPoint', {
                                rules: [{
                                    required: true,
                                    message: 'Please select currency point'
                                }],
                                initialValue: merchant.paramCurrencyPoint
                            })(
                                <RadioGroup onChange={this.changeList}>
                                    <Radio value={0}> Point </Radio>
                                    <Radio value={-1}> Currency </Radio>
                                </RadioGroup>
                            )}
                        </FormItem>

                        <FormItem id='type' {...formItemLayout} label={labelType !== '' ? labelType : merchant.paramCurrencyPoint === 0 ? 'Point Type' : 'Currency Type'}>
                            {getFieldDecorator('lookupDtlId', {
                                // rules: [{
                                //     required: true,
                                //     message: 'Please select your lookupDtlId!'
                                // }],

                                initialValue: logoPoint.lookupDtlId
                            })(
                                <Select
                                    onChange={this.changeCurrency.bind(this)}
                                    placeholder={labelType !== '' ? labelType : merchant.paramCurrencyPoint === 0 ? 'Point Type' : 'Currency Type'}>
                                    {optionCurrency}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem id='type' {...formItemLayout} label='Currency Merchant'>
                            {getFieldDecorator('currencyId', {
                                // rules: [{
                                //     required: true,
                                //     message: 'Please select your currency!'
                                // }],
                                initialValue: merchant.currencyId
                            })(
                                <Select
                                    onChange={this.changeCurrencyId.bind(this)}
                                    // disabled={this.props.match.params.type === 'Point' ? true : merchant.paramCurrencyPoint === 0 || merchant.paramCurrencyPoint === undefined}
                                    placeholder={
                                        <div>
                                            <span style={{marginLeft: '5px'}}>Currency</span>
                                        </div>
                                    }>
                                    {optionCurrencyId}
                                </Select>
                            )}
                        </FormItem>


                    </div>

                    <h5 className='gx-mb-3' style={{marginTop: '30px'}}>Address</h5>
                    <div className='custom-box'>

                        <FormItem {...formItemLayout} label='Country'>
                            {getFieldDecorator('countryId', {
                                rules: [{
                                    required: true,
                                    message: 'Please input Country'
                                }],
                                initialValue: address.country
                            })(
                                <Select
                                    onChange={this.changeCountry.bind(this)}
                                    placeholder={
                                        <div>
                                            <div style={{display: 'inline-block'}}
                                                 className="icon icon-map-drawing"></div>
                                            <span style={{marginLeft: '5px'}}>Country</span>
                                        </div>
                                    }
                                >
                                    {optionCountry}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Province'>
                            {getFieldDecorator('stateProvinceId', {
                                rules: [{
                                    required: true,
                                    message: 'Please input province'
                                }],
                                initialValue: address.provinceId
                            })(
                                <Select
                                    onChange={this.changeProvince.bind(this)}
                                    placeholder={
                                        <div>
                                            <div style={{display: 'inline-block'}}
                                                 className="icon icon-map-drawing"></div>
                                            <span style={{marginLeft: '5px'}}>Province</span>
                                        </div>
                                    }
                                >
                                    {optionProvince}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='City'>
                            {getFieldDecorator('cityId', {
                                rules: [{
                                    required: true,
                                    message: 'Please input city'
                                }],
                                initialValue: address.cityId
                            })(
                                <Select placeholder={
                                    <div>
                                        <div style={{display: 'inline-block'}} className="icon icon-navigation"></div>
                                        <span style={{marginLeft: '5px'}}>City</span>
                                    </div>
                                }
                                >
                                    {optionCity}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Address'>
                            {getFieldDecorator('address', {
                                rules: [{
                                    required: true,
                                    message: 'Please input address'
                                }],
                                initialValue: address.addressLine1
                            })(
                                <Input placeholder='Address'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Postal Code'>
                            {getFieldDecorator('postalCode', {
                                rules: [{required: true, message: 'Please input postal code'}],
                                initialValue: address.postalCode

                            })(
                                <Input placeholder="Postal Code"/>
                            )}
                        </FormItem>

                    </div>

                    <h5 className='gx-mb-3' style={{marginTop: '30px'}}>Contact</h5>
                    <div className='custom-box'>
                        <FormItem {...formItemLayout} label='First Name'>
                            {getFieldDecorator('contactFirstName', {
                                rules: [{
                                    required: true,
                                    message: 'Please input first name'
                                }],
                                initialValue: contacts.contactFirstName
                            })(
                                <Input placeholder='First Name'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Last Name'>
                            {getFieldDecorator('contactLastName', {
                                rules: [{
                                    required: true,
                                    message: 'Please input last name'
                                }],
                                initialValue: contacts.contactLastName
                            })(
                                <Input placeholder='Last Name'/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Phone Number'>
                            {getFieldDecorator('mobileNumber', {
                                rules: [{
                                    required: true,
                                    message: 'Please input phone number'
                                }],
                                initialValue: contacts.mobileNumber
                            })(
                                <Input placeholder='Phone Number' disabled={this.props.match.params.type === "isDeposit" ? true : merchant.isDeposit === -1}/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label='Web Page'>
                            {getFieldDecorator('merchantWebsite', {
                                rules: [{
                                    required: false
                                }],
                                initialValue: merchant.merchantWebsite
                            })(
                                <Input placeholder='Web Page'/>
                            )}
                        </FormItem>
                    </div>

                    <nav style={{display: "flex", marginTop: '30px'}}>
                        <h5 className='gx-mb-3'>Need Approval Membership</h5>
                        <Switch style={{marginLeft: '10px'}} checkedChildren="Yes" unCheckedChildren="No"
                            onChange={this.onChangeSwitch.bind(this)} checked={statChecked}
                        />
                    </nav>
                    <nav
                        style={{
                        width: "100%",
                        display: this.state.approvalMembershipTable,
                        }}
                    >
                        <Button
                        onClick={this.handleAdd}
                        type="primary"
                        style={{
                            marginBottom: 16,
                        }}
                        >
                        Add Data Detail
                        </Button>
                        <Table 
                            style={{display: this.state.approvalMembershipTable}}
                            className="gx-table-responsive"
                            rowClassName={() => 'editable-row'}
                            components={components}
                            bordered
                            dataSource={selectedMemberFields}
                            columns={columsAdditionalField}
                        />
                    </nav>

                    
                    <FormItem {...formTailLayout} style={{marginTop: '30px'}}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button type="default" onClick={this.back}>Back</Button>
                    </FormItem>

                </Form>
                <SweetAlert success={msgType === 'success' ? true : false} 
                            danger={msgType === 'danger' ? true : false}
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

    handleCancel = () => this.setState({ previewVisible: false })

    changeType = (value) => {
        const { record, handleSave } = this.props;
        record.fieldType = value;
        handleSave(record, value);
    }

    changeStatus = (value) => {
        const { record, handleSave } = this.props;
        record.status = value
        handleSave(record, value);
    }

    changeShowCard = (value) => {
        console.log(value,'showcard')
        const { record, handleSave } = this.props;
        record.showCard = value
        handleSave(record, value);
    }

    render() {
        const { editing } = this.state;
        const {
            dataOptionName,
            dataOptionType,
            dataOptionStatus,
            dataOptionShowCard,
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
                                dataIndex === 'fieldName' ? 
                                    (
                                        dataIndex === 'fieldName' ? (
                                            <FormItem style={{ margin: 0 }}>
                                                {form.getFieldDecorator(dataIndex, {
                                                    rules: [{
                                                        required: true,
                                                        message: `${title} is required.`,
                                                    }],
                                                    initialValue: record[dataIndex],
                                                })(
                                                    <Input
                                                        style={{width:'250px'}}
                                                        ref={node => (this.input = node)}
                                                        onPressEnter={this.save}
                                                        onBlur={this.save}
                                                    />
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
                                                    <Input
                                                        ref={node => (this.input = node)}
                                                        onPressEnter={this.save}
                                                        onBlur={this.save}
                                                    />
                                                )}
                                            </FormItem>
                                        )
                                    ) : 
                                    dataIndex === 'fieldType' ?  (
                                        dataIndex === 'fieldType' ? (
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
                                                    <Select style={{width:'250px'}}
                                                            onChange={this.changeType.bind(this)}>
                                                        {dataOptionType}
                                                    </Select>
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
                                                    <Input
                                                        ref={node => (this.input = node)}
                                                        min={1}
                                                        onPressEnter={this.save}
                                                        onBlur={this.save}
                                                    />
                                                )}
                                            </FormItem>
                                        ) 
                                    ) : // else if 
                                    dataIndex === 'status' ? (
                                        dataIndex === 'status' ? (
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
                                                    <Select style={{width:'250px'}}
                                                            onChange={this.changeStatus.bind(this)}
                                                            >
                                                        {dataOptionStatus}
                                                    </Select>
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
                                                    <Input
                                                        ref={node => (this.input = node)}
                                                        min={1}
                                                        onPressEnter={this.save}
                                                        onBlur={this.save}
                                                    />
                                                )}
                                            </FormItem>
                                        )
                                    ) : 
                                    dataIndex === 'showCard' ?   (
                                        dataIndex === 'showCard' ? (
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
                                                   <Select style={{width:'250px'}}
                                                           onChange={this.changeShowCard.bind(this)}
                                                           >
                                                       {dataOptionShowCard}
                                                   </Select>
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
                                                   <Input
                                                       ref={node => (this.input = node)}
                                                       min={1}
                                                       onPressEnter={this.save}
                                                       onBlur={this.save}
                                                   />
                                               )}
                                           </FormItem>
                                       )
                                   ) : ""
                                ) 
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

const mapStateToProps = ({auth, merchantState, commonState}) => {
    const {authUser} = auth;
    const {filePath, listCountry, listProvince, listCity} = commonState;
    const {merchant, currency, logoPoint, listCurrency, updateSuccess, updateFailed, updateDeleteSuccess, updateDeleteFailed, loader, alertMessage, showMessage} = merchantState;
    return {
        authUser,
        merchant,
        currency,
        logoPoint,
        updateSuccess,
        updateFailed,
        updateDeleteSuccess,
        updateDeleteFailed,
        filePath,
        listCurrency,
        listCountry,
        listProvince,
        listCity,
        loader,
        alertMessage,
        showMessage
    }
};

export default connect(mapStateToProps, {
    viewMerchant,
    getListCurrency,
    getCurrencyMerchant,
    updateMerchant,
    resetStatus,
    uploadImage,
    resetFilePath,
    getListCountry,
    getListProvince,
    getListCity
})(Form.create()(EditProfile));


