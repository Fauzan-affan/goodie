import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_RECONCILIATION,
    SEARCH_RECONCILIATION_SUCCESS,
    SEARCH_RECONCILIATION_FAILED,
    SEARCH_RECONCILIATION_PAYABLE,
    SEARCH_RECONCILIATION_PAYABLE_SUCCESS,
    SEARCH_RECONCILIATION_PAYABLE_FAILED,
    SEARCH_RECONCILIATION_RECEIVEBLE,
    SEARCH_RECONCILIATION_RECEIVEBLE_SUCCESS,
    SEARCH_RECONCILIATION_RECEIVEBLE_FAILED,
    SEARCH_RECONCILIATION_POINTFEE,
    SEARCH_RECONCILIATION_POINTFEE_SUCCESS,
    SEARCH_RECONCILIATION_POINTFEE_FAILED,
    VIEW_RECONCILIATION,
    VIEW_RECONCILIATION_SUCCESS,
    VIEW_RECONCILIATION_FAILED,
    // RECONCILIATION_DETAILS,
    DOWNLOAD_SUCCESS,
    // RECONCILIATION_DETAILS_SUCCESS,
    // RECONCILIATION_DETAILS_FAILED,
    BACK_TO_LOGIN
} from "constants/ActionTypes";
import {
    searchReconciliationApi,
    searchReconciliationPayableApi,
    searchReconciliationReceivebleApi,
    searchReconciliationPointfeeApi,
    viewReconciliationApi,
    // billingDetailsApi
} from "../../appRedux/api/Reconciliation";

function* fetchSearchReconciliation({payload}) {
    if(payload != null){
        try {
            const searchReconciliationData = yield call(searchReconciliationApi, payload);
            if (searchReconciliationData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: searchReconciliationData.data});
                } else{
                    yield put({type: SEARCH_RECONCILIATION_SUCCESS, payload: searchReconciliationData.data});
                }
            } else if (searchReconciliationData.data.abstractResponse.responseStatus === 'ERROR016') {
                let resp = {
                    reconciliation : [],
                    recordInfo: {}
                }
                yield put({type: SEARCH_RECONCILIATION_SUCCESS, payload: resp});
            }else{
                yield put({type: SEARCH_RECONCILIATION_FAILED, payload: searchReconciliationData.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_RECONCILIATION_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_RECONCILIATION_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchSearchReconciliationPayable({payload}) {
    if(payload != null){
        try {
            const searchReconciliationPayableData = yield call(searchReconciliationPayableApi, payload);
            if (searchReconciliationPayableData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: searchReconciliationPayableData.data});
                } else{
                    yield put({type: SEARCH_RECONCILIATION_PAYABLE_SUCCESS, payload: searchReconciliationPayableData.data});
                }
            } else if (searchReconciliationPayableData.data.abstractResponse.responseStatus === 'ERROR016') {
                let resp = {
                    reconciliation : [],
                    recordInfo: {}
                }
                yield put({type: SEARCH_RECONCILIATION_PAYABLE_SUCCESS, payload: resp});
            }else{
                yield put({type: SEARCH_RECONCILIATION_PAYABLE_FAILED, payload: searchReconciliationPayableData.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_RECONCILIATION_PAYABLE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_RECONCILIATION_PAYABLE_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchSearchReconciliationReceiveble({payload}) {
    if(payload != null){
        try {
            const searchReconciliationReceivebleData = yield call(searchReconciliationReceivebleApi, payload);
            if (searchReconciliationReceivebleData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: searchReconciliationReceivebleData.data});
                } else{
                    yield put({type: SEARCH_RECONCILIATION_RECEIVEBLE_SUCCESS, payload: searchReconciliationReceivebleData.data});
                }
            } else if (searchReconciliationReceivebleData.data.abstractResponse.responseStatus === 'ERROR016') {
                let resp = {
                    reconciliation : [],
                    recordInfo: {}
                }
                yield put({type: SEARCH_RECONCILIATION_RECEIVEBLE_SUCCESS, payload: resp});
            }else{
                yield put({type: SEARCH_RECONCILIATION_RECEIVEBLE_FAILED, payload: searchReconciliationReceivebleData.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_RECONCILIATION_RECEIVEBLE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_RECONCILIATION_RECEIVEBLE_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchSearchReconciliationPointfee({payload}) {
    if(payload != null){
        try {
            const searchReconciliationPointfeeData = yield call(searchReconciliationPointfeeApi, payload);
            if (searchReconciliationPointfeeData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: searchReconciliationPointfeeData.data});
                } else{
                    yield put({type: SEARCH_RECONCILIATION_POINTFEE_SUCCESS, payload: searchReconciliationPointfeeData.data});
                }
            } else if (searchReconciliationPointfeeData.data.abstractResponse.responseStatus === 'ERROR016') {
                let resp = {
                    reconciliation : [],
                    recordInfo: {}
                }
                yield put({type: SEARCH_RECONCILIATION_POINTFEE_SUCCESS, payload: resp});
            }else{
                yield put({type: SEARCH_RECONCILIATION_POINTFEE_FAILED, payload: searchReconciliationPointfeeData.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_RECONCILIATION_POINTFEE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_RECONCILIATION_POINTFEE_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchViewReconciliation({payload}) {
    if(payload != null){
        try {
            let viewReconciliationData = yield call(viewReconciliationApi, payload);
            if (viewReconciliationData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: viewReconciliationData.data});
                } else{
                    yield put({type: VIEW_RECONCILIATION_SUCCESS, payload: viewReconciliationData.data});
                }
            } else {
                yield put({type: VIEW_RECONCILIATION_FAILED, payload: viewReconciliationData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_RECONCILIATION_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VIEW_RECONCILIATION_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

export function* searchReconciliation() {
    yield takeEvery(SEARCH_RECONCILIATION, fetchSearchReconciliation);
}

export function* searchReconciliationReceiveble() {
    yield takeEvery(SEARCH_RECONCILIATION_RECEIVEBLE, fetchSearchReconciliationReceiveble);
}

export function* searchReconciliationPayable() {
    yield takeEvery(SEARCH_RECONCILIATION_PAYABLE, fetchSearchReconciliationPayable);
}

export function* searchReconciliationPointfee() {
    yield takeEvery(SEARCH_RECONCILIATION_POINTFEE, fetchSearchReconciliationPointfee);
}

export function* viewReconciliation(){
    yield takeEvery(VIEW_RECONCILIATION, fetchViewReconciliation);
}



// yield all
export default function* rootSaga() {
    yield all([
        fork(searchReconciliation),
        fork(searchReconciliationReceiveble),
        fork(searchReconciliationPayable),
        fork(searchReconciliationPointfee),
        fork(viewReconciliation),
    ]);
}
