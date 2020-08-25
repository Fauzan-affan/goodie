import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    BACK_TO_LOGIN,
    GET_MENU_MERCHANT_DATA,
    GET_MENU_MERCHANT_DATA_SUCCESS,
    GET_MENU_MERCHANT_DATA_FAILED,
} from "../../constants/ActionTypes";
import {
    menuMerchantApi,
} from "../api/Menu";


function* fetchMenuMerchant({payload}) {
    if(payload != null){
        try {
            const response = yield call(menuMerchantApi, payload);
            if (response.data.abstractResponse.responseStatus === 'INQ000') {
                yield put({type: GET_MENU_MERCHANT_DATA_SUCCESS, payload: response.data});
            } else{
                yield put({type: GET_MENU_MERCHANT_DATA_FAILED, payload: response.data.abstractResponses.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: GET_MENU_MERCHANT_DATA_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: GET_MENU_MERCHANT_DATA_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


export function* getMenuMerchantData() {
    yield takeEvery(GET_MENU_MERCHANT_DATA, fetchMenuMerchant);
}


// yield all
export default function* rootSaga() {
    yield all([
        fork(getMenuMerchantData)
    ]);
}
