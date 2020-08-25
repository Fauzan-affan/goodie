import {
    SEARCH_GAMIFICATION,
    FILTER_SEARCH_GAMIFICATION,
    CLEAR_FILTER_SEARCH_GAMIFICATION,
    VIEW_GAMIFICATION,
    UPDATE_GAMIFICATION,
    CREATE_GAMIFICATION,
    RESET_STATUS,
    DELETE_GAMIFICATION,
    GET_GAMIFICATION_TYPES,
    CREATE_GAMIFICATION_QUIZ,
    CREATE_GAMIFICATION_SURVEY,
    CREATE_GAMIFICATION_SPINNER,
    UPDATE_GAMIFICATION_QUIZ,
    UPDATE_GAMIFICATION_SURVEY,
    UPDATE_GAMIFICATION_SPINNER
} from "constants/ActionTypes";


export const searchGamification = (request) => {
    return {
        type: SEARCH_GAMIFICATION,
        payload: request
    };
};

export const searchGami = (request) => {
    return {
        type: SEARCH_GAMIFICATION,
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
        type: FILTER_SEARCH_GAMIFICATION,
        payload: filter
    };
};


export const clearFilterSortSearch = () => {
    return {
        type: CLEAR_FILTER_SEARCH_GAMIFICATION
    };
};

export const viewGamification = (request) => {
    return {
        type: VIEW_GAMIFICATION,
        payload: request
    };
};

export const viewGami = (request) => {
    return {
        type: VIEW_GAMIFICATION,
        payload: request
    };
};

export const updateGamification = (request) => {
    return {
        type: UPDATE_GAMIFICATION,
        payload: request
    };

};

export const createGamification = (request) => {
    return {
        type: CREATE_GAMIFICATION,
        payload: request
    };

};

export const deleteGamification = (request) => {
    return {
        type: DELETE_GAMIFICATION,
        payload: request
    };

};

export const resetStatus = (request) => {
    return {
        type: RESET_STATUS
    };

};

export const getGameTypes = payload => ({ type: GET_GAMIFICATION_TYPES, payload });

// export const createGamificationQuiz = (request) => {
//     return {
//         type: CREATE_GAMIFICATION_QUIZ
//     };
// };
export const createGamificationQuiz = payload => ({ type: CREATE_GAMIFICATION_QUIZ, payload });

// export const createGamificationSurvey = (request) => {
//     return {
//         type: CREATE_GAMIFICATION_SURVEY
//     };
// };
export const createGamificationSurvey = payload => ({ type: CREATE_GAMIFICATION_SURVEY, payload });

// export const createGamificationSpinner = (request) => {
//     return {
//         type: CREATE_GAMIFICATION_SPINNER
//     };
// };
export const createGamificationSpinner = payload => ({ type: CREATE_GAMIFICATION_SPINNER, payload });

export const updateGamificationQuiz = payload => ({ type: UPDATE_GAMIFICATION_QUIZ, payload });
export const updateGamificationSurvey = payload => ({ type: UPDATE_GAMIFICATION_SURVEY, payload });
export const updateGamificationSpinner = payload => ({ type: UPDATE_GAMIFICATION_SPINNER, payload });





