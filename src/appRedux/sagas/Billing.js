import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_BILLING,
    SEARCH_BILLING_SUCCESS,
    SEARCH_BILLING_FAILED,
    VIEW_BILLING,
    VIEW_BILLING_SUCCESS,
    VIEW_BILLING_FAILED,
    // BILLING_DETAILS,
    DOWNLOAD_SUCCESS,
    // BILLING_DETAILS_SUCCESS,
    // BILLING_DETAILS_FAILED,
    BACK_TO_LOGIN
} from "constants/ActionTypes";
import {
    searchBillingApi,
    viewBillingApi,
    // billingDetailsApi
} from "../../appRedux/api/Billing";

function* fetchSearchBilling({payload}) {
    if(payload != null){
        try {
            const searchBillingData = yield call(searchBillingApi, payload);
            if (searchBillingData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: searchBillingData.data});
                } else{
                    yield put({type: SEARCH_BILLING_SUCCESS, payload: searchBillingData.data});
                }
            } else if (searchBillingData.data.abstractResponse.responseStatus === 'ERROR016') {
                let resp = {
                    billing : [],
                    recordInfo: {}
                }
                yield put({type: SEARCH_BILLING_SUCCESS, payload: resp});
            }else{
                    yield put({type: SEARCH_BILLING_FAILED, payload: searchBillingData.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_BILLING_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_BILLING_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchViewBilling({payload}) {
    if(payload != null){
        try {
            let viewBillingData = yield call(viewBillingApi, payload);
            if (viewBillingData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: viewBillingData.data});
                } else{
                    yield put({type: VIEW_BILLING_SUCCESS, payload: viewBillingData.data});
                }
            } else {
                yield put({type: VIEW_BILLING_FAILED, payload: viewBillingData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_BILLING_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VIEW_BILLING_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

export function* searchBilling() {
    yield takeEvery(SEARCH_BILLING, fetchSearchBilling);
}

export function* viewBilling(){
    yield takeEvery(VIEW_BILLING, fetchViewBilling);
}



// yield all
export default function* rootSaga() {
    yield all([
        fork(searchBilling),
        fork(viewBilling),
    ]);
}
