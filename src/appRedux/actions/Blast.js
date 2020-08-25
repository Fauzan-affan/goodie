import {
    SEARCH_BLAST,
    FILTER_SEARCH_BLAST,
    CLEAR_FILTER_SEARCH_BLAST,
    VIEW_BLAST,
    UPDATE_BLAST,
    CREATE_BLAST,
    RESET_STATUS,
    DELETE_BLAST,
    SELECT_BLAST,
    CLEAR_SELECT_BLAST,
    // ADD_STOCK
} from "constants/ActionTypes";


export const searchBlast = (request) => {
    return {
        type: SEARCH_BLAST,
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
        type: FILTER_SEARCH_BLAST,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_BLAST
    };
};

export const viewBlast = (request) => {
    return {
        type: VIEW_BLAST,
        payload: request
    };
};

export const updateBlast = (request) => {
    return {
        type: UPDATE_BLAST,
        payload: request
    };

};

export const createBlast = (request) => {
    return {
        type: CREATE_BLAST,
        payload: request
    };

};

export const deleteBlast = (request) => {
    return {
        type: DELETE_BLAST,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

export const selectBlast = (request) => {
    return {
        type: SELECT_BLAST,
        payload: request
    };

};

export const clearSelectBlast = (request) => {
    return {
        type: CLEAR_SELECT_BLAST
    };

};


