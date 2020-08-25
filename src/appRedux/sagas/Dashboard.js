import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    BACK_TO_LOGIN,
    GET_LOYALTY_PROMOTION_DATA,
    GET_LOYALTY_REWARD_DATA,
    GET_LOYALTY_TOTAL_DATA,
    GET_MARKETPLACE_MERCHANT_DATA,
    GET_MARKETPLACE_PRODUCT_DATA,
    GET_MARKETPLACE_REVENUE_DATA,
    GET_MEMBER_SUMMARY_DATA,
    GET_MEMBER_GROWTH_DATA,
    GET_LOYALTY_PROMOTION_DATA_SUCCESS,
    GET_LOYALTY_PROMOTION_DATA_FAILED,
    GET_LOYALTY_REWARD_DATA_SUCCESS,
    GET_LOYALTY_REWARD_DATA_FAILED,
    GET_LOYALTY_TOTAL_DATA_SUCCESS,
    GET_LOYALTY_TOTAL_DATA_FAILED,
    GET_MARKETPLACE_MERCHANT_DATA_SUCCESS,
    GET_MARKETPLACE_MERCHANT_DATA_FAILED,
    GET_MARKETPLACE_PRODUCT_DATA_SUCCESS,
    GET_MARKETPLACE_PRODUCT_DATA_FAILED,
    GET_MARKETPLACE_REVENUE_DATA_SUCCESS,
    GET_MARKETPLACE_REVENUE_DATA_FAILED,
    GET_MEMBER_SUMMARY_DATA_SUCCESS,
    GET_MEMBER_SUMMARY_DATA_FAILED,
    GET_MEMBER_GROWTH_DATA_SUCCESS, GET_MEMBER_GROWTH_DATA_FAILED
} from "../../constants/ActionTypes";
import {
    loyaltyPromotionApi, loyaltyRewardApi, loyaltyTotalApi,
    marketplaceMerchantApi, marketplaceProductApi, marketplaceRevenueApi,
    memberSummaryApi, memberGrowthApi
} from "../api/Dashboard";


function* fetchPromotionDashboard({payload}) {
    if(payload != null){
        try {
            const response = yield call(loyaltyPromotionApi, payload);
            if (response.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: GET_LOYALTY_PROMOTION_DATA_SUCCESS, payload: response.data});
            } else{
                yield put({type: GET_LOYALTY_PROMOTION_DATA_FAILED, payload: response.data.abstractResponses.responseMessage});
            }
        }
        catch (error) {
            // if(error.response !== undefined) {
            //     if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
            //         yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            //     } else {
            //         yield put({
            //             type: GET_LOYALTY_PROMOTION_DATA_FAILED,
            //             payload: error.response.data.abstractResponse.responseMessage
            //         });
            //     }
            // }else{
            //     yield put({
            //         type: GET_LOYALTY_PROMOTION_DATA_FAILED,
            //         payload: 'Sorry, this feature is not accessible at this time.'
            //     });
            // }
        }
    }
}

function* fetchRewardDashboard({payload}) {
    if(payload != null){
        try {
            const response = yield call(loyaltyRewardApi, payload);
            if (response.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: GET_LOYALTY_REWARD_DATA_SUCCESS, payload: response.data});
            } else{
                yield put({type: GET_LOYALTY_REWARD_DATA_FAILED, payload: response.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            // if(error.response !== undefined) {
            //     if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
            //         yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            //     } else {
            //         yield put({
            //             type: GET_LOYALTY_REWARD_DATA_FAILED,
            //             payload: error.response.data.abstractResponse.responseMessage
            //         });
            //     }
            // }else{
            //     yield put({
            //         type: GET_LOYALTY_REWARD_DATA_FAILED,
            //         payload: 'Sorry, this feature is not accessible at this time.'
            //     });
            // }
        }
    }
}

function* fetchTotalDashboard({payload}) {
    if(payload != null){
        try {
            const response = yield call(loyaltyTotalApi, payload);
            if (response.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: GET_LOYALTY_TOTAL_DATA_SUCCESS, payload: response.data});
            } else{
                yield put({type: GET_LOYALTY_TOTAL_DATA_FAILED, payload: response.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            // if(error.response !== undefined) {
            //     if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
            //         yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            //     } else {
            //         yield put({
            //             type: GET_LOYALTY_TOTAL_DATA_FAILED,
            //             payload: error.response.data.abstractResponse.responseMessage
            //         });
            //     }
            // }else{
            //     yield put({
            //         type: GET_LOYALTY_TOTAL_DATA_FAILED,
            //         payload: 'Sorry, this feature is not accessible at this time.'
            //     });
            // }
        }
    }
}

function* fetchMerchantDashboard({payload}) {
    if(payload != null){
        try {
            const response = yield call(marketplaceMerchantApi, payload);
            if (response.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: GET_MARKETPLACE_MERCHANT_DATA_SUCCESS, payload: response.data});
            } else{
                yield put({type: GET_MARKETPLACE_MERCHANT_DATA_FAILED, payload: response.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            // if(error.response !== undefined) {
            //     if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
            //         yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            //     } else {
            //         yield put({
            //             type: GET_MARKETPLACE_MERCHANT_DATA_FAILED,
            //             payload: error.response.data.abstractResponse.responseMessage
            //         });
            //     }
            // }else{
            //     yield put({
            //         type: GET_MARKETPLACE_MERCHANT_DATA_FAILED,
            //         payload: 'Sorry, this feature is not accessible at this time.'
            //     });
            // }
        }
    }
}

function* fetchProductDashboard({payload}) {
    if(payload != null){
        try {
            const response = yield call(marketplaceProductApi, payload);
            if (response.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: GET_MARKETPLACE_PRODUCT_DATA_SUCCESS, payload: response.data});
            } else{
                yield put({type: GET_MARKETPLACE_PRODUCT_DATA_FAILED, payload: response.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            // if(error.response !== undefined) {
            //     if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
            //         yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            //     } else {
            //         yield put({
            //             type: GET_MARKETPLACE_PRODUCT_DATA_FAILED,
            //             payload: error.response.data.abstractResponse.responseMessage
            //         });
            //     }
            // }else{
            //     yield put({
            //         type: GET_MARKETPLACE_PRODUCT_DATA_FAILED,
            //         payload: 'Sorry, this feature is not accessible at this time.'
            //     });
            // }
        }
    }
}

function* fetchRevenueDashboard({payload}) {
    if(payload != null){
        try {
            const response = yield call(marketplaceRevenueApi, payload);
            if (response.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: GET_MARKETPLACE_REVENUE_DATA_SUCCESS, payload: response.data});
            } else{
                yield put({type: GET_MARKETPLACE_REVENUE_DATA_FAILED, payload: response.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            // if(error.response !== undefined) {
            //     if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
            //         yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            //     } else {
            //         yield put({
            //             type: GET_MARKETPLACE_REVENUE_DATA_FAILED,
            //             payload: error.response.data.abstractResponse.responseMessage
            //         });
            //     }
            // }else{
            //     yield put({
            //         type: GET_MARKETPLACE_REVENUE_DATA_FAILED,
            //         payload: 'Sorry, this feature is not accessible at this time.'
            //     });
            // }
        }
    }
}

function* fetchSummaryDashboard({payload}) {
    if(payload != null){
        try {
            const response = yield call(memberSummaryApi, payload);
            if (response.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: GET_MEMBER_SUMMARY_DATA_SUCCESS, payload: response.data});
            } else{
                yield put({type: GET_MEMBER_SUMMARY_DATA_FAILED, payload: response.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            // if(error.response !== undefined) {
            //     if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
            //         yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            //     } else {
            //         yield put({
            //             type: GET_MEMBER_SUMMARY_DATA_FAILED,
            //             payload: error.response.data.abstractResponse.responseMessage
            //         });
            //     }
            // }else{
            //     yield put({
            //         type: GET_MEMBER_SUMMARY_DATA_FAILED,
            //         payload: 'Sorry, this feature is not accessible at this time.'
            //     });
            // }
        }
    }
}

function* fetchGrowthMemberDashboard({payload}) {
    if(payload != null){
        try {
            const response = yield call(memberGrowthApi, payload);
            if (response.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: GET_MEMBER_GROWTH_DATA_SUCCESS, payload: response.data});
            } else{
                yield put({type: GET_MEMBER_GROWTH_DATA_FAILED, payload: response.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            // if(error.response !== undefined) {
            //     if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
            //         yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            //     } else {
            //         yield put({
            //             type: GET_MEMBER_GROWTH_DATA_FAILED,
            //             payload: error.response.data.abstractResponse.responseMessage
            //         });
            //     }
            // }else{
            //     yield put({
            //         type: GET_MEMBER_GROWTH_DATA_FAILED,
            //         payload: 'Sorry, this feature is not accessible at this time.'
            //     });
            // }
        }
    }
}


export function* getPromotionDashboardData() {
    yield takeEvery(GET_LOYALTY_PROMOTION_DATA, fetchPromotionDashboard);
}

export function* getRewardDashboardData() {
    yield takeEvery(GET_LOYALTY_REWARD_DATA, fetchRewardDashboard);
}

export function* getTotalDashboardData() {
    yield takeEvery(GET_LOYALTY_TOTAL_DATA, fetchTotalDashboard);
}

export function* getMerchantDashboardData() {
    yield takeEvery(GET_MARKETPLACE_MERCHANT_DATA, fetchMerchantDashboard);
}

export function* getProductDashboardData() {
    yield takeEvery(GET_MARKETPLACE_PRODUCT_DATA, fetchProductDashboard);
}

export function* getRevenueDashboardData() {
    yield takeEvery(GET_MARKETPLACE_REVENUE_DATA, fetchRevenueDashboard);
}

export function* getSummaryDashboardData() {
    yield takeEvery(GET_MEMBER_SUMMARY_DATA, fetchSummaryDashboard);
}

export function* getGrowthMemberData() {
    yield takeEvery(GET_MEMBER_GROWTH_DATA, fetchGrowthMemberDashboard);
}


// yield all
export default function* rootSaga() {
    yield all([
        fork(getPromotionDashboardData),
        fork(getRewardDashboardData),
        fork(getTotalDashboardData),
        fork(getMerchantDashboardData),
        fork(getProductDashboardData),
        fork(getRevenueDashboardData),
        fork(getSummaryDashboardData),
        fork(getGrowthMemberData)
    ]);
}
