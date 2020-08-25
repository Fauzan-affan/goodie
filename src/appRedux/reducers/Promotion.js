import {
    SEARCH_PROMOTIONS,
    CREATE_PROMOTION,
    UPDATE_PROMOTION,
    DELETE_PROMOTION,
    SEARCH_PROMOTIONS_SUCCESS,
    SEARCH_PROMOTIONS_FAILED,
    FILTER_SEARCH_PROMOTIONS,
    CLEAR_FILTER_SEARCH_PROMOTIONS,
    RESET_STATUS,
    VIEW_PROMOTION_SUCCESS,
    VIEW_PROMOTION_FAILED,
    UPDATE_PROMOTION_SUCCESS,
    UPDATE_PROMOTION_FAILED,
    CREATE_PROMOTION_SUCCESS,
    CREATE_PROMOTION_FAILED,
    DELETE_PROMOTION_SUCCESS,
    DELETE_PROMOTION_FAILED
} from "constants/ActionTypes";
// import {calculateActiveTickIndex} from "recharts/lib/util/ChartUtils";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listPromotions: [],
    filterAndSort : {
        pagination : null,
        filters : null,
        sorter : null
    },
    promotion: {
        promotionCode:'',
        promotionName: '',
        description: '',
        startDate: null,
        endDate: null,
        expiredPointType: 0,
        expiredDay:'',
        expiredDate: null,
        memberTiers: [
            {
                tier : '',
                tierDetails : []
            }
        ],
        isIgnoreMemberTierRules: 0,
        rules: []
    },
    updateSuccess: false,
    updateFailed: false,
    updateData: {
        promotionStructureId : '',
        promotionStructureCode : '',
        merchant: ''
    },
    createSuccess: false,
    createFailed: false,
    createData: {
        promotionStructureId : '',
        promotionStructureCode : '',
        merchant : ''
    },
    deleteSuccess : false,
    deleteFailed: false

};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SEARCH_PROMOTIONS: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case CREATE_PROMOTION: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case UPDATE_PROMOTION: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case DELETE_PROMOTION: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case FILTER_SEARCH_PROMOTIONS: {
            return {
                ...state,
                filterAndSort: action.payload
            }
        }

        case CLEAR_FILTER_SEARCH_PROMOTIONS: {
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
                    promotionId : '',
                    promotionName : '',
                    promotionType : ''
                },
                createSuccess: false,
                createFailed : false,
                createData: {
                    promotionId : '',
                    promotionName : '',
                    promotionType : ''
                },
                deleteSuccess: false,
                deleteFailed : false,
            }
        }

        // Response
        case SEARCH_PROMOTIONS_SUCCESS: {
            return {
                ...state,
                loader: false,
                listPromotions: action.payload
            }
        }

        case SEARCH_PROMOTIONS_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_PROMOTION_SUCCESS: {
            return {
                ...state,
                loader: false,
                promotion: action.payload
            }

        }

        case VIEW_PROMOTION_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case UPDATE_PROMOTION_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                updateData: action.payload
            }
        }

        case UPDATE_PROMOTION_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true,
                updateData: {
                    promotionId : '',
                    promotionName : '',
                    promotionType : ''
                }
            }
        }

        case CREATE_PROMOTION_SUCCESS: {
            return {
                ...state,
                loader: false,
                createSuccess : true,
                createFailed : false,
                createData: action.payload
            }
        }

        case CREATE_PROMOTION_FAILED: {
            return {
                ...state,
                loader: false,
                createSuccess : false,
                createFailed : true,
                createData: {
                    promotionId : '',
                    promotionName : '',
                    promotionType : ''
                }
            }
        }

        case DELETE_PROMOTION_SUCCESS: {
            return {
                ...state,
                loader: false,
                deleteSuccess : true,
                deleteFailed: false,
                showMessage: false
            }
        }

        case DELETE_PROMOTION_FAILED: {
            return {
                ...state,
                loader: false,
                deleteSuccess : false,
                deleteFailed: true,
                showMessage: false
            }
        }

        default:
            return state;
    }
}
