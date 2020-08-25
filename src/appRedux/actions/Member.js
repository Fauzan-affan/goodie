import {
    SEARCH_MEMBERS,
    FILTER_SEARCH_MEMBERS,
    CLEAR_FILTER_SEARCH_MEMBERS,
    VIEW_MEMBER,
    CHANGE_STATUS_MEMBER,
    RESET_STATUS
} from "constants/ActionTypes";
import {UPLOAD_MEMBER} from "../../constants/ActionTypes";

export const searchMembers = (request) => {
    return {
        type: SEARCH_MEMBERS,
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
        type: FILTER_SEARCH_MEMBERS,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_MEMBERS
    };
};

export const viewMember = (request) => {
    return {
        type: VIEW_MEMBER,
        payload: request
    };
};

export const changeStatusMember = (request) => {
    return {
        type: CHANGE_STATUS_MEMBER,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

export const uploadMember = (request) => {
    return {
        type: UPLOAD_MEMBER,
        payload: request
    };

};

