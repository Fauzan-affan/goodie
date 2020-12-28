import {
    SEARCH_RULES,
    CREATE_RULE,
    UPDATE_RULE,
    DELETE_RULE,
    SEARCH_RULES_SUCCESS,
    SEARCH_RULES_FAILED,
    FILTER_SEARCH_RULES,
    CLEAR_FILTER_SEARCH_RULES,
    RESET_STATUS,
    VIEW_RULE_SUCCESS,
    VIEW_RULE_FAILED,
    UPDATE_RULE_SUCCESS,
    UPDATE_RULE_FAILED,
    CREATE_RULE_SUCCESS,
    CREATE_RULE_FAILED,
    DELETE_RULE_SUCCESS,
    DELETE_RULE_FAILED
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listRules: [],
    filterAndSort : {
        pagination : null,
        filters : null,
        sorter : null
    },
    basicRule: {
        merchantName: '',
        basicRuleName: '',
        basicRuleDesc: '',
        basicRuleType: '',
        baseLoyaltyDiscount: 0,
        baseLoyaltyPoint: 0,
        amountReq: 0,
        capPerTrx: 0,
        paymentRule: '',
        basicRuleDetailList: [
            {
                productCode: '',
                productName: '',
                baseLoyaltyDiscount: 0,
                baseLoyaltyPoint: 0,
                amountReq: 0,
                capPerTrx: 0
            }
        ]
    },
    referralRule: {
        merchantName: '',
        referralRuleName: '',
        referralRuleDesc: '',
        refereePoint: 0,
        termAndCondition: '',
        referralRuleDetail: [
            {
                minReference: 0,
                maxReference: 0,
                point: 0
            }
        ]
    },
    customRule: {
        merchantName: '',
        customRuleName: '',
        customRuleDesc: '',
        customRuleTrigger: '',
        customRuleType: '',
        baseLoyaltyDiscount: 0,
        baseLoyaltyPoint: 0,
        amountReq: 0,
        capPerTrx: 0
    },
    recordInfo: {
        totalRecords: 0,
        page : 0,
        nrecords : 0
    },
    updateSuccess: false,
    updateFailed: false,
    updateData: {
        ruleId : '',
        ruleName : '',
        ruleType : ''
    },
    createSuccess: false,
    createFailed: false,
    createData: {
        ruleId : '',
        ruleName : '',
        ruleType : ''
    },
    deleteSuccess : false,
    deleteFailed: false,
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SEARCH_RULES: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                recordInfo: {}
            }
        }

        case CREATE_RULE: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case UPDATE_RULE: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case DELETE_RULE: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case FILTER_SEARCH_RULES: {
            return {
                ...state,
                filterAndSort: action.payload
            }
        }

        case CLEAR_FILTER_SEARCH_RULES: {
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
                    ruleId : '',
                    ruleName : '',
                    ruleType : ''
                },
                createSuccess: false,
                createFailed : false,
                createData: {
                    ruleId : '',
                    ruleName : '',
                    ruleType : ''
                },
                deleteSuccess: false,
                deleteFailed : false,
            }
        }

        // Response
        case SEARCH_RULES_SUCCESS: {
            return {
                ...state,
                loader: false,
                listRules: action.payload.rule,
                recordInfo: action.payload.recordInfo
            }
        }

        case SEARCH_RULES_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_RULE_SUCCESS: {
            if(action.payload.type === 'basic'){
                return {
                    ...state,
                    loader: false,
                    basicRule: action.payload
                }
            }else if(action.payload.type === 'referral'){
                return {
                    ...state,
                    loader: false,
                    referralRule: action.payload
                }
            }else if(action.payload.type === 'custom'){
                return {
                    ...state,
                    loader: false,
                    customRule: action.payload
                }
            }
        }

        case VIEW_RULE_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case UPDATE_RULE_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                updateData: action.payload
            }
        }

        case UPDATE_RULE_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true,
                updateData: {
                    ruleId : '',
                    ruleName : '',
                    ruleType : ''
                }
            }
        }

        case CREATE_RULE_SUCCESS: {
            return {
                ...state,
                loader: false,
                createSuccess : true,
                createFailed : false,
                createData: action.payload
            }
        }

        case CREATE_RULE_FAILED: {
            return {
                ...state,
                loader: false,
                createSuccess : false,
                createFailed : true,
                createData: {
                    ruleId : '',
                    ruleName : '',
                    ruleType : ''
                }
            }
        }

        case DELETE_RULE_SUCCESS: {
            return {
                ...state,
                loader: false,
                deleteSuccess : true,
                deleteFailed: false,
                showMessage: false
            }
        }

        case DELETE_RULE_FAILED: {
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
