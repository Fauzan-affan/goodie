import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
import {connect} from "react-redux";
import {
    viewGamification,
    viewGami,
} from "appRedux/actions/Gamification";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";

class ViewGamification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : null
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        // this.props.viewGamification(credential);
        this.props.viewGami(credential);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data !== this.props.data){
            this.setState({
                data : nextProps.data
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


        if(this.state.data != null) {
            titleView = this.state.data.type.code;

            //set key
            let details = [];
            // console.log(this.state.data.detail.question.length > 0)
            // if(this.state.data.detail.question.length > 0){
            //     this.state.data.detail.question.forEach((detail, i) => {
            //         detail.key = i;
            //         details.push(detail);
            //     });
            // }
            if (this.state.data.detail != null) {
                details.push(this.state.data.detail);
            }


            content =
                [{
                    key: 'type.name',
                    label: 'Game Name',
                    value: this.state.data.type.name,
                    type: 'text'
                },
                    {
                        key: 'type.code',
                        label: 'Game Code',
                        value: this.state.data.type.code,
                        type: 'text'
                    },
                    {
                        key: 'isActivated',
                        label: 'Status',
                        value: this.state.data.isActivated,
                        type: 'text'
                    },
                    {
                        key: 'startDate',
                        label: 'Start Date',
                        value: this.state.data.startDate,
                        type: 'text'
                    },
                    {
                        key: 'endDate',
                        label: 'End Date',
                        value: this.state.data.endDate,
                        type: 'text'
                    },
                    // {
                    //     key: 'expiredPointType',
                    //     label: 'Expired Point Type',
                    //     value: ExpiryPointType.getLabel(this.state.promotion.expiredPointType),
                    //     type: 'text'
                    // }
                ];

            content2 = [{
                key : 'detail',
                label: 'Details',
                listData : details,
                type : 'list partial',
                columns : [{
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                }, {
                    title: 'Title',
                    dataIndex: 'title',
                    key: 'title',
                }, {
                    title: 'Maximum Chance',
                    dataIndex: 'maxPaidChances',
                    key: 'maxPaidChances',
                }]
            }
            ];

            // //set key
            // let detailTiers = [];
            // let detailRules = [];
            // if (this.state.promotion.memberTiers[0] !== undefined) {
            //     if (this.state.promotion.memberTiers[0].tierDetails.length > 0) {
            //         this.state.promotion.memberTiers[0].tierDetails.forEach((detail, i) => {
            //             detail.key = detail.tierDetailId;
            //             detailTiers.push(detail);
            //         });
            //     } else {
            //         detailTiers = null;
            //     }
            // }
            //
            // if (this.state.promotion.rules.length > 0) {
            //     this.state.promotion.rules.forEach((detail, i) => {
            //         detail.key = detail.tierDetailId;
            //         detailRules.push(detail);
            //     });
            // } else {
            //     detailRules = null;
            // }
            //
            //
            // content2 =
            //     [{
            //         key: 'memberTiers',
            //         label: 'Applicable Tier',
            //         listData: detailTiers,
            //         type: 'list partial',
            //         columns: [{
            //             title: 'Tier Name',
            //             dataIndex: 'tierDetailName',
            //             key: 'tierDetailName',
            //         }, {
            //             title: 'Loyalty Factor',
            //             dataIndex: 'loyaltyFactor',
            //             key: 'loyaltyFactor'
            //         }]
            //     }, {
            //         key: 'rules',
            //         label: 'Rules',
            //         listData: detailRules,
            //         type: 'list partial',
            //         columns: [{
            //             title: 'Rule Name',
            //             dataIndex: 'ruleName',
            //             key: 'ruleName',
            //         }, {
            //             title: 'Rule Type',
            //             dataIndex: 'ruleType',
            //             key: 'ruleType',
            //         }]
            //     }
            //     ];

            Array.prototype.push.apply(content, content2);
            // Array.prototype.push.apply(content, contentExp);
            // Array.prototype.push.apply(content, content2);
        }

        return(
            <div>
                <div>
                    {loader == true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                </div>
                {loader == false ?
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

const mapStateToProps = ({auth, gamificationState}) => {
    const {authUser} = auth;
    const {data, loader, alertMessage, showMessage} = gamificationState;
    return {authUser, data, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewGamification, viewGami})(ViewGamification);


