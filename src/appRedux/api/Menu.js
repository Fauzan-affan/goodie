import Axios from 'axios';


export const menuMerchantApi = ({authToken, deviceId, userId, merchantId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/list/menu',
            params: {
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

