import {
    SEARCH_USERS,
    FILTER_SEARCH_USERS,
    CLEAR_FILTER_SEARCH_USERS,
    VIEW_USERS,
    CREATE_USERS,
    UPDATE_USERS,
    RESET_STATUS,
    CHANGE_STATUS_USER,
    // CHANGE_PASSWORD_USER
} from "constants/ActionTypes";

import {CHANGE_PASSWORD_USER} from "../../constants/ActionTypes";

export const searchUser = (request) => {
    return {
        type: SEARCH_USERS,
        payload: request
    };
};

export const filterSortSearch = (pagination, filters, sorter, search) => {
    let filter  = {
        pagination : pagination,
        filters : filters,
        sorter : sorter,
        search : search
    };
    return {
        type: FILTER_SEARCH_USERS,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_USERS
    };
};

export const viewUser = (request) => {
    return {
        type: VIEW_USERS,
        payload: request
    };
};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

export const createUser = (request) => {
    return {
        type: CREATE_USERS,
        payload: request
    };

};

export const updateUser = (request) => {
    return {
            type: UPDATE_USERS,
            payload: request
        };

};


export const changeStatusUser = (request) => {
    return {
        type: CHANGE_STATUS_USER,
        payload: request
    };

};

export const changeUserPassword = (request) => {
    return {
        type: CHANGE_PASSWORD_USER,
        payload: request
    };
};

