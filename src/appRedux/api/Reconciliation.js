import Axios from 'axios';


export const searchReconciliationApi = ({authToken, deviceId, userId, merchantId, page,  sort, search, startDate, endDate}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/reconcile/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                merchantType : 2,
                sort : sort,
                page : page,
                nRecords : 20,
                startDate : startDate,
                endDate : endDate,
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

export const searchReconciliationPayableApi = (data) => {
    if(data.authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/reconcile/search',
            params: {
                userId : data.userId,
                merchantId : data.merchantId,
                // merchantType : 0,
                merchantType : data.merchantType,
                sort : data.sort,
                page : data.page,
                nRecords : 10,
                startDate : data.startDate,
                endDate : data.endDate,
                trxType : data.trxType,
                pointTransactionTypeList : data.pointTransactionTypeList,
                merchantNamePayable : data.merchantNamePayable
                
            },
            data: {},
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'authToken': data.authToken,
                'deviceUniqueId' : data.deviceId
            }
        });
    };
};

export const searchReconciliationReceivebleApi = ({authToken, deviceId, userId, merchantId, page,  sort, search, startDate, endDate}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/reconcile/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                merchantType : 1,
                sort : sort,
                page : page,
                nRecords : 20,
                startDate : startDate,
                endDate : endDate,
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

export const searchReconciliationPointfeeApi = ({authToken, deviceId, userId, merchantId, page,  sort, search, startDate, endDate}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'merchant/reconcile/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                merchantType : 2,
                sort : sort,
                page : page,
                nRecords : 20,
                startDate : startDate,
                endDate : endDate,
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

export const viewReconciliationApi = ({authToken, deviceId, userId, merchantId, billingDetailId, productName, rewardName, merchantName, fee, basePrice, quantity, totalPrice, offset, pageSize, id}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'billing/detail',
            params: {
                userId : userId,
                merchantId : merchantId,
                billingId : id,
                billingDetailId : billingDetailId,
                productName : productName,
                rewardName : rewardName,
                merchantName : merchantName,
                fee : fee,
                basePrice : basePrice,
                quantity : quantity,
                totalPrice : totalPrice,
                offset : offset,
                pageSize : pageSize
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

// export const billingDetailsApi = ({authToken, deviceId, userId, merchantId}) => {
//     if(authToken != null){
//         return Axios({
//             method: 'get',
//             url: window.ApiURL + 'billing/details',
//             params: {
//                 userId : userId,
//                 merchantId : merchantId
//             },
//             data: {},
//             headers:{
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'authToken': authToken,
//                 'deviceUniqueId' : deviceId
//             }
//         });
//     };
// };