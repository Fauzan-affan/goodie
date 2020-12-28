import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
import {connect} from "react-redux";
import {
    viewAdvertising
} from "appRedux/actions/Advertising";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";
import AdvertisingType from "../../constants/AdvertisingType";
import moment from "moment";

class ViewAdvertising extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : this.props.data
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewAdvertising(credential);
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
        let titleView = '';
        let {loader, alertMessage, showMessage} = this.props;



        titleView = this.state.data.name;

        //set key
        let details = [];
        if(this.state.data.cities.length > 0){
            this.state.data.cities.forEach((detail, i) => {
                detail.key = i;
                details.push(detail);
            });
        }


        content =
            [
                {
                    key : 'name',
                    label : 'Name',
                    value : this.state.data.name,
                    type : 'text'
                },
                {
                    key : 'description',
                    label : 'Description',
                    value : this.state.data.description,
                    type : 'html'
                },{
                    key : 'articleCategory',
                    label : 'Article Category',
                    value : this.state.data.articleCategory,
                    type : 'text'
                },{
                    key : 'advertisingType',
                    label : 'Advertising Type',
                    value : AdvertisingType.getLabel(this.state.data.advertisingType),
                    type : 'text'
                },{
                    key : 'status',
                    label : 'Status',
                    value : this.state.data.status,
                    type : 'text'
                },{
                    key : 'adsCategory',
                    label : 'Ads Category',
                    value : this.state.data.adsCategory,
                    type : 'text'
                },{
                    key : 'adsContent',
                    label : 'Ads Content',
                    value : this.state.data.adsContent,
                    type : 'text'
                },
                {
                    key : 'image',
                    label : 'Image',
                    value : this.state.data.image,
                    type : 'image'
                },
                {
                    key : 'startDate',
                    label : 'Start Date',
                    value : handleDateString(this.state.data.startDate),
                    type : 'text'
                },
                {
                    key : 'endDate',
                    label : 'End Date',
                    value : handleDateString(this.state.data.endDate),
                    type : 'text'
                },
                {
                key : 'rewardCode',
                label : 'Reward Code',
                value : this.state.data.rewardCode,
                type : 'text'
                },
                {
                key : 'rewardName',
                label : 'Reward Name',
                value : this.state.data.rewardName,
                type : 'text'
                },
                // {
                //     key : 'cities',
                //     label: 'Cities',
                //     listData : details,
                //     type : 'list partial',
                //     columns : [{
                //         title: 'City Id',
                //         dataIndex: 'cityId',
                //         key: 'cityId',
                //     }, {
                //         title: 'City Name',
                //         dataIndex: 'cityName',
                //         key: 'cityName',
                //     }, {
                //         title: 'State Prov Id',
                //         dataIndex: 'stateProvId',
                //         key: 'stateProvId',
                //     }
                //     ]
                // }
            ];

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

const handleDateString = date =>
    moment.isMoment(date) ?
        date.format('YYYY-MM-DD') :
        typeof date === 'string' ? date : ''

const mapStateToProps = ({auth, advertisingState}) => {
    const {authUser} = auth;
    const {data, loader, alertMessage, showMessage} = advertisingState
    return {authUser, data, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewAdvertising})(ViewAdvertising);


