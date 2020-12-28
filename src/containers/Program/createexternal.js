import React, { Component } from "react";
import { connect } from "react-redux";

import { currency } from "../../constants/Util";
import { searchProducts, selectProduct } from "appRedux/actions/Product";
import { viewMerchant } from "appRedux/actions/Merchant";
import {
  Empty,
  Card,
  Col,
  message,
  Row,
  Input,
  Dropdown,
  Button,
  Icon,
  Menu,
  Select,
} from "antd";
import CircularProgress from "components/CircularProgress/index";

// Inline Styles
const card = {
  padding: "0px 16px",
};

const row = {
  margin: "10px 0",
};

// const column = {
//   border: "1px solid black"
// }

const label = {
  margin: "10px 0",
};

const minMax = {
  marginBottom: "15px",
};

// Initial Variabel
const sortOptions = [
  { sortby: "sortByMerchantName", direction: "ASC" },
  { sortby: "sortByMerchantName", direction: "DESC" },
  { sortby: "sortByCreatedDate", direction: "ASC" },
  { sortby: "sortByCreatedDate", direction: "DESC" },
];

const productTypeOptions = [
  { value: 1, label: "Voucher" },
  { value: 2, label: "Coupon" },
  { value: 5, label: "Biller" },
];

const defaultState = {
  search: "",
  sort: null,
  filter: {
    price: {
      min: null,
      max: null,
    },
    productType: 0,
    currencyType: "",
  },
};

class CreateExternal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      merchant: [],
      productList: [],
      currencyList: [],
      ...defaultState,
    };

    this.onClickProduct = this.onClickProduct.bind(this);
    this.back = this.back.bind(this);
  }

  componentWillMount() {
    let credential = this.props.authUser;
    credential.isExternal = -1;
    this.props.searchProducts(credential);

    // for view merchant
    this.props.viewMerchant(credential);
  }

  componentWillReceiveProps(nextProps) {
    // for get param currency
    if (
      nextProps.merchant !== undefined &&
      nextProps.merchant !== this.props.merchant
    ) {
      this.setState({
        currencyList: nextProps.merchant.currency.listCurrency,
      });
    }
  }

  back() {
    this.props.history.goBack();
  }

  onClickProduct = (product) => {
    this.props.selectProduct(product);
    this.props.history.push("/reward/create/external/");
  };

  createProductList = (productList) => {
    let content = (
      <Col
        xl={12}
        xl={24}
        md={12}
        xs={24}
        style={{ margin: "auto", height: "100%", width: "100%" }}
      >
        <Empty />
      </Col>
    );

    if (productList !== undefined) {
      content = [];
      productList.forEach((product, i) => {
        var comp = [];

        comp.push(
          <Col
            xs={24}
            sm={12}
            md={8}
            xl={6}
            style={{ margin: "auto", height: "100%" }}
            key={i}
          >
            <div
              className={`gx-product-item  gx-product-vertical custom-collab-item gx-package`}
              onClick={() => this.onClickProduct(product)}
            >
              <div className="gx-product-image" style={{ marginTop: "15px" }}>
                <div className="gx-grid-thumb-equal">
                  <span
                    className="gx-link gx-grid-thumb-cover"
                    style={{ textAlign: "center" }}
                  >
                    <img
                      src={
                        product.productImage == null ||
                        product.productImage === ""
                          ? require("assets/images/widget/noodles.png")
                          : product.productImage
                      }
                      className={"custom-image-container"}
                    />
                  </span>
                </div>
              </div>

              <div className="gx-product-body" style={{ textAlign: "center" }}>
                <h3 className="gx-product-title">{product.productName}</h3>
                <h5>
                  Provided By{" "}
                  <span className="custom-by">{product.merchantName}</span>
                </h5>
                <div className="custom-price">
                  <h4>
                    {currency(
                      (product.amount == null ? 0 : product.amount) +
                        (product.fee == null ? 0 : product.fee),
                      product.currency
                    )}
                  </h4>
                </div>
              </div>
            </div>
          </Col>
        );

        content.push(comp);
      });
    }
    return content;
  };

  handlePriceFilterChange = (e) => {
    const { name, value } = e.target;
    const priceUpdate = name === "priceMin" ? { min: value } : { max: value };

    this.setState(({ filter: prevFilter }) => ({
      filter: {
        ...prevFilter,
        price: {
          ...prevFilter.price,
          ...priceUpdate,
        },
      },
    }));
  };

  searchProducts = () => {
    const { search, sort, filter } = this.state;
    const { productType, currencyType, price } = filter;

    const params = {
      ...(search ? {search} : {}),
      ...this.generateSortAndSortby(sort),
      ...(productType ? { productType } : {}),
      ...(currencyType ? { currencyType } : {}),
      ...(price.min ? { minPrice: price.min } : {}),
      ...(price.max ? { maxPrice: price.max } : {}),
    };

    this.props.searchProducts({
      ...this.props.authUser,
      isExternal: -1,
      ...params,
    });
  };

  generateSortAndSortby = (sort) => {
    const { sortby, direction } = this.mappingSort(sort);
    let sortbyNumber = 2, sortNumber = 2;

    // sortby
    if (sortby === "sortByMerchantName") {
      sortbyNumber = 2
    } 
    else if (sortby === "sortByCreatedDate") {
      sortbyNumber = 1
    } 
    else {
      sortbyNumber = 2
    }

    // direction
    if (direction === "DESC") {
      sortNumber = 2
    }
    else if (direction === "ASC") {
      sortNumber = 1
    }
    else {
      sortNumber = 2
    }

    return {
      sortbyNumber,
      sortNumber
    }
  }

  mappingSort = (key) => (key ? sortOptions[key] : {});

  handleSort = (e) => {
    this.setState(
      () => ({ sort: e.key }),
      () => this.searchProducts()
    );
  };

  sortMenu = (sort) => (
    <Menu onClick={this.handleSort} selectedKeys={[sort]}>
      <Menu.Item key={0}>Merchant Name A - Z</Menu.Item>
      <Menu.Item key={1}>Merchant Name Z - A</Menu.Item>
      <Menu.Item key={2}>Newest - Oldest</Menu.Item>
      <Menu.Item key={3}>Oldest - Newest</Menu.Item>
    </Menu>
  );

  getSortDirection = (value) =>
    `sort-${value === "DESC" ? "descending" : "ascending"}`;

  getSortDisplay = () => {
    const { sortby, direction } = this.mappingSort(this.state.sort);

    if (sortby === "sortByCreatedDate") {
      return (
        <span>
          Created Date <Icon type={this.getSortDirection(direction)} />
        </span>
      );
    } else if (sortby === "sortByMerchantName") {
      return (
        <span>
          Merchant Name <Icon type={this.getSortDirection(direction)} />
        </span>
      );
    } else {
      return (
        <span>
          <Icon type="arrow-up" />
          <Icon type="arrow-down" />
        </span>
      );
    }
  };

  handleInputChange = (e) => this.setState({ search: e.target.value });

  handleSelectCategory = (productType) =>
    this.setState(({ filter: prev }) => ({
      filter: { ...prev, productType },
    }));

  handleSelectCurrency = (currencyType) =>
    this.setState(({ filter: prev }) => ({
      filter: { ...prev, currencyType },
    }));

  clearFilter = () => {
    this.setState({ ...defaultState }, this.searchProducts);
  };

  render() {
    let { loader, alertMessage, showMessage, listProducts } = this.props;
    const { search, sort, filter } = this.state;
    const { price, productType, currencyType } = filter;

    if (loader) {
      return (
        <div className="gx-loader-view">
          <CircularProgress />
        </div>
      );
    }

    return (
      <Row>
        <Col span={24}>
          {/* --- A new searching card --- */}
          <Card style={card}>
            <Row className="reward-search-and-category" style={row}>
              <Col xs={24} xl={12} >
                <div className="search-label" style={label}>
                  Search
                </div>
                <Input.Search
                  className="search-input"
                  style={{ marginBottom: "0px" }}
                  placeholder="Search Reward..."
                  value={search}
                  onChange={this.handleInputChange}
                  onSearch={this.searchProducts}
                />
              </Col>
              <Col xs={24} xl={12} >
                <div className="category-label" style={label}>
                  Category
                </div>
                <Select
                  className="category-input"
                  style={{minWidth: "100%"}}
                  defaultValue={0}
                  value={productType}
                  onChange={this.handleSelectCategory}
                >
                  <Select.Option className="selection" value={0}>
                    Default Category
                  </Select.Option>
                  {productTypeOptions.map((option, key) => (
                    <Select.Option className="selection" value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row className="reward-currency-and-price" style={row}>
              <Col xs={24} xl={6} >
                <div className="category-label" style={label}>
                  Currency
                </div>
                <Select
                  className="currency-input"
                  style={{minWidth: "100%"}}
                  defaultValue={0}
                  value={currencyType}
                  onChange={this.handleSelectCurrency}
                >
                  <Select.Option className="selection" value={0}>
                    Select Currency
                  </Select.Option>
                  {this.state.currencyList.map((option, key) => (
                    <Select.Option
                      className="selection"
                      value={option.lookupDtlId}
                    >
                      {option.lookupValue}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col md={24} xl={18} >
                <div className="price-label" style={label}>
                  Filter Price
                </div>
                <Row>
                  <Col xs={24} md={12} >
                    <Input
                      name="priceMin"
                      style={minMax}
                      onChange={this.handlePriceFilterChange}
                      value={price.min}
                      type="number"
                      addonBefore="Min Price"
                    />
                  </Col>
                  <Col xs={24} md={12} >
                    <Input
                      name="priceMax"
                      onChange={this.handlePriceFilterChange}
                      value={price.max}
                      type="number"
                      addonBefore="Max Price"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="reward-buttons" style={row}>
              <Col md={24} >
                <Dropdown className="sort-reward" overlay={this.sortMenu(sort)}>
                  <Button type="primary" danger>
                    <span className="sort-label">Sort by</span>
                    {this.getSortDisplay()}
                  </Button>
                </Dropdown>

                <Button type="primary" onClick={this.searchProducts} danger>
                  Apply Filter <Icon type="filter" />
                </Button>

                <Button onClick={this.clearFilter}>
                  Clear filters and sorters
                </Button>
              </Col>
            </Row>
          </Card>

          {!(showMessage && alertMessage) ? (
            <div className="gx-price-tables gx-pt-default">
              <Row>{this.createProductList(listProducts)}</Row>
            </div>
          ) : (
            <Empty />
          )}
        </Col>

        <div style={{ width: "100%", height: "100%" }}>
          {loader === true ? (
            <div className="gx-loader-view">
              <CircularProgress />
            </div>
          ) : null}
          {showMessage ? message.error(alertMessage.toString()) : null}
        </div>
      </Row>
    );
  }
}

const mapStateToProps = ({ auth, productState, merchantState }) => {
  const { authUser } = auth;
  const { listProducts, loader, alertMessage, showMessage } = productState;
  const { merchant, currency } = merchantState;
  return {
    authUser,
    listProducts,
    loader,
    alertMessage,
    showMessage,
    merchant,
    currency,
  };
};

export default connect(mapStateToProps, {
  searchProducts,
  selectProduct,
  viewMerchant,
})(CreateExternal);
