import React from "react";
import AmCharts from "@amcharts/amcharts3-react";
import {Card} from "antd";

class TierMember extends React.Component {


    render(){

        const config = {
            "type": "pie",
            "theme": "light",
            "dataProvider": [{
                "title": "New",
                "value": 4852
            }, {
                "title": "Returning",
                "value": 9899
            }],
            "titleField": "title",
            "valueField": "value",
            "labelRadius": 5,

            "radius": "42%",
            "innerRadius": "60%",
            "labelText": "[[title]]",
            "export": {
                "enabled": true
            }
        };

        return (
            <Card className="gx-card" title="Tier Member">
                <div className="App">
                    <AmCharts.React style={{width: "100%", height: "300px"}} options={config}/>
                </div>
            </Card>
        )

    }

}

export default TierMember;