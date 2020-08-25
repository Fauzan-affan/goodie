import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
import {connect} from "react-redux";
import {
    viewProgram
} from "appRedux/actions/Program";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";
import RedeemFreq from '../../constants/RedeemFreq';

class ViewProgram extends Component {
    constructor(props) {
        super(props);

        this.state = {
            program : this.props.program
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewProgram(credential);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.program !== this.props.program){
            this.setState({
                program : nextProps.program
            });
        }
    }

    back(){
        this.props.history.goBack();
    }


    render() {

        let contBuilder1 = {};
        let contBuilder2 = {};
        let content = [];
        let titleView = '';
        let {loader, alertMessage, showMessage} = this.props;


        titleView = this.state.program.programCode;

        //set key
        let details = [];
        if(this.state.program.tier.length > 0){
            this.state.program.tier.forEach((detail, i) => {
                let tierDetail = {
                    key : i,
                    name : detail
                }

                details.push(tierDetail);
            });
        }else{
            details = null;
        }

        let externalInfo = {};
        if(this.state.program.isExternalProduct === -1){
            externalInfo = [{
                key : 'merchantProduct',
                label : 'Merchant Product',
                value : this.state.program.merchantProduct,
                type : 'text'
            },
            {
                key : 'amount',
                label : 'Amount',
                value : this.state.program.amount,
                type : 'text'
            },
            {
                key : 'fee',
                label : 'Fee',
                value : this.state.program.fee,
                type : 'text'
            }];
        }

        content =
            [{
                key : 'programCode',
                label : 'Reward Code',
                value : this.state.program.programCode,
                type : 'text'
            },
            {
                key : 'programName',
                label : 'Reward Name',
                value : this.state.program.programName,
                type : 'text'
            },
            {
                key : 'expiredDate',
                label : 'Expired Date',
                value : this.state.program.expiredDate,
                type : 'text'
            },
            {
                key : 'productName',
                label : 'Product Name',
                value : this.state.program.productName,
                type : 'text'
            },
            {
                key : 'isExternalProduct',
                label : 'External Product',
                value : this.state.program.isExternalProduct === 0 ? 'No' : 'Yes',
                type : 'text'
            }];

        contBuilder2 =
            [{
                key : 'tier',
                label : 'Tier',
                listData : details,
                type : 'list partial',
                columns : [{
                    title: 'Tier Name',
                    dataIndex: 'name',
                    key: 'name',
                }]
            },
            {
                key : 'redeemFrequency',
                label : 'Redeem Frequency',
                value : RedeemFreq.getLabel(this.state.program.redeemFrequency),
                type : 'text'
            },
            {
                key : 'pointRequired',
                label : 'Point Required',
                value : this.state.program.pointRequired,
                type : 'text'
            },
            {
                key : 'description',
                label : 'Description',
                value : this.state.program.description,
                type : 'html'
            },
            {
                key : 'termCondition',
                label : 'Term Condition',
                value : this.state.program.termCondition,
                type : 'html'
            }];

        Array.prototype.push.apply(content, externalInfo);
        Array.prototype.push.apply(content, contBuilder2);

        return(
            <div>
                <div>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                </div>
                {loader === false ?
                    <ViewForm
                        component={content}
                        title={titleView}
                        onBack = {this.back.bind(this)}
                    />
                    : ''}
            </div>
        );

    }


}

const mapStateToProps = ({auth, programState}) => {
    const {authUser} = auth;
    const {program, loader, alertMessage, showMessage} = programState
    return {authUser, program, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewProgram})(ViewProgram);


