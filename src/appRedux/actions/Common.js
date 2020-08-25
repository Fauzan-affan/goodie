import {
    HIDE_MESSAGE,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SHOW_MESSAGE,
    UPLOAD_IMAGE
} from "constants/ActionTypes";
import {GET_LIST_CITY, GET_LIST_PROVINCE, UPLOAD_IMAGE_FAILED, GET_LIST_CURRENCY} from "../../constants/ActionTypes";

export const showMessage = (message) => {
    return {
        type: SHOW_MESSAGE,
        payload: message
    };
};

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE,
    };
};

export const showLoader = () => {
    return {
        type: ON_SHOW_LOADER,
    };
};

export const hideLoader = () => {
    return {
        type: ON_HIDE_LOADER,
    };
};

export const uploadImage = (request) => {
    return {
        type: UPLOAD_IMAGE,
        payload: request
    };
};

export const resetFilePath = () => {
    return {
        type: UPLOAD_IMAGE_FAILED
    };
};

export const getListProvince = () => {
    return {
        type: GET_LIST_PROVINCE
    };
};

export const getListCurrency = () => {
    return {
        type: GET_LIST_CURRENCY
    };
};

export const getListCity = (request) => {
    return {
        type: GET_LIST_CITY,
        payload: request
    };
};