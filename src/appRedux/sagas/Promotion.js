import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_PROMOTIONS,
    SEARCH_PROMOTIONS_SUCCESS,
    SEARCH_PROMOTIONS_FAILED,
    VIEW_PROMOTION,
    VIEW_PROMOTION_SUCCESS,
    VIEW_PROMOTION_FAILED,
    UPDATE_PROMOTION,
    UPDATE_PROMOTION_SUCCESS,
    UPDATE_PROMOTION_FAILED,
    CREATE_PROMOTION,
    CREATE_PROMOTION_SUCCESS,
    CREATE_PROMOTION_FAILED,
    DELETE_PROMOTION,
    DELETE_PROMOTION_SUCCESS,
    DELETE_PROMOTION_FAILED,
    RESET_STATUS,
    BACK_TO_LOGIN
} from "constants/ActionTypes";
import {
    searchPromotionsApi,
    viewPromotionApi,
    updatePromotionApi,
    createPromotionApi,
    deletePromotionApi
} from "../../appRedux/api/Promotion";
import {GET_PROMOTION_TIER_RULE} from "../../constants/ActionTypes";
import {fetchTierDetails} from "./Tier";
import {fetchSearchRules} from "./Rules";


function* fetchSearchPromotions({payload}) {
    if(payload != null){
        try {
            const searchPromotionsData = yield call(searchPromotionsApi, payload);
            if (searchPromotionsData.data.abstractResponse.responseStatus === 'PRM000') {
                yield put({type: SEARCH_PROMOTIONS_SUCCESS, payload: searchPromotionsData.data.promotion});
            } else {
                yield put({type: SEARCH_PROMOTIONS_FAILED, payload: searchPromotionsData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_PROMOTIONS_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_PROMOTIONS_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchViewPromotion({payload}) {
    if(payload != null){
        try {
            let viewPromotionData = yield call(viewPromotionApi, payload);
            if (viewPromotionData.data.abstractResponse.responseStatus === 'PRM002') {
                yield put({type: VIEW_PROMOTION_SUCCESS, payload: viewPromotionData.data.promotion});
            } else {
                yield put({type: VIEW_PROMOTION_FAILED, payload: viewPromotionData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_PROMOTION_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VIEW_PROMOTION_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postEditPromotion({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let editPromotionData = yield call(updatePromotionApi, payload);

            if (editPromotionData.data.abstractResponse.responseStatus === 'PRM003') {
                yield put({type: UPDATE_PROMOTION_SUCCESS, payload: editPromotionData.data.promotion});
            } else {
                yield put({type: UPDATE_PROMOTION_FAILED, payload: editPromotionData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_PROMOTION_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_PROMOTION_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postInsertPromotion({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let insertPromotionData = yield call(createPromotionApi, payload);

            if (insertPromotionData.data.abstractResponse.responseStatus === 'PRM001') {
                yield put({type: CREATE_PROMOTION_SUCCESS, payload: insertPromotionData.data});
            } else {
                yield put({type: CREATE_PROMOTION_FAILED, payload: insertPromotionData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CREATE_PROMOTION_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CREATE_PROMOTION_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


function* postDeletePromotion({payload}) {
    if(payload != null){
        try {
            let deletePromotionData = yield call(deletePromotionApi, payload);

            if (deletePromotionData.data.abstractResponse.responseStatus === 'PRM004') {
                let responseData = deletePromotionData.data.promotion;
                yield put({type: DELETE_PROMOTION_SUCCESS, payload: responseData});
            } else {
                yield put({type: DELETE_PROMOTION_FAILED, payload: deletePromotionData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: DELETE_PROMOTION_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: DELETE_PROMOTION_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchPromotionRuleTier(param){

    //Call synchronous api and put param
    yield call(fetchTierDetails,param);
    yield call(fetchSearchRules, param);
    yield call(fetchViewPromotion, param);
}


export function* searchPromotions() {
    yield takeEvery(SEARCH_PROMOTIONS, fetchSearchPromotions);
}

export function* viewPromotion(){
    yield takeEvery(VIEW_PROMOTION, fetchViewPromotion);
}

export function* editPromotion(){
    yield takeEvery(UPDATE_PROMOTION, postEditPromotion);
}

export function* createPromotion(){
    yield takeEvery(CREATE_PROMOTION, postInsertPromotion);
}

export function* removePromotion(){
    yield takeEvery(DELETE_PROMOTION, postDeletePromotion);
}

export function* viewPromotionTierRule() {
    yield takeEvery(GET_PROMOTION_TIER_RULE, fetchPromotionRuleTier);
}

// yield all
export default function* rootSaga() {
    yield all([
        fork(searchPromotions),
        fork(viewPromotion),
        fork(editPromotion),
        fork(createPromotion),
        fork(removePromotion),
        fork(viewPromotionTierRule)
    ]);
}
