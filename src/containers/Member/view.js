import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
import {connect} from "react-redux";
import {
    viewMember
} from "appRedux/actions/Member";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";

class ViewMember extends Component {
    constructor(props) {
        super(props);

        this.state = {
            member : this.props.member
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewMember(credential);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.member !== this.props.member){
            this.setState({
                member : nextProps.member
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


        titleView = this.state.member.memberCode;
        content =
            [
                {
                    key : 'firstName',
                    label : 'First Name',
                    value : this.state.member.firstName,
                    type : 'text'
                },
                {
                    key : 'lastName',
                    label : 'Last Name',
                    value : this.state.member.lastName,
                    type : 'text'
                },
                {
                    key : 'mobileNumber',
                    label : 'Mobile Number',
                    value : this.state.member.mobileNumber,
                    type : 'text'
                },
                {
                    key : 'emailAddress',
                    label : 'Email Address',
                    value : this.state.member.emailAddress,
                    type : 'text'
                },
                {
                    key : 'memberPicture',
                    label : 'Member Image',
                    value : this.state.member.memberPicture,
                    type : 'image'
                },
                {
                    key : 'tierName',
                    label : 'Tier',
                    value : this.state.member.tierName,
                    type : 'text'
                },
                {
                    key : 'birthDate',
                    label : 'Birth Date',
                    value : this.state.member.birthDate,
                    type : 'text'
                },
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

const mapStateToProps = ({auth, memberState}) => {
    const {authUser} = auth;
    const {member, loader, alertMessage, showMessage} = memberState
    return {authUser, member, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewMember})(ViewMember);


