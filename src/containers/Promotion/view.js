import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
import {connect} from "react-redux";
import {
    viewPromotion
} from "appRedux/actions/Promotion";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";
import ExpiryPointType from '../../constants/ExpiryPointType';

class ViewPromotion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            promotion : null
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewPromotion(credential);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.promotion !== this.props.promotion){
            this.setState({
                promotion : nextProps.promotion
            });
        }
    }

    back(){
        this.props.history.goBack();
    }


    render() {
        let content = [];
        let contentExp = [];
        let content2 = [];
        let titleView = '';
        let {loader, alertMessage, showMessage} = this.props;


        if(this.state.promotion != null) {
            titleView = this.state.promotion.promotionCode;

            if (this.state.promotion.expiredPointType === 1) {
                contentExp = [{
                    key: 'expiredDay',
                    label: 'Expired Day',
                    value: this.state.promotion.expiredDay + ' days after issuing point',
                    type: 'text'
                }]
            } else if (this.state.promotion.expiredPointType === 2) {
                contentExp = [{
                    key: 'expiredDate',
                    label: 'Expired Date',
                    value: this.state.promotion.expiredDate,
                    type: 'text'
                }]
            }


            content =
                [{
                    key: 'promotionCode',
                    label: 'Promotion Code',
                    value: this.state.promotion.promotionCode,
                    type: 'text'
                },
                    {
                        key: 'promotionName',
                        label: 'Promotion Name',
                        value: this.state.promotion.promotionName,
                        type: 'text'
                    },
                    {
                        key: 'description',
                        label: 'Description',
                        value: this.state.promotion.description,
                        type: 'text'
                    },
                    {
                        key: 'startDate',
                        label: 'Start Date',
                        value: this.state.promotion.startDate,
                        type: 'text'
                    },
                    {
                        key: 'endDate',
                        label: 'End Date',
                        value: this.state.promotion.endDate,
                        type: 'text'
                    },
                    {
                        key: 'expiredPointType',
                        label: 'Expired Point Type',
                        value: ExpiryPointType.getLabel(this.state.promotion.expiredPointType),
                        type: 'text'
                    }
                ];

            //set key
            let detailTiers = [];
            let detailRules = [];
            if (this.state.promotion.memberTiers[0] !== undefined) {
                if (this.state.promotion.memberTiers[0].tierDetails.length > 0) {
                    this.state.promotion.memberTiers[0].tierDetails.forEach((detail, i) => {
                        detail.key = detail.tierDetailId;
                        detailTiers.push(detail);
                    });
                } else {
                    detailTiers = null;
                }
            }

            if (this.state.promotion.rules.length > 0) {
                this.state.promotion.rules.forEach((detail, i) => {
                    detail.key = detail.tierDetailId;
                    detailRules.push(detail);
                });
            } else {
                detailRules = null;
            }


            content2 =
                [{
                    key: 'memberTiers',
                    label: 'Applicable Tier',
                    listData: detailTiers,
                    type: 'list partial',
                    columns: [{
                        title: 'Tier Name',
                        dataIndex: 'tierDetailName',
                        key: 'tierDetailName',
                    }, {
                        title: 'Loyalty Factor',
                        dataIndex: 'loyaltyFactor',
                        key: 'loyaltyFactor'
                    }]
                }, {
                    key: 'rules',
                    label: 'Rules',
                    listData: detailRules,
                    type: 'list partial',
                    columns: [{
                        title: 'Rule Name',
                        dataIndex: 'ruleName',
                        key: 'ruleName',
                    }, {
                        title: 'Rule Type',
                        dataIndex: 'ruleType',
                        key: 'ruleType',
                    }]
                }
                ];

            Array.prototype.push.apply(content, contentExp);
            Array.prototype.push.apply(content, content2);
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

const mapStateToProps = ({auth, promotionState}) => {
    const {authUser} = auth;
    const {promotion, loader, alertMessage, showMessage} = promotionState;
    return {authUser, promotion, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewPromotion})(ViewPromotion);


