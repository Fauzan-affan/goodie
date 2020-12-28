import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_STORE,
    SEARCH_STORE_SUCCESS,
    SEARCH_STORE_FAILED,
    VIEW_STORE,
    VIEW_STORE_SUCCESS,
    VIEW_STORE_FAILED,
    UPDATE_STORE,
    UPDATE_STORE_SUCCESS,
    UPDATE_STORE_FAILED,
    CREATE_STORE,
    CREATE_STORE_SUCCESS,
    CREATE_STORE_FAILED,
    DELETE_STORE,
    DELETE_STORE_SUCCESS,
    DELETE_STORE_FAILED,
    RESET_STATUS,
    BACK_TO_LOGIN
} from "constants/ActionTypes";
import {
    searchStoreApi,
    viewStoreApi,
    updateStoreApi,
    createStoreApi,
    deleteStoreApi,
} from "../../appRedux/api/Store";

function* fetchSearchStore({payload}) {
    if(payload != null){
        try {
            const searchStoreData = yield call(searchStoreApi, payload);
            if (searchStoreData.data.abstractResponse.responseStatus === 'STR000') {
                yield put({type: SEARCH_STORE_SUCCESS, payload: searchStoreData.data});
            } else{
                    yield put({type: SEARCH_STORE_FAILED, payload: searchStoreData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_STORE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
        }
    }
}

function* fetchViewStore({payload}) {
    if(payload != null){
        try {
            let viewStoreData = yield call(viewStoreApi, payload);
            if (viewStoreData.data.abstractResponse.responseStatus === 'STR903') {
                yield put({type: VIEW_STORE_SUCCESS, payload: viewStoreData.data});
                localStorage.setItem("userData",JSON.stringify(viewStoreData.data));
            } else {
                yield put({type: VIEW_STORE_FAILED, payload: viewStoreData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_STORE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
        }
    }
}

function* postInsertStore({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let insertRolesData = yield call(createStoreApi, payload);

            if (insertRolesData.data.abstractResponse.responseStatus === 'STR900') {
                yield put({type: CREATE_STORE_SUCCESS, payload: insertRolesData.data});
            } else {
                yield put({type: CREATE_STORE_FAILED, payload: insertRolesData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CREATE_STORE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CREATE_STORE_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postEditStore({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let editStoreData = yield call(updateStoreApi, payload);

            if (editStoreData.data.abstractResponse.responseStatus === 'STR904') {
                yield put({type: UPDATE_STORE_SUCCESS, payload: editStoreData.data.product});
            } else {
                yield put({type: UPDATE_STORE_FAILED, payload: editStoreData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_STORE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_STORE_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


function* postDeleteStore({payload}) {
    if(payload != null){
        try {
            let deleteStoreData = yield call(deleteStoreApi, payload);

            if (deleteStoreData.data.abstractResponse.responseStatus === 'STR906') {
                let responseData = deleteStoreData.data.product;
                yield put({type: DELETE_STORE_SUCCESS, payload: responseData});
            } else {
                yield put({type: DELETE_STORE_FAILED, payload: deleteStoreData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: DELETE_STORE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: DELETE_STORE_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

export function* searchStore() {
    yield takeEvery(SEARCH_STORE, fetchSearchStore);
}

export function* viewStore(){
    yield takeEvery(VIEW_STORE, fetchViewStore);
}

export function* createStore(){
    yield takeEvery(CREATE_STORE, postInsertStore);
}

export function* updateStore(){
    yield takeEvery(UPDATE_STORE, postEditStore);
}

export function* deleteStore(){
    yield takeEvery(DELETE_STORE, postDeleteStore);
}

// yield all
export default function* rootSaga() {
    yield all([
        fork(searchStore),
        fork(viewStore),
        fork(createStore),
        fork(updateStore),
        fork(deleteStore),
    ]);
}