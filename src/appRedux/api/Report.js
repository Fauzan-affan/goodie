import Axios from 'axios';


export const issuingReportApi = ({authToken, deviceId, userId, merchantId, memberName, startDate, endDate, page, pageSize}) => {
    if(authToken != null){
        var mulai = 0;
        var baris = 20;
        
        if(page>0){
            mulai= pageSize + 1;
            baris=0;
            for(var i=0;i<=page;){
                baris = pageSize + baris;
                i++;
            }
            mulai = baris - 20 + 1;
        }
        return Axios({
            method: 'get',
            url: window.ApiURL + 'report/issuing',
            params: {
                memberId : userId,
                merchantId : merchantId,
                memberName : memberName,
                startDate : startDate,
                endDate : endDate,
                offset: mulai,
                pageSize : pageSize,
                page : page,
                nRecords : pageSize
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const redeemReportApi = ({authToken, deviceId, userId, merchantId, memberName, startDate, endDate, page, pageSize,}) => {
    if(authToken != null){
        var mulai = 0;
        var baris = 20;
        
        if(page>0){
            mulai= pageSize + 1;
            baris=0;
            for(var i=0;i<=page;){
                baris = pageSize + baris;
                i++;
            }
            mulai = baris - 20 + 1;
        }
        return Axios({
            method: 'get',
            url: window.ApiURL + 'report/redeem',
            params: {
                memberId : userId,
                merchantId : merchantId,
                memberName : memberName,
                startDate : startDate,
                endDate : endDate,
                offset: mulai,
                pageSize : pageSize,
                page : page,
                nRecords : pageSize
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const memberBalanceApi = ({authToken, deviceId, userId, merchantId, memberName, startDate, endDate, page, pageSize}) => {
    if(authToken != null){
        var mulai = 0;
        var baris = 20;
        
        if(page>0){
            mulai= pageSize + 1;
            baris=0;
            for(var i=0;i<=page;){
                baris = pageSize + baris;
                i++;
            }
            mulai = baris - 20 + 1;
        }
        return Axios({
            method: 'get',
            url: window.ApiURL + 'report/member-balance',
            params: {
                memberId : userId,
                merchantId : merchantId,
                memberName : memberName,
                startDate : startDate,
                endDate : endDate,
                offset: mulai,
                pageSize : pageSize,
                page : page,
                nRecords : pageSize
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const voucherBalanceApi = ({authToken, deviceId, userId, merchantId, memberName, productName, status, page, pageSize}) => {
    if(authToken != null){
        var mulai = 0;
        var baris = 20;
        
        if(page>0){
            mulai= pageSize + 1;
            baris=0;
            for(var i=0;i<=page;){
                baris = pageSize + baris;
                i++;
            }
            mulai = baris - 20 + 1;
        }
        return Axios({
            method: 'get',
            url: window.ApiURL + 'report/voucher-balance',
            params: {
                memberId : userId,
                merchantId : merchantId,
                memberName : memberName,
                productName : productName,
                status : status,
                offset: mulai,
                pageSize : pageSize,
                page : page,
                nRecords : pageSize
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const referralReportApi = ({authToken, deviceId, userId, merchantId, memberName, startDate, endDate, page, pageSize}) => {
    if(authToken != null){
        var mulai = 0;
        var baris = 20;
        
        if(page>0){
            mulai= pageSize + 1;
            baris=0;
            for(var i=0;i<=page;){
                baris = pageSize + baris;
                i++;
            }
            mulai = baris - 20 + 1;
        }
        return Axios({
            method: 'get',
            url: window.ApiURL + 'report/referral-member',
            params: {
                memberId : userId,
                merchantId : merchantId,
                memberName : memberName,
                startDate : startDate,
                endDate : endDate,
                offset: mulai,
                pageSize : pageSize,
                page : page,
                nRecords : pageSize
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const pointTransactionApi = ({authToken, deviceId, userId, merchantId, memberName, trxType, startDate, endDate, page, pageSize}) => {
    if(authToken != null){
        var mulai = 0;
        var baris = 20;
        
        if(page>0){
            mulai= pageSize + 1;
            baris=0;
            for(var i=0;i<=page;){
                baris = pageSize + baris;
                i++;
            }
            mulai = baris - 20 + 1;
        }
        return Axios({
            method: 'get',
            url: window.ApiURL + 'report/point-transaction',
            params: {
                memberId : userId,
                merchantId : merchantId,
                trxType : trxType,
                memberName : memberName,
                startDate : startDate,
                endDate : endDate,
                offset: mulai,
                pageSize : pageSize,
                page : page,
                nRecords : pageSize
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const pointTransferApi = ({authToken, deviceId, userId, merchantId, orderBy, orderType, pageSize, page, nRecords, role, startDate, endDate, username}) => {
    if(authToken != null){
        var mulai = 0;
        var baris = 20;
        
        if(page>0){
            mulai= pageSize + 1;
            baris=0;
            for(var i=0;i<=page;){
                baris = pageSize + baris;
                i++;
            }
            mulai = baris - 20 + 1;
        }
        return Axios({
            method: 'get',
            url: window.ApiURL + 'point-transaction/point/transfer/history',
            params: {
                userId : userId,
                merchantId : merchantId,
                orderBy : '',
                orderType : 1,
                page : page,
                nRecords : pageSize,
                role : 1,
                startDate : startDate,
                endDate : endDate,
                username: username,
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

