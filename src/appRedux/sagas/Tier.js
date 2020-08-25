import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_TIERS,
    SEARCH_TIERS_SUCCESS,
    SEARCH_TIERS_FAILED,
    VIEW_TIER,
    VIEW_TIER_SUCCESS,
    VIEW_TIER_FAILED,
    UPDATE_TIER,
    UPDATE_TIER_SUCCESS,
    UPDATE_TIER_FAILED,
    CREATE_TIER,
    CREATE_TIER_SUCCESS,
    CREATE_TIER_FAILED,
    DELETE_TIER,
    DELETE_TIER_SUCCESS,
    DELETE_TIER_FAILED,
    RESET_STATUS,
    TIER_DETAILS,
    TIER_DETAILS_SUCCESS,
    TIER_DETAILS_FAILED,
    BACK_TO_LOGIN
} from "constants/ActionTypes";
import {
    searchTiersApi,
    viewTierApi,
    updateTierApi,
    createTierApi,
    deleteTierApi,
    tierDetailsApi
} from "../../appRedux/api/Tier";
// import view from "../../components/Form/view";


function* fetchSearchTiers({payload}) {
    if(payload != null){
        try {
            const searchTiersData = yield call(searchTiersApi, payload);
            if (searchTiersData.data.abstractResponse.responseStatus === 'TIER000') {
                yield put({type: SEARCH_TIERS_SUCCESS, payload: searchTiersData.data.tier});
            } else {
                yield put({type: SEARCH_TIERS_FAILED, payload: searchTiersData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_TIERS_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_TIERS_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchViewTier({payload}) {
    if(payload != null){
        try {
            let viewTierData = yield call(viewTierApi, payload);
            if (viewTierData.data.abstractResponse.responseStatus === 'TIER009') {
                yield put({type: VIEW_TIER_SUCCESS, payload: viewTierData.data.tier});
            } else {
                yield put({type: VIEW_TIER_FAILED, payload: viewTierData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_TIER_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VIEW_TIER_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postEditTier({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let editTierData = yield call(updateTierApi, payload);

            if (editTierData.data.abstractResponse.responseStatus === 'TIER010') {
                yield put({type: UPDATE_TIER_SUCCESS, payload: editTierData.data.tier});
            } else {
                yield put({type: UPDATE_TIER_FAILED, payload: editTierData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_TIER_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_TIER_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postInsertTier({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let insertTierData = yield call(createTierApi, payload);

            if (insertTierData.data.abstractResponse.responseStatus === 'TIER007') {
                yield put({type: CREATE_TIER_SUCCESS, payload: insertTierData.data.tier});
            } else {
                yield put({type: CREATE_TIER_FAILED, payload: insertTierData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CREATE_TIER_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CREATE_TIER_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


function* postDeleteTier({payload}) {
    if(payload != null){
        try {
            let deleteTierData = yield call(deleteTierApi, payload);

            if (deleteTierData.data.abstractResponse.responseStatus === 'TIER012') {
                let responseData = deleteTierData.data.tier;
                yield put({type: DELETE_TIER_SUCCESS, payload: responseData});
            } else {
                yield put({type: DELETE_TIER_FAILED, payload: deleteTierData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: DELETE_TIER_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: DELETE_TIER_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

export function* fetchTierDetails({payload}) {
    if(payload != null){
        try {
            let tierDetailsData = yield call(tierDetailsApi, payload);
            if (tierDetailsData.data.abstractResponse.responseStatus === 'INQ000') {
                let tierResp = {
                    tierStructureId: tierDetailsData.data.tierStructureId,
                    tierStructureCode: tierDetailsData.data.tierStructureCode,
                    tierDetails : tierDetailsData.data.tierDetails
                };
                yield put({type: TIER_DETAILS_SUCCESS, payload: tierResp});
            } else {
                yield put({type: TIER_DETAILS_FAILED, payload: tierDetailsData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: TIER_DETAILS_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: TIER_DETAILS_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


export function* searchTiers() {
    yield takeEvery(SEARCH_TIERS, fetchSearchTiers);
}

export function* viewTier(){
    yield takeEvery(VIEW_TIER, fetchViewTier);
}

export function* editTier(){
    yield takeEvery(UPDATE_TIER, postEditTier);
}

export function* createTier(){
    yield takeEvery(CREATE_TIER, postInsertTier);
}

export function* removeTier(){
    yield takeEvery(DELETE_TIER, postDeleteTier);
}

export function* getTierDetails(){
    yield takeEvery(TIER_DETAILS, fetchTierDetails);
}

// yield all
export default function* rootSaga() {
    yield all([
        fork(searchTiers),
        fork(viewTier),
        fork(editTier),
        fork(createTier),
        fork(removeTier),
        fork(getTierDetails)
    ]);
}
