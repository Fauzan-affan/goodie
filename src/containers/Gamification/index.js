import React from "react";
import {Card, Col, Row} from "antd";

class Gamification extends React.Component{
    constructor(){
        super();
        this.searchGamification = this.searchGamification.bind(this);
        this.insertSurverGamification = this.insertSurverGamification.bind(this);
        this.insertQuizGamification = this.insertQuizGamification.bind(this);
        this.insertSpinnerGamification = this.insertSpinnerGamification.bind(this);
    }

    searchGamification() {
        this.props.history.push('/gamification/search');
    }

    insertSurverGamification(){
        this.props.history.push('/gamification/create/survey');
    }

    insertQuizGamification(){
        this.props.history.push('/gamification/create/quiz');
    }

    insertSpinnerGamification(){
        this.props.history.push('/gamification/create/spinner');
    }

    render() {
        return (
            <Row>
                {/*<Col span={24}>*/}
                {/*<ContainerHeader title='Gamifications'/>*/}
                {/*</Col>*/}

                <Col span={24}>
                    <Card>
                        <div className="gx-price-tables gx-pt-default">
                            <Row>
                                <Col xl={12} lg={24} md={12} xs={24} className='custom-center'>
                                    <div className='gx-package custom-package' onClick={this.searchGamification} >
                                        <img src={require('assets/images/Gamification/Game.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-gamification'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Gamification List</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Review and edit your gamification content
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                        </div>

                        <div className="gx-price-tables gx-pt-default">
                            <Row>

                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.insertSpinnerGamification} >
                                        <img src={require('assets/images/Gamification/Game_Spinner.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-gamification'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Spinner</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create gamification spinner based on your need
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.insertSurverGamification} >
                                        <img src={require('assets/images/Gamification/Game_Survey.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-gamification'>
                                            <h2 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Survey</h2>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create gamification survey based on your need
                                            </p>
                                        </div>
                                    </div>
                                </Col>


                                <Col xl={8} lg={24} md={8} xs={24}>
                                    <div className='gx-package custom-package' onClick={this.insertQuizGamification} >
                                        <img src={require('assets/images/Gamification/Game_Quiz.png')}
                                             alt="Avatar"></img>
                                        <div className='gx-package-header custom-package-header custom-gamification'>
                                            <h5 className="gx-price custom-menu-header"><i className="icon icon-halfstar"/>Quiz</h5>
                                            <p className="custom-menu-body gx-mb-0 custom-package-body">
                                                Create gamification quiz based on your need
                                            </p>
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                    </Card>
                </Col>

            </Row>
        );
    }

}

export default Gamification;

