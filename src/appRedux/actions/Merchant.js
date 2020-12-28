import {
    REGISTER_MERCHANT,
    VIEW_MERCHANT,
    SEARCH_SUB_MERCHANT,
    UPDATE_MERCHANT,
    RESET_STATUS,
    VERIFICATION_MERCHANT,
    VERIFICATION_FORGOT_MERCHANT,
    VERIFICATION_FORGOT_PASSWORD_MERCHANT
} from "constants/ActionTypes";
import {ACTIVATE_SANDBOX} from "../../constants/ActionTypes";
import {GET_LIST_CURRENCY} from "constants/ActionTypes";
import {GET_CURRENCY} from "constants/ActionTypes";
import {CURRENCY_MERCHANT} from "constants/ActionTypes";


export const registerMerchant = (request) => {
    return {
        type: REGISTER_MERCHANT,
        payload: request
    };
};

export const viewMerchant = (request) => {
    return {
        type: VIEW_MERCHANT,
        payload: request
    };
};

export const searchSubMerchant = (request) => {
    return {
        type: SEARCH_SUB_MERCHANT,
        payload: request
    };
};

export const getListCurrency = (request) => {
    return {
        type: GET_LIST_CURRENCY,
        payload: request
    };
};

export const getCurrency = (request) => {
    return {
        type: GET_CURRENCY,
        payload: request
    };
};

export const getCurrencyMerchant = (request) => {
    return {
        type: CURRENCY_MERCHANT,
        payload: request
    };
};

export const updateMerchant = (request) => {
    return {
        type: UPDATE_MERCHANT,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

export const verification = (request) => {
    return {
        type: VERIFICATION_MERCHANT,
        payload: request
    };
};

export const verificationForgot = (request) => {
    return {
        type: VERIFICATION_FORGOT_MERCHANT,
        payload: request
    };
};

export const verificationForgotPassword = (request) => {
    return {
        type: VERIFICATION_FORGOT_PASSWORD_MERCHANT,
        payload: request
    };
};

export const activateSandbox = (request) => {
    return {
        type: ACTIVATE_SANDBOX,
        payload: request
    };
};
