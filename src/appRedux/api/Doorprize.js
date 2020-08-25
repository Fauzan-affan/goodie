import Axios from 'axios';


export const searchDoorprizeApi = ({authToken, deviceId, userId, merchantId, search, phoneNumber, memberName, email, page}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'v2/doorprize/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                phoneNumber : phoneNumber,
                name : memberName,
                period : search,
                email : email,
                page : page,
                nRecords : 10,
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

export const createDoorprizeApi = ({authToken, deviceId, userId, merchantId, data, base64file}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'v2/doorprize/create',
            data: {
                userId: userId,
                merchantId: merchantId,
                period: data.period,
                reward: data.reward,
                base64file: base64file,
                fileContentType: 'text/csv'
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};