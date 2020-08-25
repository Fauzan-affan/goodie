import {
    GET_LOYALTY_PROMOTION_DATA,
    GET_LOYALTY_PROMOTION_DATA_FAILED,
    GET_LOYALTY_PROMOTION_DATA_SUCCESS,
    GET_LOYALTY_REWARD_DATA,
    GET_LOYALTY_REWARD_DATA_FAILED,
    GET_LOYALTY_REWARD_DATA_SUCCESS,
    GET_LOYALTY_TOTAL_DATA,
    GET_LOYALTY_TOTAL_DATA_FAILED,
    GET_LOYALTY_TOTAL_DATA_SUCCESS,
    GET_MARKETPLACE_MERCHANT_DATA,
    GET_MARKETPLACE_MERCHANT_DATA_FAILED,
    GET_MARKETPLACE_MERCHANT_DATA_SUCCESS,
    GET_MARKETPLACE_PRODUCT_DATA,
    GET_MARKETPLACE_PRODUCT_DATA_FAILED,
    GET_MARKETPLACE_PRODUCT_DATA_SUCCESS,
    GET_MARKETPLACE_REVENUE_DATA,
    GET_MARKETPLACE_REVENUE_DATA_FAILED,
    GET_MARKETPLACE_REVENUE_DATA_SUCCESS,
    GET_MEMBER_GROWTH_DATA,
    GET_MEMBER_GROWTH_DATA_FAILED,
    GET_MEMBER_GROWTH_DATA_SUCCESS,
    GET_MEMBER_SUMMARY_DATA,
    GET_MEMBER_SUMMARY_DATA_FAILED,
    GET_MEMBER_SUMMARY_DATA_SUCCESS
} from "../../constants/ActionTypes";


const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    result: [],
    rewardList: [],
    promotionList: [],
    total: [],
    products: [],
    merchants: [],
    revenue: [],
    totalMember: 0,
    growthMember : []
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LOYALTY_PROMOTION_DATA: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                promotionList : [],
            }
        }

        case GET_LOYALTY_REWARD_DATA: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                rewardList : [],
            }
        }

        case GET_LOYALTY_TOTAL_DATA: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                total : [],
            }
        }

        case GET_MARKETPLACE_MERCHANT_DATA: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                merchants : [],
            }
        }

        case GET_MARKETPLACE_PRODUCT_DATA: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                result : [],
            }
        }

        case GET_MARKETPLACE_REVENUE_DATA: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                revenue : [],
            }
        }

        case GET_MEMBER_SUMMARY_DATA: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                totalMember : [],
            }
        }

        case GET_MEMBER_GROWTH_DATA: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                growthMember : [],
            }
        }



        // Response
        case GET_LOYALTY_PROMOTION_DATA_SUCCESS: {
            return {
                ...state,
                loader: false,
                promotionList: action.payload.result.promotionList
            }
        }

        case GET_LOYALTY_PROMOTION_DATA_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_LOYALTY_REWARD_DATA_SUCCESS: {
            return {
                ...state,
                loader: false,
                rewardList: action.payload.result.rewardList
            }
        }

        case GET_LOYALTY_REWARD_DATA_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_LOYALTY_TOTAL_DATA_SUCCESS: {
            return {
                ...state,
                loader: false,
                total: action.payload.result
            }
        }

        case GET_LOYALTY_TOTAL_DATA_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_MARKETPLACE_MERCHANT_DATA_SUCCESS: {
            return {
                ...state,
                loader: false,
                merchants: action.payload.result.merchants
            }
        }

        case GET_MARKETPLACE_MERCHANT_DATA_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_MARKETPLACE_PRODUCT_DATA_SUCCESS: {
            return {
                ...state,
                loader: false,
                products: action.payload.result.products
            }
        }

        case GET_MARKETPLACE_PRODUCT_DATA_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_MARKETPLACE_REVENUE_DATA_SUCCESS: {
            return {
                ...state,
                loader: false,
                revenue: action.payload.result
            }
        }

        case GET_MARKETPLACE_REVENUE_DATA_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_MEMBER_SUMMARY_DATA_SUCCESS: {
            return {
                ...state,
                loader: false,
                totalMember: action.payload.result.totalMember
            }
        }

        case GET_MEMBER_SUMMARY_DATA_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_MEMBER_GROWTH_DATA_SUCCESS: {
            return {
                ...state,
                loader: false,
                growthMember: action.payload.result.months
            }
        }

        case GET_MEMBER_GROWTH_DATA_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }



        default:
            return state;
    }
}
