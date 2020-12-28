import {
    SEARCH_TIERS,
    CREATE_TIER,
    UPDATE_TIER,
    DELETE_TIER,
    SEARCH_TIERS_SUCCESS,
    SEARCH_TIERS_FAILED,
    FILTER_SEARCH_TIERS,
    CLEAR_FILTER_SEARCH_TIERS,
    RESET_STATUS,
    VIEW_TIER_SUCCESS,
    VIEW_TIER_FAILED,
    UPDATE_TIER_SUCCESS,
    UPDATE_TIER_FAILED,
    CREATE_TIER_SUCCESS,
    CREATE_TIER_FAILED,
    DELETE_TIER_SUCCESS,
    DELETE_TIER_FAILED,
    TIER_DETAILS_SUCCESS,
    TIER_DETAILS_FAILED
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listTiers: [],
    filterAndSort : {
        pagination : null,
        filters : null,
        sorter : null
    },
    tier: {
        tierStructureCode: '',
        isDowngrade: '',
        isImmediatelyDowngrade:'',
        downgradeTimeSet: null,
        tierDetails: [
            {
                tierCode: '',
                tierName: '',
                lowerBoundPoint: 0,
                upperBoundPoint: 0,
                isPremiumTier: 0,
                tierImage: ''
            }
        ],
        promotionTiers : [
            {
                promotionId : '',
                promotionName : ''
            }
        ],
        programTier : [
            {
                programId : '',
                programName : ''
            }
        ]
    },
    tierDetails : [],
    updateSuccess: false,
    updateFailed: false,
    updateData: {
        tierStructureId : '',
        tierStructureCode : '',
        merchant: ''
    },
    createSuccess: false,
    createFailed: false,
    createData: {
        tierStructureId : '',
        tierStructureCode : '',
        merchant : ''
    },
    deleteSuccess : false,
    deleteFailed: false

};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SEARCH_TIERS: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case CREATE_TIER: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case UPDATE_TIER: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case DELETE_TIER: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case FILTER_SEARCH_TIERS: {
            return {
                ...state,
                filterAndSort: action.payload
            }
        }

        case CLEAR_FILTER_SEARCH_TIERS: {
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
                    tierId : '',
                    tierName : '',
                    tierType : ''
                },
                createSuccess: false,
                createFailed : false,
                createData: {
                    tierId : '',
                    tierName : '',
                    tierType : ''
                },
                deleteSuccess: false,
                deleteFailed : false,
            }
        }

        // Response
        case SEARCH_TIERS_SUCCESS: {
            return {
                ...state,
                loader: false,
                listTiers: action.payload
            }
        }

        case SEARCH_TIERS_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_TIER_SUCCESS: {
            return {
                ...state,
                loader: false,
                tier: action.payload
            }

        }

        case VIEW_TIER_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case TIER_DETAILS_SUCCESS: {
            return {
                ...state,
                loader: false,
                tierDetails: action.payload
            }

        }

        case TIER_DETAILS_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case UPDATE_TIER_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                updateData: action.payload
            }
        }

        case UPDATE_TIER_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                updateSuccess : false,
                updateFailed: true,
                updateData: {
                    tierId : '',
                    tierName : '',
                    tierType : ''
                }
            }
        }

        case CREATE_TIER_SUCCESS: {
            return {
                ...state,
                loader: false,
                createSuccess : true,
                createFailed : false,
                createData: action.payload
            }
        }

        case CREATE_TIER_FAILED: {
            return {
                ...state,
                loader: false,
                createSuccess : false,
                createFailed : true,
                createData: {
                    tierId : '',
                    tierName : '',
                    tierType : ''
                }
            }
        }

        case DELETE_TIER_SUCCESS: {
            return {
                ...state,
                loader: false,
                deleteSuccess : true,
                deleteFailed: false,
                showMessage: false
            }
        }

        case DELETE_TIER_FAILED: {
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
