import Axios from 'axios';


export const loyaltyPromotionApi = ({authToken, deviceId, userId, merchantId, period}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'dashboard/loyalty/promotion',
            params: {
                memberId : userId,
                merchantId : merchantId,
                period : period,
                offset: 0,
                pageSize : 15,
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const loyaltyRewardApi = ({authToken, deviceId, userId, merchantId, period}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'dashboard/loyalty/reward',
            params: {
                memberId : userId,
                merchantId : merchantId,
                period : period,
                offset: 0,
                pageSize : 15,
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const loyaltyTotalApi = ({authToken, deviceId, userId, merchantId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'dashboard/loyalty/total',
            params: {
                memberId : userId,
                merchantId : merchantId
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const marketplaceMerchantApi = ({authToken, deviceId, userId, merchantId, period}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'dashboard/marketplace/merchant',
            params: {
                memberId : userId,
                merchantId : merchantId,
                period : period,
                offset: 0,
                pageSize : 99999,
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const marketplaceProductApi = ({authToken, deviceId, userId, merchantId, period}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'dashboard/marketplace/product',
            params: {
                memberId : userId,
                merchantId : merchantId,
                period : period,
                offset: 0,
                pageSize : 99999,
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const marketplaceRevenueApi = ({authToken, deviceId, userId, merchantId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'dashboard/marketplace/revenue',
            params: {
                memberId : userId,
                merchantId : merchantId
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const memberGrowthApi = ({authToken, deviceId, userId, merchantId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'dashboard/member/growth',
            params: {
                memberId : userId,
                merchantId : merchantId,
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const memberSummaryApi = ({authToken, deviceId, userId, merchantId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'dashboard/member/summary',
            params: {
                memberId : userId,
                merchantId : merchantId,
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

