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


export const getListProvinceApi = () => {
    return Axios({
        method: 'get',
        url: window.ApiURL + 'util/list/province',
        params: {},
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
