import React, {Component} from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";


class UpdateProgramNullPopup extends Component {
    // constructor(props) {
    //     super(props);
    //
    // }

    render(){

        return(
            <div>
                <h3>Reward</h3>
                <div className='ant-row custom-modal-tier-header'>
                    <div style={{padding: '10px'}} className='ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24'>
                        Reward is empty, please create your reward.
                    </div>
                    <div style={{padding: '10px'}} className='ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24'>
                        <Button key="submit" type="primary">
                            <Link to="/reward">Go to Reward</Link>
                        </Button>
                    </div>
                    {/*<div className='ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-24 ant-col-xl-12'>*/}
                    {/*    New*/}
                    {/*</div>*/}
                </div>
                {/*{programComponents}*/}

                {/*<h3>Promotion</h3>*/}
                {/*<div className='ant-row custom-modal-tier-header'>*/}
                {/*    <div className='ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-24 ant-col-xl-12'>*/}
                {/*        Current*/}
                {/*    </div>*/}
                {/*    <div className='ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-24 ant-col-xl-12'>*/}
                {/*        New*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*{promotionComponents}*/}
            </div>
        );
    }

}

export default UpdateProgramNullPopup;