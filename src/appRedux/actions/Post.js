import {
    SEARCH_POST,
    FILTER_SEARCH_POST,
    CLEAR_FILTER_SEARCH_POST,
    VIEW_POST,
    UPDATE_POST,
    CREATE_POST,
    RESET_STATUS,
    DELETE_POST,
} from "constants/ActionTypes";


export const searchPost = (request) => {
    return {
        type: SEARCH_POST,
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
        type: FILTER_SEARCH_POST,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_POST
    };
};

export const viewPost = (request) => {
    return {
        type: VIEW_POST,
        payload: request
    };
};

export const updatePost = (request) => {
    return {
        type: UPDATE_POST,
        payload: request
    };

};

export const createPost = (request) => {
    return {
        type: CREATE_POST,
        payload: request
    };

};

export const deletePost = (request) => {
    return {
        type: DELETE_POST,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

