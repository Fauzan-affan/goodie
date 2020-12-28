import React, { Component } from "react";
import { connect } from "react-redux";
import BasicRuleType from "../../constants/BasicRuleType";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {
  viewRule,
  updateRule,
  createRule,
  resetStatus,
} from "appRedux/actions/Rules";
import { 
  searchStore, 
} from "appRedux/actions/Store";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Popconfirm,
  Table,
  Switch,
  Modal,
  Col,
  Row,
  Icon,
  Radio,
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 14 },
};

const formItemLayoutSelect = {
  wrapperCol: { offset: 6, span: 16 },
};

const formTailLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: { span: 14, offset: 6 } },
};

const defaultState = {
  searchStoreCode: "",
  searchStoreName: "",
  searchMerchantName: "",
  sort: null,
  filter: {}
};

class CreateUpdateBasic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      basicRule: [],
      store: [],
      storeDetail: [],
      discountDisable: false,
      pointDisable: false,
      amountReqDisable: false,
      dataSource: [],
      count: 1,
      msgContent: "",
      msgType: "",
      msgShow: false,
      basicRuleCollab: false,
      isVisible: false,
      searchStoreCode: "",
      searchStoreName: "",
      searchMerchantName: "",
      selectedRowKeys: [],
      fieldSelect: false,
      selectionType: "",
      setSelectionType: "",
      value: "radio",
      storeName: "",
      ...defaultState,
    };

    this.onConfirm = this.onConfirm.bind(this);
    this.back = this.back.bind(this);
    this.onChangeSwitch = this.onChangeSwitch.bind(this);
  }

  componentWillMount() {
    if (this.props.match.params.type === "update") {
      let credential = this.props.authUser;
      credential.type = "basic";
      credential.id = this.props.match.params.id;
      this.props.viewRule(credential);
    } else {
      let basic = [];
      basic.basicRuleType = BasicRuleType.BasicRuleType.FIXED.label;
      this.setState({
        basicRule: basic,
        pointDisable: false,
        discountDisable: true,
        amountReqDisable: false,
      });
      let credential = this.props.authUser;
      const {pagination} = this.props.filterAndSort;
      credential.search = "";
      credential.page = 0;
      credential.searchStoreCode = "";
      credential.searchMerchantName = "";
      credential.isAllStore = -1;
      if(pagination != null){
        credential.page = pagination.current - 1;
    }
      this.props.searchStore(credential);
    }
  }

  componentWillReceiveProps(nextProps) {
    //get list store
    if (nextProps.listStore !== undefined) {
      this.setState({
        store: nextProps.listStore,
      });
    }
    
    if (nextProps.basicRule.isRuleCollaboration == "yes") {
      this.setState({
        storeName: nextProps.basicRule.store.storeName
      })
    }

    if (this.props.match.params.type === "update") {
      if (nextProps.basicRule !== this.props.basicRule) {
        let dataSourceRaw = [];
        let totalRec = 0;
        nextProps.basicRule.basicRuleDetailList.forEach((detail, i) => {
          detail.key = i;
          dataSourceRaw.push(detail);
          totalRec++;
        });

        if (
          nextProps.basicRule.basicRuleType ===
          BasicRuleType.BasicRuleType.PERCENTAGE.label
        ) {
          this.setState({
            basicRule: nextProps.basicRule,
            discountDisable: false,
            pointDisable: true,
            amountReqDisable: true,
            dataSource: dataSourceRaw,
            selectedRowKeys: dataSourceRaw,
            count: totalRec + 1,
          });
        } else if (
          nextProps.basicRule.basicRuleType ===
          BasicRuleType.BasicRuleType.FIXED.label
        ) {
          this.setState({
            basicRule: nextProps.basicRule,
            discountDisable: true,
            pointDisable: false,
            amountReqDisable: false,
            dataSource: dataSourceRaw,
            selectedRowKeys: dataSourceRaw,
            count: totalRec + 1,
          });
        }
      }
    }

    if (nextProps.updateSuccess && !nextProps.updateFailed) {
      this.setState({
        msgContent: "Updated Successfully",
        msgShow: true,
        msgType: "success",
      });
    } else if (!nextProps.updateSuccess && nextProps.updateFailed) {
      this.setState({
        msgContent: "Update failed",
        msgShow: true,
        msgType: "danger",
      });
    }

    if (nextProps.createSuccess && !nextProps.createFailed) {
      this.setState({
        msgContent: "Created Successfully",
        msgShow: true,
        msgType: "success",
      });
    } else if (!nextProps.createSuccess && nextProps.createFailed) {
      this.setState({
        msgContent: "Create failed",
        msgShow: true,
        msgType: "danger",
      });
    }
  }

  changeListbox(value) {
    if (value === 0) {
      let data = [];
      this.state.dataSource.forEach((product, i) => {
        product.baseLoyaltyPoint = 0;
        product.amountReq = 0;
        data.push(product);
      });

      this.setState({
        pointDisable: true,
        discountDisable: false,
        amountReqDisable: true,
        dataSource: data,
      });

      this.props.form.setFieldsValue({
        baseLoyaltyPoint: 0,
        amountReq: 0,
      });
    } else if (value === 1) {
      let data = [];
      this.state.dataSource.forEach((product, i) => {
        product.baseLoyaltyDiscount = 0;
        data.push(product);
      });

      this.setState({
        pointDisable: false,
        discountDisable: true,
        amountReqDisable: false,
        dataSource: data,
      });

      this.props.form.setFieldsValue({
        baseLoyaltyDiscount: 0,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let error = false;
        this.state.dataSource.forEach((product, i) => {
          if (values.basicRuleType === 0) {
            if (product.baseLoyaltyDiscount < 1) {
              this.errorNotification(
                "Base loyalty discount in product must greater than 0"
              );
              error = true;
              return;
            }
          }

          if (values.basicRuleType === 1) {
            if (product.baseLoyaltyPoint < 1) {
              this.errorNotification(
                "Base loyalty point in product must greater than 0"
              );
              error = true;
              return;
            }

            if (product.amountReq < 1) {
              this.errorNotification(
                "For each amount in product must greater than 0"
              );
              error = true;
              return;
            }
          }

          if (product.capPerTrx < 1) {
            this.errorNotification(
              "Maximum point in product must greater than 0"
            );
            error = true;
            return;
          }
        });

        values.basicRuleDetail = this.state.dataSource;
        values.paymentRule = 1;

        let request = this.props.authUser;
        request.data = values;
        request.type = "basic";
        request.storeId = values.storeId;

        if (!error) {
          if (this.props.match.params.type === "update") {
            this.props.updateRule(request);
          } else {
            this.props.createRule(request);
          }
        }
      }
    });
  };

  errorNotification(message) {
    return NotificationManager.error(message, "Alert", 3000);
  }

  back() {
    this.props.history.goBack();
  }

  onConfirm() {
    this.props.resetStatus();
    if (this.state.msgType === "success") {
      this.props.history.goBack();
    } else {
      this.setState({
        msgShow: false,
      });
    }
  }

  //Action For List
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    let newData = [];
    if (this.state.discountDisable === true) {
      newData = {
        key: count,
        productCode: "New Product Code",
        productName: "New Product Name",
        baseLoyaltyDiscount: 0,
        baseLoyaltyPoint: 1,
        amountReq: 1000,
        capPerTrx: 100,
      };
    } else {
      newData = {
        key: count,
        productCode: "New Product Code",
        productName: "New Product Name",
        baseLoyaltyDiscount: 10,
        baseLoyaltyPoint: 0,
        amountReq: 0,
        capPerTrx: 100,
      };
    }

    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  onChangeSwitch(checked) {
    let value = "No";
    if (checked === true) {
      value = "Yes";
      this.setState({ basicRuleCollab: true });
    } else if (checked === false) {
      value = "No";
      this.setState({ basicRuleCollab: false });
    }
    let newbasicRule = this.state.basicRule;
    newbasicRule.isRuleCollaboration = value;
    this.setState({
      basicRule: newbasicRule,
    });
  }

  searchStore = () => {
    const { searchStoreCode, searchStoreName, searchMerchantName } = this.state;
    let credential = this.props.authUser;
    const params = {
      ...(searchStoreCode ? { searchStoreCode } : {}),
      ...(searchStoreName ? { searchStoreName } : {}),
      ...(searchMerchantName ? { searchMerchantName } : {}),
    };

    credential.search = searchStoreName;
    credential.searchStoreCode = searchStoreCode;
    credential.searchMerchantName = searchMerchantName;

    this.props.searchStore({
      ...credential,
      ...params,
    });
  };

  filterSearch = (value) => {
    // const {filterOption} = this.state;
    const { searchStoreCode, searchStoreName, searchMerchantName } = this.state;
    if (value === "") {
      this.setState({ store: this.props.listStore });
    } else {
      const filterSearch = this.props.listStore.filter(
        (data) => 
        (data.storeCode.toLowerCase().indexOf(searchStoreCode.toLowerCase()) !== -1) &&
        (data.storeName.toLowerCase().indexOf(searchStoreName.toLowerCase()) !== -1) &&
        (data.merchantName.toLowerCase().indexOf(searchMerchantName.toLowerCase()) !== -1)
      );
      this.setState({ store: filterSearch });
    }
  };

  handleInputChangeStoreCode = (e) =>
    this.setState({ searchStoreCode: e.target.value });
  handleInputChangeStoreName = (e) =>
    this.setState({ searchStoreName: e.target.value });
  handleInputChangeMerchantName = (e) =>
    this.setState({ searchMerchantName: e.target.value });

  showModal = () => {
    this.setState({
      isVisible: true,
    });
  };

  handleOk = (e) => {
    let storeArray = [];
    this.state.selectedRowKeys.forEach((index, i) => {
      storeArray.push(this.state.store[index]);
    });

    this.setState({
      isVisible: false,
      storeDetail: storeArray,
      fieldSelect: true,
    });
  };

  handleCancel = (e) => {
    this.setState({
      isVisible: false,
      store: [],
    });
    Modal.destroyAll();
  };

  clearFilter = () => {
    this.setState({ ...defaultState }, this.searchStore);
  };

  onChangeSelector(selectedData) {
    // let error = false;
    // if(this.state.selectedRowKeys > 1){
    //     this.errorNotification('Just Select 1 store');
    //     error = true;
    //     return;
    // }
    this.setState({
      selectedRowKeys: selectedData,
    });
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    let { searchMerchantName, searchStoreCode, searchStoreName } = this.state;
    const {
      msgShow,
      msgType,
      msgContent,
      dataSource,
      basicRule,
      isVisible,
      selectedRowKeys,
      storeDetail,
      selectionType,
      setSelectionType,
      value,
    } = this.state;

    var statChecked = "";
    if (
      basicRule.isRuleCollaboration != null &&
      basicRule.isRuleCollaboration !== "No"
    ) {
      statChecked = "Yes";
    }

    let enableSwitch = false;
    if (this.props.match.params.type === "update") {
      enableSwitch = true;
    } else {
      enableSwitch = false;
    }

    let options = [];

    BasicRuleType.values().forEach((ruleType, i) => {
      let option = [];
      option.push(
        <Option key={i} value={ruleType.value}>
          {ruleType.label}
        </Option>
      );

      options.push(option);
    });

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    let columnsComp = [
      {
        title: "Product Code",
        dataIndex: "productCode",
        width: "15%",
        editable: true,
      },
      {
        title: "Product Name",
        dataIndex: "productName",
        width: "25%",
        editable: true,
      },
      {
        title: "Base Loyalty Discount (%)",
        dataIndex: "baseLoyaltyDiscount",
        editable: !this.state.discountDisable,
      },
      {
        title: "Base Loyalty Point",
        dataIndex: "baseLoyaltyPoint",
        editable: !this.state.pointDisable,
      },
      {
        title: "For Each Amount Of (Rp)",
        dataIndex: "amountReq",
        editable: !this.state.amountReqDisable,
      },
      {
        title: "Maximum Points",
        dataIndex: "capPerTrx",
        editable: true,
      },
      {
        title: "Action",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    const columns = columnsComp.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    const columnsStore = [
      {
        title: "Store Code",
        dataIndex: "storeCode",
        key: "storeCode",
      },
      {
        title: "Store Name",
        dataIndex: "storeName",
        key: "storeName",
      },
      {
        title: "Merchant Name",
        dataIndex: "merchantName",
        key: "merchantName",
      },
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.onChangeSelector(selectedRowKeys);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === "Disabled User",
        // Column configuration not to be checked
        name: record.name,
      }),
    };

    return (
      <Card className="gx-card" title="Basic Rule">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Rule Name">
            {getFieldDecorator("basicRuleName", {
              rules: [
                {
                  required: true,
                  message: "Please input rule name",
                },
              ],
              initialValue: basicRule.basicRuleName,
            })(<Input placeholder="Rule Name" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Rule Description">
            {getFieldDecorator("basicRuleDesc", {
              rules: [
                {
                  required: true,
                  message: "Please input rule description",
                },
              ],
              initialValue: basicRule.basicRuleDesc,
            })(<Input placeholder="Rule Description" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Basic Rule Type">
            {getFieldDecorator("basicRuleType", {
              initialValue: BasicRuleType.getValue(basicRule.basicRuleType),
              required: true,
              message: "Please input basic rule type",
            })(
              <Select
                style={{ width: "50%" }}
                onChange={this.changeListbox.bind(this)}
              >
                {options}
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Base Loyalty Discount (%)">
            {getFieldDecorator("baseLoyaltyDiscount", {
              rules: [
                {
                  required: false,
                  message: "Please input base loyalty discount",
                },
              ],
              initialValue: basicRule.baseLoyaltyDiscount
                ? basicRule.baseLoyaltyDiscount
                : 0,
            })(<InputNumber min={0} disabled={this.state.discountDisable} />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Base Loyalty Point">
            {getFieldDecorator("baseLoyaltyPoint", {
              rules: [
                {
                  required: false,
                  message: "Please input base loyalty point",
                },
              ],
              initialValue: basicRule.baseLoyaltyPoint
                ? basicRule.baseLoyaltyPoint
                : 0,
            })(<InputNumber min={0} disabled={this.state.pointDisable} />)}
          </FormItem>

          <FormItem {...formItemLayout} label="For Each Amount Of (Rp)">
            {getFieldDecorator("amountReq", {
              rules: [
                {
                  required: false,
                  message: "Please input for each amount of",
                },
              ],
              initialValue: basicRule.amountReq ? basicRule.amountReq : 0,
            })(<InputNumber min={0} disabled={this.state.amountReqDisable} />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Maximum Points">
            {getFieldDecorator("capPerTrx", {
              rules: [
                {
                  required: false,
                  message: "Please input maximum points",
                },
              ],
              initialValue: basicRule.capPerTrx ? basicRule.capPerTrx : 0,
            })(<InputNumber min={0} />)}
          </FormItem>

          <FormItem {...formItemLayout} label="Rule Store Collaboration">
            {getFieldDecorator(
              "isRuleCollaboration",
              {}
            )(
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                disabled={enableSwitch}
                onChange={this.onChangeSwitch}
                checked={statChecked}
              />
            )}
          </FormItem>

          {basicRule.isRuleCollaboration == "yes" ? (
            <FormItem {...formItemLayout} label="Store Name">
              {getFieldDecorator("storeName", {
                initialValue: this.state.storeName,
              })(<Input placeholder="Store Name" disabled={true} style={{ width: "30%" }}/>)}
            </FormItem>
          ) : (
            ""
          )}

          {this.state.basicRuleCollab === true ? (
            <FormItem {...formItemLayout} label="Select Store">
              {getFieldDecorator(
                "store",
                {}
              )(
                <Button
                  type="primary"
                  onClick={this.showModal.bind(this)}
                  style={{ marginBottom: 16 }}
                >
                  Select Store
                </Button>
              )}
            </FormItem>
          ) : (
            ""
          )}

          {this.state.fieldSelect === true
            ? storeDetail.map((item, i) => (
                <FormItem {...formItemLayout} label="Store" hidden={true}>
                  {getFieldDecorator("storeId", {
                    rules: [
                      {
                        required: true,
                        message: "Please Select Store First",
                      },
                    ],
                    initialValue: item.storeId,
                  })(
                    <Input
                      key={i}
                      placeholder="Rule Description"
                      style={{ width: "30%" }}
                    />
                  )}
                </FormItem>
              ))
            : ""}

          {this.state.fieldSelect === true
            ? storeDetail.map((item, i) => (
                <FormItem {...formItemLayout} label="Store">
                  {getFieldDecorator("storeName", {
                    rules: [
                      {
                        required: true,
                        message: "Please Select Store First",
                      },
                    ],
                    initialValue: item.storeName,
                  })(
                    <Input
                      key={i}
                      placeholder="Rule Description"
                      style={{ width: "30%" }}
                      disabled={true}
                    />
                  )}
                </FormItem>
              ))
            : ""}

          <Modal
            width={"60%"}
            title="Select Store"
            visible={isVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            destroyOnClose={true}
            footer={[
              <Button key="back" onClick={this.handleCancel.bind(this)}>
                Back
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={this.handleOk.bind(this)}
              >
                Select
              </Button>,
            ]}
          >
            <div>
              <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                  <Input.Search
                    className="search-input"
                    style={{ marginBottom: "0px" }}
                    placeholder="Store Code..."
                    value={searchStoreCode}
                    onChange={this.handleInputChangeStoreCode}
                    onSearch={this.filterSearch}
                  />
                </Col>
                <Col className="gutter-row" span={8}>
                  <Input.Search
                    className="search-input"
                    style={{ marginBottom: "0px" }}
                    placeholder="Store Name..."
                    value={searchStoreName}
                    onChange={this.handleInputChangeStoreName}
                    onSearch={this.filterSearch}
                  />
                </Col>
                <Col className="gutter-row" span={8}>
                  <Input.Search
                    className="search-input"
                    style={{ marginBottom: "0px" }}
                    placeholder="Merchant Name..."
                    value={searchMerchantName}
                    onChange={this.handleInputChangeMerchantName}
                    onSearch={this.filterSearch}
                  />
                </Col>
              </Row>
            </div>

            <Row gutter={16} style={{ paddingTop: "10px" }}>
              <Col className="gutter-row">
                <Button type="primary" onClick={this.filterSearch} danger="true">
                  Search <Icon type="search" />
                </Button>
                <Button onClick={this.clearFilter}>
                  Clear filters and sorters
                </Button>
              </Col>
            </Row>

            <hr />

            <Radio.Group
              onChange={this.onChange}
              value={this.state.value}
              hidden={true}
            >
              {/* <Radio value="radio">radio</Radio> */}
            </Radio.Group>

            <Table
              className="gx-table-responsive"
              rowKey={(record) => record.uid}
              rowSelection={{
                type: "radio",
                ...rowSelection,
              }}
              pagination={true}
              columns={columnsStore}
              dataSource={this.state.store}
            />
          </Modal>

          <div style={{ marginBottom: "20px" }}>
            <Button
              onClick={this.handleAdd}
              type="primary"
              style={{ marginBottom: 16 }}
            >
              Add rule for specific product
            </Button>
            <Table
              className="gx-table-responsive"
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={dataSource}
              columns={columns}
              pagination={true}
            />
          </div>

          <hr />

          <FormItem {...formTailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="default" onClick={this.back}>
              Back
            </Button>
          </FormItem>
        </Form>
        <SweetAlert
          success={msgType === "success" ? true : false}
          danger={msgType === "danger" ? true : false}
          show={msgShow}
          title={msgContent}
          onConfirm={this.onConfirm}
        ></SweetAlert>
        <NotificationContainer />
      </Card>
    );
  }
}

// Create List Table
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = (e) => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;

    const className = !editable ? "custom-disable" : "custom-enable";
    restProps.className = className;

    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return editing ? (
                dataIndex === "productCode" || dataIndex === "productName" ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [
                        {
                          required: true,
                          message: `${title} is required.`,
                        },
                      ],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={(node) => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [
                        {
                          required: true,
                          message: `${title} is required.`,
                        },
                      ],
                      initialValue: record[dataIndex],
                    })(
                      <InputNumber
                        ref={(node) => (this.input = node)}
                        min={1}
                        onPressEnter={this.save}
                        onBlur={this.save}
                      />
                    )}
                  </FormItem>
                )
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

const mapStateToProps = ({ auth, rules, storeState }) => {
  const { authUser } = auth;
  const { listStore, filterAndSort } = storeState;
  const {
    basicRule,
    updateSuccess,
    updateFailed,
    updateData,
    createSuccess,
    createFailed,
    createData,
  } = rules;
  return {
    authUser,
    basicRule,
    updateSuccess,
    updateFailed,
    updateData,
    createSuccess,
    createFailed,
    createData,
    listStore,
    filterAndSort
  };
};

export default connect(mapStateToProps, {
  viewRule,
  updateRule,
  createRule,
  resetStatus,
  searchStore,
})(Form.create()(CreateUpdateBasic));