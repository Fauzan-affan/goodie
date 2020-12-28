import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    UPLOAD_IMAGE,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILED,
    BACK_TO_LOGIN,
    GET_LIST_COUNTRY,
    GET_LIST_COUNTRY_SUCCESS,
    GET_LIST_COUNTRY_FAILED,
    GET_LIST_PROVINCE,
    GET_LIST_PROVINCE_SUCCESS,
    GET_LIST_PROVINCE_FAILED,
    GET_LIST_CITY,
    GET_LIST_CITY_SUCCESS,
    GET_LIST_CITY_FAILED
} from "constants/ActionTypes";
import {uploadImageApi,getListCityApi,getListProvinceApi,getListCurrencyApi, getListCountryApi} from "../../appRedux/api/Common";
import { GET_LIST_CURRENCY, GET_LIST_CURRENCY_SUCCESS, GET_LIST_CURRENCY_FAILED } from "../../constants/ActionTypes";

function* uploadImageProcess({payload}) {
    try {
        const uploadImage = yield call(uploadImageApi, payload);
        if (uploadImage.data.abstractResponse.responseStatus === 'INQ001') {
            yield put({type: UPLOAD_IMAGE_SUCCESS, payload: uploadImage.data.filePath});
        } else {
            yield put({type: UPLOAD_IMAGE_FAILED, payload: uploadImage.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        if(error.response !== undefined) {
            if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            } else {
                yield put({
                    type: UPLOAD_IMAGE_FAILED,
                    payload: error.response.data.abstractResponse.responseMessage
                });
            }
        }else{
            yield put({
                type: UPLOAD_IMAGE_FAILED,
                payload: 'Sorry, this feature is not accessible at this time.'
            });
        }
        // yield put({type: UPLOAD_IMAGE_FAILED, payload: error.data.abstractResponse.responseMessage});
    }
}

function* fetchListCurrency() {
    try {
        const listCurrency = yield call(getListCurrencyApi);
        if (listCurrency.data.abstractResponse.responseStatus === 'INQ000') {
            yield put({type: GET_LIST_CURRENCY_SUCCESS, payload: listCurrency.data.listCurrency});
        } else {
            yield put({type: GET_LIST_CURRENCY_FAILED, payload: listCurrency.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        if(error.response !== undefined) {
            if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            } else {
                yield put({
                    type: GET_LIST_CURRENCY_FAILED,
                    payload: error.response.data.abstractResponse.responseMessage
                });
            }
        }else{
            yield put({
                type: GET_LIST_CURRENCY_FAILED,
                payload: 'Sorry, this feature is not accessible at this time.'
            });
        }
        // yield put({type: GET_LIST_CURRENCY_FAILED, payload: error.data.abstractResponse.responseMessage});
    }
}

function* fetchListCountry() {
    try {
        const listCountry = yield call(getListCountryApi);
        if (listCountry.data.abstractResponse.responseStatus === 'INQ000') {
            yield put({type: GET_LIST_COUNTRY_SUCCESS, payload: listCountry.data.utilMessageResponse});
        } else {
            yield put({type: GET_LIST_COUNTRY_FAILED, payload: listCountry.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        if(error.response !== undefined) {
            if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            } else {
                yield put({
                    type: GET_LIST_COUNTRY_FAILED,
                    payload: error.response.data.abstractResponse.responseMessage
                });
            }
        }else{
            yield put({
                type: GET_LIST_COUNTRY_FAILED,
                payload: 'Sorry, this feature is not accessible at this time.'
            });
        }
        // yield put({type: GET_LIST_PROVINCE_FAILED, payload: error.data.abstractResponse.responseMessage});
    }
}

function* fetchListProvince({payload}) {
    try {
        const listProvince = yield call(getListProvinceApi, payload);
        if (listProvince.data.abstractResponse.responseStatus === 'INQ000') {
            yield put({type: GET_LIST_PROVINCE_SUCCESS, payload: listProvince.data.utilMessageResponse});
        } else {
            yield put({type: GET_LIST_PROVINCE_FAILED, payload: listProvince.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        if(error.response !== undefined) {
            if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            } else {
                yield put({
                    type: GET_LIST_PROVINCE_FAILED,
                    payload: error.response.data.abstractResponse.responseMessage
                });
            }
        }else{
            yield put({
                type: GET_LIST_PROVINCE_FAILED,
                payload: 'Sorry, this feature is not accessible at this time.'
            });
        }
        // yield put({type: GET_LIST_PROVINCE_FAILED, payload: error.data.abstractResponse.responseMessage});
    }
}

function* fetchListCity({payload}) {
    try {
        const listCity = yield call(getListCityApi, payload);
        if (listCity.data.abstractResponse.responseStatus === 'INQ000') {
            yield put({type: GET_LIST_CITY_SUCCESS, payload: listCity.data.utilMessageResponse});
        } else {
            yield put({type: GET_LIST_CITY_FAILED, payload: listCity.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        if(error.response !== undefined) {
            if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            } else {
                yield put({
                    type: GET_LIST_CITY_FAILED,
                    payload: error.response.data.abstractResponse.responseMessage
                });
            }
        }else{
            yield put({
                type: GET_LIST_CITY_FAILED,
                payload: 'Sorry, this feature is not accessible at this time.'
            });
        }
        // yield put({type: GET_LIST_CITY_FAILED, payload: error.data.abstractResponse.responseMessage});
    }
}



export function* uploadImage() {
    yield takeEvery(UPLOAD_IMAGE, uploadImageProcess);
}

export function* getListCountry() {
    yield takeEvery(GET_LIST_COUNTRY, fetchListCountry);
}

export function* getListProvince() {
    yield takeEvery(GET_LIST_PROVINCE, fetchListProvince);
}

export function* getListCity() {
    yield takeEvery(GET_LIST_CITY, fetchListCity);
}

export function* getListCurrency() {
    yield takeEvery(GET_LIST_CURRENCY, fetchListCurrency);
}

export default function* rootSaga() {
    yield all([
        fork(uploadImage),
        fork(getListCountry),
        fork(getListProvince),
        fork(getListCity),
        fork(getListCurrency),
    ]);
}
