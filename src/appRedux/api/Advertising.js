import Axios from 'axios';


export const searchAdvertisingApi = ({authToken, deviceId, userId, merchantId, search, page, size}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'v2/advertising/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                advertisingType : '',
                name : search,
                page : page,
                size : size,
                nRecords : 10
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId,
            }
        });
    };
};

export const viewAdvertisingApi = ({authToken, deviceId, id, userId, merchantId}) => {
    if(authToken != null){

        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/advertising/view',
            params: {
                advertisingId : id,
                userId : userId,
                merchantId : merchantId,
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
export const createAdvertisingApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'v2/advertising/create',
            data: {
                userId: userId,
                merchantId: merchantId,
                advertisingType : data.advertisingType,
                advertisingName : data.advertisingName,
                description : data.description,
                articleCategory : data.articleCategory,
                adsCategory : data.adsCategory,
                adsContent : data.adsContent,
                image : data.image,
                rewardId : data.rewardId,
                startDate : data.startDate,
                endDate : data.endDate,
                cityId  : data.cityId,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const updateAdvertisingApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
    if(authToken != null){

        return Axios({
            method: 'put',
            url: window.ApiURL + 'v2/advertising/update',
            data: {
                userId: userId,
                merchantId: merchantId,
                advertisingType : data.advertisingType,
                advertisingId : id,
                advertisingName : data.advertisingName,
                description : data.description,
                articleCategory : data.articleCategory,
                adsCategory : data.adsCategory,
                adsContent : data.adsContent,
                image : data.image,
                rewardId : data.rewardId,
                startDate : data.startDate,
                endDate : data.endDate,
                cityId  : data.cityId,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const deleteAdvertisingApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){
        return Axios({
            method: 'delete',
            url: window.ApiURL + 'v2/advertising',
            params: {
                userId : userId,
                merchantId : merchantId,
                advertisingId : id,
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};
