import React from "react";
import {Card, Col, Row} from "antd";


class User extends React.Component{
    constructor(){
        super();
        this.searchStore = this.searchStore.bind(this);
        this.createStore = this.createStore.bind(this);
    }

    searchStore() {
        this.props.history.push('/store/search');
    }
    
    createStore() {
        this.props.history.push('/store/create');
    }

    render() {
        return (
            // <Row>

            //     <Col span={24}>
            //         <Card>
            //         <div className="gx-price-tables gx-pt-default">
            //                 <Row>
            //                     <Col xl={12} lg={24} md={12} xs={24}>
            //                         <div className='gx-package custom-package' onClick={this.searchStore} >
            //                             <img src={require('assets/images/Store/StoreListNew2.png')}
            //                                 alt="Avatar" ></img>
            //                             <div className='gx-package-header custom-package-header custom-program-big'>
            //                                 <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Store List</h2>
            //                                 <p className="custom-menu-body gx-mb-0 custom-package-body">
            //                                     Manage your Store
            //                                 </p>
            //                             </div>
            //                         </div>
            //                     </Col>


            //                     <Col xl={12} lg={24} md={12} xs={24}>
            //                         <div className='gx-package custom-package' onClick={this.createStore} >
            //                             <img src={require('assets/images/Store/CreateStoreNew2.png')}
            //                                 alt="Avatar"></img>
            //                             <div className='gx-package-header custom-package-header custom-program-big'>
            //                                 <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Create Store</h2>
            //                                 <p className="custom-menu-body gx-mb-0 custom-package-body">
            //                                     Create your Store
            //                                 </p>
            //                             </div>
            //                         </div>
            //                     </Col>
            //                 </Row>
            //             </div>
            //         </Card>
            //     </Col>


            <Row>
                <Card 
                    className="deposit" 
                    bodyStyle={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center'
                    }}
                >
                    <Card
                        bordered={false}
                        className="deposit-store gx-package custom-package"
                        cover={<div className="deposit-store-cover">
                            <img src={require('assets/images/Store/StoreListNew2.png')} alt="Avatar" ></img>
                            </div>}
                        onClick={this.searchStore}
                    >
                    <h2>Store List</h2>
                    <p>Manage Your Store Here</p>
                    </Card>
                    <Card
                        bordered={false}
                        className="deposit-store gx-package custom-package"
                        cover={<div className="deposit-store-cover">
                            <img src={require('assets/images/Store/CreateStoreNew3.png')} alt="Avatar"></img>
                            </div>}
                        onClick={this.createStore}
                    >
                    <h2>Create Store</h2>
                    <p>Create Store Here</p>
                    </Card>
                </Card>
            </Row>
            // </Row>
        );
    }

}

export default User;

