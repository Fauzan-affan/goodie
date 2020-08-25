import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_GAMIFICATION,
    SEARCH_GAMIFICATION_SUCCESS,
    SEARCH_GAMIFICATION_FAILED,
    VIEW_GAMIFICATION,
    VIEW_GAMIFICATION_SUCCESS,
    VIEW_GAMIFICATION_FAILED,
    UPDATE_GAMIFICATION,
    UPDATE_GAMIFICATION_SUCCESS,
    UPDATE_GAMIFICATION_FAILED,
    CREATE_GAMIFICATION,
    CREATE_GAMIFICATION_SUCCESS,
    CREATE_GAMIFICATION_FAILED,
    DELETE_GAMIFICATION,
    DELETE_GAMIFICATION_SUCCESS,
    DELETE_GAMIFICATION_FAILED,
    RESET_STATUS,
    BACK_TO_LOGIN,
    GET_GAMIFICATION_TYPES,
    GET_GAMIFICATION_TYPES_SUCCESS,
    GET_GAMIFICATION_TYPES_FAILED
} from "constants/ActionTypes";
import {
    // searchGamificationApi,
    searchGamiApi,
    viewGamificationApi,
    viewGamiApi,
    updateGamificationApi,
    createGamificationApi,
    deleteGamificationApi,
    getGameTypesApi
} from "../../appRedux/api/Gamification";

// export function* fetchSearchGamification({payload}) {
//     if(payload != null){
//         try {
//             const searchGamificationData = yield call(searchGamificationApi, payload);
//             if (searchGamificationData.data.abstractResponse.responseStatus === 'INQ000') {
//                 yield put({type: SEARCH_GAMIFICATION_SUCCESS, payload: searchGamificationData.data});
//             } else {
//                 yield put({type: SEARCH_GAMIFICATION_FAILED, payload: searchGamificationData.data.abstractResponse.responseMessage});
//             }
//         } catch (error) {
//             if(error.response !== undefined) {
//                 if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
//                     yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
//                 } else {
//                     yield put({
//                         type: SEARCH_GAMIFICATION_FAILED,
//                         payload: error.response.data.abstractResponse.responseMessage
//                     });
//                 }
//             }else{
//                 yield put({
//                     type: SEARCH_GAMIFICATION_FAILED,
//                     payload: 'Sorry, this feature is not accessible at this time.'
//                 });
//             }
//         }
//     }
// }

export function* fetchSearchGami({payload}) {
    if(payload != null){
        try {
            const searchGamificationData = yield call(searchGamiApi, payload);
            if (searchGamificationData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: SEARCH_GAMIFICATION_SUCCESS, payload: searchGamificationData.data});
            } else if (searchGamificationData.data.abstractResponse.responseStatus !== 'ERROR016') {
                let resp = {
                    gamification: [],
                    recordInfo: {}
                }
                yield put({type: SEARCH_GAMIFICATION_SUCCESS, payload: resp});
            } else {
                yield put({type: SEARCH_GAMIFICATION_FAILED, payload: searchGamificationData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_GAMIFICATION_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_GAMIFICATION_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


function* fetchViewGamification({payload}) {
    if(payload != null){
        try {
            let viewGamificationData = yield call(viewGamificationApi, payload);
            if (viewGamificationData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: VIEW_GAMIFICATION_SUCCESS, payload: viewGamificationData.data});
            } else {
                yield put({type: VIEW_GAMIFICATION_FAILED, payload: viewGamificationData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_GAMIFICATION_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
        }
    }
}

function* fetchViewGami({payload}) {
    if(payload != null){
        try {
            let viewGamificationData = yield call(viewGamiApi, payload);
            if (viewGamificationData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: VIEW_GAMIFICATION_SUCCESS, payload: viewGamificationData.data});
            } else {
                yield put({type: VIEW_GAMIFICATION_FAILED, payload: viewGamificationData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_GAMIFICATION_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
        }
    }
}

function* postEditGamification({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let editGamificationData = yield call(updateGamificationApi, payload);

            if (editGamificationData.data.abstractResponse.responseStatus === 'INQ004') {
                yield put({type: UPDATE_GAMIFICATION_SUCCESS, payload: editGamificationData.data.data});
            } else {
                yield put({type: UPDATE_GAMIFICATION_FAILED, payload: editGamificationData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_GAMIFICATION_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_GAMIFICATION_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postInsertGamification({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let insertGamificationData = yield call(createGamificationApi, payload);

            if (insertGamificationData.data.abstractResponse.responseStatus === 'INQ003') {
                yield put({type: CREATE_GAMIFICATION_SUCCESS, payload: insertGamificationData.data});
            } else {
                yield put({type: CREATE_GAMIFICATION_FAILED, payload: insertGamificationData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CREATE_GAMIFICATION_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CREATE_GAMIFICATION_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postDeleteGamification({payload}) {
    if(payload != null){
        try {
            let deleteGamificationData = yield call(deleteGamificationApi, payload);

            if (deleteGamificationData.data.abstractResponse.responseStatus === 'INQ000') {
                let responseData = deleteGamificationData.data.data;
                yield put({type: DELETE_GAMIFICATION_SUCCESS, payload: responseData});
            } else {
                yield put({type: DELETE_GAMIFICATION_FAILED, payload: deleteGamificationData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: DELETE_GAMIFICATION_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: DELETE_GAMIFICATION_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchGetGameTypes({ payload }) {
    if (payload) {
        try {
            const gameTypes = yield call(getGameTypesApi, payload);

            if (gameTypes) {
                yield put({
                    type: GET_GAMIFICATION_TYPES_SUCCESS,
                    payload: gameTypes.data
                });
            } else {
                yield put({
                    type: GET_GAMIFICATION_TYPES_FAILED,
                    payload: gameTypes.data.abstractResponse.responseMessage
                })
            }
        } catch (error) {
            if (error.response) {
                if (error.response) {
                    yield put({
                        type: BACK_TO_LOGIN,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                } else {
                    yield put({
                        type: GET_GAMIFICATION_TYPES_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
        }
    }
}


// export function* searchGamification() {
//     yield takeEvery(SEARCH_GAMIFICATION, fetchSearchGamification);
// }

export function* searchGami() {
    yield takeEvery(SEARCH_GAMIFICATION, fetchSearchGami);
}

export function* viewGamification(){
    yield takeEvery(VIEW_GAMIFICATION, fetchViewGamification);
}

export function* viewGami(){
    yield takeEvery(VIEW_GAMIFICATION, fetchViewGami);
}

export function* editGamification(){
    yield takeEvery(UPDATE_GAMIFICATION, postEditGamification);
}

export function* createGamification(){
    yield takeEvery(CREATE_GAMIFICATION, postInsertGamification);
}

export function* removeGamification(){
    yield takeEvery(DELETE_GAMIFICATION, postDeleteGamification);
}

export function* getGameTypes() {
    yield takeEvery(GET_GAMIFICATION_TYPES, fetchGetGameTypes);
}

// yield all
export default function* rootSaga() {
    yield all([
        // fork(searchGamification),
        fork(searchGami),
        fork(viewGamification),
        fork(viewGami),
        fork(editGamification),
        fork(createGamification),
        fork(removeGamification),
        fork(getGameTypes)
    ]);
}
