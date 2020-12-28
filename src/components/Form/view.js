import React, { Component } from "react";
import { Button, Card, Form, Table, Switch } from "antd";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 14 },
};

const formListLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: 18 },
};

const formTailLayout = {
  labelCol: { xs: 24, sm: 6 },
  wrapperCol: { xs: 24, sm: { span: 14, offset: 6 } },
};

class ViewForm extends Component {
  constructor(props) {
    super(props);
  }

  backEvent = () => {
    this.props.onBack();
  };

  render() {
    return (
      <Card className="gx-card" title={this.props.title}>
        <Form>
          {this.createContent(this.props.component)}

          <FormItem {...formTailLayout} style={{ marginTop: "20px" }}>
            <Button onClick={this.backEvent} type="default">
              Back
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }

  //Fill form content
  createContent = (formContents) => {
    let content = [];

    formContents.forEach((formContent, i) => {
      var comp = [];

      //For input component
      if (formContent.type === "text") {
        comp.push(
          <FormItem {...formItemLayout} label={formContent.label} key={i}>
            <span className="ant-form-text">{formContent.value}</span>
          </FormItem>
        );
      } else if (formContent.type === "image") {
        comp.push(
          <FormItem {...formItemLayout} label={formContent.label} key={i}>
            <span className="ant-form-text">
              <img
                src={formContent.value}
                alt="image not found"
                width={"300px"}
              />
            </span>
          </FormItem>
        );
      } else if (formContent.type === "list partial") {
        if (formContent.listData != null) {
          comp.push(
            <FormItem {...formListLayout} label={formContent.label} key={i}>
              <Table
                className="gx-table-responsive"
                pagination={true}
                columns={formContent.columns}
                dataSource={formContent.listData}
              />
            </FormItem>
          );
        }
      } else if (formContent.type === "list full") {
        if (formContent.listData != null) {
          comp.push(
            <div>
              <FormItem {...formListLayout} label={formContent.label} key={i} />
              <Table
                className="gx-table-responsive"
                pagination={true}
                columns={formContent.columns}
                dataSource={formContent.listData}
              />
            </div>
          );
        }
      } else if (formContent.type === "list without pgnation") {
        if (formContent.listData != null) {
          comp.push(
            <FormItem {...formListLayout} label={formContent.label} key={i}>
              <Table
                className="gx-table-responsive"
                pagination={false}
                columns={formContent.columns}
                dataSource={formContent.listData}
              />
            </FormItem>
          );
        }
      } else if (formContent.type === "html") {
        comp.push(
          <FormItem {...formItemLayout} label={formContent.label} key={i}>
            <div
              className="ant-form-text"
              dangerouslySetInnerHTML={{ __html: formContent.value }}
            ></div>
          </FormItem>
        );
      } else if (formContent.type === "switch") {
        // console.log(formContent)
        comp.push(
            <FormItem {...formItemLayout} label={formContent.label}>
                <Switch
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    disabled={formContent.disableSwitch}
                    checked={formContent.checked}
                />
            </FormItem>
        )
      }

      content.push(comp);
    });
    return content;
  };
}

// const WrappedDynamicRule = Form.create()(InsertForm);

export default ViewForm;
