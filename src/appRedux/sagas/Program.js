import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_PROGRAMS,
    SEARCH_PROGRAMS_SUCCESS,
    SEARCH_PROGRAMS_FAILED,
    VIEW_PROGRAM,
    VIEW_PROGRAM_SUCCESS,
    VIEW_PROGRAM_FAILED,
    UPDATE_PROGRAM,
    UPDATE_PROGRAM_SUCCESS,
    UPDATE_PROGRAM_FAILED,
    CREATE_PROGRAM,
    CREATE_PROGRAM_SUCCESS,
    CREATE_PROGRAM_FAILED,
    DELETE_PROGRAM,
    DELETE_PROGRAM_SUCCESS,
    DELETE_PROGRAM_FAILED,
    RESET_STATUS,
    BACK_TO_LOGIN
} from "constants/ActionTypes";
import {
    searchProgramsApi,
    viewProgramApi,
    updateProgramApi,
    createProgramApi,
    deleteProgramApi,
} from "../../appRedux/api/Program";
import {GET_TIER_AND_PROGRAM} from "../../constants/ActionTypes";
import {fetchTierDetails} from "./Tier";

function* fetchSearchPrograms({payload}) {
    if(payload != null){
        try {
            const searchProgramsData = yield call(searchProgramsApi, payload);
            if (searchProgramsData.data.abstractResponse.responseStatus === 'PROG901') {
                yield put({type: SEARCH_PROGRAMS_SUCCESS, payload: searchProgramsData.data.program});
            } else {
                yield put({type: SEARCH_PROGRAMS_FAILED, payload: searchProgramsData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_PROGRAMS_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_PROGRAMS_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchViewProgram({payload}) {
    if(payload != null){
        try {
            let viewProgramData = yield call(viewProgramApi, payload);
            if (viewProgramData.data.abstractResponse.responseStatus === 'PROG103') {
                yield put({type: VIEW_PROGRAM_SUCCESS, payload: viewProgramData.data.program});
            } else {
                yield put({type: VIEW_PROGRAM_FAILED, payload: viewProgramData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_PROGRAM_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VIEW_PROGRAM_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postEditProgram({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let editProgramData = yield call(updateProgramApi, payload);

            if (editProgramData.data.abstractResponse.responseStatus === 'PROG102') {
                yield put({type: UPDATE_PROGRAM_SUCCESS, payload: editProgramData.data.program});
            } else {
                yield put({type: UPDATE_PROGRAM_FAILED, payload: editProgramData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_PROGRAM_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_PROGRAM_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postInsertProgram({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let insertProgramData = yield call(createProgramApi, payload);

            if (insertProgramData.data.abstractResponse.responseStatus === 'PROG100') {
                yield put({type: CREATE_PROGRAM_SUCCESS, payload: insertProgramData.data.tie});
            } else {
                yield put({type: CREATE_PROGRAM_FAILED, payload: insertProgramData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CREATE_PROGRAM_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CREATE_PROGRAM_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


function* postDeleteProgram({payload}) {
    if(payload != null){
        try {
            let deleteProgramData = yield call(deleteProgramApi, payload);

            if (deleteProgramData.data.abstractResponse.responseStatus === 'PROG104') {
                let responseData = deleteProgramData.data.program;
                yield put({type: DELETE_PROGRAM_SUCCESS, payload: responseData});
            } else {
                yield put({type: DELETE_PROGRAM_FAILED, payload: deleteProgramData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: DELETE_PROGRAM_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: DELETE_PROGRAM_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchTierAndProgram(param){
    //Call synchronous api and put param
    yield call(fetchTierDetails,param);
    yield call(fetchViewProgram, param);
}


export function* searchPrograms() {
    yield takeEvery(SEARCH_PROGRAMS, fetchSearchPrograms);
}

export function* viewProgram(){
    yield takeEvery(VIEW_PROGRAM, fetchViewProgram);
}

export function* editProgram(){
    yield takeEvery(UPDATE_PROGRAM, postEditProgram);
}

export function* createProgram(){
    yield takeEvery(CREATE_PROGRAM, postInsertProgram);
}

export function* removeProgram(){
    yield takeEvery(DELETE_PROGRAM, postDeleteProgram);
}

export function* getTierAndProgram(){
    yield takeEvery(GET_TIER_AND_PROGRAM, fetchTierAndProgram);
}

// yield all
export default function* rootSaga() {
    yield all([
        fork(searchPrograms),
        fork(viewProgram),
        fork(editProgram),
        fork(createProgram),
        fork(removeProgram),
        fork(getTierAndProgram),
    ]);
}
