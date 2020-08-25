import React, {Component} from "react";
import moment from "moment";
import ViewForm from '../../components/Form/view';
// import {currency} from '../../constants/Util';
import {connect} from "react-redux";
import {
    viewPoint
} from "appRedux/actions/Point";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";
// import RedeemFreq from '../../constants/RedeemFreq';

class ViewPoint extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : this.props.data
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewPoint(credential);
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

        titleView = this.state.data.pointValue;
        content =
            [
                {
                    key : 'pointValue',
                    label : 'Point Value',
                    value : this.state.data.pointValue,
                    type : 'text'
                },
                {
                    key : 'currency',
                    label : 'Currency',
                    value : this.state.data.currency,
                    type : 'text'
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
                }
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

const mapStateToProps = ({auth, pointState}) => {
    const {authUser} = auth;
    const {data, loader, alertMessage, showMessage} = pointState
    return {authUser, data, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewPoint})(ViewPoint);


