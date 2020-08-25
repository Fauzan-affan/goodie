import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_DOORPRIZE,
    SEARCH_DOORPRIZE_SUCCESS,
    SEARCH_DOORPRIZE_FAILED,
    CREATE_DOORPRIZE,
    CREATE_DOORPRIZE_SUCCESS,
    CREATE_DOORPRIZE_FAILED,
    RESET_STATUS,
    BACK_TO_LOGIN,
} from "constants/ActionTypes";
import {
    searchDoorprizeApi,
    createDoorprizeApi,
} from "../../appRedux/api/Doorprize";


function* fetchSearchDoorprize({payload}) {

    if(payload != null){
        try {
            const searchDoorprizeData = yield call(searchDoorprizeApi, payload);
            if (searchDoorprizeData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: SEARCH_DOORPRIZE_SUCCESS, payload: searchDoorprizeData.data});
            } else if (searchDoorprizeData.data.abstractResponse.responseStatus !== 'ERROR016') {
                let resp = {
                    doorprize : [],
                    recordInfo: {}
                }
                yield put({type: SEARCH_DOORPRIZE_SUCCESS, payload: resp});
            } else {
                yield put({type: SEARCH_DOORPRIZE_FAILED, payload: searchDoorprizeData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_DOORPRIZE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            } else{
                yield put({
                    type: SEARCH_DOORPRIZE_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postInsertDoorprize({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let insertDoorprizeData = yield call(createDoorprizeApi, payload);

            if (insertDoorprizeData.data.abstractResponse.responseStatus === 'INQ003') {
                yield put({type: CREATE_DOORPRIZE_SUCCESS, payload: insertDoorprizeData.data});
            } else {
                // localStorage.setItem("Create Failed", insertBlastData.data.abstractResponse.responseMessage);
                yield put({type: CREATE_DOORPRIZE_FAILED, payload: insertDoorprizeData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CREATE_DOORPRIZE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CREATE_DOORPRIZE_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


export function* searchDoorprize() {
    yield takeEvery(SEARCH_DOORPRIZE, fetchSearchDoorprize);
}

export function* createDoorprize(){
    yield takeEvery(CREATE_DOORPRIZE, postInsertDoorprize);
}


// yield all
export default function* rootSaga() {
    yield all([
        fork(searchDoorprize),
        fork(createDoorprize),
    ]);
}