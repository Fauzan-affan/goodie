import React, { Component } from 'react';
import { Card, Collapse, Button, Alert } from 'antd';
import CircularProgress from "components/CircularProgress";
import { connect } from "react-redux";
import copy from 'copy-to-clipboard';
import instructions from './instructions';
import { getVaList, getBalance } from "appRedux/actions/Deposit";

const { Panel } = Collapse;
const prefix = 'topup';
const regexVaNumber = /\[va\]/gi;

class TopUp extends Component {
  componentDidMount() {
    const { auth } = this.props;

    this.props.getBalance(auth);
    this.props.getVaList(auth);
  }

  handleCopyClick = text => copy(text)

  render() {
    const { vaList, error, showMessage, balance } = this.props;
    const balanceFormat = balance ? balance.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }) : 'Rp 0,-'

    if (this.props.loader) {
      return (<div className="gx-loader-view"><CircularProgress/></div>)
    }

    return (
      <div className={`deposit ${prefix}`}>
        <Card>
          <h1 className="page-title">Top Up</h1>
          <div className="balance">
            <div>BALANCE</div>
            <div className="balance-value">{`${balanceFormat.split(',')[0]},-`}</div>
          </div>
          <div className="va-info">
            <div className="text-topup">SELECT TOP UP METHOD</div>
            <div className="text-transfer">Bank Transfer</div>
            <Collapse
              expandIconPosition="right"
            >
              {vaList.map((va, index) => {

                // code for dev //
                const header = <div className="panel-header"><img src={va.urlImage} /></div>
                // end of code for dev

                // code for prod
                // const header = <div className="panel-header"><img src={"https://devwoi.jatis.com/file?name=PMTVA.png"} /></div>
                // va.bankId= ["7"];
                // end of code for prod
                return (
                  <Panel key={index} header={header}>
                    <div className="account-details text-info">
                      <div className="text">{`${va.bank} Virtual Account Number`}</div>
                      <div className="text-vac">{va.account}</div>
                      <Button onClick={() => this.handleCopyClick(va.account)}>Copy Code</Button>
                      <div className="text-acn">Account Name: PT Integra loyalti Nusantara</div>
                    </div>
                    <div className="how-to">HOW TO TRANSFER</div>
                    <Collapse expandIconPosition="right">
                      {instructions[va.bankId] && instructions[va.bankId].map((option, index) => (
                        <Panel key={index} header={option.title}>
                          <ol className="steps">
                            {option.steps.map((step, index) => (
                              <li key={index}>{step.replace(regexVaNumber, va.account)}</li>
                            ))}
                          </ol>
                        </Panel>
                      ))}
                    </Collapse>
                  </Panel>
                )
              })}
            </Collapse>
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ depositState, auth }) => {
  const { authUser: { authToken, deviceId, userId, merchantId } } = auth;

  return {
    vaList: depositState.vaList,
    loader: depositState.loader,
    error: depositState.error,
    showMessage: depositState.showMessage,
    balance: depositState.balance,
    auth: {
      authToken, deviceId, userId, merchantId
    }
  }
}

export default connect(mapStateToProps, { getVaList, getBalance })(TopUp);