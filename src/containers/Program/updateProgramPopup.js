import React, {Component} from "react";
import {Form, Table} from "antd";


const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 14},
};

const formListLayout = {
    labelCol: {xs: 24, sm: 6},
    wrapperCol: {xs: 24, sm: 18},
};

const viewColumns =  [{
            title: 'Tier Name',
            dataIndex: 'tierDetailName',
            key: 'tierDetailName',
        }];


class UpdateProgramPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRowKeys : [],
        }
    }

    componentWillMount() {
        let selected = [];

        this.props.program.tierDetails.forEach((rewardTier, j) =>{
            this.props.tier.forEach((detail, i) =>{
                if(detail.tierDetailId === rewardTier.tierDetailId){
                    selected.push(i);
                    return;
                }
            })
        })

        this.setState({
            selectedRowKeys : selected,
        });
    }

    onChangeSelector = (selectedRow, selectedData) =>{
        this.setState({
            selectedRowKeys : selectedRow
        })

        let program = [];
        program.programName = this.props.program.programName;
        program.programId = this.props.program.programId;
        program.tierDetails = selectedData;

        this.props.update(program);
    }

    render(){
        let viewDetail = [];
        if(this.props.program.tierDetails != undefined){
            this.props.program.tierDetails.forEach((tier, i)=>{
                tier.key = tier.tierDetailId;
                viewDetail.push(tier);
            })
        }
        const {programName, programId} = this.props.program;
        const {selectedRowKeys} = this.state;


        const columns = [{
            title: 'Tier Name',
            dataIndex: 'tierName'
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

        return(
            <div className='custom-table ant-row'>
                <div className={'ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24 custom-modal-tier-title'}>
                    {programName}
                </div>
                <Table className="gx-table-responsive ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-24 ant-col-xl-12"
                       pagination = {false} columns={viewColumns}
                       bordered
                       dataSource={viewDetail}/>
                <Table className="gx-table-responsive ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-24 ant-col-xl-12"
                       rowSelection={rowSelection}
                       bordered
                       pagination = {false}
                       dataSource={this.props.tier}
                       columns={columns}
                />
            </div>
        );

    }

}

export default UpdateProgramPopup;