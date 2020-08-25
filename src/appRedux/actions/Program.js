import {
    SEARCH_PROGRAMS,
    FILTER_SEARCH_PROGRAMS,
    CLEAR_FILTER_SEARCH_PROGRAMS,
    VIEW_PROGRAM,
    UPDATE_PROGRAM,
    CREATE_PROGRAM,
    RESET_STATUS,
    DELETE_PROGRAM
} from "constants/ActionTypes";
import {GET_TIER_AND_PROGRAM} from "../../constants/ActionTypes";

export const searchPrograms = (request) => {
    return {
        type: SEARCH_PROGRAMS,
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
        type: FILTER_SEARCH_PROGRAMS,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_PROGRAMS
    };
};

export const viewProgram = (request) => {
    return {
        type: VIEW_PROGRAM,
        payload: request
    };
};

export const updateProgram = (request) => {
    return {
        type: UPDATE_PROGRAM,
        payload: request
    };

};

export const createProgram = (request) => {
    return {
        type: CREATE_PROGRAM,
        payload: request
    };

};

export const deleteProgram = (request) => {
    return {
        type: DELETE_PROGRAM,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

export const getTierAndProgram = (request) => {
    return {
        type: GET_TIER_AND_PROGRAM,
        payload : request
    };

};
