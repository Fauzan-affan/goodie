import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
import {connect} from "react-redux";
import {
    viewRule
} from "appRedux/actions/Rules";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";

class ViewRule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            basicRule : this.props.basicRule,
            referralRule : this.props.referralRule,
            customRule : this.props.customRule
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.type = this.props.match.params.type;
        credential.id = this.props.match.params.id;
        this.props.viewRule(credential);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.basicRule !== this.props.basicRule){
            this.setState({
                basicRule : nextProps.basicRule
            });
        }

        if(nextProps.referralRule !== this.props.referralRule){
            this.setState({
                referralRule : nextProps.referralRule
            });
        }

        if(nextProps.customRule !== this.props.customRule){
            this.setState({
                customRule : nextProps.customRule
            });
        }
    }

    back(){
        this.props.history.goBack();
    }


    render() {
        let content = {};
        let titleView = '';
        let {loader, alertMessage, showMessage} = this.props;

        if(this.props.match.params.type === 'basic'){
            titleView = 'Basic Rule';

            //set key
            let details = [];
            if(this.state.basicRule.basicRuleDetailList.length > 0){
                this.state.basicRule.basicRuleDetailList.forEach((detail, i) => {
                    detail.key = detail.productCode;
                    details.push(detail);
                });
            }else{
                details = null;
            }

            content = [
                {
                    key : 'basicRuleName',
                    label : 'Rule Name',
                    value : this.state.basicRule.basicRuleName,
                    type : 'text'
                },
                {
                    key : 'basicRuleDesc',
                    label : 'Rule Description',
                    value : this.state.basicRule.basicRuleDesc,
                    type : 'text'
                },
                {
                    key : 'basicRuleType',
                    label : 'Rule Trigger',
                    value : this.state.basicRule.basicRuleType,
                    type : 'text'
                },
                {
                    key : 'baseLoyaltyDiscount',
                    label : 'Base Loyalty Discount',
                    value : this.state.basicRule.baseLoyaltyDiscount,
                    type : 'text'
                },
                {
                    key : 'baseLoyaltyPoint',
                    label : 'Base Loyalty Point',
                    value : this.state.basicRule.baseLoyaltyPoint,
                    type : 'text'
                },
                {
                    key : 'amountReq',
                    label : 'For Each Amount Of',
                    value : this.state.basicRule.amountReq,
                    type : 'text'
                },
                {
                    key : 'capPerTrx',
                    label : 'Maximum Points',
                    value : this.state.basicRule.capPerTrx,
                    type : 'text'
                },
                {
                    key : 'basicRuleDetailList',
                    label : 'Rule For Specific Product',
                    listData : details,
                    type : 'list partial',
                    columns : [{
                        title: 'Product Code',
                        dataIndex: 'productCode',
                        key: 'productCode',
                    }, {
                        title: 'Product Name',
                        dataIndex: 'productName',
                        key: 'productName',
                    }, {
                        title: 'Base Loyalty Discount',
                        dataIndex: 'baseLoyaltyDiscount',
                        key: 'baseLoyaltyDiscount',
                    }, {
                        title: 'Base Loyalty Point',
                        dataIndex: 'baseLoyaltyPoint',
                        key: 'baseLoyaltyPoint',
                    }, {
                        title: 'For Each Amount Of',
                        dataIndex: 'amountReq',
                        key: 'amountReq',
                    }, {
                        title: 'Maximum Points',
                        dataIndex: 'capPerTrx',
                        key: 'capPerTrx',
                    }]
                }
            ]

        }else if(this.props.match.params.type === 'referral'){
            titleView = 'Referral Rule';

            //set key
            let details = [];
            if(this.state.referralRule.referralRuleDetail.length > 0){
                this.state.referralRule.referralRuleDetail.forEach((detail, i) => {
                    detail.key = i;
                    details.push(detail);
                });
            }else{
                details = null;
            }

            content = [
                {
                    key : 'referralRuleName',
                    label : 'Rule Name',
                    value : this.state.referralRule.referralRuleName,
                    type : 'text'
                },
                {
                    key : 'referralRuleDesc',
                    label : 'Rule Description',
                    value : this.state.referralRule.referralRuleDesc,
                    type : 'text'
                },
                {
                    key : 'refereePoint',
                    label : 'Follower Point',
                    value : this.state.referralRule.refereePoint,
                    type : 'text'
                },
                {
                    key : 'termAndCondition',
                    label : 'Term And Condition',
                    value : this.state.referralRule.termAndCondition,
                    type : 'text'
                },
                {
                    key : 'referralRuleDetail',
                    label : 'Referrer Point',
                    listData : details,
                    type : 'list partial',
                    columns : [{
                        title: 'Minimum Reference',
                        dataIndex: 'minReference',
                        key: 'minReference',
                    }, {
                        title: 'Maximum Reference',
                        dataIndex: 'maxReference',
                        key: 'maxReference',
                    }, {
                        title: 'Point',
                        dataIndex: 'point',
                        key: 'point',
                    }]
                }
            ]

        }else if(this.props.match.params.type === 'custom'){
            titleView = 'Custom Rule';

            content = [
                {
                    key : 'customRuleName',
                    label : 'Rule Name',
                    value : this.state.customRule.customRuleName,
                    type : 'text'
                },
                {
                    key : 'customRuleDesc',
                    label : 'Rule Description',
                    value : this.state.customRule.customRuleDesc,
                    type : 'text'
                },
                {
                    key : 'customRuleTrigger',
                    label : 'Rule Trigger',
                    value : this.state.customRule.customRuleTrigger,
                    type : 'text'
                },
                {
                    key : 'baseLoyaltyDiscount',
                    label : 'Base Loyalty Discount',
                    value : this.state.customRule.baseLoyaltyDiscount,
                    type : 'text'
                },
                {
                    key : 'baseLoyaltyPoint',
                    label : 'Base Loyalty Point',
                    value : this.state.customRule.baseLoyaltyPoint,
                    type : 'text'
                }
            ]

            if(this.state.customRule.customRuleTrigger === "Amount"){
                content.push({
                        key : 'amountReq',
                        label : 'For Each Amount Of',
                        value : this.state.customRule.amountReq,
                        type : 'text'
                    },
                    {
                        key : 'capPerTrx',
                        label : 'Maximum Points',
                        value : this.state.customRule.capPerTrx,
                        type : 'text'
                    });
            }
        }

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

const mapStateToProps = ({auth, rules}) => {
    const {authUser} = auth;
    const {basicRule,referralRule,customRule, loader, alertMessage, showMessage} = rules
    return {authUser, basicRule, referralRule, customRule, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewRule})(ViewRule);


