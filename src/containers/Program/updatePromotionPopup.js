import React, {Component} from "react";
import {Form, InputNumber, Select, Table} from "antd";

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const viewColumns =  [{
            title: 'Tier Name',
            dataIndex: 'tierDetailName',
            key: 'tierDetailName',
        },{title: 'Loyalty Factor',
            dataIndex: 'loyaltyFactor',
            key: 'loyaltyFactor',
        }];


class UpdatePromotionPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            selectedRowKeys : [],
        }

    }

    componentWillMount(){
        let selectedTier = [];
        let dataWithLoyaltyFactor = [];

        if(this.props.promotion.tierDetails != undefined){
            this.props.tier.forEach((detail, i) =>{
                let wLoyaltyFactor = [];
                wLoyaltyFactor.key = i;
                wLoyaltyFactor.tierName = detail.tierName;
                wLoyaltyFactor.tierDetailId = detail.tierDetailId;
                wLoyaltyFactor.loyaltyFactor = 1;
                this.props.promotion.tierDetails.forEach((promoTier, j) =>{
                    if(detail.tierDetailId === promoTier.tierDetailId){
                        wLoyaltyFactor.loyaltyFactor = promoTier.loyaltyFactor;
                        selectedTier.push(i);
                    }
                })
                dataWithLoyaltyFactor.push(wLoyaltyFactor);
            })

            this.setState({
                selectedRowKeys : selectedTier,
                dataSource: dataWithLoyaltyFactor
            });
        }
    }

    onChangeSelector(selectedRowKeys, selectedData){
        this.updateTier(selectedRowKeys, this.state.dataSource);
    }

    handleSaveTier = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });

        this.updateTier(this.state.selectedRowKeys, newData);
    }

    updateTier = (selectedRowKeys, dataSource) => {
        let promotionTiers = [];
        promotionTiers.promotionName = this.props.promotion.promotionName;
        promotionTiers.promotionId = this.props.promotion.promotionId;
        promotionTiers.tierDetails = [];
        selectedRowKeys.forEach((index,i)=>{
            let promotion = Object.assign({}, dataSource[index]);
            // console.log(promotion);
            promotionTiers.tierDetails.push(promotion);
        })

        this.props.update(promotionTiers);

        this.setState({
            selectedRowKeys : selectedRowKeys,
            dataSource: dataSource
        })
    }

    render(){
        const {promotionName, promotionId} = this.props.promotion;
        const {selectedRowKeys, dataSource} = this.state;

        let viewDetail = [];
        if(this.props.promotion.tierDetails != undefined){
            this.props.promotion.tierDetails.forEach((detail, i)=>{
                detail.key = detail.tierDetailId;
                viewDetail.push(detail);
            })
        }


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

        return(
            <div className='custom-table ant-row'>
                <div className={'ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 custom-modal-tier-title'}>
                    {promotionName}
                </div>
                <Table className="gx-table-responsive ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-24 ant-col-xl-12"
                       pagination = {false} columns={viewColumns}
                       bordered
                       dataSource={viewDetail}/>
                <Table className="gx-table-responsive ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-24 ant-col-xl-12"
                       rowSelection={rowSelection}
                       components={componentsTier}
                       bordered
                       pagination = {false}
                       dataSource={dataSource}
                       columns={columnsTier}
                />
            </div>
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
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

export default UpdatePromotionPopup;