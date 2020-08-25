import React, { Component } from 'react';
import { connect } from 'react-redux';
import CircularProgress from "components/CircularProgress";
import { getGameTypes, searchGamification, deleteGamification } from 'appRedux/actions/Gamification';
import { Card, Select, Form, DatePicker, Button, Table, Divider, Row, Col, Modal, Alert, Input, Pagination } from 'antd';

// MAIN
class GamificationList extends Component {
  state = { modalData: { id: null, type: null } , showModal: false };

  componentDidMount() {
    const { authToken, deviceId, userId, merchantId } = this.props.authUser;

    this.props.getGameTypes({
      authToken, deviceId, userId, merchantId
    });
    this.searchGamification();
  };

  searchGamification(params) {
    const { authToken, deviceId, userId, merchantId } = this.props.authUser;

    this.props.searchGamification({
      authToken, deviceId, userId, merchantId, nRecords: 10,
      ...(params ? params : {})
    });
  };

  handleCreateGame = () => this.props.history.push('/rules/gamification/create');
  handleUpdateGame = id => this.props.history.push(`/rules/gamification/update/${id}`);
  closeModal = () => this.setState({ showModal: false, modalData: { id: null, type: null } });
  handleDelete = () => {
    const { authToken, deviceId, userId, merchantId } = this.props.authUser;
    this.props.deleteGamification({ 
      authToken, deviceId, userId, merchantId,
      id: this.state.modalData.id, gameType: this.state.modalData.type
    });
    this.closeModal();
  }

  columns = [
    {
      title: 'Game Name',
      key: 'gameName',
      dataIndex: 'gameName'
    },
    {
      title: 'Game Type',
      key: 'typeName',
      dataIndex: 'typeName'
    },
    {
      title: 'Action',
      key: 'action',
      render: ({ typeName, gameId }) => (
        <span>
          <a 
            href={`/rules/gamification/update/${typeName.toLowerCase()}/${gameId}`}
          >
              Edit
          </a>
          <Divider type="vertical" />
          <a onClick={e => {
            e.preventDefault();
            this.setState({ modalData: {id: gameId, type: typeName}, showModal: true });
          }}>Delete</a>
        </span>
      )
    }
  ];
  changePage = (page) => this.searchGamification({ page: page.current - 1,  })

  render() {
    const { gameTypes, loader, listGamification, deleteSuccess, deleteFailed, showMessage, alertMessage } = this.props;

    if (gameTypes.loader || loader) {
      return (<div className="gx-loader-view"><CircularProgress/></div>)
    }

    return (
      <div className="gamification-list">
        {deleteSuccess?
          <Alert
            message="Gamification deleted successfully"
            type="success"
            closable
            style={{ marginBottom: 20 }}
          /> : null
        }
        {deleteFailed?
          <Alert
            message={alertMessage}
            type="error"
            closable
            style={{ marginBottom: 20 }}
          /> : null
        }
        <Modal
          title="Delete Gamification"
          visible={this.state.showModal}
          onOk={this.handleDelete}
          onCancel={this.closeModal}
        >
          <p>{`Delete ${this.state.modalData.id} gamification?`}</p>
        </Modal>
        <Card>
          <GamificationFilter 
            gameTypes={gameTypes.data} 
            onCreate={this.handleCreateGame}
            onUpdate={this.handleUpdateGame}
            onSearch={this.props.searchGamification}
            authUser={this.props.authUser}
          />
          <Divider />
          <RuleList 
            listGamification={listGamification.content} 
            columns={this.columns}
            totalPages={listGamification.totalPages}
            currentPage={listGamification.number + 1}
            totalElements={listGamification.totalElements}
            changePage={this.changePage}
          />
        </Card>
      </div>
    )
  }
}

// FILTER
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  labelAlign: 'left'
};
class GamificationFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameName: '',
      gameType: '',
      startDate: '',
      endDate: ''
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  handleDateChange = (date, dateString) => this.setState({
    startDate: dateString[0],
    endDate: dateString[1]
  });

  handleGameTypeChange = gameType => this.setState({ gameType });

  searchGamification() {
    if (this) {
      const { authToken, deviceId, userId, merchantId } = this.props.authUser;
      const {
        gameName,
        gameType,
        startDate,
        endDate
      } = this.state
  
      this.props.searchGamification({
        authToken, deviceId, userId, merchantId,
        ...(gameType ? {typeName: gameType} : {}),
        ...(gameName ? {gameName} : {}),
        ...(startDate ? {startDate} : {}),
        ...(endDate ? {endDate} : {}),
      });
    }
  };

  render() {
    const { gameType, gameName } = this.state;
    const { gameTypes, onCreate, onSearch } = this.props;

    return (
      <div>
        <h3>Gamification</h3>
        <Form {...formItemLayout}>
          <Form.Item label="Game name">
            <Input name="gameName" onChange={this.handleInputChange} value={gameName}/>
          </Form.Item>
          <Form.Item label="Game Type">
            {gameTypes && gameTypes.length && <Select defaultValue={gameType} onChange={this.handleGameTypeChange}>
              {gameTypes.map(({ id, name }, index) => (
                <Select.Option value={id} key={index}>
                  {name}
                </Select.Option>
              ))}
            </Select>}
          </Form.Item>
          <Form.Item label="Date">
            <DatePicker.RangePicker onChange={this.handleDateChange}/>
          </Form.Item>
          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <Button htmlType="submit" type="primary" onClick={this.searchGamification}>
                Search
              </Button>
              <Button type="primary" onClick={onCreate}>Create</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
};

// SEARCH RESULT
const RuleList = ({ listGamification, columns, totalPages, currentPage, totalElements, changePage }) => {

  return (
    <div>
      <h3>Gamification List</h3>
      <Table 
        columns={columns} 
        dataSource={listGamification}
        pagination={{
          pageSize: 10,
          total: totalElements,
          current: currentPage
        }}
        onChange={changePage}
      />
      {/* <Pagination total={totalPages} current={currentPage} /> */}
    </div>
  );
};

const mapStateToProps = ({ auth, gamificationState }) => {
  const { authUser } = auth;
  const { gameTypes, listGamification, loader, deleteSuccess, deleteFailed, alertMessage, showMessage } = gamificationState;

  return { authUser, gameTypes, listGamification, loader, deleteSuccess, deleteFailed, alertMessage, showMessage };
};

export default connect(mapStateToProps, { getGameTypes, searchGamification, deleteGamification })(GamificationList)