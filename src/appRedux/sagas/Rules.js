import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_RULES,
    SEARCH_RULES_SUCCESS,
    SEARCH_RULES_FAILED,
    VIEW_RULE,
    VIEW_RULE_SUCCESS,
    VIEW_RULE_FAILED,
    UPDATE_RULE,
    UPDATE_RULE_SUCCESS,
    UPDATE_RULE_FAILED,
    CREATE_RULE,
    CREATE_RULE_SUCCESS,
    CREATE_RULE_FAILED,
    DELETE_RULE,
    DELETE_RULE_SUCCESS,
    DELETE_RULE_FAILED,
    RESET_STATUS,
    BACK_TO_LOGIN
} from "constants/ActionTypes";
import {
    searchRulesApi,
    viewBasicRuleApi,
    updateBasicRuleApi,
    createBasicRuleApi,
    viewReferralRuleApi,
    updateReferralRuleApi,
    createReferralRuleApi,
    viewCustomRuleApi,
    updateCustomRuleApi,
    createCustomRuleApi,
    deleteRuleApi
} from "../../appRedux/api/Rules";


export function* fetchSearchRules({payload}) {
    if(payload != null){
        try {
            const searchRulesData = yield call(searchRulesApi, payload);
            if (searchRulesData.data.abstractResponse.responseStatus === 'RUL005') {
                yield put({type: SEARCH_RULES_SUCCESS, payload: searchRulesData.data});
            } else {
                yield put({type: SEARCH_RULES_FAILED, payload: searchRulesData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_RULES_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_RULES_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchViewRule({payload}) {
    if(payload != null){
        try {
            let viewRuleData = [];
            if(payload.type === 'basic'){
                viewRuleData = yield call(viewBasicRuleApi, payload);
            }else if(payload.type === 'referral'){
                viewRuleData = yield call(viewReferralRuleApi, payload);
            }else if(payload.type === 'custom'){
                viewRuleData = yield call(viewCustomRuleApi, payload);
            }

            if (viewRuleData.data.abstractResponse.responseStatus === 'RUL002') {
                // console.log(viewRuleData.data.rule)
                let responseData = viewRuleData.data.rule;
                responseData.type = payload.type;
                yield put({type: VIEW_RULE_SUCCESS, payload: responseData});
            } else {
                yield put({type: VIEW_RULE_FAILED, payload: viewRuleData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_RULE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VIEW_RULE_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postEditRule({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let editRuleData = [];
            if(payload.type === 'basic'){
                editRuleData = yield call(updateBasicRuleApi, payload);
            }else if(payload.type === 'referral'){
                editRuleData = yield call(updateReferralRuleApi, payload);
            }else if(payload.type === 'custom'){
                editRuleData = yield call(updateCustomRuleApi, payload);
            }

            if (editRuleData.data.abstractResponse.responseStatus === 'RUL003') {
                let responseData = editRuleData.data.rule;
                yield put({type: UPDATE_RULE_SUCCESS, payload: responseData});
            } else {
                yield put({type: UPDATE_RULE_FAILED, payload: editRuleData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_RULE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_RULE_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postInsertRule({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let insertRuleData = [];
            if(payload.type === 'basic'){
                insertRuleData = yield call(createBasicRuleApi, payload);
            }else if(payload.type === 'referral'){
                insertRuleData = yield call(createReferralRuleApi, payload);
            }else if(payload.type === 'custom'){
                insertRuleData = yield call(createCustomRuleApi, payload);
            }

            if (insertRuleData.data.abstractResponse.responseStatus === 'RUL000') {
                let responseData = insertRuleData.data.rule;
                yield put({type: CREATE_RULE_SUCCESS, payload: responseData});
            } else {
                yield put({type: CREATE_RULE_FAILED, payload: insertRuleData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CREATE_RULE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CREATE_RULE_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


function* postDeleteRule({payload}) {
    if(payload != null){
        try {
            let deleteRuleData = yield call(deleteRuleApi, payload);

            if (deleteRuleData.data.abstractResponse.responseStatus === 'RUL006') {
                let responseData = deleteRuleData.data.rule;
                yield put({type: DELETE_RULE_SUCCESS, payload: responseData});
            } else {
                yield put({type: DELETE_RULE_FAILED, payload: deleteRuleData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: DELETE_RULE_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: DELETE_RULE_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


export function* searchRule() {
    yield takeEvery(SEARCH_RULES, fetchSearchRules);
}

export function* viewRule(){
    yield takeEvery(VIEW_RULE, fetchViewRule);
}

export function* editRule(){
    yield takeEvery(UPDATE_RULE, postEditRule);
}

export function* updateRule(){
    yield takeEvery(UPDATE_RULE, postEditRule);
}

export function* createRule(){
    yield takeEvery(CREATE_RULE, postInsertRule);
}

export function* removeRule(){
    yield takeEvery(DELETE_RULE, postDeleteRule);
}

// yield all
export default function* rootSaga() {
    yield all([
        fork(searchRule),
        fork(viewRule),
        fork(editRule),
        fork(createRule),
        fork(removeRule)
    ]);
}
