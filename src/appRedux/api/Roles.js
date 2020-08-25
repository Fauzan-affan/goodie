import Axios from 'axios';


export const searchRolesApi = ({name, id, code, description, authToken, deviceId}) => {
    if (authToken != null) {
        return Axios({
            method: 'get',
            url: window.ApiURL + 'v2/roles/search',
            data: {
                id: id,
                code: code,
                name: name,
                description: description,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authToken': authToken,
                'deviceUniqueId': deviceId
            },
        });
    };
};

export const viewRolesApi = ({id, code, name, description, privileges, authToken, deviceId}) => {
    if (authToken != null) {
        return Axios({
            method: 'get',
            url: window.ApiURL + 'v2/roles/' + id,
            data: {
                id: id,
                code: code,
                name: name,
                description: description,
                privileges: privileges,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urleusencoded',
                'authToken': authToken,
                'deviceUniqueId': deviceId
            },
        });
    }
    ;
};
export const createRolesApi = ({authToken, data}) => {
    if (authToken != null) {

        return Axios({
            method: 'post',
            url: window.ApiURL + 'v2/roles/create',
            data: {
                code: data.code,
                name: data.name,
                description: data.description,
                privileges: data.privileges,
            },
        });
    }
    ;
};

export const updateRolesApi = ({authToken, id, data}) => {
    if (authToken != null) {
        return Axios({
            method: 'put',
            url: window.ApiURL + 'v2/roles/' + id + '/update',
            data: {
                id: id,
                code: data.code,
                name: data.name,
                description: data.description,
                privileges: data.privileges,
            },
        });
    }
    ;
};

export const deleteRolesApi = ({authToken, deviceId, id}) => {
    if (authToken != null) {
        return Axios({
            method: 'delete',
            url: window.ApiURL + 'v2/roles/' + id + '/delete',
            data: {},
            headers:{
                'Content-Type': 'application/x-www-form-urleusencoded',
                'authToken': authToken,
                'deviceUniqueId' : deviceId
            },
        });
    };
};

export const getListPrivilegesApi = ({authToken, deviceUniqueId, userId, merchantId, size, page}) => {
    if (authToken != null) {
        return Axios({
            method: 'post',
            url: window.ApiURL + 'v2/privileges/all-selected',
            data: {
                data: []
            },
            params: {
                'userId': userId,
                'merchantId': merchantId,
                'size': size === undefined || size === null ? 20 : size,
                'page': page === undefined || page === null ? 0 : page
            },
            headers: {
                'Content-Type': 'application/json',
                'authToken': authToken,
                'deviceUniqueId': deviceUniqueId,
            }
        });
    }
    ;
};
