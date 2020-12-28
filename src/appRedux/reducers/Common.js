import {
    SHOW_MESSAGE,
    HIDE_MESSAGE,
    ON_SHOW_LOADER,
    ON_HIDE_LOADER,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAILED,
    GET_LIST_COUNTRY_SUCCESS,
    GET_LIST_COUNTRY_FAILED,
    GET_LIST_PROVINCE_SUCCESS,
    GET_LIST_PROVINCE_FAILED,
    GET_LIST_CITY_SUCCESS,
    GET_LIST_CITY_FAILED
} from "constants/ActionTypes";

import {
    // GET_LIST_CURRENCY,
    GET_LIST_CURRENCY_SUCCESS,
    GET_LIST_CURRENCY_FAILED
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    initURL: '',
    filePath: '',
    listCountry: [],
    listProvince: [],
    listCity: [],
    listCurrency: [],
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case SHOW_MESSAGE: {
            return {
                ...state,
                alertMessage: action.payload,
                showMessage: true,
                loader: false
            }
        }
        case HIDE_MESSAGE: {
            return {
                ...state,
                alertMessage: '',
                showMessage: false,
                loader: false
            }
        }
        case ON_SHOW_LOADER: {
            return {
                ...state,
                loader: true
            }
        }
        case ON_HIDE_LOADER: {
            return {
                ...state,
                loader: false
            }
        }

        case UPLOAD_IMAGE_SUCCESS: {
            return {
                ...state,
                filePath: action.payload
            }
        }

        case UPLOAD_IMAGE_FAILED: {
            return {
                ...state,
                filePath: ''
            }
        }

        case GET_LIST_COUNTRY_SUCCESS: {
            return {
                ...state,
                listCountry: action.payload
            }
        }

        case GET_LIST_COUNTRY_FAILED: {
            return {
                ...state,
                listCountry: []
            }
        }

        case GET_LIST_PROVINCE_SUCCESS: {
            return {
                ...state,
                listProvince: action.payload
            }
        }

        case GET_LIST_PROVINCE_FAILED: {
            return {
                ...state,
                listProvince: []
            }
        }

        case GET_LIST_CITY_SUCCESS: {
            return {
                ...state,
                listCity: action.payload
            }
        }

        case GET_LIST_CITY_FAILED: {
            return {
                ...state,
                listCity: []
            }
        }

        case GET_LIST_CURRENCY_SUCCESS: {
            return {
                ...state,
                listCurrency: action.payload
            }
        }

        case GET_LIST_CURRENCY_FAILED: {
            return {
                ...state,
                listCurrency: []
            }
        }

        default:
            return state;
    }
}
