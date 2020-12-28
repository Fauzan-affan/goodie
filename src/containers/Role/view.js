import React, {Component} from "react";
import ViewForm from '../../components/Form/view';
import {connect} from "react-redux";
import {
    viewRoles
} from "appRedux/actions/Roles";
import {message} from "antd";
import CircularProgress from "components/CircularProgress/index";

class ViewRoles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : this.props.data
        };
    }

    componentWillMount(){
        let credential = this.props.authUser;
        credential.id = this.props.match.params.id;
        this.props.viewRoles(credential);
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
        let content2 = [];
        let titleView = '';
        let {loader, alertMessage, showMessage} = this.props;

        titleView = this.state.data.code;

        //set key
        let details = [];
        if(this.state.data.privileges.length > 0){
            this.state.data.privileges.forEach((detail, i) => {
                detail.key = i;
                details.push(detail);
            });
        }

        content =
            [
                {
                    key : 'code',
                    label : 'Role Code',
                    value : this.state.data.code,
                    type : 'text'
                },
                {
                    key : 'name',
                    label : 'Role Name',
                    value : this.state.data.name,
                    type : 'text'
                },
                {
                    key : 'description',
                    label : 'Role Description',
                    value : this.state.data.description,
                    type : 'text'
                },
            ];

        content2 = [{
            key : 'privileges',
            label: 'Privileges List',
            listData : details,
            type : 'list partial',
            columns : [{
                title: 'Unit Code',
                dataIndex: 'unitCode',
                key: 'unitCode',
            }, {
                title: 'Unit Name',
                dataIndex: 'unitName',
                key: 'unitName',
            }, {
                title: 'Function Code',
                dataIndex: 'functionCode',
                key: 'functionCode',
            }, {
                title: 'Function Name',
                dataIndex: 'functionName',
                key: 'functionName',
            }]
        }
        ];

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

const mapStateToProps = ({auth, rolesState}) => {
    const {authUser} = auth;
    const {data, loader, alertMessage, showMessage} = rolesState
    return {authUser, data, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {viewRoles})(ViewRoles);


