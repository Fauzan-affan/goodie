import {
    CLEAR_FILTER_SEARCH_ROLES,
    CREATE_ROLES,
    DELETE_ROLES,
    FILTER_SEARCH_ROLES,
    RESET_STATUS,
    SEARCH_ROLES,
    UPDATE_ROLES,
    GET_LIST_PRIVILEGES,
    VIEW_ROLES
} from "constants/ActionTypes";
import {GET_ROLES_PRIVILEGES} from "../../constants/ActionTypes";

export const searchRoles = (request) => {
    return {
        type: SEARCH_ROLES,
        payload: request
    };
};

export const filterSortSearch = (pagination, filters, sorter, search) => {
    let filter = {
        pagination: pagination,
        filters: filters,
        sorter: sorter,
        search: search
    };
    return {
        type: FILTER_SEARCH_ROLES,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_ROLES
    };
};

export const viewRoles = (request) => {
    return {
        type: VIEW_ROLES,
        payload: request
    };
};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

export const createRoles = (request) => {
    return {
        type: CREATE_ROLES,
        payload: request
    };

};

export const updateRoles = (request) => {
    return {
        type: UPDATE_ROLES,
        payload: request
    };

};

export const deleteRoles = (request) => {
    return {
        type: DELETE_ROLES,
        payload: request
    };

};

export const getListPrivileges = (request) => {
    return {
        type: GET_LIST_PRIVILEGES,
        payload: request
    };

};

export const viewRolesPrivileges = (request) => {
    return {
        type: GET_ROLES_PRIVILEGES,
        payload: request
    };

};

