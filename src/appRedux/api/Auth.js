import Axios from 'axios';

export const signInUserWithEmailPasswordRequest = ({username, password}) => {
    return Axios({
        method: 'post',
        url: window.ApiURL + 'authentication/user/create',
        data: {
            deviceUniqueId: 'Portal',
            username: username,
            password: password
        },
        headers:{
            'Content-Type': 'application/json'
        }
    });
};

export const forgotPasswordApi = ({username}) => {
    return Axios({
        method: 'post',
        url: window.ApiURL + 'merchant/password/forgot',
        data: {
            username: username,        },
        headers:{
            'Content-Type': 'application/json'
        }
    });
};

export const changePasswordApi = ({authToken, deviceId, userId, merchantId, password}) => {
    return Axios({
        method: 'post',
        url: window.ApiURL + 'merchant/password/change',
        data: {
            userId: userId,
            merchantId: merchantId,
	        password : password
        },
        headers:{
            'Content-Type': 'application/json',
            'authToken': authToken,
            'deviceUniqueId' : deviceId,
        }
    });
};
