import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
import {connect} from "react-redux";
import {
    viewApproval
} from "appRedux/actions/Approval"
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";
class ViewApproval extends Component {
    constructor(props) {
        super(props);


        this.state = {
            data : this.props.data
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewApproval(credential);
    }

    componentWillReceiveProps(nextProps){


        // this.state = {
        //     data : nextProps.data
        // };

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


        titleView = this.state.data.receiptId;

        let object;
        if(this.state.data[0]){

            object = this.state.data[0];
            // console.log("dataaaa =====> "+JSON.stringify(object));
            // console.log("receiptId =====> "+object.receiptId);

            content =
                [
                    {
                        key : 'receiptId',
                        label : 'Receipt ID',
                        value : object.receiptId,
                        type : 'text'
                    },
                    {
                        key : 'pointTransactionId',
                        label : 'Point Transaction ID',
                        value : object.pointTransactionId==null?"-":object.pointTransactionId,
                        type : 'text'
                    },
                    {
                        key : 'imageUrl',
                        label : 'Image',
                        value : object.imageUrl,
                        type : 'image'
                    },
                    {
                        key : 'merchantName',
                        label : 'Merchant Name',
                        value : object.merchantName,
                        type : 'text'
                    },
                    {
                        key : 'memberName',
                        label : 'Member Name',
                        value : object.memberName,
                        type : 'text'
                    },
                    {
                        key : 'memberUsername',
                        label : 'Member User Name',
                        value : object.memberUsername,
                        type : 'text'
                    },
                    {
                        key : 'mobileNumber',
                        label : 'Mobile Number',
                        value : object.mobileNumber,
                        type : 'text'
                    },
                    {
                        key : 'status',
                        label : 'Status',
                        value : object.status,
                        type : 'text'
                    },
                    {
                        key : 'point',
                        label : 'point',
                        value : object.accPoint,
                        type : 'text'
                    },


                ];

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

const mapStateToProps = ({auth, approvalState}) => {
    const {authUser} = auth;
    const {data, loader, alertMessage, showMessage} = approvalState;
    return {authUser, data, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewApproval})(ViewApproval);


