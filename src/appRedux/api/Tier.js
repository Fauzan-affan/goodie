import Axios from 'axios';


export const searchTiersApi = ({authToken, deviceId, userId, merchantId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'tier/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                ruleName : '',
                page : 0,
                nRecords : 1000
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

//Basic Rule
export const viewTierApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){

        return Axios({
            method: 'get',
            url: window.ApiURL + 'tier/view',
            params: {
                userId : userId,
                merchantId : merchantId,
                tierStructureId : id
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

export const updateTierApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'tier/update',
            data: {
                userId: userId,
                merchantId: merchantId,
                tierStructureId: id,
                tierStructureCode: data.tierStructureCode,
                isDowngrade: data.isDowngrade,
                isImmediatelyDowngrade:data.isImmediatelyDowngrade,
                downgradeTimeSet: data.downgradeTimeSet,
                tierDetails: data.tierDetail,
                promotionTiers : data.newPromotionTiers,
                programTiers : data.newProgramTiers
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const createTierApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'tier/create',
            data: {
                userId: userId,
                merchantId: merchantId,
                tierStructureId: data.tierStructureId,
                tierStructureCode: data.tierStructureCode,
                isDowngrade: data.isDowngrade,
                isImmediatelyDowngrade:data.isImmediatelyDowngrade,
                downgradeTimeSet: data.downgradeTimeSet,
                tierDetails: data.tierDetail
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const deleteTierApi = ({authToken, deviceId, userId, merchantId, tierStructureId}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'tier/delete',
            data: {
                userId : userId,
                merchantId : merchantId,
                tierStructureId: tierStructureId,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const tierDetailsApi = ({authToken, deviceId, userId, merchantId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'tier/details',
            params: {
                userId : userId,
                merchantId : merchantId
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
