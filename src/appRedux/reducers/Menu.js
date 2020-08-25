import {
    GET_MENU_MERCHANT_DATA,
    GET_MENU_MERCHANT_DATA_SUCCESS,
    GET_MENU_MERCHANT_DATA_FAILED,
} from "../../constants/ActionTypes";


const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    menuList: [],
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_MENU_MERCHANT_DATA: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                menuList : [],
            }
        }



        // Response
        case GET_MENU_MERCHANT_DATA_SUCCESS: {
            return {
                ...state,
                loader: false,
                menuList: action.payload.menu
            }
        }

        case GET_MENU_MERCHANT_DATA_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        default:
            return state;
    }
}
