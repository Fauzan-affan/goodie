import {
    SEARCH_GAMIFICATION,
    CREATE_GAMIFICATION,
    UPDATE_GAMIFICATION,
    DELETE_GAMIFICATION,
    SEARCH_GAMIFICATION_SUCCESS,
    SEARCH_GAMIFICATION_FAILED,
    FILTER_SEARCH_GAMIFICATION,
    CLEAR_FILTER_SEARCH_GAMIFICATION,
    RESET_STATUS,
    VIEW_GAMIFICATION_SUCCESS,
    VIEW_GAMIFICATION_FAILED,
    UPDATE_GAMIFICATION_SUCCESS,
    UPDATE_GAMIFICATION_FAILED,
    CREATE_GAMIFICATION_SUCCESS,
    CREATE_GAMIFICATION_FAILED,
    DELETE_GAMIFICATION_SUCCESS,
    DELETE_GAMIFICATION_FAILED,
    GET_GAMIFICATION_TYPES,
    GET_GAMIFICATION_TYPES_SUCCESS,
    GET_GAMIFICATION_TYPES_FAILED,
    CREATE_GAMIFICATION_QUIZ,
    CREATE_GAMIFICATION_QUIZ_SUCCESS,
    CREATE_GAMIFICATION_QUIZ_FAILED,
    CREATE_GAMIFICATION_SURVEY,
    CREATE_GAMIFICATION_SURVEY_SUCCESS,
    CREATE_GAMIFICATION_SURVEY_FAILED,
    CREATE_GAMIFICATION_SPINNER,
    CREATE_GAMIFICATION_SPINNER_SUCCESS,
    CREATE_GAMIFICATION_SPINNER_FAILED,
    UPDATE_GAMIFICATION_QUIZ,
    UPDATE_GAMIFICATION_QUIZ_SUCCESS,
    UPDATE_GAMIFICATION_QUIZ_FAILED,
    UPDATE_GAMIFICATION_SURVEY,
    UPDATE_GAMIFICATION_SURVEY_SUCCESS,
    UPDATE_GAMIFICATION_SURVEY_FAILED,
    UPDATE_GAMIFICATION_SPINNER,
    UPDATE_GAMIFICATION_SPINNER_SUCCESS,
    UPDATE_GAMIFICATION_SPINNER_FAILED
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listGamification: [],
    recordInfo: {
        totalRecords: 0,
        page : 0,
        nrecords : 0
    },
    filterAndSort : {
        pagination : null,
        filters : null,
        sorter : null,
        search : null
    },
    data: {
        content: [
            {
                gameId: '',
                gameName: '',
                typeId: '',
                typeName: '',
                status: '',
                statusName: ''
            }
        ],
        last: '',
        totalElements: '',
        totalPages: '',
        numberOfElements: '',
        first: '',
        sort: '',
        size: '',
        number: ''
    },
    surveyGamification : {
        userId: '',
        merchantId: '',
        typeId: '',
        name: '',
        startDate: '',
        endDate: '',
        point: '',
        surverGamificationDetailsList: [
            {
                data: {
                    question: '',
                    options: [
                        {
                            value: ''
                        },
                        {
                            value: ''
                        },
                        {
                            value: ''
                        }
                    ]
                }
            },
        ]
    },
    quizGamification : {
        userId: '',
        merchantId: '',
        typeId: '',
        name: '',
        startDate: '',
        endDate: '',
        point: '',
        quizGamificationDetailsList: [
            {
                data: {
                    question: '',
                    options: [
                        {
                            right: '',
                            value: ''
                        },
                        {
                            right: '',
                            value: ''
                        },
                        {
                            right: '',
                            value: ''
                        }
                    ]
                }
            },
        ]
    },
    spinnerGamification : {
        userId: '',
        merchantId: '',
        typeId: '',
        name: '',
        startDate: '',
        endDate: '',
        startTime1: '',
        endTime1: '',
        startTime2: '',
        endTime2: '',
        chance: '',
        spinnerGamificationDetailsList: [
            {
                data: {
                    question: '',
                    options: [
                        {
                            value: ''
                        },
                        {
                            value: ''
                        },
                        {
                            value: ''
                        }
                    ]
                }
            },
        ]
    },

    updateSuccess: false,
    updateFailed: false,
    updateData: {
        // name : '',
        // code : '',
        // merchant: ''
    },

    createSuccess: false,
    createFailed: false,
    createData: {
        // name : '',
        // code : '',
        // merchant : ''
    },

    deleteSuccess : false,
    deleteFailed: false,
    gameTypes: {
        loader: true,
        alertMessage: '',
        showMessage: false,
        data: []
    },
    createGame: {
        loader: false,
        alertMessage: '',
        showMessage: false,
        data: {}
    },
    updateGame: {
        loader: false,
        alertMessage: '',
        showMessage: false,
        data: {}
    },
    // createQuiz: {
    //     loader: false,
    //     alertMessage: '',
    //     showMessage: false,
    //     data: {}
    // },
    // createSurvey: {
    //     loader: false,
    //     alertMessage: '',
    //     showMessage: false,
    //     data: {}
    // },
    // createSpinner: {
    //     loader: false,
    //     alertMessage: '',
    //     showMessage: false,
    //     data: {}
    // },
    // updateQuiz: {
    //     loader: false,
    //     alertMessage: '',
    //     showMessage: false,
    //     data: {}
    // },
    // udpateSurvey: {
    //     loader: false,
    //     alertMessage: '',
    //     showMessage: false,
    //     data: {}
    // },
    // updateSpinner: {
    //     loader: false,
    //     alertMessage: '',
    //     showMessage: false,
    //     data: {}
    // },
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FILTER_SEARCH_GAMIFICATION: {
            return {
                ...state,
                filterAndSort: action.payload
            };
        }

        case CLEAR_FILTER_SEARCH_GAMIFICATION: {
            return {
                ...state,
                filterAndSort: {
                    pagination: null,
                    filters: null,
                    sorter: null,
                    search: null
                }
            };
        }

        case SEARCH_GAMIFICATION: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                listGamification: [],
                recordInfo: {},
            }
        }

        case CREATE_GAMIFICATION: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case UPDATE_GAMIFICATION: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case DELETE_GAMIFICATION: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case RESET_STATUS : {
            return {
                ...state,
                updateSuccess: false,
                updateFailed : false,
                updateData: {
                    gameId : '',
                    gameName : '',
                    gameType : '',
                    detail : '',
                },
                createSuccess: false,
                createFailed : false,
                createData: {
                    gameName : '',
                    gameType : '',
                    detail : '',
                },
                deleteSuccess: false,
                deleteFailed : false,
            }
        }

        // Response
        case SEARCH_GAMIFICATION_SUCCESS: {
            return {
                ...state,
                loader: false,

                // mas bayu //
                // listGamification: action.payload.data,
                // //

                // hadi //
                listGamification: action.payload.data.content,
                recordInfo: action.payload.recordInfo
                // //
            }
        }

        case SEARCH_GAMIFICATION_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_GAMIFICATION_SUCCESS: {
            // console.log(action.payload.data)
            return {
                ...state,
                loader: false,
                data: action.payload.data
            }

        }

        case VIEW_GAMIFICATION_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case UPDATE_GAMIFICATION_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                updateData: action.payload
            }
        }

        case UPDATE_GAMIFICATION_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true,
                updateData: {
                    // code : '',
                    // name : '',
                    // description : '',
                    // privileges : '',
                }
            }
        }

        case CREATE_GAMIFICATION_SUCCESS: {
            return {
                ...state,
                loader: false,
                createSuccess : true,
                createFailed : false,
                createData: action.payload
            }
        }

        case CREATE_GAMIFICATION_FAILED: {
            return {
                ...state,
                loader: false,
                createSuccess : false,
                createFailed : true,
                createData: {
                    // code : '',
                    // name : '',
                    // description : '',
                    // privileges : '',
                }
            }
        }

        case DELETE_GAMIFICATION_SUCCESS: {
            return {
                ...state,
                loader: false,
                deleteSuccess : true,
                deleteFailed: false,
                showMessage: false
            }
        }

        case DELETE_GAMIFICATION_FAILED: {
            return {
                ...state,
                loader: false,
                deleteSuccess : false,
                deleteFailed: true,
                showMessage: false,
                alertMessage: action.payload
            }
        }

        case GET_GAMIFICATION_TYPES: {
            return {
                ...state,
                gameTypes: {
                    loader: true,
                    data: [],
                    showMessage: false,
                    alertMessage: ''
                }
            }
        }

        case GET_GAMIFICATION_TYPES_SUCCESS: {
            return {
                ...state,
                gameTypes: {
                    loader: false,
                    showMessage: false,
                    alertMessage: '',
                    data: action.payload.data
                }
            }
        }

        case GET_GAMIFICATION_TYPES_FAILED: {
            return {
                ...state,
                gameTypes: {
                    loader: false,
                    showMessage: true,
                    alertMessage: action.payload.errors,
                    data: []
                }
            }
        }

        // case CREATE_GAMIFICATION_QUIZ: {
        //     return {
        //         ...state,
        //         // createGame: {
        //             loader: true,
        //             // data: {},
        //             showMessage: false,
        //             alertMessage: ''
        //         // }
        //     }
        // }

        case CREATE_GAMIFICATION_QUIZ: {
            return {
                ...state,
                createGame: {
                    loader: true,
                    data: {},
                    showMessage: false,
                    alertMessage: ''
                }
            }
        }

        // case CREATE_GAMIFICATION_QUIZ_SUCCESS: {
        //     return {
        //         ...state,
        //         loader: false,
        //         createSuccess : true,
        //         createFailed : false,
        //         createData: action.payload
        //     }
        // }
        //
        // case CREATE_GAMIFICATION_QUIZ_FAILED: {
        //     return {
        //         ...state,
        //         loader: false,
        //         createSuccess : false,
        //         createFailed : true,
        //         createData: {
        //             // code : '',
        //             // name : '',
        //             // description : '',
        //             // privileges : '',
        //         }
        //     }
        // }

        case CREATE_GAMIFICATION_QUIZ_SUCCESS: {
            return {
                ...state,
                createGame: {
                    loader: false,
                    data: action.payload,
                    showMessage: false,
                    alertMessage: ''
                }
            }
        }

        case CREATE_GAMIFICATION_QUIZ_FAILED: {
            return {
                ...state,
                createGame: {
                    loader: false,
                    data: {},
                    showMessage: false,
                    alertMessage: action.payload.errors
                }
            }
        }

        // case CREATE_GAMIFICATION_SURVEY: {
        //     return {
        //         ...state,
        //         // createGame: {
        //             loader: true,
        //             // data: {},
        //             showMessage: false,
        //             alertMessage: ''
        //         // }
        //     }
        // }

        case CREATE_GAMIFICATION_SURVEY: {
            return {
                ...state,
                createGame: {
                    loader: true,
                    data: {},
                    showMessage: false,
                    alertMessage: ''
                }
            }
        }

        // case CREATE_GAMIFICATION_SURVEY_SUCCESS: {
        //     return {
        //         ...state,
        //         loader: false,
        //         createSuccess : true,
        //         createFailed : false,
        //         createData: action.payload
        //     }
        // }
        //
        // case CREATE_GAMIFICATION_SURVEY_FAILED: {
        //     return {
        //         ...state,
        //         loader: false,
        //         createSuccess : false,
        //         createFailed : true,
        //         createData: {
        //             // code : '',
        //             // name : '',
        //             // description : '',
        //             // privileges : '',
        //         }
        //     }
        // }

        case CREATE_GAMIFICATION_SURVEY_SUCCESS: {
            return {
                ...state,
                createGame: {
                    loader: false,
                    data: action.payload,
                    showMessage: false,
                    alertMessage: ''
                }
            }
        }

        case CREATE_GAMIFICATION_SURVEY_FAILED: {
            return {
                ...state,
                createGame: {
                    loader: false,
                    data: {},
                    showMessage: false,
                    alertMessage: action.payload.errors
                }
            }
        }

        // case CREATE_GAMIFICATION_SPINNER: {
        //     return {
        //         ...state,
        //         // createGame: {
        //             loader: true,
        //             // data: {},
        //             showMessage: false,
        //             alertMessage: ''
        //         // }
        //     }
        // }

        case CREATE_GAMIFICATION_SPINNER: {
            return {
                ...state,
                createGame: {
                    loader: true,
                    data: {},
                    showMessage: false,
                    alertMessage: ''
                }
            }
        }

        // case CREATE_GAMIFICATION_SPINNER_SUCCESS: {
        //     return {
        //         ...state,
        //         loader: false,
        //         createSuccess : true,
        //         createFailed : false,
        //         createData: action.payload
        //     }
        // }
        //
        // case CREATE_GAMIFICATION_SPINNER_FAILED: {
        //     return {
        //         ...state,
        //         loader: false,
        //         createSuccess : false,
        //         createFailed : true,
        //         createData: {
        //             // code : '',
        //             // name : '',
        //             // description : '',
        //             // privileges : '',
        //         }
        //     }
        // }

        case CREATE_GAMIFICATION_SPINNER_SUCCESS: {
            return {
                ...state,
                createGame: {
                    loader: false,
                    data: action.payload,
                    showMessage: false,
                    alertMessage: ''
                }
            }
        }

        case CREATE_GAMIFICATION_SPINNER_FAILED: {
            return {
                ...state,
                createGame: {
                    loader: false,
                    data: {},
                    showMessage: false,
                    alertMessage: action.payload.errors
                }
            }
        }

        case UPDATE_GAMIFICATION_QUIZ: {
            return {
                ...state,
                updateGame: {
                    loader: true,
                    data: {},
                    showMessage: false,
                    alertMessage: ''
                }
            }
        }

        case UPDATE_GAMIFICATION_QUIZ_SUCCESS: {
            return {
                ...state,
                updateGame: {
                    loader: false,
                    data: action.payload,
                    showMessage: false,
                    alertMessage: ''
                }
            }
        }

        case UPDATE_GAMIFICATION_QUIZ_FAILED: {
            return {
                ...state,
                updateGame: {
                    loader: false,
                    data: {},
                    showMessage: false,
                    alertMessage: action.payload.errors
                }
            }
        }

        case UPDATE_GAMIFICATION_SURVEY: {
            return {
                ...state,
                updateGame: {
                    loader: true,
                    data: {},
                    showMessage: false,
                    alertMessage: ''
                }
            }
        }

        case UPDATE_GAMIFICATION_SURVEY_SUCCESS: {
            return {
                ...state,
                updateGame: {
                    loader: false,
                    data: action.payload,
                    showMessage: false,
                    alertMessage: ''
                }
            }
        }

        case UPDATE_GAMIFICATION_SURVEY_FAILED: {
            return {
                ...state,
                updateGame: {
                    loader: false,
                    data: {},
                    showMessage: false,
                    alertMessage: action.payload.errors
                }
            }
        }

        case UPDATE_GAMIFICATION_SPINNER: {
            return {
                ...state,
                updateGame: {
                    loader: true,
                    data: {},
                    showMessage: false,
                    alertMessage: ''
                }
            }
        }

        case UPDATE_GAMIFICATION_SPINNER_SUCCESS: {
            return {
                ...state,
                updateGame: {
                    loader: false,
                    data: action.payload,
                    showMessage: false,
                    alertMessage: ''
                }
            }
        }

        case UPDATE_GAMIFICATION_SPINNER_FAILED: {
            return {
                ...state,
                updateGame: {
                    loader: false,
                    data: {},
                    showMessage: false,
                    alertMessage: action.payload.errors
                }
            }
        }

        default:
            return state;
    }
}
