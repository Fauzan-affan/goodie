import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_USERS,
    SEARCH_USERS_SUCCESS,
    SEARCH_USERS_FAILED,
    VIEW_USERS,
    VIEW_USERS_SUCCESS,
    VIEW_USERS_FAILED,
    UPDATE_USERS,
    UPDATE_USERS_SUCCESS,
    UPDATE_USERS_FAILED,
    CREATE_USERS,
    CREATE_USERS_SUCCESS,
    CREATE_USERS_FAILED,
    CHANGE_STATUS_USER,
    CHANGE_STATUS_USER_SUCCESS,
    CHANGE_STATUS_USER_FAILED,
    RESET_STATUS,
    BACK_TO_LOGIN,
    CHANGE_PASSWORD_USER,
    CHANGE_PASSWORD_USER_SUCCESS,
    CHANGE_PASSWORD_USER_FAILED,
} from "constants/ActionTypes";
import {
    searchUserApi,
    viewUserApi,
    createUserApi,
    updateUserApi,
    changeStatusUserApi,
    changePasswordUserApi,
} from "../../appRedux/api/User";



export function* fetchSearchUser({payload}) {
    if(payload != null){
        try {
            const searchUserData = yield call(searchUserApi, payload);
            if (searchUserData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: SEARCH_USERS_SUCCESS, payload: searchUserData.data});
                // localStorage.setItem("userData",JSON.stringify(searchUserData.data));
            } else {
                yield put({type: SEARCH_USERS_FAILED, payload: searchUserData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_USERS_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_USERS_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchViewUser({payload}) {
    if(payload != null){
        try {
            let viewUserData = yield call(viewUserApi, payload);
            if (viewUserData.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: VIEW_USERS_SUCCESS, payload: viewUserData.data});
                localStorage.setItem("userData",JSON.stringify(viewUserData.data));
            } else {
                yield put({type: VIEW_USERS_FAILED, payload: viewUserData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_USERS_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
        }
    }
}

function* postEditUser({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let editUserData = yield call(updateUserApi, payload);

            if (editUserData.data.abstractResponse.responseStatus === 'INQ004') {
                yield put({type: UPDATE_USERS_SUCCESS, payload: editUserData.data.data});
            } else {
                yield put({type: UPDATE_USERS_FAILED, payload: editUserData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_USERS_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_USERS_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postInsertUser({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let insertUserData = yield call(createUserApi, payload);

            if (insertUserData.data.abstractResponse.responseStatus === 'INQ003') {
                yield put({type: CREATE_USERS_SUCCESS, payload: insertUserData.data});
            } else {
                yield put({type: CREATE_USERS_FAILED, payload: insertUserData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CREATE_USERS_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CREATE_USERS_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postChangeStatusUser({payload}) {
    if(payload != null){
        try {
            let changeStatusUserData = yield call(changeStatusUserApi, payload);
            if (changeStatusUserData.data.abstractResponse.responseStatus === 'INQ004') {
                yield put({type: CHANGE_STATUS_USER_SUCCESS, payload: changeStatusUserData.data.data});
            } else {
                yield put({type: CHANGE_STATUS_USER_FAILED, payload: changeStatusUserData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CHANGE_STATUS_USER_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CHANGE_STATUS_USER_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


function* postChangePasswordUser({payload}) {
    try {
        const changePasswordUserData = yield call(changePasswordUserApi, payload);
        if (changePasswordUserData.data.abstractResponse.responseStatus === 'INQ004') {
            // let responseData = changePasswordUserData.data;
            yield put({type: CHANGE_PASSWORD_USER_SUCCESS, payload: changePasswordUserData.data});
        } else {
            yield put({type: CHANGE_PASSWORD_USER_FAILED, payload: changePasswordUserData.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        yield put({type: CHANGE_PASSWORD_USER_FAILED, payload: error.data.abstractResponse.responseMessage});
    }
}


export function* searchUser() {
    yield takeEvery(SEARCH_USERS, fetchSearchUser);
}

export function* viewUser(){
    yield takeEvery(VIEW_USERS, fetchViewUser);
}

export function* editUser(){
    yield takeEvery(UPDATE_USERS, postEditUser);
}

export function* createUser(){
    yield takeEvery(CREATE_USERS, postInsertUser);
}

export function* changePassword() {
    yield takeEvery(CHANGE_PASSWORD_USER, postChangePasswordUser);
}

export function* changeStatusUser(){
    yield takeEvery(CHANGE_STATUS_USER, postChangeStatusUser);
}

// yield all
export default function* rootSaga() {
    yield all([
        fork(searchUser),
        fork(changeStatusUser),
        fork(viewUser),
        fork(editUser),
        fork(createUser),
        fork(changePassword),
    ]);
}
