import {
    SEARCH_PRODUCTS,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    SEARCH_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS_FAILED,
    FILTER_SEARCH_PRODUCTS,
    CLEAR_FILTER_SEARCH_PRODUCTS,
    RESET_STATUS,
    VIEW_PRODUCT_SUCCESS,
    VIEW_PRODUCT_FAILED,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILED,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILED,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILED,
    SELECT_PRODUCT,
    CLEAR_SELECT_PRODUCT
} from "constants/ActionTypes";
import {ADD_STOCK,
} from "../../constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listProducts: [],
    filterAndSort : {
        pagination : null,
        filters : null,
        sorter : null
    },
    product: {
        productCode:'',
        productName: '',
        description: '',
        productType: '',
        productTypeLabel: '',
        productImage: '',
        stock: 0,
        basePrice: 0,
        pointsEarned: 0,
        voucherValue: 0,
        isAllMerchantExchangePoint: '',
        detectAccountExchangePoint: '',
        isMarketPlace: '',
        productDetails: [
            {
                productCode: '',
                voucherId: '',
                voucherCode: '',
                expiredDate: '',
                status: ''
            }
        ]
    },

    selectedProduct : null,
    updateSuccess: false,
    updateFailed: false,
    updateData: {
        productStructureId : '',
        productStructureCode : '',
        merchant: ''
    },
    createSuccess: false,
    createFailed: false,
    createData: {
        productStructureId : '',
        productStructureCode : '',
        merchant : ''
    },
    deleteSuccess : false,
    deleteFailed: false

};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SEARCH_PRODUCTS: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case CREATE_PRODUCT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case UPDATE_PRODUCT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case DELETE_PRODUCT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case ADD_STOCK: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case FILTER_SEARCH_PRODUCTS: {
            return {
                ...state,
                filterAndSort: action.payload
            }
        }

        case CLEAR_FILTER_SEARCH_PRODUCTS: {
            return {
                ...state,
                filterAndSort: {
                    pagination : null,
                    filters : null,
                    sorter : null
                }
            }
        }

        case RESET_STATUS : {
            return {
                ...state,
                updateSuccess: false,
                updateFailed : false,
                updateData: {
                    productId : '',
                    productName : '',
                    productType : ''
                },
                createSuccess: false,
                createFailed : false,
                createData: {
                    productId : '',
                    productName : '',
                    productType : ''
                },
                deleteSuccess: false,
                deleteFailed : false,
            }
        }

        // Response
        case SEARCH_PRODUCTS_SUCCESS: {

            return {
                ...state,
                loader: false,
                listProducts: action.payload
            }
        }

        case SEARCH_PRODUCTS_FAILED: {

            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_PRODUCT_SUCCESS: {
            return {
                ...state,
                loader: false,
                product: action.payload
            }

        }

        case VIEW_PRODUCT_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case UPDATE_PRODUCT_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                updateData: action.payload
            }
        }

        case UPDATE_PRODUCT_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true,
                updateData: {
                    productId : '',
                    productName : '',
                    productType : ''
                }
            }
        }

        case CREATE_PRODUCT_SUCCESS: {
            return {
                ...state,
                loader: false,
                createSuccess : true,
                createFailed : false,
                createData: action.payload
            }
        }

        case CREATE_PRODUCT_FAILED: {
            return {
                ...state,
                loader: false,
                createSuccess : false,
                createFailed : true,
                createData: {
                    productId : '',
                    productName : '',
                    productType : ''
                }
            }
        }

        case DELETE_PRODUCT_SUCCESS: {
            return {
                ...state,
                loader: false,
                deleteSuccess : true,
                deleteFailed: false,
                showMessage: false
            }
        }

        case DELETE_PRODUCT_FAILED: {
            return {
                ...state,
                loader: false,
                deleteSuccess : false,
                deleteFailed: true,
                showMessage: false,
                alertMessage: action.payload
            }
        }

        case SELECT_PRODUCT: {
            return {
                ...state,
                selectedProduct: action.payload
            }
        }

        case CLEAR_SELECT_PRODUCT: {
            return {
                ...state,
                selectedProduct: null
            }
        }

        default:
            return state;
    }
}
