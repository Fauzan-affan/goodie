import React from "react";
import AmCharts from "@amcharts/amcharts3-react";
import {Card} from "antd";

import {
    merchantDashboard
} from "appRedux/actions/Dashboard";
import {connect} from "react-redux";

class TopMerchants extends React.Component {

    componentWillMount() {
        let credential = this.props.authUser;
        this.props.merchantDashboard(credential);
    }

    render(){
        const {merchants} = this.props;
        let data = [];

        if(merchants.length > 0){
            merchants.forEach((mer, i) => {
                let detail = {};
                detail.merchantName = mer.merchantName;
                detail.amount = mer.amount;
                data.push(detail);
            });
        }

        // [{
        //     "country": "USA",
        //     "visits": 3025,
        //     "color": "#FF0F00"
        // }, {
        //     "country": "China",
        //     "visits": 1882,
        //     "color": "#FF6600"
        // }, {
        //     "country": "Japan",
        //     "visits": 1809,
        //     "color": "#FF9E01"
        // }, {
        //     "country": "Germany",
        //     "visits": 1322,
        //     "color": "#FCD202"
        // }, {
        //     "country": "UK",
        //     "visits": 1122,
        //     "color": "#F8FF01"
        // }]

        const config = {
            "type": "serial",
            "theme": "light",
            "marginRight": 70,
            "dataProvider": data,
            "valueAxes": [{
                "axisAlpha": 0,
                "position": "left",
                "title": "Products (Unit)"
            }],
            "startDuration": 1,
            "graphs": [{
                "balloonText": "<b>[[category]]: [[value]]</b>",
                "fillColorsField": "color",
                "fillAlphas": 0.9,
                "lineAlpha": 0.2,
                "type": "column",
                "valueField": "amount"
            }],
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "merchantName",
            "categoryAxis": {
                "gridPosition": "start",
                "labelRotation": 45
            },
            "export": {
                "enabled": true
            }

        };
        return (
            <Card className="gx-card" title="Top 5 Merchant Use Your Products">
                <div className="App">
                    <AmCharts.React style={{width: "100%", height: "300px"}} options={config}/>
                </div>
            </Card>
        )

    }

}

const mapStateToProps = ({auth, dashboardState}) => {
    const {authUser} = auth;
    const {merchants, loader, alertMessage, showMessage} = dashboardState
    return {authUser, merchants, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {merchantDashboard})(TopMerchants);
