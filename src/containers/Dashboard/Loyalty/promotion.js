import React from "react";
import AmCharts from "@amcharts/amcharts3-react";
import {Card} from "antd";
import {connect} from "react-redux";
import {
    promotionDashboard
} from "appRedux/actions/Dashboard";

class PromotionDashboard extends React.Component {

    componentWillMount() {
        let credential = this.props.authUser;
        this.props.promotionDashboard(credential);
    }

    render(){
        const {promotionList} = this.props;
        let data = [];

        if(promotionList.length !== undefined){
            promotionList.forEach((res, i) => {
                let detail = {};
                detail.title = res.promotionName;
                detail.value = res.totalPoint;
                data.push(detail);
            });
        }

        const config = {
            "type": "pie",
            "theme": "light",
            "dataProvider": data,
            "titleField": "title",
            "valueField": "value",
            "labelRadius": 5,
            "outlineAlpha": 0.4,
            "depth3D": 8,

            "legend":{
            "position":"bottom",
            "marginBottom":8    ,
            "height": "500px",
            "autoMargins":false
           },
           
            "radius": "42%",
            // "innerRadius": "60%",
            "labelText": "[[title]]",
            "angle": 30,
            "export": {
            "enabled": true
            }
        };

        return (
            <Card className="gx-card"  title="Promotion">
                <div className="App">
                    <AmCharts.React style={{width: "100%", height: "1250px"}} options={config}/>
                </div>
            </Card>
        )

    }

}

const mapStateToProps = ({auth, dashboardState}) => {
    const {authUser} = auth;
    const {promotionList, loader, alertMessage, showMessage} = dashboardState
    return {authUser, promotionList, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {promotionDashboard})(PromotionDashboard);
