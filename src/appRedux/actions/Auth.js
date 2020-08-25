import {
    SIGNIN_USER,
    SIGNOUT_USER,
    SIGNUP_USER,
    HIDE_MESSAGE,
    INIT_URL
} from "constants/ActionTypes";
import {CHANGE_PASSWORD, FORGOT_PASSWORD} from "../../constants/ActionTypes";

export const userSignUp = (authUser) => {
    return {
        type: SIGNUP_USER,
        payload: authUser
    };
};
export const userSignIn = (authUser) => {
    return {
        type: SIGNIN_USER,
        payload: authUser
    };
};
export const userSignOut = () => {
    return {
        type: SIGNOUT_USER
    };
};

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE,
    };
};

export const changePassword = (request) => {
    return {
        type: CHANGE_PASSWORD,
        payload: request
    };
};

export const forgotPassword = (request) => {
    return {
        type: FORGOT_PASSWORD,
        payload: request
    };
};

export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

