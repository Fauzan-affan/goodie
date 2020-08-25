import React from "react";
import {Col, Row} from "antd";
import Metrics from "components/Metrics";
import {Area, AreaChart, ResponsiveContainer, Tooltip,XAxis, YAxis} from "recharts";

import {
    growthMemberDashboard
} from "appRedux/actions/Dashboard";
import {connect} from "react-redux";

class MemberGrowth extends React.Component {

    componentWillMount() {
        let credential = this.props.authUser;
        this.props.growthMemberDashboard(credential);
    }

    calculatePercentage(growthMember){
        let past = 0;
        let percentage = 0;

        let present = growthMember[growthMember.length - 1].totalMember;
        if(growthMember.length > 1){
            past = growthMember[growthMember.length - 2].totalMember;
            let min = present - past;
            let diff = min / past;
            percentage = (diff * 100).toFixed(2);
        }else{
            percentage = 100;
        }

        return percentage;
    }

    render(){
        const {growthMember} = this.props;

        let data = [];
        let percentage = 0;
        let growthClass = 'gx-fs-xxxl gx-font-weight-medium gx-mb-1 gx-chart-up';

        if(growthMember.length > 0){
            growthMember.forEach((member, i) => {
                let detail = {};
                detail.name = member.month+ ' '+ member.year;
                detail.member = member.totalMember;
                data.push(detail);
            });

            percentage = this.calculatePercentage(growthMember);

            if(percentage < 0){
                growthClass = 'gx-fs-xxxl gx-font-weight-medium gx-mb-1 gx-chart-down';
            }

        }

        return (
            <Metrics styleName={`gx-card-full`} title="Member Growth">
                <Row>
                    <Col lg={9} md={24} sm={9} xs={9}>
                        <div className="gx-pb-4 gx-pl-4 gx-pt-4">
                            <h2 className={growthClass}>{percentage} %
                                <i className="icon icon-menu-up gx-fs-xxl"/>
                            </h2>
                            <p className="gx-mb-0 gx-text-grey">This month</p>
                        </div>
                    </Col>
                    <Col lg={15} md={24} sm={15} xs={15}>
                        <ResponsiveContainer width="100%" height={103}>
                            <AreaChart data={data}
                                       margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                                <Tooltip
                                    formatter={function(value, name) {
                                        return `${value} members`;
                                    }}/>
                                <defs>
                                    <linearGradient id="color1" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="5%" stopColor="#FF55AA" stopOpacity={0.9}/>
                                        <stop offset="95%" stopColor="#6757DE" stopOpacity={0.9}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" hide={true}/>
                                <YAxis hide={true}/>
                                <Area dataKey='member' strokeWidth={0} stackId="2" stroke='#867AE5' fill="url(#color1)" fillOpacity={1}/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </Metrics>
        );

    }

}

const mapStateToProps = ({auth, dashboardState}) => {
    const {authUser} = auth;
    const {growthMember, loader, alertMessage, showMessage} = dashboardState
    return {authUser, growthMember, loader, alertMessage, showMessage}
};
export default connect(mapStateToProps, {growthMemberDashboard})(MemberGrowth);
