import Axios from 'axios';


export const searchPromotionsApi = ({authToken, deviceId, userId, merchantId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'promotion/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                promotionCode : '',
                promotionName : '',
                promotionStoreId: '',
                startDate: '',
                endDate: '',
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

export const viewPromotionApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){

        return Axios({
            method: 'get',
            url: window.ApiURL + 'promotion/view',
            params: {
                userId : userId,
                merchantId : merchantId,
                promotionId : id
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

export const updatePromotionApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'promotion/update',
            data: {
                userId: userId,
                merchantId: merchantId,
                promotionId :id,
                promotionCode: data.promotionCode,
                promotionName: data.promotionName,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                expiredPointType: data.expiredPointType,
                expiredDay: data.expiredDay,
                expiredDate: data.expiredDate,
                memberTiers: data.memberTiers,
                isIgnoreMemberTierRules: data.isIgnoreMemberTierRules,
                rules: data.rules
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const createPromotionApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'promotion/create',
            data: {
                userId: userId,
                merchantId: merchantId,
                promotionId :'',
                promotionCode: data.promotionCode,
                promotionName: data.promotionName,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                expiredPointType: data.expiredPointType,
                expiredDay: data.expiredDay,
                expiredDate: data.expiredDate,
                memberTiers: data.memberTiers,
                isIgnoreMemberTierRules: data.isIgnoreMemberTierRules,
                rules: data.rules
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const deletePromotionApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'promotion/delete',
            data: {
                userId : userId,
                merchantId : merchantId,
                promotionId: id,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};
