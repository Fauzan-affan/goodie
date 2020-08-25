import React from "react";
import AmCharts from "@amcharts/amcharts3-react";
import {Card} from "antd";
import {connect} from "react-redux";
import {
    rewardDashboard
} from "appRedux/actions/Dashboard";

class RewardDashboard extends React.Component {

    componentWillMount() {
        let credential = this.props.authUser;
        this.props.rewardDashboard(credential);
    }

    render(){
        const {rewardList} = this.props;
        let data = [];

        if(rewardList.length > 0){
            rewardList.forEach((res, i) => {
                let detail = {};
                detail.title = res.rewardName;
                detail.value = res.amount;
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
            "radius": "42%",
            // "innerRadius": "60%",
            "labelText": "[[title]]",
            "angle": 30,

            "legend":{
                "position":"bottom",
                "marginBottom":8    ,
                "autoMargins":false,
               },

            "export": {
                "enabled": true
            }
        };

        return (
            <Card className="gx-card" title="Reward">
                <div className="App">
                    <AmCharts.React style={{width: "100%", height: "1250px"}} options={config}/>
                </div>
            </Card>
        )

    }

}

const mapStateToProps = ({auth, dashboardState}) => {
    const {authUser} = auth;
    const {rewardList, loader, alertMessage, showMessage} = dashboardState
    return {authUser, rewardList, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {rewardDashboard})(RewardDashboard);
