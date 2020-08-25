import Axios from 'axios';


export const searchBlastApi = ({authToken, deviceId, userId, merchantId, sortBy, sort, name, receiver, search, page}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/message/blast/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                subject : search,
                messageType : '',
                sortBy : sortBy,
                sort : sort,
                page : page,
                nRecords : 10,
                name : name,
                receiver : receiver
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

export const viewBlastApi = ({authToken, deviceId, userId, id, merchantId, page, sortBy, sort}) => {
    if(authToken != null){

        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/message/blast/view',
            params: {
                userId : userId,
                merchantId : merchantId,
                messageBlastId : id,
                sortBy : sortBy,
                sort : sort,
                page : page,
                nRecords : 9999999
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

export const updateBlastApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
    if(authToken != null){

        return Axios({
            method: 'put',
            url: window.ApiURL + 'merchant/message/blast/update',
            data: {
                userId: userId,
                merchantId: merchantId,
                messageBlastId :id,
                subject: data.subject,
                sendDate: data.sendDate,
                content: data.content,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const createBlastApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'merchant/message/blast/create',
            data: {
                userId: userId,
                merchantId: merchantId,
                subject: data.subject,
                sendDate: data.sendDate,
                messageType: data.messageType,
                content: data.content,
                members : data.members
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const deleteBlastApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){
        return Axios({
            method: 'delete',
            url: window.ApiURL + 'merchant/message/blast/delete',
            data: {
                userId : userId,
                merchantId : merchantId,
                messageBlastId: id,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};
