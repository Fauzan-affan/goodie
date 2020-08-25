import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row } from "antd";

const Deposit = ({ history }) => (
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
        className="deposit-menu gx-package custom-package"
        cover={<div className="deposit-menu-cover">
          <img alt="topup" src={require('assets/images/Deposit/topup.png')} />
        </div>}
        onClick={() => history.push('/deposit/topup')}
      >
        <h2>Top Up</h2>
        <p>Top up your account here</p>
      </Card>
      <Card
        bordered={false}
        className="deposit-menu gx-package custom-package"
        cover={<div className="deposit-menu-cover">
        <img alt="history" src={require('assets/images/Deposit/history.png')} />
        </div>}
        onClick={() => history.push('/deposit/history')}
      >
        <h2>Balance History</h2>
        <p>See your balance history here</p>
      </Card>
    </Card>
  </Row>
);

export default withRouter(Deposit);