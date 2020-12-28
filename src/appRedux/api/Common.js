import Axios from 'axios';


export const uploadImageApi = ({authToken, deviceId, userId, merchantId,file}) => {
    var bodyFormData = new FormData();
    bodyFormData.set('file',file);
    bodyFormData.set('memberId', userId);
    bodyFormData.set('merchantId', merchantId);
    return Axios({
        method: 'post',
        url: window.ApiURL + 'util/upload/image',
        data: bodyFormData,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'authToken': authToken,
            'deviceUniqueId' : deviceId
        }
    });
};

export const getListCountryApi = () => {
    return Axios({
        method: 'get',
        url: window.ApiURL + 'util/list/country',
        params: {
            isAsean : -1,
            orderType : 2,
            activeStatus : -1,
        },
        data: {},
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

export const getListProvinceApi = ({id}) => {
    return Axios({
        method: 'get',
        url: window.ApiURL + 'util/list/province',
        params: {
            countryId : id,
        },
        data: {},
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};


export const getListCityApi = ({id}) => {
    return Axios({
        method: 'get',
        url: window.ApiURL + 'util/list/city',
        params: {
            stateProvId : id
        },
        data: {},
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

export const getListCurrencyApi = ({authToken, deviceId, userId, merchantId, paramCurrencyPoint}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/param/currency',
            params: {
                userId : userId,
                merchantId : merchantId,
                paramCurrencyPoint: paramCurrencyPoint,
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
