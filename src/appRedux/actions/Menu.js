import {
    GET_MENU_MERCHANT_DATA
} from "../../constants/ActionTypes";


export const menuMerchant = (request) => {
    return {
        type: GET_MENU_MERCHANT_DATA,
        payload: request
    };
};
