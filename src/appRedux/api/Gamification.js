import Axios from 'axios';

export const searchGamiApi = ({authToken, deviceId, userId, merchantId, search, page, size}) => {
    if(authToken != null){
        return Axios({
            method: 'get',
            url: window.ApiURL + 'v2/games/dashboard/search',
            params: {
                userId : userId,
                merchantId : merchantId,
                typeName : '',
                gameName : search,
                page : page,
                size : size,
                nRecords : 10
            },
            data: {},
            headers:{
                'authToken': authToken,
                'deviceUniqueId' : deviceId,
            }
        });
    };
};

export const viewGamiApi = ({authToken, deviceId, id, userId, merchantId}) => {
    if(authToken != null){

        return Axios({
            method: 'get',
            url: window.ApiURL + 'v2/games/dashboard',
            params: {
                id : id,
                userId : userId,
                merchantId : merchantId,
            },
            data: {},
            headers:{
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};


// export const searchGamificationApi = ({
//     authToken, deviceId, userId, merchantId,
//     gameName, typeName, page, nRecords
// }) => {
//     if(authToken != null){
//         return Axios({
//             method: 'get',
//             url: window.ApiURL + 'v2/games/dashboard/search',
//             params: {
//                 merchantId,
//                 userId,
//                 gameName, typeName, page, nRecords
//             },
//             data: {},
//             headers:{
//                 'Content-Type': 'application/json',
//                 'authToken': authToken,
//                 'deviceUniqueId' : deviceId
//             }
//         });
//     };
// };

export const viewGamificationApi = ({authToken, deviceId, userId, id, merchantId, gameType}) => {
    if(authToken != null){

        return Axios({
            method: 'get',
            url: window.ApiURL + 'v2/games/dashboard',
            params: { 
                merchantId, userId, gameType, id
            },
            headers: { authToken, deviceUniqueId: deviceId }
        });
    };
};

export const updateGamificationApi = ({authToken, deviceId, userId, merchantId, id, data}) => {
    if(authToken != null){

        return Axios({
            method: 'put',
            url: window.ApiURL + 'v2/point-values/update',
            data: {
                userId: userId,
                merchantId: merchantId,
                pointValueId :id,
                pointValue: data.pointValue,
                startDate: data.startDate,
                endDate: data.endDate,
                currency: data.currency,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const createGamificationApi = ({authToken, deviceId, userId, merchantId, data}) => {
    if(authToken != null){

        return Axios({
            method: 'post',
            url: window.ApiURL + 'v2/point-values/create',
            data: {
                userId: userId,
                merchantId: merchantId,
                pointValue: data.pointValue,
                startDate: data.startDate,
                endDate: data.endDate,
                currency: data.currency,
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

const questionData = {
    typeId: 0,
    name: '',
    startDate: '',
    endDate: '',
    point: 0,
    details: []
}
const questionDetails = {
    data: {
        question: '',
        options: [
            { value: '' }
        ]
    }
}
const spinnerData = {
    name: '',
    startDate: '',
    endDate: '',
    startTime1: '',
    endTime1: '',
    startTime2: '',
    endTime2: '',
    chance: 0
}
const spinnerDetails = {
    data: {
        options: [
            { value: '' }
        ]
    }
}

const createUpdateGameApi = ({ authToken, deviceId, userId, merchantId, data, gameType, id }) => {
    return Axios({
        method: 'post',
        url: id ? `${window.ApiURL}v2/games/${gameType}/update` : `${window.ApiURL}v2/games/${gameType}`,
        data: {
            userId,
            merchantId,
            ...data
        },
        ...(id ? { params: { id } } : {}),
        headers:{
            'Content-Type': 'application/json',
            authToken,
            deviceUniqueId : deviceId
        }
    })
}


export const createQuizApi = ({ authToken, deviceId, userId, merchantId, data }) => createUpdateGameApi({ 
    authToken, deviceId, userId, merchantId, data, 
    gameType: 'quiz'
});

export const updateQuizApi = ({ authToken, deviceId, userId, merchantId, data, id }) => createUpdateGameApi({ 
    authToken, deviceId, userId, merchantId, data, id,
    gameType: 'quiz'
});

export const createSurveyApi = ({ authToken, deviceId, userId, merchantId, data }) => createUpdateGameApi({ 
    authToken, deviceId, userId, merchantId, data, 
    gameType: 'survey'
});

export const updateSurveyApi = ({ authToken, deviceId, userId, merchantId, data, id }) => createUpdateGameApi({ 
    authToken, deviceId, userId, merchantId, data, id,
    gameType: 'survey'
});

export const createSpinnerApi = ({ authToken, deviceId, userId, merchantId, data }) => createUpdateGameApi({ 
    authToken, deviceId, userId, merchantId, data, 
    gameType: 'spinner'
});

export const updateSpinnerApi = ({ authToken, deviceId, userId, merchantId, data, id }) => createUpdateGameApi({ 
    authToken, deviceId, userId, merchantId, data, id,
    gameType: 'spinner'
});

export const deleteGamificationApi = ({authToken, deviceId, userId, merchantId, id, gameType}) => {
    if(authToken != null){
        return Axios({
            method: 'delete',
            url: window.ApiURL + 'v2/games/dashboard/delete',
            // params: {
            //     id, gameType, userId, merchantId
            // },
            data: {
                id, gameType, userId, merchantId
            },
            headers:{
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            }
        });
    };
};

export const getGameTypesApi = ({ authToken, deviceId, userId, merchantId }) => {
    if (authToken) {
        return Axios({
            method: 'get',
            url: `${window.ApiURL}v2/games/game-types`,
            params: { merchantId, userId },
            headers: { authToken, deviceUniqueId: deviceId }
        })
    }
};

export const viewGameApi = ({ authToken, deviceId, userId, merchantId, id, gameType }) =>
    Axios({
        method: 'get',
        url: `${window.ApiURL}v2/games/dashboard`,
        params: { 
            merchantId, userId, gameType, id
        },
        headers: { authToken, deviceUniqueId: deviceId }
    });
