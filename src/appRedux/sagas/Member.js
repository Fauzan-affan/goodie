import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_MEMBERS,
    SEARCH_MEMBERS_SUCCESS,
    SEARCH_MEMBERS_FAILED,
    VIEW_MEMBER,
    VIEW_MEMBER_SUCCESS,
    VIEW_MEMBER_FAILED,
    CHANGE_STATUS_MEMBER_SUCCESS,
    CHANGE_STATUS_MEMBER_FAILED,
    BACK_TO_LOGIN
} from "constants/ActionTypes";
import {
    searchMembersApi,
    viewMemberApi,
    changeStatusApi,
    uploadMemberApi
} from "../../appRedux/api/Member";
import {
    CHANGE_STATUS_MEMBER,
    UPLOAD_MEMBER,
    UPLOAD_MEMBER_FAILED,
    UPLOAD_MEMBER_SUCCESS
} from "../../constants/ActionTypes";


function* fetchSearchMembers({payload}) {
    if(payload != null){
        try {
            const searchMembersData = yield call(searchMembersApi, payload);
            if (searchMembersData.data.abstractResponse.responseStatus === 'MEM000') {
                yield put({type: SEARCH_MEMBERS_SUCCESS, payload: searchMembersData.data});
            } else if (searchMembersData.data.abstractResponse.responseStatus === 'ERROR016') {
                let resp = {
                    member : [],
                    recordInfo: {}
                }
                yield put({type: SEARCH_MEMBERS_SUCCESS, payload: resp});
            }else{
                    yield put({type: SEARCH_MEMBERS_FAILED, payload: searchMembersData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_MEMBERS_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }
            // else{
            //     yield put({
            //         type: SEARCH_MEMBERS_FAILED,
            //         payload: 'Sorry, this feature is not accessible at this time.'
            //     });
            // }
        }
    }
}

function* fetchViewMember({payload}) {
    if(payload != null){
        try {
            let viewMemberData = yield call(viewMemberApi, payload);
            if (viewMemberData.data.abstractResponse.responseStatus === 'MEM000') {
                yield put({type: VIEW_MEMBER_SUCCESS, payload: viewMemberData.data.member});
            } else {
                yield put({type: VIEW_MEMBER_FAILED, payload: viewMemberData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_MEMBER_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VIEW_MEMBER_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postChangeStatusMember({payload}) {
    if(payload != null){
        try {
            let changeStatusMemberData = yield call(changeStatusApi, payload);
            if (changeStatusMemberData.data.abstractResponse.responseStatus === 'MEM000') {
                yield put({type: CHANGE_STATUS_MEMBER_SUCCESS, payload: changeStatusMemberData.data.member});
            } else {
                yield put({type: CHANGE_STATUS_MEMBER_FAILED, payload: changeStatusMemberData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CHANGE_STATUS_MEMBER_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CHANGE_STATUS_MEMBER_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postUploadMember({payload}){
    if(payload != null){
        try {
            let uploadMemberData = yield call(uploadMemberApi, payload);
            if (uploadMemberData.data.abstractResponse[0].responseStatus === 'MEM000') {
                yield put({type: UPLOAD_MEMBER_SUCCESS, payload: uploadMemberData.data});
            }else{
                yield put({type: UPLOAD_MEMBER_FAILED, payload: uploadMemberData.data.abstractResponse[0].responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPLOAD_MEMBER_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPLOAD_MEMBER_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


export function* searchMembers() {
    yield takeEvery(SEARCH_MEMBERS, fetchSearchMembers);
}

export function* viewMember(){
    yield takeEvery(VIEW_MEMBER, fetchViewMember);
}

export function* changeStatusMember(){
    yield takeEvery(CHANGE_STATUS_MEMBER, postChangeStatusMember);
}

export function* uploadMember() {
    yield takeEvery(UPLOAD_MEMBER, postUploadMember);
}


// yield all
export default function* rootSaga() {
    yield all([
        fork(searchMembers),
        fork(viewMember),
        fork(changeStatusMember),
        fork(uploadMember),
    ]);
}
