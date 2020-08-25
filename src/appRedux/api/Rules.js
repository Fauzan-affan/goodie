import Axios from 'axios';


export const searchRulesApi = ({authToken, deviceId, userId, merchantId}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'rules/search',
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
export const viewBasicRuleApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){

        return Axios({
            method: 'get',
            url: window.ApiURL + 'rules/basic/view',
            params: {
                userId : userId,
                merchantId : merchantId,
                ruleId : id
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

export const updateBasicRuleApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'rules/basic/update',
            data: {
                userId: userId,
                merchantId: merchantId,
                basicRuleId : id,
                basicRuleName: data.basicRuleName,
                basicRuleDesc: data.basicRuleDesc,
                basicRuleType:  data.basicRuleType,
                baseLoyaltyDiscount: data.baseLoyaltyDiscount,
                baseLoyaltyPoint: data.baseLoyaltyPoint,
                amountReq: data.amountReq,
                capPerTrx: data.capPerTrx,
                paymentRule: data.paymentRule,
                basicRuleDetail: data.basicRuleDetail
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const createBasicRuleApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'rules/basic/create',
            data: {
                userId: userId,
                merchantId: merchantId,
                basicRuleName: data.basicRuleName,
                basicRuleDesc: data.basicRuleDesc,
                basicRuleType:  data.basicRuleType,
                baseLoyaltyDiscount: data.baseLoyaltyDiscount,
                baseLoyaltyPoint: data.baseLoyaltyPoint,
                amountReq: data.amountReq,
                capPerTrx: data.capPerTrx,
                paymentRule: data.paymentRule,
                basicRuleDetail: data.basicRuleDetail
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};


//Referral Rule
export const viewReferralRuleApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'rules/referral/view',
            params: {
                userId : userId,
                merchantId : merchantId,
                ruleId : id
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

export const updateReferralRuleApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'rules/referral/update',
            data: {
                userId : userId,
                merchantId : merchantId,
                referralRuleId : id,
                referralRuleName: data.referralRuleName,
                referralRuleDesc: data.referralRuleDesc,
                refereePoint: data.refereePoint,
                termAndCondition: data.termAndCondition,
                referralRuleDetail: data.referralRuleDetail
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};


export const createReferralRuleApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'rules/referral/create',
            data: {
                userId : userId,
                merchantId : merchantId,
                referralRuleName: data.referralRuleName,
                referralRuleDesc: data.referralRuleDesc,
                refereePoint: data.refereePoint,
                termAndCondition: data.termAndCondition,
                referralRuleDetail: data.referralRuleDetail
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};


//Custom Rule
export const viewCustomRuleApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'rules/custom/view',
            params: {
                userId : userId,
                merchantId : merchantId,
                ruleId : id
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

export const updateCustomRuleApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'rules/custom/update',
            data: {
                userId : userId,
                merchantId : merchantId,
                customRuleId : id,
                customRuleName: data.customRuleName,
                customRuleDesc: data.customRuleDesc,
                customRuleTrigger: data.customRuleTrigger,
                customRuleType: data.customRuleType,
                baseLoyaltyDiscount: data.baseLoyaltyDiscount,
                baseLoyaltyPoint: data.baseLoyaltyPoint,
                amountReq: data.amountReq,
                capPerTrx: data.capPerTrx
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const createCustomRuleApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'rules/custom/create',
            data: {
                userId : userId,
                merchantId : merchantId,
                customRuleName: data.customRuleName,
                customRuleDesc: data.customRuleDesc,
                customRuleTrigger: data.customRuleTrigger,
                customRuleType: data.customRuleType,
                baseLoyaltyDiscount: data.baseLoyaltyDiscount,
                baseLoyaltyPoint: data.baseLoyaltyPoint,
                amountReq: data.amountReq,
                capPerTrx: data.capPerTrx
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};


export const deleteRuleApi = ({authToken, deviceId, userId, merchantId, ruleId}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'rules/delete',
            data: {
                userId : userId,
                merchantId : merchantId,
                ruleId: ruleId,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};
