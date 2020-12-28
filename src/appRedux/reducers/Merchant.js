import {
    REGISTER_MERCHANT,
    REGISTER_MERCHANT_SUCCESS,
    REGISTER_MERCHANT_FAILED,
    VIEW_MERCHANT,
    VIEW_MERCHANT_SUCCESS,
    VIEW_MERCHANT_FAILED,
    SEARCH_SUB_MERCHANT,
    SEARCH_SUB_MERCHANT_SUCCESS,
    SEARCH_SUB_MERCHANT_FAILED,
    UPDATE_MERCHANT,
    UPDATE_MERCHANT_SUCCESS,
    UPDATE_MERCHANT_FAILED,
    RESET_STATUS,
    VERIFICATION_MERCHANT,
    VERIFICATION_MERCHANT_SUCCESS,
    VERIFICATION_MERCHANT_FAILED,
    VERIFICATION_FORGOT_MERCHANT,
    VERIFICATION_FORGOT_MERCHANT_SUCCESS,
    VERIFICATION_FORGOT_MERCHANT_FAILED,
    VERIFICATION_FORGOT_PASSWORD_MERCHANT,
    VERIFICATION_FORGOT_PASSWORD_MERCHANT_SUCCESS,
    VERIFICATION_FORGOT_PASSWORD_MERCHANT_FAILED,
} from "constants/ActionTypes";
import {
    ACTIVATE_SANDBOX,
    ACTIVATE_SANDBOX_FAILED,
    ACTIVATE_SANDBOX_SUCCESS, CURRENCY_MERCHANT_FAILED,
    CURRENCY_MERCHANT_SUCCESS
} from "../../constants/ActionTypes";
import {GET_LIST_CURRENCY, GET_LIST_CURRENCY_SUCCESS, GET_LIST_CURRENCY_FAILED} from "../../constants/ActionTypes";
import {GET_CURRENCY, GET_CURRENCY_SUCCESS, GET_CURRENCY_FAILED} from "../../constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listCurrency: [],
    listSubMerchant: [],
    merchant: {
        merchantCode: null,
        merchantName: null,
        companyName: null,
        merchantWebsite: null,
        merchantLogo: null,
        merchantBackground: null,
        taxRegistrationNumber: null,
        businessPermit: null,
        notificationUrl: null,
        typeOfIndustry: null,
        isRequiredVerification: null,
        isRedeemOtp: null,
        issuingReferral: null,
        address: null,
        merchantType: 0,
        contacts: null,
        paramCurrencyPoint: '',
        isDeposit: '',
        currencyId: '',
        currency: {
            lookupDtlId: '',
            lookupHdrId: '',
            lookupCode: '',
            lookupValue: '',
            description: '',
            icon: '',
            listCurrency: [{
                lookupDtlId: '',
                lookupHdrId: '',
                lookupCode: '',
                lookupValue: '',
                description: '',
                icon: '',
            }]
        },
        logoPoint: {
            lookupDtlId: '',
            lookupHdrId: '',
            lookupCode: '',
            lookupValue: '',
            description: '',
            icon: '',
            listCurrency: [{
                lookupDtlId: '',
                lookupHdrId: '',
                lookupCode: '',
                lookupValue: '',
                description: '',
                icon: '',
            }]
        }
    },

    currency: {
        lookupDtlId: '',
        lookupHdrId: '',
        lookupCode: '',
        lookupValue: '',
        description: '',
        icon: '',
        listCurrency: [{
            lookupDtlId: '',
            lookupHdrId: '',
            lookupCode: '',
            lookupValue: '',
            description: '',
            icon: '',
        }]
    },

    logoPoint: {
        lookupDtlId: '',
        lookupHdrId: '',
        lookupCode: '',
        lookupValue: '',
        description: '',
        icon: '',
        listCurrency: [{
            lookupDtlId: '',
            lookupHdrId: '',
            lookupCode: '',
            lookupValue: '',
            description: '',
            icon: '',
        }]
    },


    updateSuccess: false,
    updateFailed: false,

    registerSuccess: false,
    registerFailed: false,
    activeSuccess: false,
    activeFailed: false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case REGISTER_MERCHANT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case VIEW_MERCHANT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case SEARCH_SUB_MERCHANT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case UPDATE_MERCHANT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case VERIFICATION_MERCHANT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case VERIFICATION_FORGOT_MERCHANT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case VERIFICATION_FORGOT_PASSWORD_MERCHANT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case ACTIVATE_SANDBOX: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case RESET_STATUS : {
            return {
                ...state,
                updateSuccess: false,
                updateFailed: false,
                registerSuccess: false,
                registerFailed: false,
                activeSuccess: false,
                activeFailed: false
            }
        }

        // Response
        case REGISTER_MERCHANT_SUCCESS: {
            return {
                ...state,
                loader: false,
                registerSuccess: true,
                registerFailed: false
            }
        }

        case REGISTER_MERCHANT_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                registerSuccess: false,
                registerFailed: true
            }
        }

        case VIEW_MERCHANT_SUCCESS: {
            return {
                ...state,
                loader: false,
                merchant: action.payload
            }

        }

        case VIEW_MERCHANT_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case SEARCH_SUB_MERCHANT_SUCCESS: {
            return {
                ...state,
                loader: false,
                listSubMerchant: action.payload
            }

        }

        case SEARCH_SUB_MERCHANT_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case CURRENCY_MERCHANT_SUCCESS: {
            return {
                ...state,
                logoPoint: action.payload
            }
        }

        case CURRENCY_MERCHANT_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_CURRENCY_SUCCESS: {
            return {
                ...state,
                currency: action.payload
            }
        }

        case GET_CURRENCY_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case GET_LIST_CURRENCY_SUCCESS: {
            return {
                ...state,
                listCurrency: action.payload.listCurrency
            }
        }

        case GET_LIST_CURRENCY_FAILED: {
            return {
                ...state,
                listCurrency: [],
            }
        }

        case UPDATE_MERCHANT_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess: true,
                updateFailed: false,
            }
        }

        case UPDATE_MERCHANT_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess: false,
                updateFailed: true
            }
        }

        case VERIFICATION_MERCHANT_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess: true,
                updateFailed: false,
            }
        }

        case VERIFICATION_MERCHANT_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess: false,
                updateFailed: true
            }
        }

        case VERIFICATION_FORGOT_MERCHANT_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess: true,
                updateFailed: false
            }
        }

        case VERIFICATION_FORGOT_MERCHANT_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess: false,
                updateFailed: true
            }
        }

        case VERIFICATION_FORGOT_PASSWORD_MERCHANT_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess: true,
                updateFailed: false
            }
        }

        case VERIFICATION_FORGOT_PASSWORD_MERCHANT_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess: false,
                updateFailed: true
            }
        }

        case ACTIVATE_SANDBOX_SUCCESS: {
            return {
                ...state,
                loader: false,
                activeSuccess: true,
                activeFailed: false
            }
        }

        case ACTIVATE_SANDBOX_FAILED: {
            return {
                ...state,
                loader: false,
                activeSuccess: false,
                activeFailed: true
            }
        }

        default:
            return state;
    }
}
