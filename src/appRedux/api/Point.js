import Axios from 'axios';


export const searchPointApi = ({authToken, deviceId, userId, merchantId, sort, startDate, endDate, search, page}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'v2/point-values/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                startDate : search,
                endDate : endDate,
                sort : sort,
                page : page,
                nRecords : 10,
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId,
                // 'page': page,
                // 'nRecords': 10
            }
        });
    };
};

export const viewPointApi = ({authToken, deviceId, userId, id, merchantId}) => {
    if(authToken != null){

        return Axios({
            method: 'get',
            url: window.ApiURL + 'v2/point-values',
            params: {
                userId : userId,
                merchantId : merchantId,
                pointValueId : id,
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const updatePointApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
    if(authToken != null){

        return Axios({
            method: 'put',
            url: window.ApiURL + 'v2/point-values/update',
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

export const createPointApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'v2/point-values/create',
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

export const deletePointApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){
        return Axios({
            method: 'delete',
            url: window.ApiURL + 'v2/point-values/delete',
            params: {
                userId : userId,
                merchantId : merchantId,
                pointValueId : id,
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const getListCurrencyApi = ({authToken, deviceId, userId, merchantId, paramCurrencyPoint}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/param/currency',
            params: {
                userId : userId,
                merchantId : merchantId,
                paramCurrencyPoint: -1,
            },
            data: {},
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};
