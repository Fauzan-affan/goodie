import Axios from 'axios';

export const searchStoreApi = ({authToken, deviceId, userId, merchantId, page, search, isAllStore, searchStoreCode, searchMerchantName}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'store/search',
            params: {
                merchantId: merchantId,
                userId: userId,
                storeCode : searchStoreCode,
                storeName : search,
                merchantName : searchMerchantName,
                isAllStore : isAllStore,
                page : page,
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

export const viewStoreApi = ({merchantId, userId, id, authToken, deviceId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'store/view',
            params: {
                merchantId : merchantId,
                userId : userId,
                storeId : id,
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

export const createStoreApi = ({authToken, deviceId, merchantId, userId, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'store/create',
            data: {
                merchantId: merchantId,
                userId: userId,
                storeCode: data.storeCode,
                storeName: data.storeName,
                storeLogo: data.storeLogo,
                pinType: data.pinType,
                pin: data.pin,
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

export const updateStoreApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'store/update',
            data: {
                userId: userId,
                merchantId: merchantId,
                storeId : id,
                storeCode: data.storeCode,
                storeName: data.storeName,
                storeLogo: data.storeLogo,
                pinType: 1,
                status: -1,
                pin: data.pin,
                address: data.address,
                contact : data.contact
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const deleteStoreApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'store/delete',
            data: {
                userId: userId,
                merchantId: merchantId,
                storeId : id,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};