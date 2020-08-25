import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    BACK_TO_LOGIN,
    GET_ISSUING_REPORT,
    GET_ISSUING_REPORT_FAILED,
    GET_ISSUING_REPORT_SUCCESS, 
    DOWNLOAD_SUCCESS,
    GET_MEMBER_BALANCE_REPORT,
    GET_MEMBER_BALANCE_REPORT_FAILED,
    GET_MEMBER_BALANCE_REPORT_SUCCESS, 
    GET_POINT_TRANSACTION_REPORT,
    GET_POINT_TRANSACTION_REPORT_FAILED,
    GET_POINT_TRANSACTION_REPORT_SUCCESS,
    GET_REDEEM_REPORT,
    GET_REDEEM_REPORT_FAILED,
    GET_REDEEM_REPORT_SUCCESS, 
    GET_REFERRAL_REPORT,
    GET_REFERRAL_REPORT_FAILED,
    GET_REFERRAL_REPORT_SUCCESS, 
    GET_VOUCHER_BALANCE_REPORT,
    GET_VOUCHER_BALANCE_REPORT_FAILED,
    GET_VOUCHER_BALANCE_REPORT_SUCCESS,
    GET_POINT_TRANSFER_REPORT,
    GET_POINT_TRANSFER_REPORT_FAILED,
    GET_POINT_TRANSFER_REPORT_SUCCESS
} from "../../constants/ActionTypes";
import {
    issuingReportApi, memberBalanceApi, pointTransactionApi,
    redeemReportApi, referralReportApi, voucherBalanceApi, pointTransferApi
} from "../api/Report";


function* fetchIssuingReport({payload}) {
    if(payload != null){
        try {
            const searchMembersData = yield call(issuingReportApi, payload);
            if (searchMembersData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: searchMembersData.data});
                }else{
                    yield put({type: GET_ISSUING_REPORT_SUCCESS, payload: searchMembersData.data});
                }
            } else{
                yield put({type: GET_ISSUING_REPORT_FAILED, payload: searchMembersData.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: GET_ISSUING_REPORT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: GET_ISSUING_REPORT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchRedeemReport({payload}) {
    if(payload != null){
        try {
            const searchMembersData = yield call(redeemReportApi, payload);
            if (searchMembersData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: searchMembersData.data});
                }else{
                    yield put({type: GET_REDEEM_REPORT_SUCCESS, payload: searchMembersData.data});
                }
            } else{
                yield put({type: GET_REDEEM_REPORT_FAILED, payload: searchMembersData.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: GET_REDEEM_REPORT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: GET_REDEEM_REPORT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchMemberBalanceReport({payload}) {
    if(payload != null){
        try {
            const searchMembersData = yield call(memberBalanceApi, payload);
            if (searchMembersData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: searchMembersData.data});
                }else{
                    yield put({type: GET_MEMBER_BALANCE_REPORT_SUCCESS, payload: searchMembersData.data});
                }
            } else{
                yield put({type: GET_MEMBER_BALANCE_REPORT_FAILED, payload: searchMembersData.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: GET_MEMBER_BALANCE_REPORT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: GET_MEMBER_BALANCE_REPORT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchVoucherBalanceReport({payload}) {
    if(payload != null){
        try {
            const searchMembersData = yield call(voucherBalanceApi, payload);
            if (searchMembersData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: searchMembersData.data});
                }else{
                    yield put({type: GET_VOUCHER_BALANCE_REPORT_SUCCESS, payload: searchMembersData.data});
                }
            } else{
                yield put({type: GET_VOUCHER_BALANCE_REPORT_FAILED, payload: searchMembersData.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: GET_VOUCHER_BALANCE_REPORT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: GET_VOUCHER_BALANCE_REPORT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchReferralReport({payload}) {
    if(payload != null){
        try {
            const searchMembersData = yield call(referralReportApi, payload);
            if (searchMembersData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: searchMembersData.data});
                }else{
                    yield put({type: GET_REFERRAL_REPORT_SUCCESS, payload: searchMembersData.data});
                }
            } else{
                yield put({type: GET_REFERRAL_REPORT_FAILED, payload: searchMembersData.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: GET_REFERRAL_REPORT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: GET_REFERRAL_REPORT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchPointTransaction({payload}) {
    if(payload != null){
        try {
            const searchMembersData = yield call(pointTransactionApi, payload);
            if (searchMembersData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: searchMembersData.data});
                }else{
                    yield put({type: GET_POINT_TRANSACTION_REPORT_SUCCESS, payload: searchMembersData.data});
                }
            } else{
                yield put({type: GET_POINT_TRANSACTION_REPORT_FAILED, payload: searchMembersData.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: GET_POINT_TRANSACTION_REPORT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: GET_POINT_TRANSACTION_REPORT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchPointTransfer({payload}) {
    if(payload != null){
        try {
            const searchMembersData = yield call(pointTransferApi, payload);
            if (searchMembersData.data.abstractResponse.responseStatus === 'INQ000') {
                if(payload.isDownload){
                    yield put({type: DOWNLOAD_SUCCESS, payload: searchMembersData.data});
                }else{
                    yield put({type: GET_POINT_TRANSFER_REPORT_SUCCESS, payload: searchMembersData.data});
                }
            } else{
                yield put({type: GET_POINT_TRANSFER_REPORT_FAILED, payload: searchMembersData.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: GET_POINT_TRANSFER_REPORT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: GET_POINT_TRANSFER_REPORT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


export function* getIssuingData() {
    yield takeEvery(GET_ISSUING_REPORT, fetchIssuingReport);
}

export function* getRedeemData() {
    yield takeEvery(GET_REDEEM_REPORT, fetchRedeemReport);
}

export function* getMemberBalanceData() {
    yield takeEvery(GET_MEMBER_BALANCE_REPORT, fetchMemberBalanceReport);
}

export function* getVoucherBalanceData() {
    yield takeEvery(GET_VOUCHER_BALANCE_REPORT, fetchVoucherBalanceReport);
}

export function* getReferralMemberData() {
    yield takeEvery(GET_REFERRAL_REPORT, fetchReferralReport);
}

export function* getPointTransactionData() {
    yield takeEvery(GET_POINT_TRANSACTION_REPORT, fetchPointTransaction);
}

export function* getPointTransferData() {
    yield takeEvery(GET_POINT_TRANSFER_REPORT, fetchPointTransfer);
}

// yield all
export default function* rootSaga() {
    yield all([
        fork(getIssuingData),
        fork(getRedeemData),
        fork(getMemberBalanceData),
        fork(getVoucherBalanceData),
        fork(getReferralMemberData),
        fork(getPointTransactionData),
        fork(getPointTransferData)
    ]);
}
