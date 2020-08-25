import React, {Component} from "react";
import {connect} from "react-redux";
import {currency} from '../../constants/Util';
import {
    searchProducts,
    selectProduct
} from "appRedux/actions/Product";
import {
    viewMerchant,
    getCurrency
} from "appRedux/actions/Merchant";
import {
    Empty, Card, Col, message, Row, Input, Dropdown, Button, Icon, Menu, Select
} from "antd";
import CircularProgress from "components/CircularProgress/index";

const sortOptions = [
    { sortby: 'sortByMerchantName', direction: 'ASC' },
    { sortby: 'sortByMerchantName', direction: 'DESC'},
    { sortby: 'sortByCreatedDate', direction: 'ASC' },
    { sortby: 'sortByCreatedDate', direction: 'DESC'},
]
const productTypeOptions = [
    { value: 1, label: "Voucher" },
    { value: 2, label: "Coupon" },
    { value: 4, label: "Exchange Points" },
    { value: 5, label: "Biller" }
]
const productCurrencyOptions = [
    { value: 1, label: "PHP" },
    { value: 2, label: "Rp" },
]
const defaultState = {
    search: '',
    sort: null,
    filter: {
        price: {
            min: null,
            max: null
        },
        productType: 0,
        productCurrencyType: 0
    }
}

class CreateExternal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            merchant: [],
            productList: [],
            ...defaultState
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
        // if (nextProps.listProducts !== this.props.listProducts) {
        //     this.setState({
        //         productList: nextProps.listProducts
        //     });
        // }

        // for get param currency
        if (nextProps.merchant !== undefined && nextProps.merchant !== this.props.merchant) {
            let request = {
                authToken: localStorage.getItem('a'),
                deviceId: localStorage.getItem('d'),
                userId: localStorage.getItem('u'),
                merchantId: localStorage.getItem('mt'),
                paramCurrencyPoint: nextProps.merchant.paramCurrencyPoint
            };
            this.props.getCurrency(request);
        }
    }

    back() {
        this.props.history.goBack();
    }

    onClickProduct = (product) => {
        this.props.selectProduct(product);
        this.props.history.push('/reward/create/external/');
    };

    createProductList = (productList) => {

        let content =
            <Col xl={12} xl={24} md={12} xs={24} style={{margin: 'auto', height: "100%", width: "100%"}}>
                <Empty/>
            </Col>;

        if (productList !== undefined) {
            content = [];
            productList.forEach((product, i) => {
                var comp = [];

                comp.push(
                    <Col xs={24} sm={12} md={8} xl={6} style={{margin: 'auto', height: "100%",}} key={i}>
                        <div className={`gx-product-item  gx-product-vertical custom-collab-item gx-package`}
                             onClick={() => this.onClickProduct(product)}>
                            <div className="gx-product-image" style={{marginTop: '15px'}}>
                                <div className="gx-grid-thumb-equal">
                                      <span className="gx-link gx-grid-thumb-cover" style={{textAlign: 'center'}}>
                                        <img
                                            src={product.productImage == null || product.productImage === '' ? require('assets/images/widget/noodles.png') : product.productImage}
                                            className={'custom-image-container'}
                                        />
                                      </span>
                                </div>
                            </div>

                            <div className="gx-product-body" style={{textAlign: 'center'}}>
                                <h3 className="gx-product-title">
                                    {product.productName}
                                </h3>
                                <h5>Provided By <span className="custom-by">{product.merchantName}</span></h5>
                                <div className="custom-price">
                                    <h4>
                                        {/*{currency((product.amount == null ? 0 : product.amount) +*/}
                                        {/*    (product.fee == null ? 0 : product.fee))}*/}
                                        {console.log('rew currency' + currency)}
                                        {console.log('rew currency 1' + JSON.stringify(this.props.merchant.currency))}
                                        {currency((product.amount == null ? 0 : product.amount) +
                                            (product.fee == null ? 0 : product.fee), this.props.merchant.currency)}
                                    </h4>
                                </div>

                                {/*<p>{description}</p>*/}
                            </div>
                        </div>
                    </Col>
                );

                content.push(comp);
            });
        }
        return content;
    }

    handleInputChange = e => {
        const search = e.target.value
        this.setState(() => ({ search }));
    };

    handlePriceFilterChange = e => {
        const { name, value } = e.target;
        const priceUpdate = name === 'priceMin' ? { min: value } : { max: value };

        this.setState(({ filter: prevFilter }) => ({
            filter: {
                ...prevFilter,
                price: {
                    ...prevFilter.price,
                    ...priceUpdate
                }
            }
        }))
    }

    searchProducts = () => {
        const { sort, search, filter } = this.state;
        const { productType, productCurrencyType, price } = filter;
        const params = {
            ...{ productName: search },
            ...this.mappingSort(sort),
            ...(productType? { productType } : {}),
            ...(productCurrencyType? { productCurrencyType } : {}),
            ...(price.min? { minPrice: price.min } : {}),
            ...(price.max? { maxPrice: price.max } : {}),
        }

        this.props.searchProducts({
            ...this.props.authUser,
            isExternal: -1,
            ...params
        });
    }

    mappingSort = key => key ? sortOptions[key] : {}

    handleSort = e => {
        this.setState(() => ({ sort: e.key }), () => this.searchProducts())
    }

    sortMenu = sort => (
        <Menu onClick={this.handleSort} selectedKeys={[sort]}>
            <Menu.Item key={0}>Merchant Name A - Z</Menu.Item>
            <Menu.Item key={1}>Merchant Name Z - A</Menu.Item>
            <Menu.Item key={2}>Newest - Oldest</Menu.Item>
            <Menu.Item key={3}>Oldest - Newest</Menu.Item>
        </Menu>
    )

    getSortDirection = value => `sort-${value === 'DESC' ? 'descending' : 'ascending'}`;

    getSortDisplay = () => {
        const { sortby, direction } = this.mappingSort(this.state.sort);

        if (sortby === 'sortByCreatedDate') {
            return (<span>Created Date <Icon type={this.getSortDirection(direction)} /></span>);
        } else if (sortby === 'sortByMerchantName') {
            return (<span>Merchant Name <Icon type={this.getSortDirection(direction)} /></span>)
        } else {
            return (<span><Icon type="arrow-up" /><Icon type="arrow-down" /></span>)
        }
    }

    handleSelectCategory = productType => this.setState(({ filter: prev }) => ({ filter: { ...prev, productType } }))
    
    handleSelectCurrency = productCurrencyType => this.setState(({ filter: prev }) => ({ filter: { ...prev, productCurrencyType } }))
    
    clearFilter = () => this.setState({ ...defaultState }, this.searchProducts)

    render() {
        let {loader, alertMessage, showMessage, listProducts} = this.props;
        const { search, sort, filter } = this.state;
        const { price, productType, productCurrencyType } = filter;

        if (loader) {
            return (<div className="gx-loader-view"><CircularProgress/></div>)
        }

        return (
            <Row>
                <Col span={24}>
                    <Card>
                        <Row className="reward-search">
                            <Col md={24}>
                                <Input.Search 
                                    placeholder="Search Reward..."
                                    value={search}
                                    onChange={this.handleInputChange}
                                    onSearch={this.searchProducts}
                                    className="search-input"
                                />
                            </Col>
                        </Row>
                        <div className="reward-filter-label">Filter Reward</div>
                        <Row className="reward-filter">
                            <Col xl={6} md={24}>
                                <Input 
                                    name="priceMin" 
                                    onChange={this.handlePriceFilterChange} 
                                    value={price.min} 
                                    type="number" 
                                    addonBefore="Minimum Price"
                                />
                            </Col>
                            <Col xl={6} md={24}>
                                <Input 
                                    name="priceMax" 
                                    onChange={this.handlePriceFilterChange} 
                                    value={price.max} 
                                    type="number" 
                                    addonBefore="Maximum Price"
                                />
                            </Col>
                        </Row>
                        <div className="reward-filter-label">Category</div>
                        <Row className="reward-filter">
                        <Col xl={6} md={24}>
                            <Select className="category-input" defaultValue={0} value={productType} onChange={this.handleSelectCategory}>
                                <Select.Option className="selection" value={0}>Default</Select.Option>
                                {productTypeOptions.map((option, key) => (
                                    <Select.Option className="selection" value={option.value}>{option.label}</Select.Option>
                                ))}

                            </Select>
                        </Col>
                        <Col xl={6} md={24}>
                                <Select className="category-input" defaultValue={0} value={productCurrencyType} onChange={this.handleSelectCurrency}>
                                <Select.Option className="selection" value={0}>Currency</Select.Option>
                                {productCurrencyOptions.map((option, key) => (
                                    <Select.Option className="selection" value={option.value}>{option.label}</Select.Option>
                                ))}

                            </Select>
                        </Col>
                        <Col xl={6} md={24}>
                            <Button onClick={this.searchProducts}>Apply Filter <Icon type="filter" /></Button>
                        </Col>
                        </Row>
                        <Row className="filter-button">
                        </Row>
                        <Row>
                            <Col xl={3} md={24}>
                                <Dropdown className="sort-reward" overlay={this.sortMenu(sort)}>
                                    <Button><span className="sort-label">Sort by</span>{this.getSortDisplay()}</Button>
                                </Dropdown>
                            </Col>
                            <Col xl={3} md={24}>
                                <Button onClick={this.clearFilter}>Clear filters and sorters</Button>
                            </Col>
                        </Row>
                    </Card>
                    {!(showMessage && alertMessage) ? <div className="gx-price-tables gx-pt-default">
                        <Row>
                            {this.createProductList(listProducts)}
                        </Row>
                    </div> : <Empty />}
                </Col>

                <div style={{width: '100%', height: "100%"}}>
                    {loader === true ? <div className="gx-loader-view"><CircularProgress/></div> : null}
                    {showMessage ? message.error(alertMessage.toString()) : null}
                </div>
            </Row>
        );
    }
}

const mapStateToProps = ({auth, productState, merchantState}) => {
    const {authUser} = auth;
    const {listProducts, loader, alertMessage, showMessage} = productState;
    const {merchant, currency} = merchantState;
    return {authUser, listProducts, merchant, currency, loader, alertMessage, showMessage}
};

export default connect(mapStateToProps, {searchProducts, selectProduct, getCurrency, viewMerchant})(CreateExternal);


