import React from "react";
import {Card, Col, Row} from "antd";


class User extends React.Component{
    constructor(){
        super();
        this.searchUser = this.searchUser.bind(this);
        this.insertUser = this.insertUser.bind(this);
        this.insertRole = this.insertRole.bind(this);
        this.searchRoles = this.searchRoles.bind(this);
    }

    searchUser() {
        this.props.history.push('/user/search');
    }

    insertUser(){
        this.props.history.push('/user/create');
    }

    insertRole(){
        this.props.history.push('/user/roles/create');
    }

    searchRoles(){
        this.props.history.push('user/roles');
    }

    render() {
        return (
            <Row>
                {/*<Col span={24}>*/}
                {/*<ContainerHeader title='User'/>*/}
                {/*</Col>*/}

                <Col span={24}>
                    <Card>
                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
                                    {/*<Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>*/}
                                    <div className='gx-package custom-package' onClick={this.searchUser} >
                                        <img src={require('assets/images/User/search.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-user-small'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>User List</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Manage users in Goodie.
                                            </p>
                                        </div>
                                    </div>
                                    {/*</Col>*/}
                                </Col>

                                <Col xl={12} lg={24} md={12} xs={24}>
                                    {/*<Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>*/}
                                        <div className='gx-package custom-package' onClick={this.searchRoles} >
                                            <img src={require('assets/images/User/role_list.png')}
                                                 alt="Avatar"></img>
                                            <div className='gx-package-header custom-package-header custom-user-small'>
                                                <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Role List</h5>
                                                <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                    Manage role your team.
                                                </p>
                                            </div>
                                        </div>
                                    {/*</Col>*/}
                                </Col>

                            </Row>
                        </div>

                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24}>
                                    <Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>
                                        <div className='gx-package custom-package' onClick={this.insertUser} >
                                            <img src={require('assets/images/User/create.png')}
                                                 alt="Avatar"></img>
                                            <div className='gx-package-header custom-package-header custom-user-small'>
                                                <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>User</h2>
                                                <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                    Set account for your team
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Col>

                                <Col xl={12} lg={24} md={12} xs={24}>
                                    <Col xl={20} lg={24} md={20} xs={24} style={{margin:'auto'}}>
                                        <div className='gx-package custom-package' onClick={this.insertRole} >
                                            <img src={require('assets/images/User/role.png')}
                                                 alt="Avatar"></img>
                                            <div className='gx-package-header custom-package-header custom-user-small'>
                                                <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Roles</h2>
                                                <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                    Set privileges for your user
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                </Col>

                            </Row>
                        </div>
                    </Card>
                </Col>

            </Row>
        );
    }

}

export default User;

