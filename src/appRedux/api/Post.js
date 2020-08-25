import Axios from 'axios';


export const searchPostApi = ({authToken, deviceId, userId, merchantId, size, startDate, status, search, page}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'v2/posts/search',
            params: {},
            data: {
                userId : userId,
                merchantId : merchantId,
                startDate : startDate,
                status : status,
            },
            headers:{
                'Content-Type': 'application/json',
                'page' : page,
                'size' : size,
                'authToken': authToken,
                'deviceUniqueId' : deviceId,
            }
        });
    };
};

export const viewPostApi = ({authToken, deviceId, userId, id, merchantId}) => {
    if(authToken != null){

        return Axios({
            method: 'get',
            url: window.ApiURL + 'v2/posts',
            params: {
                id : id,
                userId : userId,
                merchantId : merchantId,
            },
            data: {},
            headers:{
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const updatePostApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
    if(authToken != null){

        return Axios({
            method: 'put',
            url: window.ApiURL + 'v2/posts/update',
            data: {
                userId: userId,
                merchantId: merchantId,
                pointValueId :id,
                pointValue: data.pointValue,
                startDate: data.startDate,
                endDate: data.endDate,
                currency: data.currency,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const createPostApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'v2/posts/create',
            data: {
                userId: userId,
                merchantId: merchantId,
                pointValue: data.pointValue,
                startDate: data.startDate,
                endDate: data.endDate,
                currency: data.currency,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const deletePostApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){
        return Axios({
            method: 'delete',
            url: window.ApiURL + 'v2/posts/delete',
            params: {
                userId : userId,
                merchantId : merchantId,
                pointValueId : id,
            },
            data: {},
            headers:{
                // 'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};
