import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
import {connect} from "react-redux";
import {
    viewUser
} from "appRedux/actions/User";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";

class ViewUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : this.props.data
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewUser(credential);
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

        let content1 = [];
        let content2 = [];
        let titleView = '';
        let {loader, alertMessage, showMessage} = this.props;


        titleView = this.state.data.id;

        //set key
        let details = [];
        // if(this.state.data.role.length > 0){
        //     this.state.data.role.forEach((detail, i) => {
        //         detail.key = i;
        //         details.push(detail);
        //     });
        // }
        if (this.state.data.role != null) {
            details.push(this.state.data.role);
        }


        content1 =
            [
                {
                    key : 'fullName',
                    label : 'Full Name',
                    value : this.state.data.fullName,
                    type : 'text'
                },
                {
                    key : 'loginName',
                    label : 'Login Name',
                    value : this.state.data.loginName,
                    type : 'text'
                },
                {
                    key : 'merchantName',
                    label : 'Merchant Name',
                    value : this.state.data.merchantName,
                    type : 'text'
                },
                // {
                //     key : 'userNonLocked',
                //     label : 'User Non Locked',
                //     value : this.state.data.userNonLocked,
                //     type : 'text'
                // },
                // {
                //     key : 'userEnabled',
                //     label : 'User Enabled',
                //     value : this.state.data.userEnabled,
                //     type : 'text'
                // },
                {
                    key : 'description',
                    label : 'Description',
                    value : this.state.data.description,
                    type : 'text'
                },
                {
                    key : 'line1',
                    label : 'Address',
                    value : this.state.data.address.line1,
                    type : 'text'
                },
                {
                    key : 'stateProvId',
                    label : 'Province ID',
                    value : this.state.data.address.stateProvId,
                    type : 'text'
                },{
                    key : 'cityTown',
                    label : 'City',
                    value : this.state.data.address.cityTown,
                    type : 'text'
                },{
                    key : 'postalCode',
                    label : 'Postal Code',
                    value : this.state.data.address.postalCode,
                    type : 'text'
                },{
                    key : 'contactFirstName',
                    label : 'First Name',
                    value : this.state.data.contact.contactFirstName,
                    type : 'text'
                },{
                    key : 'contactLastName',
                    label : 'Last Name',
                    value : this.state.data.contact.contactLastName,
                    type : 'text'
                },{
                    key : 'mobileNumber',
                    label : 'Mobile Number',
                    value : this.state.data.contact.mobileNumber,
                    type : 'text'
                },{
                    key : 'emailAddress',
                    label : 'Email',
                    value : this.state.data.contact.emailAddress,
                    type : 'text'
                },
            ];

        content2 = [{
            key : 'role',
            label: 'Role Details',
            listData : details,
            type : 'list partial',
            columns : [{
                title: 'Role Code',
                dataIndex: 'code',
                key: 'code',
            }, {
                title: 'Role Name',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: 'Role Description',
                dataIndex: 'description',
                key: 'description',
            }]
        }
        ];

    Array.prototype.push.apply(content1, content2);

        return(
            <div>
                <div>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                </div>
                {loader === false ?
                    <ViewForm
                        component={content1}
                        title={titleView}
                        onBack = {this.back.bind(this)}
                    />
                    : ''}
            </div>
        );

    }


}

const mapStateToProps = ({auth, userState}) => {
    const {authUser} = auth;
    const {data, loader, alertMessage, showMessage} = userState
    return {authUser, data, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewUser})(ViewUser);


