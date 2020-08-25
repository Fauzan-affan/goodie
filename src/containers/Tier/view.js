import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
import {connect} from "react-redux";
import {
    viewTier
} from "appRedux/actions/Tier";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";

class ViewTier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tier : this.props.tier
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewTier(credential);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.tier !== this.props.tier){
            this.setState({
                tier : nextProps.tier
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

        titleView = this.state.tier.tierStructureCode;

        //set key
        let details = [];

        if(this.state.tier.tierDetails.length > 0){
            this.state.tier.tierDetails.forEach((detail, i) => {
                detail.key = i;
                details.push(detail);
            });
        }else{
            details = null;
        }

        content = [
            {
                key : 'tierStructureCode',
                label : 'Tier Structure Code',
                value : this.state.tier.tierStructureCode,
                type : 'text'
            },
            {
                key : 'tierDetails',
                label : 'Tier Detail',
                listData : details,
                type : 'list full',
                columns : [{
                    title: 'Tier Code',
                    dataIndex: 'tierCode',
                    key: 'tierCode',
                }, {
                    title: 'Tier Name',
                    dataIndex: 'tierName',
                    key: 'tierName',
                }, {
                    title: 'Lower Bound Point',
                    dataIndex: 'lowerBoundPoint',
                    key: 'lowerBoundPoint',
                }, {
                    title: 'Upper Bound Point',
                    dataIndex: 'upperBoundPoint',
                    key: 'upperBoundPoint',
                }, {
                    title: 'Tier Image',
                    dataIndex: 'tierImage',
                    key: 'tierImage',
                    render: (text) => <img src={text} alt="avatar" width={'100px'}/>
                }]
            }
        ]

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

const mapStateToProps = ({auth, tierState}) => {
    const {authUser} = auth;
    const {tier, loader, alertMessage, showMessage} = tierState
    return {authUser, tier, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewTier})(ViewTier);


