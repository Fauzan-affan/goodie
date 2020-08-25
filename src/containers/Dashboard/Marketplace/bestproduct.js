import React from "react";
import AmCharts from "@amcharts/amcharts3-react";
import {Card} from "antd";
import {
    productDashboard
} from "appRedux/actions/Dashboard";
import {connect} from "react-redux";

class BestProducts extends React.Component {

    componentWillMount() {
        let credential = this.props.authUser;
        this.props.productDashboard(credential);
    }

    render(){

        const {products} = this.props;
        let data = [];

        if(products.length > 0){
            products.forEach((prod, i) => {
                let detail = {};
                detail.title = prod.productName;
                detail.value = prod.amount;
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

            "radius": "42%",
            "innerRadius": "60%",
            "labelText": "[[title]]",
            "export": {
                "enabled": true
            }
        };

        return (
            <Card className="gx-card" title="Product Sales">
                <div className="App">
                    <AmCharts.React style={{width: "100%", height: "300px"}} options={config}/>
                </div>
            </Card>
        )

    }

}

const mapStateToProps = ({auth, dashboardState}) => {
    const {authUser} = auth;
    const {products, loader, alertMessage, showMessage} = dashboardState
    return {authUser, products, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {productDashboard})(BestProducts);
