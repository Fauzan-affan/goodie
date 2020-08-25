import React, {Component} from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";


class UpdatePromotionNullPopup extends Component {
    // constructor(props) {
    //     super(props);
    //
    // }

    render(){

        return(
            <div>
                <h3>Promotion</h3>
                <div className='ant-row custom-modal-tier-header'>
                    <div style={{padding: '10px'}} className='ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24'>
                        Promotion is empty, please create your promotion.
                    </div>
                    <div style={{padding: '10px'}} className='ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-24'>
                        <Button key="submit" type="primary">
                            <Link to="/promotion">Go to Promotion</Link>
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

export default UpdatePromotionNullPopup;