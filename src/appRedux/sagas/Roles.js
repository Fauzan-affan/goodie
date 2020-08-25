import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_ROLES,
    SEARCH_ROLES_SUCCESS,
    SEARCH_ROLES_FAILED,
    VIEW_ROLES,
    VIEW_ROLES_SUCCESS,
    VIEW_ROLES_FAILED,
    UPDATE_ROLES,
    UPDATE_ROLES_SUCCESS,
    UPDATE_ROLES_FAILED,
    CREATE_ROLES,
    CREATE_ROLES_SUCCESS,
    CREATE_ROLES_FAILED,
    DELETE_ROLES,
    DELETE_ROLES_SUCCESS,
    DELETE_ROLES_FAILED,
    RESET_STATUS,
    BACK_TO_LOGIN
} from "constants/ActionTypes";
import {
    searchRolesApi,
    viewRolesApi,
    updateRolesApi,
    createRolesApi,
    deleteRolesApi,
    getListPrivilegesApi,
} from "../../appRedux/api/Roles";
import {
    GET_LIST_PRIVILEGES,
    GET_LIST_PRIVILEGES_FAILED,
    GET_LIST_PRIVILEGES_SUCCESS,
    GET_ROLES_PRIVILEGES
} from "../../constants/ActionTypes";

export function* fetchSearchRoles({payload}) {
    if(payload != null){
        try {
            const searchRolesData = yield call(searchRolesApi, payload);
            if (searchRolesData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: SEARCH_ROLES_SUCCESS, payload: searchRolesData.data});
            } else {
                yield put({type: SEARCH_ROLES_FAILED, payload: searchRolesData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_ROLES_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_ROLES_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


function* fetchViewRoles({payload}) {
    if(payload != null){
        try {
            let viewRolesData = yield call(viewRolesApi, payload);
            if (viewRolesData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: VIEW_ROLES_SUCCESS, payload: viewRolesData.data});
                // localStorage.setItem("rolesData",JSON.stringify(viewRolesData.data));
            } else {
                yield put({type: VIEW_ROLES_FAILED, payload: viewRolesData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_ROLES_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
        }
    }
}

function* postEditRoles({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let editRolesData = yield call(updateRolesApi, payload);

            if (editRolesData.data.abstractResponse.responseStatus === 'INQ004') {
                yield put({type: UPDATE_ROLES_SUCCESS, payload: editRolesData.data.data});
            } else {
                yield put({type: UPDATE_ROLES_FAILED, payload: editRolesData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_ROLES_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_ROLES_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postInsertRoles({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let insertRolesData = yield call(createRolesApi, payload);

            if (insertRolesData.data.abstractResponse.responseStatus === 'INQ003') {
                yield put({type: CREATE_ROLES_SUCCESS, payload: insertRolesData.data});
            } else {
                yield put({type: CREATE_ROLES_FAILED, payload: insertRolesData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CREATE_ROLES_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CREATE_ROLES_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchListPrivileges({payload}) {
    if(payload != null){
        try {
            let listPrivileges = yield call(getListPrivilegesApi, payload);
            if (listPrivileges.data.abstractResponse.responseStatus === 'PVL000') {
                yield put({type: GET_LIST_PRIVILEGES_SUCCESS, payload: listPrivileges.data});
            } else {
                yield put({type: GET_LIST_PRIVILEGES_FAILED, payload: listPrivileges.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: GET_LIST_PRIVILEGES_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
        }
    }
}

function* postDeleteRoles({payload}) {
    if(payload != null){
        try {
            let deleteRolesData = yield call(deleteRolesApi, payload);

            if (deleteRolesData.data.abstractResponse.responseStatus === 'INQ005') {
                let responseData = deleteRolesData.data.data;
                yield put({type: DELETE_ROLES_SUCCESS, payload: responseData});
            } else {
                yield put({type: DELETE_ROLES_FAILED, payload: deleteRolesData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: DELETE_ROLES_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: DELETE_ROLES_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

// function* fetchRolesPrivileges(param){
//
//     //Call synchronous api and put param
//     yield call(fetchTierDetails,param);
//     yield call(fetchSearchRules, param);
//     yield call(fetchViewPromotion, param);
// }


export function* searchRoles() {
    yield takeEvery(SEARCH_ROLES, fetchSearchRoles);
}

export function* viewRoles(){
    yield takeEvery(VIEW_ROLES, fetchViewRoles);
}

export function* getListPrivileges(){
    yield takeEvery(GET_LIST_PRIVILEGES, fetchListPrivileges);
}

export function* editRoles(){
    yield takeEvery(UPDATE_ROLES, postEditRoles);
}

export function* createRoles(){
    yield takeEvery(CREATE_ROLES, postInsertRoles);
}

export function* removeRoles(){
    yield takeEvery(DELETE_ROLES, postDeleteRoles);
}

// export function* viewRolesPrivileges() {
//     yield takeEvery(GET_ROLES_PRIVILEGES, fetchRolesPrivileges);
// }

// yield all
export default function* rootSaga() {
    yield all([
        fork(searchRoles),
        fork(viewRoles),
        fork(getListPrivileges),
        fork(editRoles),
        fork(createRoles),
        fork(removeRoles),
        // fork(viewRolesPrivileges)
    ]);
}
