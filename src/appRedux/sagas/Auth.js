import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SIGNIN_USER,
    SIGNOUT_USER,
    SIGNUP_USER,
    SIGNIN_USER_SUCCESS,
    SIGNIN_USER_FAILED,
    FORGOT_PASSWORD,
    BACK_TO_LOGIN,
    CHANGE_PASSWORD,CHANGE_PASSWORD_FAILED, CHANGE_PASSWORD_SUCCESS, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED
} from "constants/ActionTypes";
import {signInUserWithEmailPasswordRequest,
        changePasswordApi,
        forgotPasswordApi
} from "../../appRedux/api/Auth";
// import {userSignInSuccess, userSignOutSuccess, userSignUpSuccess} from "../../appRedux/actions/Auth";
import {showMessage, hideLoader} from "../../appRedux/actions/Common";


// function here

// function* createUserWithEmailPassword({payload}) {
//     const {email, password} = payload;
//     try {
//         const signUpUser = yield call(createUserWithEmailPasswordRequest, email, password);
//         if (signUpUser.message) {
//             yield put(showMessage(signUpUser.message));
//         } else {
//             localStorage.setItem('user_id', signUpUser.user.uid);
//             yield put({type: 'SIGNIN_USER_SUCCESS', payload: signUpUser.user.uid});
//         }
//     } catch (error) {
//         yield put(showMessage(error));
//     }
// }

function* signIn({payload}) {
    try {
        const signInUser = yield call(signInUserWithEmailPasswordRequest, payload);
        if (signInUser.data.abstractResponse.responseStatus === 'AUTH000') {

            let auth = {
                authToken : signInUser.data.authToken,
                deviceId : signInUser.data.authDevice,
                userId : signInUser.data.memberId,
                merchantId : signInUser.data.merchantId,
                firstName : signInUser.data.firstName,
                merchantName : signInUser.data.merchantName,
                userPic : signInUser.data.userPic
            }

            localStorage.setItem('u', signInUser.data.memberId);
            localStorage.setItem('f', signInUser.data.firstName);
            localStorage.setItem('mt', signInUser.data.merchantId);
            localStorage.setItem('a', signInUser.data.authToken);
            localStorage.setItem('d', signInUser.data.authDevice);
            localStorage.setItem('mtn',signInUser.data.merchantName);
            localStorage.setItem('upic',signInUser.data.userPic);


            yield put({type: SIGNIN_USER_SUCCESS, payload: auth});
        } else {
            yield put({type: SIGNIN_USER_FAILED, payload: signInUser.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        yield put({type: SIGNIN_USER_FAILED, payload: error.data.abstractResponse.responseMessage});
    }
}

function* postForgotPassword({payload}) {
    try {
        const forgotPasswordData = yield call(forgotPasswordApi, payload);
        if (forgotPasswordData.data.abstractResponse.responseStatus === 'AUTH000') {
            let responseData = forgotPasswordData.data.rule;
            yield put({type: FORGOT_PASSWORD_SUCCESS, payload: responseData});
        } else {
            yield put({type: FORGOT_PASSWORD_FAILED, payload: forgotPasswordData.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        yield put({type: FORGOT_PASSWORD_FAILED, payload: error.data.abstractResponse.responseMessage});
    }
}

function* postChangePassword({payload}) {
    try {
        const changePasswordData = yield call(changePasswordApi, payload);
        if (changePasswordData.data.abstractResponse.responseStatus === 'AUTH000') {
            let responseData = changePasswordData.data;
            yield put({type: CHANGE_PASSWORD_SUCCESS, payload: responseData});
        } else {
            yield put({type: CHANGE_PASSWORD_FAILED, payload: changePasswordData.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        yield put({type: CHANGE_PASSWORD_FAILED, payload: error.data.abstractResponse.responseMessage});
    }
}

// function* signOut() {
//     localStorage.removeItem('user_id');
//     yield put(userSignOutSuccess(signOutUser));
// }


// Get request from action

// export function* createUserAccount() {
//     yield takeEvery(SIGNUP_USER, createUserWithEmailPassword);
// }

export function* signInUser() {
    yield takeEvery(SIGNIN_USER, signIn);
}

export function* changePassword() {
    yield takeEvery(CHANGE_PASSWORD, postChangePassword);
}

export function* forgotPassword() {
    yield takeEvery(FORGOT_PASSWORD, postForgotPassword);
}

// export function* signOutUser() {
//     yield takeEvery(SIGNOUT_USER, signOut);
// }

// yield all

// export default function* rootSaga() {
//     yield all([fork(signInUser),
//         fork(createUserAccount),
//         fork(signOutUser)]);
// }

export default function* rootSaga() {
    yield all([
        fork(signInUser),
        fork(changePassword),
        fork(forgotPassword)
    ]);
}
