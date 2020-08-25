import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_ADVERTISING,
    SEARCH_ADVERTISING_SUCCESS,
    SEARCH_ADVERTISING_FAILED,
    VIEW_ADVERTISING,
    VIEW_ADVERTISING_SUCCESS,
    VIEW_ADVERTISING_FAILED,
    UPDATE_ADVERTISING,
    UPDATE_ADVERTISING_SUCCESS,
    UPDATE_ADVERTISING_FAILED,
    CREATE_ADVERTISING,
    CREATE_ADVERTISING_SUCCESS,
    CREATE_ADVERTISING_FAILED,
    DELETE_ADVERTISING,
    DELETE_ADVERTISING_SUCCESS,
    DELETE_ADVERTISING_FAILED,
    RESET_STATUS,
    BACK_TO_LOGIN
} from "constants/ActionTypes";
import {
    searchAdvertisingApi,
    viewAdvertisingApi,
    updateAdvertisingApi,
    createAdvertisingApi,
    deleteAdvertisingApi,
} from "../../appRedux/api/Advertising";

export function* fetchSearchAdvertising({payload}) {
    if(payload != null){
        try {
            const searchAdvertisingData = yield call(searchAdvertisingApi, payload);
            if (searchAdvertisingData.data.abstractResponse.responseStatus === 'PSADV0') {
                yield put({type: SEARCH_ADVERTISING_SUCCESS, payload: searchAdvertisingData.data});
            } else if (searchAdvertisingData.data.abstractResponse.responseStatus !== 'ERROR016') {
                let resp = {
                    advertising: [],
                    recordInfo: {}
                }
                yield put({type: SEARCH_ADVERTISING_SUCCESS, payload: resp});
            } else {
                yield put({type: SEARCH_ADVERTISING_FAILED, payload: searchAdvertisingData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_ADVERTISING_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
            else{
                yield put({
                    type: SEARCH_ADVERTISING_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}



function* fetchViewAdvertising({payload}) {
    if(payload != null){
        try {
            let viewAdvertisingData = yield call(viewAdvertisingApi, payload);
            if (viewAdvertisingData.data.abstractResponse.responseStatus === 'PSADV0') {
                yield put({type: VIEW_ADVERTISING_SUCCESS, payload: viewAdvertisingData.data});
            } else {
                yield put({type: VIEW_ADVERTISING_FAILED, payload: viewAdvertisingData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_ADVERTISING_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
            else{
                yield put({
                    type: VIEW_ADVERTISING_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postEditAdvertising({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let editAdvertisingData = yield call(updateAdvertisingApi, payload);

            if (editAdvertisingData.data.abstractResponse.responseStatus === 'INQ004') {
                yield put({type: UPDATE_ADVERTISING_SUCCESS, payload: editAdvertisingData.data.data});
            } else {
                yield put({type: UPDATE_ADVERTISING_FAILED, payload: editAdvertisingData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_ADVERTISING_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
            else{
                yield put({
                    type: UPDATE_ADVERTISING_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postInsertAdvertising({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let insertAdvertisingData = yield call(createAdvertisingApi, payload);

            if (insertAdvertisingData.data.abstractResponse.responseStatus === 'INQ003') {
                yield put({type: CREATE_ADVERTISING_SUCCESS, payload: insertAdvertisingData.data});
            } else {
                yield put({type: CREATE_ADVERTISING_FAILED, payload: insertAdvertisingData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CREATE_ADVERTISING_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CREATE_ADVERTISING_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


function* postDeleteAdvertising({payload}) {
    if(payload != null){
        try {
            let deleteAdvertisingData = yield call(deleteAdvertisingApi, payload);

            if (deleteAdvertisingData.data.abstractResponse.responseStatus === 'INQ005') {
                let responseData = deleteAdvertisingData.data.advertising;
                yield put({type: DELETE_ADVERTISING_SUCCESS, payload: responseData});
            } else {
                yield put({type: DELETE_ADVERTISING_FAILED, payload: deleteAdvertisingData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: DELETE_ADVERTISING_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: DELETE_ADVERTISING_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


export function* searchAdvertising() {
    yield takeEvery(SEARCH_ADVERTISING, fetchSearchAdvertising);
}

export function* viewAdvertising(){
    yield takeEvery(VIEW_ADVERTISING, fetchViewAdvertising);
}

export function* editAdvertising(){
    yield takeEvery(UPDATE_ADVERTISING, postEditAdvertising);
}

export function* createAdvertising(){
    yield takeEvery(CREATE_ADVERTISING, postInsertAdvertising);
}

export function* removeAdertising(){
    yield takeEvery(DELETE_ADVERTISING, postDeleteAdvertising);
}

// yield all
export default function* rootSaga() {
    yield all([
        fork(searchAdvertising),
        fork(viewAdvertising),
        fork(editAdvertising),
        fork(createAdvertising),
        fork(removeAdertising),
    ]);
}
