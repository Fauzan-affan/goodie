import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_APPROVAL,
    SEARCH_APPROVAL_SUCCESS,
    SEARCH_APPROVAL_FAILED,
    VIEW_APPROVAL,
    VIEW_APPROVAL_SUCCESS,
    VIEW_APPROVAL_FAILED,
    UPDATE_APPROVAL,
    UPDATE_APPROVAL_SUCCESS,
    UPDATE_APPROVAL_FAILED,
    RESET_STATUS,
    BACK_TO_LOGIN,
    INQ_POST_APPROVAL,
    INQ_POST_APPROVAL_SUCCESS,
    INQ_POST_APPROVAL_FAILED
} from "constants/ActionTypes";
import {
    searchApprovalApi,
    viewApprovalApi,
    updateApprovalApi,
    inquiryOrPostingApprovalApi
} from "../../appRedux/api/Approval";

export function* fetchSearchApproval({payload}) {
    if(payload != null){
        try {
            const searchApprovalData = yield call(searchApprovalApi, payload);
            if (searchApprovalData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: SEARCH_APPROVAL_SUCCESS, payload: searchApprovalData.data});
            } else if (searchApprovalData.data.abstractResponse.responseStatus !== 'ERROR016') {
                let resp = {
                    approval: [],
                    recordInfo: {}
                }
                yield put({type: SEARCH_APPROVAL_SUCCESS, payload: resp});
            } else {
                yield put({type: SEARCH_APPROVAL_FAILED, payload: searchApprovalData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_APPROVAL_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
            else{
                yield put({
                    type: SEARCH_APPROVAL_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}



function* fetchViewApproval({payload}) {
    if(payload != null){
        try {
            let viewApprovalData = yield call(viewApprovalApi, payload);
            if (viewApprovalData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: VIEW_APPROVAL_SUCCESS, payload: viewApprovalData.data});
            } else {
                yield put({type: VIEW_APPROVAL_FAILED, payload: viewApprovalData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_APPROVAL_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
            else{
                yield put({
                    type: VIEW_APPROVAL_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postEditApproval({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let editApprovalData = yield call(updateApprovalApi, payload);

            if (editApprovalData.data.abstractResponse.responseStatus === 'PROD105') {
                yield put({type: UPDATE_APPROVAL_SUCCESS, payload: editApprovalData.data.data});
            } else {
                yield put({type: UPDATE_APPROVAL_FAILED, payload: editApprovalData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_APPROVAL_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_APPROVAL_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postInquiryOrPostingApproval({payload}) {
    if(payload != null){
        try {
            // yield put({type: RESET_STATUS});

            let editApprovalData = yield call(inquiryOrPostingApprovalApi, payload);
            // console.log(editApprovalData)
            if (editApprovalData.data.abstractResponse.responseStatus === 'INQ000' || editApprovalData.data.abstractResponse.responseStatus === 'INQ004') {
                yield put({type: INQ_POST_APPROVAL_SUCCESS, payload: editApprovalData.data});
            } else {
                yield put({type: INQ_POST_APPROVAL_FAILED, payload: editApprovalData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_APPROVAL_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_APPROVAL_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


export function* searchApproval() {
    yield takeEvery(SEARCH_APPROVAL, fetchSearchApproval);
}

export function* viewApproval(){
    yield takeEvery(VIEW_APPROVAL, fetchViewApproval);
}

export function* editApproval(){
    yield takeEvery(UPDATE_APPROVAL, postEditApproval);
}

export function* inquiryOrPostingApproval(){
    yield takeEvery(INQ_POST_APPROVAL, postInquiryOrPostingApproval);
}

// yield all
export default function* rootSaga() {
    yield all([
        fork(searchApproval),
        fork(viewApproval),
        fork(editApproval),
        fork(inquiryOrPostingApproval),
    ]);
}
