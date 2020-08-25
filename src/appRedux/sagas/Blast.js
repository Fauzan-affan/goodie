import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_BLAST,
    SEARCH_BLAST_SUCCESS,
    SEARCH_BLAST_FAILED,
    VIEW_BLAST,
    VIEW_BLAST_SUCCESS,
    VIEW_BLAST_FAILED,
    UPDATE_BLAST,
    UPDATE_BLAST_SUCCESS,
    UPDATE_BLAST_FAILED,
    CREATE_BLAST,
    CREATE_BLAST_SUCCESS,
    CREATE_BLAST_FAILED,
    DELETE_BLAST,
    DELETE_BLAST_SUCCESS,
    DELETE_BLAST_FAILED,
    RESET_STATUS,
    BACK_TO_LOGIN,
    // ADD_STOCK
} from "constants/ActionTypes";
import {
    searchBlastApi,
    viewBlastApi,
    updateBlastApi,
    createBlastApi,
    deleteBlastApi,
    // addStockApi
} from "../../appRedux/api/Blast";


function* fetchSearchBlast({payload}) {

    if(payload != null){
        try {
            const searchBlastData = yield call(searchBlastApi, payload);
            if (searchBlastData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: SEARCH_BLAST_SUCCESS, payload: searchBlastData.data});
            } else if (searchBlastData.data.abstractResponse.responseStatus !== 'ERROR016') {
                let resp = {
                    blast : [],
                    recordInfo: {}
                }
                yield put({type: SEARCH_BLAST_SUCCESS, payload: resp});
            } else {
                yield put({type: SEARCH_BLAST_FAILED, payload: searchBlastData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_BLAST_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
            // else{
            //     yield put({
            //         type: SEARCH_BLAST_FAILED,
            //         payload: 'Sorry, this feature is not accessible at this time.'
            //     });
            // }
        }
    }
}

function* fetchViewBlast({payload}) {
    if(payload != null){
        try {
            let viewBlastData = yield call(viewBlastApi, payload);
            if (viewBlastData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: VIEW_BLAST_SUCCESS, payload: viewBlastData.data});
            }
            // else if (viewBlastData.data.abstractResponse.responseStatus !== 'ERROR016') {
            //     let resp = {
            //         member : [],
            //         recordInfo: {}
            //     }
            //     yield put({type: VIEW_BLAST_SUCCESS, payload: resp});
            // }
            else {
                yield put({type: VIEW_BLAST_FAILED, payload: viewBlastData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_BLAST_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VIEW_BLAST_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postEditBlast({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let editBlastData = yield call(updateBlastApi, payload);

            if (editBlastData.data.abstractResponse.responseStatus === 'INQ004') {
                yield put({type: UPDATE_BLAST_SUCCESS, payload: editBlastData.data.messageBlast});
            } else {
                localStorage.setItem("Update Failed", editBlastData.data.abstractResponse.responseMessage);
                yield put({type: UPDATE_BLAST_FAILED, payload: editBlastData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_BLAST_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_BLAST_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postInsertBlast({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let insertBlastData = yield call(createBlastApi, payload);

            if (insertBlastData.data.abstractResponse.responseStatus === 'INQ003') {
                yield put({type: CREATE_BLAST_SUCCESS, payload: insertBlastData.data});
            } else {
                localStorage.setItem("Create Failed", insertBlastData.data.abstractResponse.responseMessage);
                yield put({type: CREATE_BLAST_FAILED, payload: insertBlastData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CREATE_BLAST_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CREATE_BLAST_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


function* postDeleteBlast({payload}) {
    if(payload != null){
        try {
            let deleteBlastData = yield call(deleteBlastApi, payload);

            if (deleteBlastData.data.abstractResponse.responseStatus === 'INQ005') {
                let responseData = deleteBlastData.data.blast;
                yield put({type: DELETE_BLAST_SUCCESS, payload: responseData});
            } else {
                yield put({type: DELETE_BLAST_FAILED, payload: deleteBlastData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: DELETE_BLAST_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: DELETE_BLAST_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


export function* searchBlast() {
    yield takeEvery(SEARCH_BLAST, fetchSearchBlast);
}

export function* viewBlast(){
    yield takeEvery(VIEW_BLAST, fetchViewBlast);
}

export function* editBlast(){
    yield takeEvery(UPDATE_BLAST, postEditBlast);
}

export function* createBlast(){
    yield takeEvery(CREATE_BLAST, postInsertBlast);
}

export function* removeBlast(){
    yield takeEvery(DELETE_BLAST, postDeleteBlast);
}


// yield all
export default function* rootSaga() {
    yield all([
        fork(searchBlast),
        fork(viewBlast),
        fork(editBlast),
        fork(createBlast),
        fork(removeBlast),
    ]);
}