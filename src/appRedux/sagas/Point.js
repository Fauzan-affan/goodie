import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_POINT,
    SEARCH_POINT_SUCCESS,
    SEARCH_POINT_FAILED,
    VIEW_POINT,
    VIEW_POINT_SUCCESS,
    VIEW_POINT_FAILED,
    UPDATE_POINT,
    UPDATE_POINT_SUCCESS,
    UPDATE_POINT_FAILED,
    CREATE_POINT,
    CREATE_POINT_SUCCESS,
    CREATE_POINT_FAILED,
    DELETE_POINT,
    DELETE_POINT_SUCCESS,
    DELETE_POINT_FAILED,
    RESET_STATUS,
    BACK_TO_LOGIN,
} from "constants/ActionTypes";
import {GET_LIST_CURRENCY, GET_LIST_CURRENCY_SUCCESS, GET_LIST_CURRENCY_FAILED} from "constants/ActionTypes";
import {
    searchPointApi,
    viewPointApi,
    updatePointApi,
    createPointApi,
    deletePointApi,
    getListCurrencyApi,
} from "../../appRedux/api/Point";


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


function* fetchSearchPoint({payload}) {

    if(payload != null){
        try {
            const searchPointData = yield call(searchPointApi, payload);
            if (searchPointData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: SEARCH_POINT_SUCCESS, payload: searchPointData.data});
            } else if (searchPointData.data.abstractResponse.responseStatus !== 'ERROR016') {
                let resp = {
                    point: [],
                    recordInfo: {}
                }
                yield put({type: SEARCH_POINT_SUCCESS, payload: resp});
            } else {
                yield put({type: SEARCH_POINT_FAILED, payload: searchPointData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_POINT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            } else{
                yield put({
                    type: SEARCH_POINT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchViewPoint({payload}) {
    if(payload != null){
        try {
            let viewPointData = yield call(viewPointApi, payload);
            if (viewPointData.data.abstractResponse.responseStatus === 'PST000') {
                yield put({type: VIEW_POINT_SUCCESS, payload: viewPointData.data});
            } else {
                yield put({type: VIEW_POINT_FAILED, payload: viewPointData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_POINT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VIEW_POINT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postEditPoint({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let editPointData = yield call(updatePointApi, payload);

            if (editPointData.data.abstractResponse.responseStatus === 'INQ004') {
                yield put({type: UPDATE_POINT_SUCCESS, payload: editPointData.data.data});
            } else {
                // localStorage.setItem("Update Failed", editPointData.data.abstractResponse.responseMessage);
                yield put({type: UPDATE_POINT_FAILED, payload: editPointData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_POINT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_POINT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postInsertPoint({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let insertPointData = yield call(createPointApi, payload);

            if (insertPointData.data.abstractResponse.responseStatus === 'INQ003') {
                yield put({type: CREATE_POINT_SUCCESS, payload: insertPointData.data});
            } else {
                // localStorage.setItem("Create Failed", insertPointData.data.abstractResponse.responseMessage);
                yield put({type: CREATE_POINT_FAILED, payload: insertPointData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CREATE_POINT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CREATE_POINT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


function* postDeletePoint({payload}) {
    if(payload != null){
        try {
            let deletePointData = yield call(deletePointApi, payload);

            if (deletePointData.data.abstractResponse.responseStatus === 'INQ005') {
                let responseData = deletePointData.data.point;
                yield put({type: DELETE_POINT_SUCCESS, payload: responseData});
            } else {
                yield put({type: DELETE_POINT_FAILED, payload: deletePointData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: DELETE_POINT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: DELETE_POINT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


export function* searchPoint() {
    yield takeEvery(SEARCH_POINT, fetchSearchPoint);
}

export function* viewPoint(){
    yield takeEvery(VIEW_POINT, fetchViewPoint);
}

export function* editPoint(){
    yield takeEvery(UPDATE_POINT, postEditPoint);
}

export function* createPoint(){
    yield takeEvery(CREATE_POINT, postInsertPoint);
}

export function* removePoint(){
    yield takeEvery(DELETE_POINT, postDeletePoint);
}

export function* getListCurrency(){
    yield takeEvery(GET_LIST_CURRENCY, fetchListCurrency);
}


// yield all
export default function* rootSaga() {
    yield all([
        fork(searchPoint),
        fork(viewPoint),
        fork(editPoint),
        fork(createPoint),
        fork(removePoint),
        fork(getListCurrency),
    ]);
}