import {
    SEARCH_RULES,
    FILTER_SEARCH_RULES,
    CLEAR_FILTER_SEARCH_RULES,
    VIEW_RULE,
    UPDATE_RULE,
    CREATE_RULE,
    RESET_STATUS,
    DELETE_RULE
} from "constants/ActionTypes";

export const searchRules = (request) => {
    return {
        type: SEARCH_RULES,
        payload: request
    };
};

export const filterSortSearch = (pagination, filters, sorter) => {
    let filter  = {
        pagination : pagination,
        filters : filters,
        sorter : sorter
    };
    return {
        type: FILTER_SEARCH_RULES,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_RULES
    };
};

export const viewRule = (request) => {
    return {
        type: VIEW_RULE,
        payload: request
    };
};

export const updateRule = (request) => {
    return {
            type: UPDATE_RULE,
            payload: request
        };

};

export const createRule = (request) => {
    return {
            type: CREATE_RULE,
            payload: request
        };

};

export const deleteRule = (request) => {
    return {
        type: DELETE_RULE,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};
