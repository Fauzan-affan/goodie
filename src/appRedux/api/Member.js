import Axios from 'axios';


export const searchMembersApi = ({authToken, deviceId, userId, merchantId, page, sortBy, sort, search}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'member/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                memberUsername : '',
                memberName : search,
                mobileNumber : '',
                sortBy : sortBy,
                sort: sort,
                page : page,
                nRecords : 10
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

export const viewMemberApi = ({authToken, deviceId, userId, merchantId, id}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'member/view',
            params: {
                userId : userId,
                merchantId : merchantId,
                memberId : id
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

export const changeStatusApi = ({authToken, deviceId, userId, merchantId, id, status}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'member/changeStatus',
            data: {
                userId : userId,
                merchantId : merchantId,
                memberId : id,
                status : status
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    //    saya programmer ter pro se jakarta pusat. ga ada yang lebih pro dari saya
    };
};

export const uploadMemberApi = ({authToken, deviceId, userId, merchantId, members}) => {
    if(authToken != null){
        return Axios({
            method: 'post',
            url: window.ApiURL + 'member/upload',
            data: {
                userId : userId,
                merchantId : merchantId,
                members : members
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};