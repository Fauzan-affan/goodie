import React, {Component} from "react";
import moment from 'moment';
import {currency} from '../../constants/Util';
import {connect} from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import RedeemFreq from '../../constants/RedeemFreq';
import {NotificationContainer, NotificationManager} from "react-notifications";
import {
    getTierAndProgram,
    updateProgram,
    createProgram,
    resetStatus
} from "appRedux/actions/Program";
import {
    getTierDetails
} from "appRedux/actions/Tier";
import {
    searchProducts,
    clearSelectProduct
} from "appRedux/actions/Product";
import {
    viewMerchant,
    getCurrency
} from "appRedux/actions/Merchant";
import {Button, Card, Form, Input, InputNumber, Select, DatePicker, Table} from "antd";
import CKEditor from "react-ckeditor-component";


const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;

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
            program: [],
            selectedRowKeys: [],
            dataSource: [],
            productList: [],
            selectedExternal: [],
            msgContent: '',
            msgType: '',
            msgShow: false,
        };

        this.onConfirm = this.onConfirm.bind(this);
        this.back = this.back.bind(this);
        this.onChangeDatePicker = this.onChangeDatePicker.bind(this);
        this.onChangeSelector = this.onChangeSelector.bind(this);

    }

    componentWillMount() {
        let credential = this.props.authUser;

        if (this.props.match.params.type === 'update') {
            credential.id = this.props.match.params.id;
            this.props.getTierAndProgram(credential);
        } else {
            this.props.getTierDetails(credential);
            let program = [];
            this.setState({
                program: program
            })
        }

        if (this.props.match.params.source === 'internal') {
            credential.isExternal = 0;
            credential.productName = '';
            this.props.searchProducts(credential);
        }

        // for view merchant in program
        this.props.viewMerchant(credential);
    }

    componentWillReceiveProps(nextProps) {

        // for get param currency

        if (nextProps.merchant != undefined && nextProps.merchant != this.props.merchant) {
            let request = {
                authToken: localStorage.getItem('a'),
                deviceId: localStorage.getItem('d'),
                userId: localStorage.getItem('u'),
                merchantId: localStorage.getItem('mt'),
                paramCurrencyPoint: nextProps.merchant.paramCurrencyPoint
            };
            this.props.getCurrency(request);
        }

        // end for get param currency

        if (nextProps.tierDetails.tierDetails !== undefined) {

            let dataSourceRaw = [];
            let totalRec = 0;

            nextProps.tierDetails.tierDetails.forEach((detail, i) => {
                let tierDetail = {};
                tierDetail.key = i;
                tierDetail.tierName = detail.tierName;
                tierDetail.tierDetailId = detail.tierDetailId;
                dataSourceRaw.push(tierDetail);
                totalRec++;
            });

            this.setState({
                dataSource: dataSourceRaw
            })
        }

        if (this.props.match.params.type === 'update') {
            if (nextProps.program !== undefined) {

                let selected = [];
                this.state.dataSource.forEach((detail, i) => {
                    nextProps.program.tier.forEach((rewardTier, j) => {
                        if (detail.tierName === rewardTier) {
                            selected.push(i);
                        }
                    })
                });

                let selectedProdEx = [];

                if (this.props.match.params.source === 'external') {
                    selectedProdEx = {
                        productId: nextProps.program.productId,
                        productName: nextProps.program.productName,
                        amount: nextProps.program.amount,
                        fee: nextProps.program.fee,
                        merchantName: nextProps.program.merchantProduct
                    }
                }

                this.setState({
                    program: nextProps.program,
                    selectedRowKeys: selected,
                    selectedExternal: selectedProdEx
                    // count: totalRec + 1
                });
            }
        } else {
            let newProgram = this.state.program;
            if (this.props.match.params.source == 'internal') {
                newProgram.isExternalProduct = 0;
            } else {
                newProgram.isExternalProduct = 1;
            }

            this.setState({
                program: newProgram
            });
        }

        if (nextProps.listProducts !== undefined && this.props.match.params.source === 'internal') {

            let productListRaw = [];
            let totalRec = 0;

            nextProps.listProducts.forEach((product, i) => {
                product.key = i;
                productListRaw.push(product);
                totalRec++;
            });

            this.setState({
                productList: productListRaw
            })
        }

        if (nextProps.selectedProduct !== null && this.props.match.params.source === 'external') {
            let newProgram = this.state.program;
            newProgram.productId = nextProps.selectedProduct.productId;

            this.setState({
                selectedExternal: nextProps.selectedProduct,
                program: newProgram
            });

            this.props.clearSelectProduct();
        }

        if (nextProps.updateSuccess && !nextProps.updateFailed) {
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

        if (nextProps.createSuccess && !nextProps.createFailed) {
            this.setState({
                msgContent: 'Created Successfully',
                msgShow: true,
                msgType: 'success'
            })
        } else if (!nextProps.createSuccess && nextProps.createFailed) {
            this.setState({
                msgContent: 'Create failed',
                msgShow: true,
                msgType: 'danger'
            })
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let error = false;

                let tierArray = [];
                this.state.selectedRowKeys.forEach((index, i) => {
                    tierArray.push(this.state.dataSource[index].tierDetailId);
                });

                let request = this.props.authUser;
                values.description = this.state.program.description;
                values.termCondition = this.state.program.termCondition;
                values.expiredDate = this.state.program.expiredDate;
                values.tier = tierArray;
                values.isExternalProduct = this.state.program.isExternalProduct;
                request.data = values;

                if (values.tier.length == 0) {
                    this.errorNotification('Please select minimal 1 tier');
                    error = true;
                    return;
                }

                if (!error) {
                    if (this.props.match.params.type === 'update') {
                        this.props.updateProgram(request);
                    } else {
                        this.props.createProgram(request);
                    }
                }

            }
        });
    };

    errorNotification(message) {
        return NotificationManager.error(message, 'Alert', 3000);
    }


    back() {
        this.props.history.goBack();
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

    onChangeDatePicker(date, dateString) {
        if (dateString !== undefined) {
            let newProgram = this.state.program;
            newProgram.expiredDate = dateString;
            this.setState({
                program: newProgram
            });
        }
    }

    onChangeSelector(selectedData) {
        this.setState({
            selectedRowKeys: selectedData
        })
    }

    onChange(evt) {
        const newContent = evt.editor.getData();
        let newProgram = this.state.program;
        newProgram.description = newContent;
        this.setState({
            program: newProgram
        })
    }


    onChange1(evt) {
        const newContent1 = evt.editor.getData();
        let newProgram1 = this.state.program;
        newProgram1.termCondition = newContent1;
        this.setState({
            program: newProgram1
        })
    }

    onChangePoint(value) {
        // console.log('changed', value);
    }

    render() {
        if (this.props.selectedProduct == null &&
            this.state.selectedExternal.length == 0 &&
            this.props.match.params.source === 'external') {
            // this.props.history.goBack();
        }

        const {getFieldDecorator} = this.props.form;
        let {program, programTrigger} = this.state;
        const {msgShow, msgType, msgContent, dataSource, productList, selectedRowKeys, selectedExternal} = this.state;

        let options = [];
        RedeemFreq.values().forEach((freq, i) => {
            let option = [];
            option.push(
                <Option key={i} value={freq.value}>{freq.label}</Option>
            );
            options.push(option);
        });

        let optionsProduct = [];
        let productInfo = [];

        if (this.props.match.params.source === 'internal') {
            productList.forEach((product, i) => {
                let option = [];
                option.push(
                    <Option key={i} value={product.productId}>{product.productName}</Option>
                );
                optionsProduct.push(option);
            });
        } else {
            let option = [];
            option.push(
                <Option key={1} value={selectedExternal.productId}>{selectedExternal.productName}</Option>
            );
            optionsProduct.push(option);

            let bp = (selectedExternal.amount == null ? 0 : selectedExternal.amount);
            let fe = (selectedExternal.fee == null ? 0 : selectedExternal.fee);

            let price =
                <FormItem {...formItemLayout} label={'Price'} key={'price'}>
                    {/*<span className='ant-form-text'>{currency(bp + fe)}</span>*/}
                    <span className='ant-form-text'>{currency(bp + fe, this.props.merchant.currency)}</span>
                </FormItem>


            let merchant =
                <FormItem {...formItemLayout} label={'Merchant Product'} key={'merchant'}>
                    <span className='ant-form-text'>{selectedExternal.merchantName}</span>
                </FormItem>


            productInfo.push(price);
            productInfo.push(merchant);
        }


        const columns = [{
            title: 'Tier Name',
            dataIndex: 'tierName'
        }]

        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.onChangeSelector(selectedRowKeys);
            },
            getCheckboxProps: record => ({
                name: record.name,
            }),
        };

        return (
            <Card className="gx-card" title='Reward'>
                <Form onSubmit={this.handleSubmit}>

                    <FormItem {...formItemLayout} label='Reward Code'>
                        {getFieldDecorator('programCode', {
                            rules: [{
                                required: true,
                                message: 'Please input reward code'
                            }],
                            initialValue: program.programCode
                        })(
                            <Input placeholder='Reward Code'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Reward Name'>
                        {getFieldDecorator('programName', {
                            rules: [{
                                required: true,
                                message: 'Please input reward name'
                            }],
                            initialValue: program.programName
                        })(
                            <Input placeholder='Reward Name'/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Expired Date'>
                        {getFieldDecorator('expiredDate', {
                            rules: [{
                                required: true,
                                message: 'Please input expired date'
                            }],
                            initialValue: program.expiredDate ? moment(program.expiredDate, 'YYYY/MM/DD') : ''

                        })(
                            <DatePicker className="gx-mb-3 gx-w-100" onChange={this.onChangeDatePicker}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Applicable Tier'>
                        <div style={{marginBottom: '20px'}}>
                            <Table
                                className="gx-table-responsive"
                                rowSelection={rowSelection}
                                bordered
                                pagination={false}
                                dataSource={dataSource}
                                columns={columns}
                            />
                        </div>
                    </FormItem>

                    <FormItem {...formItemLayout} label='Redeem Frequency'>
                        {getFieldDecorator('redeemFrequency', {
                            initialValue: program.redeemFrequency,
                            rules: [{
                                required: true,
                                message: 'Please input redeem frequency',
                            }],
                        })(
                            <Select style={{width: '50%'}}>
                                {options}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Product'>
                        {getFieldDecorator('productId', {
                            initialValue: program.productId,
                            rules: [{
                                required: true,
                                message: 'Please input product',
                            }],
                        })(
                            <Select style={{width: '50%'}}>
                                {optionsProduct}
                            </Select>
                        )}
                    </FormItem>

                    {productInfo}

                    <FormItem {...formItemLayout} label='Point Required'>
                        {getFieldDecorator('pointRequired', {
                            rules: [{
                                required: true,
                                message: 'Please input base point required',
                            }],
                            initialValue: program.pointRequired ? program.pointRequired : 0
                        })(
                            <InputNumber min={0}
                                style={{width: '20%'}}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                onChange={this.onChangePoint.bind(this)}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label='Description'>

                        <CKEditor
                            activeClass="p10"
                            content={program.description}
                            events={{
                                'change': this.onChange.bind(this)
                            }}
                        />

                    </FormItem>

                    <FormItem {...formItemLayout} label='Term Condition'>

                        <CKEditor
                            activeClass="p10"
                            content={program.termCondition}
                            events={{
                                'change': this.onChange1.bind(this)
                            }}
                        />

                    </FormItem>


                    <FormItem {...formTailLayout}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button type="default" onClick={this.back}>Back</Button>
                    </FormItem>

                </Form>
                <SweetAlert success={msgType === 'success' ? true : false} danger={msgType === 'danger' ? true : false}
                            show={msgShow} title={msgContent} onConfirm={this.onConfirm}>
                </SweetAlert>
                <NotificationContainer/>
            </Card>
        );

    }
}

const mapStateToProps = ({auth, programState, tierState, productState, merchantState}) => {
    const {authUser} = auth;
    const {program, updateSuccess, updateFailed, updateData, createSuccess, createFailed, createData} = programState
    const {listProducts, selectedProduct} = productState
    const {tierDetails} = tierState
    const {merchant, currency} = merchantState;
    return {
        authUser,
        program,
        updateSuccess,
        updateFailed,
        updateData,
        createSuccess,
        createFailed,
        createData,
        tierDetails,
        listProducts,
        selectedProduct,
        merchant,
        currency
    }
};

export default connect(mapStateToProps, {
    getTierAndProgram,
    updateProgram,
    createProgram,
    resetStatus,
    getTierDetails,
    searchProducts,
    clearSelectProduct,
    getCurrency,
    viewMerchant
})(Form.create()(CreateUpdateProgram));


