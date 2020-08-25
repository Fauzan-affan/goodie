import Axios from 'axios';


export const searchUserApi = ({authToken, deviceId, loginName, search, roleId, page, size, merchantId, userId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'v2/users/search',
            params: {
                merchantId: merchantId,
                userId: userId,
                loginName : loginName,
                fullName : search,
                roleId : roleId,
                page : page,
                // size : size,
                nRecords : 10
            },
            data: {},
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            },
        });
    };
};

export const viewUserApi = ({merchantId, authToken, deviceId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'v2/users',
            params: {
                id: localStorage.getItem('userId'),
                merchantId: merchantId,
                userId: localStorage.getItem('u')
            },
            data: {},
            headers:{
                'Content-Type': 'application/x-www-form-urleusencoded',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            },
        });
    };
};

export const createUserApi = ({authToken, deviceId, merchantId, userId, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'v2/users/create',
            data: {
                merchantId: merchantId,
                userId: userId,
                fullName: data.fullName,
                loginName: data.loginName,
                password: data.password,
                confirmPassword: data.confirmPassword,
                description: data.description,
                address: data.address,
                contact: data.contact,
                userNonLocked: '-1',
                userEnabled: '-1',
                roleIds: data.roleIds
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            },
        });
    };
};

export const updateUserApi = ({authToken, deviceId, merchantId, userId, id, data}) => {
    if(authToken != null){

        return Axios({
            method: 'put',
            url: window.ApiURL + 'v2/users/' +id +'/update',
            data: {
                merchantId: merchantId,
                userId: userId,
                fullName: data.fullName,
                loginName: data.loginName,
                description: data.description,
                adddressId: data.adddressId,
                contactId: data.contactId,
                address: data.address,
                contact: data.contact,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            },
        });
    };
};

export const changeStatusUserApi = ({authToken, deviceId, userId, merchantId, id, locked}) => {
    if(authToken != null){
        return Axios({
            method: 'put',
            url: window.ApiURL + 'v2/users/' +id +'/status',
            data: {
                userId: userId,
                merchantId : merchantId,
                enabled : true,
                locked : locked,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const changePasswordUserApi = ({authToken, deviceId, userId, merchantId, id, data, passwordOld, password, confirmPassword}) => {
    return Axios({
        method: 'put',
        url: window.ApiURL + 'v2/users/'+ id +'/password',
        data: {
            userId: userId,
            merchantId: merchantId,
            passwordOld: data.passwordOld,
            password: data.password,
            confirmPassword: data.confirmPassword
        },
        headers:{
            'Content-Type': 'application/json',
            'authToken': authToken,
            'deviceUniqueId' : deviceId,
        }
    });
};
