import {all, call, fork, put, takeEvery} from "redux-saga/effects";
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
    BACK_TO_LOGIN,
    VERIFICATION_MERCHANT,
    VERIFICATION_MERCHANT_FAILED,
    VERIFICATION_MERCHANT_SUCCESS,
    VERIFICATION_FORGOT_MERCHANT,
    VERIFICATION_FORGOT_MERCHANT_SUCCESS,
    VERIFICATION_FORGOT_MERCHANT_FAILED,
    VERIFICATION_FORGOT_PASSWORD_MERCHANT,
    VERIFICATION_FORGOT_PASSWORD_MERCHANT_SUCCESS,
    VERIFICATION_FORGOT_PASSWORD_MERCHANT_FAILED
} from "constants/ActionTypes";
import {
    registerMerchantApi,
    viewMerchantApi,
    searchSubMerchantApi,
    getListCurrencyApi,
    // getCurrencyApi,
    updateMerchantApi,
    verificationMerchantApi,
    verificationForgotMerchantApi,
    verificationForgotPasswordMerchantApi, activateSandboxApi,
} from "../../appRedux/api/Merchant";
import {
    ACTIVATE_SANDBOX,
    ACTIVATE_SANDBOX_FAILED,
    ACTIVATE_SANDBOX_SUCCESS,
} from "../../constants/ActionTypes";
import {GET_LIST_CURRENCY, GET_LIST_CURRENCY_SUCCESS, GET_LIST_CURRENCY_FAILED} from "constants/ActionTypes";
import {GET_CURRENCY, GET_CURRENCY_SUCCESS, GET_CURRENCY_FAILED} from "constants/ActionTypes";
import {CURRENCY_MERCHANT, CURRENCY_MERCHANT_SUCCESS, CURRENCY_MERCHANT_FAILED} from "constants/ActionTypes";


function* postRegisterMerchant({payload}) {
    if(payload != null){
        try {
            const registerMerchantData = yield call(registerMerchantApi, payload);
            if (registerMerchantData.data.abstractResponse.responseStatus === 'MER020') {
                yield put({type: REGISTER_MERCHANT_SUCCESS, payload: registerMerchantData.data});
            }else{
                yield put({type: REGISTER_MERCHANT_FAILED, payload: registerMerchantData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: REGISTER_MERCHANT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: REGISTER_MERCHANT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchViewMerchant({payload}) {
    if(payload != null){
        try {
            let viewMerchantData = yield call(viewMerchantApi, payload);
            if (viewMerchantData.data.abstractResponse.responseStatus === 'MER019') {
                yield put({type: VIEW_MERCHANT_SUCCESS, payload: viewMerchantData.data.merchant});
            } else {
                yield put({type: VIEW_MERCHANT_FAILED, payload: viewMerchantData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_MERCHANT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VIEW_MERCHANT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchSearchSubMerchant({payload}) {
    if(payload != null){
        try {
            let searchSubMerchantData = yield call(searchSubMerchantApi, payload);
            if (searchSubMerchantData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: SEARCH_SUB_MERCHANT_SUCCESS, payload: searchSubMerchantData.data.subMerchantList.merchants});
            } else {
                yield put({type: SEARCH_SUB_MERCHANT_FAILED, payload: searchSubMerchantData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_SUB_MERCHANT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_SUB_MERCHANT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchListCurrency({payload}) {
    if(payload != null){
        try {
            let listCurrency = yield call(getListCurrencyApi, payload);
            if (listCurrency.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: GET_LIST_CURRENCY_SUCCESS, payload: listCurrency.data});
            } else {
                yield put({type: GET_LIST_CURRENCY_FAILED, payload: listCurrency.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: GET_LIST_CURRENCY_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
        }
    }
}


function* fetchCurrency({payload}) {
    if(payload != null){
        try {
            let getCurrency = yield call(getListCurrencyApi, payload);
            if (getCurrency.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: GET_CURRENCY_SUCCESS, payload: getCurrency.data});
            } else {
                yield put({type: GET_CURRENCY_FAILED, payload: getCurrency.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: GET_CURRENCY_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
        }
    }
}

function* fetchCurrencyMerchant({payload}) {
    if(payload != null){
        try {
            let getCurrencyMerchant = yield call(getListCurrencyApi, payload);
            if (getCurrencyMerchant.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: CURRENCY_MERCHANT_SUCCESS, payload: getCurrencyMerchant.data});
            } else {
                yield put({type: CURRENCY_MERCHANT_FAILED, payload: getCurrencyMerchant.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CURRENCY_MERCHANT_SUCCESS,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
        }
    }
}

function* postUpdateMerchant({payload}) {
    if(payload != null){
        try {
            let updateMerchantData = yield call(updateMerchantApi, payload);
            if (updateMerchantData.data.abstractResponse.responseStatus === 'MER017') {
                yield put({type: UPDATE_MERCHANT_SUCCESS, payload: updateMerchantData.data.merchant});
            } else {
                yield put({type: UPDATE_MERCHANT_FAILED, payload: updateMerchantData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_MERCHANT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_MERCHANT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postVerificationMerchant({payload}) {
    if(payload != null){
        try {
            let verificationMerchantData = yield call(verificationMerchantApi, payload);
            if (verificationMerchantData.data.abstractResponse.responseStatus === 'MEM000') {
                yield put({type: VERIFICATION_MERCHANT_SUCCESS, payload: verificationMerchantData.data.merchant});
            } else {
                yield put({type: VERIFICATION_MERCHANT_FAILED, payload: verificationMerchantData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VERIFICATION_MERCHANT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VERIFICATION_MERCHANT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postVerificationForgotMerchant({payload}) {
    if(payload != null){
        try {
            let verificationForgotMerchantData = yield call(verificationForgotMerchantApi, payload);
            if (verificationForgotMerchantData.data.abstractResponse.responseStatus === 'USER002') {
                yield put({type: VERIFICATION_FORGOT_MERCHANT_SUCCESS, payload: verificationForgotMerchantData.data.merchant});
            } else {
                yield put({type: VERIFICATION_FORGOT_MERCHANT_FAILED, payload: verificationForgotMerchantData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'USER003') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VERIFICATION_FORGOT_MERCHANT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VERIFICATION_FORGOT_MERCHANT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postVerificationForgotPasswordMerchant({payload}) {
    if(payload != null){
        try {
            let verificationForgotPasswordMerchantData = yield call(verificationForgotPasswordMerchantApi, payload);
            if (verificationForgotPasswordMerchantData.data.abstractResponse.responseStatus === 'USER004') {
                yield put({type: VERIFICATION_FORGOT_PASSWORD_MERCHANT_SUCCESS, payload: verificationForgotPasswordMerchantData.data.merchant});
            } else {
                yield put({type: VERIFICATION_FORGOT_PASSWORD_MERCHANT_FAILED, payload: verificationForgotPasswordMerchantData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'USER005') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VERIFICATION_FORGOT_PASSWORD_MERCHANT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VERIFICATION_FORGOT_PASSWORD_MERCHANT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postActivateSandbox({payload}){
    if(payload != null){
        try {
            let registerSandboxData = yield call(registerMerchantApi, payload);
            if (registerSandboxData.data.abstractResponse.responseStatus === 'MER020') {
                let activateSandboxData = yield call(activateSandboxApi, payload);
                if(activateSandboxData.data.abstractResponse.responseStatus === 'MER023'){
                    yield put({type: ACTIVATE_SANDBOX_SUCCESS, payload: registerSandboxData.data.abstractResponse.responseMessage});
                }else{
                    yield put({type: ACTIVATE_SANDBOX_FAILED, payload: registerSandboxData.data.abstractResponse.responseMessage});
                }
            }else{
                yield put({type: ACTIVATE_SANDBOX_FAILED, payload: registerSandboxData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response.data.abstractResponse.responseStatus === 'AUTH001'){
                yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            }else{
                yield put({type: ACTIVATE_SANDBOX_FAILED, payload: error.response.data.abstractResponse.responseMessage});
            }
        }
    }
}

export function* registerMerchant() {
    yield takeEvery(REGISTER_MERCHANT, postRegisterMerchant);
}

export function* viewMerchant(){
    yield takeEvery(VIEW_MERCHANT, fetchViewMerchant);
}

export function* searchSubMerchant(){
    yield takeEvery(SEARCH_SUB_MERCHANT, fetchSearchSubMerchant);
}

export function* getListCurrency(){
    yield takeEvery(GET_LIST_CURRENCY, fetchListCurrency);
}

export function* getCurrency(){
    yield takeEvery(GET_CURRENCY, fetchCurrency);
}

export function* getCurrencyMerchant(){
    yield takeEvery(CURRENCY_MERCHANT, fetchCurrencyMerchant);
}

export function* updateMerchant(){
    yield takeEvery(UPDATE_MERCHANT, postUpdateMerchant);
}

export function* verificationMerchant(){
    yield takeEvery(VERIFICATION_MERCHANT, postVerificationMerchant);
}

export function* verificationForgotMerchant(){
    yield takeEvery(VERIFICATION_FORGOT_MERCHANT, postVerificationForgotMerchant);
}

export function* verificationForgotPasswordMerchant(){
    yield takeEvery(VERIFICATION_FORGOT_PASSWORD_MERCHANT, postVerificationForgotPasswordMerchant);
}

export function* activateSandbox() {
    yield takeEvery(ACTIVATE_SANDBOX, postActivateSandbox);
}


// yield all
export default function* rootSaga() {
    yield all([
        fork(registerMerchant),
        fork(viewMerchant),
        fork(searchSubMerchant),
        fork(getListCurrency),
        fork(getCurrency),
        fork(getCurrencyMerchant),
        fork(updateMerchant),
        fork(verificationMerchant),
        fork(verificationForgotMerchant),
        fork(verificationForgotPasswordMerchant),
        fork(activateSandbox),
    ]);
}
