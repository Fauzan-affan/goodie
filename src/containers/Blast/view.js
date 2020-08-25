import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
import {connect} from "react-redux";
import {
    viewBlast
} from "appRedux/actions/Blast";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";

class ViewBlast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messageBlast : this.props.messageBlast
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewBlast(credential);

    }



    clearFilterComponent(){
        this.props.clearFilterSortSearch();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.messageBlast !== this.props.messageBlast){
            this.setState({
                messageBlast : nextProps.messageBlast
            });
        }
    }

    back(){
        this.props.history.goBack();
    }


    render() {

        let content = [];
        let content2 = [];
        let titleView = '';
        let {loader, alertMessage, showMessage} = this.props;


        titleView = this.state.messageBlast.subject;

        //set key
        let member = [];
        if(this.state.messageBlast.receivers.dataReceivers != null){
            if(this.state.messageBlast.receivers.dataReceivers.length > 0){
                this.state.messageBlast.receivers.dataReceivers.forEach((detail, i) => {
                    detail.key = i;
                    member.push(detail);
                });
            }
        }

        content =
            [
                {
                    key : 'subject',
                    label : 'Subject',
                    value : this.state.messageBlast.subject,
                    type : 'text'
                },
                {
                    key : 'sender',
                    label : 'Sender',
                    value : this.state.messageBlast.sender,
                    type : 'text'
                },
                {
                    key : 'content',
                    label : 'Content',
                    value : this.state.messageBlast.content,
                    type : 'html'
                },
                {
                    key : 'sendDate',
                    label : 'Send Date',
                    value : this.state.messageBlast.sendDate,
                    type : 'text'
                },
                {
                    key : 'messageType',
                    label : 'Product Type',
                    value : this.state.messageBlast.messageType,
                    type : 'text'
                },{
                    key : 'deliveryStatus',
                    label : 'Delivery Status',
                    value : this.state.messageBlast.deliveryStatus,
                    type : 'text'
                },{
                    key : 'createdDate',
                    label : 'Created Date',
                    value : this.state.messageBlast.createdDate,
                    type : 'text'
                },{
                    key : 'createdBy',
                    label : 'Created By',
                    value : this.state.messageBlast.createdBy,
                    type : 'text'
                },
            ];

        content2 = [{
            key : 'member',
            label : 'Member List',
            listData : member,
            type : 'list full',
            columns : [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },{
                title: 'Mobile Number',
                dataIndex: 'mobileNumber',
                key: 'mobileNumber',
            },{
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },{
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
            }
            ]
        }
        ]

        Array.prototype.push.apply(content, content2);

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

const mapStateToProps = ({auth, blastState}) => {
    const {authUser} = auth;
    const {messageBlast, loader, alertMessage, showMessage} = blastState
    return {authUser, messageBlast, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewBlast})(ViewBlast);


