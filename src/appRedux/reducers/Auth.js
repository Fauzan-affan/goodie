import {
    SIGNUP_USER,
    SIGNIN_USER,
    SIGNOUT_USER,
    SIGNIN_USER_SUCCESS,
    SIGNIN_USER_FAILED,
    // SIGNOUT_USER_SUCCESS,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILED,
    HIDE_MESSAGE,
    BACK_TO_LOGIN,
    INIT_URL
} from "constants/ActionTypes";
import {
    CHANGE_PASSWORD, 
    CHANGE_PASSWORD_FAILED,
    CHANGE_PASSWORD_SUCCESS,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED
} from "../../constants/ActionTypes";

let localAuth = {
    authToken : localStorage.getItem('a'),
    deviceId : localStorage.getItem('d'),
    userId : localStorage.getItem('u'),
    merchantId : localStorage.getItem('mt'),
    firstName : localStorage.getItem('f'),
    merchantName : localStorage.getItem('mtn'),
    userPic : localStorage.getItem("upic")
}

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    initURL: '',
    authUser: localAuth,
    updateSuccess: false,
    updateFailed: false,
    updateResponse: []
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SIGNUP_USER: {
            return {
                ...state,
                loader: true,
                showMessage: false
            }
        }

        case SIGNIN_USER: {
            return {
                ...state,
                loader: true,
                showMessage: false
            }
        }

        case SIGNOUT_USER: {
            localStorage.removeItem("u");
            localStorage.removeItem("f");
            localStorage.removeItem("mt");
            localStorage.removeItem("a");
            localStorage.removeItem("d");
            localStorage.removeItem("mtn");
            localStorage.removeItem("upic");
            return {
                ...state,
                authUser: localAuth,
                initURL: '/signin',
                loader: false
            }
        }

        case BACK_TO_LOGIN:{
            localStorage.removeItem("u");
            localStorage.removeItem("f");
            localStorage.removeItem("mt");
            localStorage.removeItem("a");
            localStorage.removeItem("d");
            localStorage.removeItem("mtn");
            localStorage.removeItem("upic");
            return {
                ...state,
                alertMessage: action.payload,
                showMessage: true,
                authUser: localAuth,
                loader: false,
                initURL: '/signin'
            }
        }

        case CHANGE_PASSWORD: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                updateSuccess: false,
                updateFailed: false
            }
        }

        case FORGOT_PASSWORD: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                updateSuccess: false,
                updateFailed: false
            }
        }

        // Response
        case SIGNUP_USER_SUCCESS: {
            this.props.history.push('/');
            return {
                ...state,
                loader: false,
                authUser: action.payload
            }
        }
        case SIGNIN_USER_SUCCESS: {
            return {
                ...state,
                loader: false,
                authUser: action.payload,
                initURL: '/',
            }
        }
        // case SIGNOUT_USER_SUCCESS: {
        //     return {
        //         ...state,
        //         authUser: null,
        //         initURL: '/',
        //         loader: false
        //     }
        // }

        case SIGNUP_USER_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }
        case SIGNIN_USER_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true,
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


        case INIT_URL: {
            return {
                ...state,
                initURL: action.payload
            }
        }

        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                showMessage: false
            }
        }

        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true,
                showMessage: false
            }
        }

        case CHANGE_PASSWORD_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                showMessage: false
            }
        }

        case CHANGE_PASSWORD_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true,
                showMessage: false
            }
        }


        default:
            return state;
    }
}
