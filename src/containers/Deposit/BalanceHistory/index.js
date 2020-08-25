import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Card, DatePicker, Button, Alert } from "antd";
import moment from "moment";
import { CSVLink } from "react-csv";
import { getDepositBalanceHistory } from "appRedux/actions/Deposit";
import CircularProgress from "components/CircularProgress";

const prefix = 'balance-history';

class BalanceHistory extends Component {
  componentDidMount() {
    this.props.getDepositBalanceHistory(this.props.auth);
  }

  state = {
    startDate: null,
    endDate: null,
    dateMoment: [null, null]
  }

  onDateChange = (date, dateString) => {
    this.setState({
      startDate: dateString[0],
      endDate: dateString[1],
      dateMoment: date
    });
  }

  clearFilter = () => {
    this.setState({
      startDate: null,
      endDate: null,
      dateMoment: [null, null]
    })
  }

  columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Posting Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
    },
    {
      title: 'Order Number',
      dataIndex: 'transactionNumber',
      key: 'transactionNumber',
    },
    {
      title: 'Market Place',
      dataIndex: 'marketPlace',
      key: 'marketPlace',
    },
    {
      title: 'Entry Type',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ]

  csvHeader = this.columns.map(col => ({
    label: col.title,
    key: col.key
  }));

  render(){
    const { startDate, endDate, dateMoment } = this.state;
    const data = startDate && endDate ? 
      this.props.balanceHistory.map(mapBalanceToData)
        .filter(item => moment(item.paymentDate).isBetween(startDate, endDate, null, '[]')) : 
      this.props.balanceHistory.map(mapBalanceToData);
    const { loader, error, showMessage } = this.props;

    if (loader) {
      return (<div className="gx-loader-view"><CircularProgress/></div>)
    }

    return (
      <div className={`deposit ${prefix}`}>
        {error && error.statusText && showMessage && <div className="error"><Alert type="error" message={error.statusText} banner /></div>}
        <Card>
          <h1 className="page-title">Balance History</h1>
          <div className="table-action">
            <DatePicker.RangePicker 
              onChange={this.onDateChange} 
              className="table-action-item"
              value={dateMoment}
            />
            <Button 
              type="primary" 
              icon="download" 
              size="default"
              className="table-action-item"
            >
              <CSVLink 
                data={data} 
                headers={this.csvHeader}
                filename={"Deposit Report.csv"}
              >
                <span className="csv-download-text">Download</span>
              </CSVLink>
            </Button>
          </div>
          <div>
            <Button onClick={this.clearFilter}>Clear filters and sorters</Button>
          </div>
          <Table 
            columns={this.columns} 
            dataSource={data}
          />
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ depositState, auth }) => {
  const { authUser: { authToken, deviceId, userId, merchantId } } = auth;

  return {
    balanceHistory: depositState.balanceHistory,
    loader: depositState.loader,
    error: depositState.error,
    auth: {
      authToken, deviceId, userId, merchantId
    }
  }
}

const mapBalanceToData = (item, index) => ({
  no: index + 1,
  paymentDate: typeof item.paymentDate === 'string' ? item.paymentDate.split(' ')[0] : '',
  transactionNumber: item.transactionNumber,
  marketPlace: 'PT Goodie',
  paymentMethod: item.paymentMethod || 'Top-Up',
  amount: item.amount,
});

export default connect(mapStateToProps, { getDepositBalanceHistory })(BalanceHistory);