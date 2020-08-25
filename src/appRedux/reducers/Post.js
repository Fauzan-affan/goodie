import {
    SEARCH_POST,
    CREATE_POST,
    UPDATE_POST,
    DELETE_POST,
    SEARCH_POST_SUCCESS,
    SEARCH_POST_FAILED,
    FILTER_SEARCH_POST,
    CLEAR_FILTER_SEARCH_POST,
    RESET_STATUS,
    VIEW_POST_SUCCESS,
    VIEW_POST_FAILED,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILED,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILED,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILED
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listPost: [],
    filterAndSort : {
        pagination : null,
        filters : null,
        sorter : null,
        search : null
    },
    data: {
        advertisingId: '',
        name: '',
        description: '',
        articleCategory: '',
        advertisingType: '',
        status: '',
        adsCategory: '',
        adsContent: '',
        image: '',
        cities: [
            {
                advertisingId: '',
                cityId: '',
                cityName: '',
                stateProvId: '',

            }
        ],
        rewardCode: '',
        rewardName: '',
        content: [
            {
                advertisingId: '',
                name: '',
                description: '',
                articleCategory: '',
                advertisingType: '',
                status: '',
                adsCategory: '',
                adsContent: '',
                image: '',
                cities: [
                    {
                        advertisingId: '',
                        cityId: '',
                        cityName: '',
                        stateProvId: '',

                    }
                ],
                startDate: '',
                endDate: '',
                priority: '',
                createdBy: '',
                createdDate: '',
                rewardCode: '',
                rewardName: '',
            }
        ],
    },
    updateSuccess: false,
    updateFailed: false,
    updateData: {
        advertisingStructureId : '',
        advertisingStructurePointValue : '',
        merchant: ''
    },
    createSuccess: false,
    createFailed: false,
    createData: {
        advertisingStructureId : '',
        advertisingStructurePointValue : '',
        merchant : ''
    },
    deleteSuccess : false,
    deleteFailed: false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FILTER_SEARCH_ADVERTISING: {
            return {
                ...state,
                filterAndSort: action.payload
            };
        }

        case CLEAR_FILTER_SEARCH_ADVERTISING: {
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

        case SEARCH_ADVERTISING: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                listAdvertising: [],
                recordInfo: {},
            }
        }

        case CREATE_ADVERTISING: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case UPDATE_ADVERTISING: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case DELETE_ADVERTISING: {
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
                    advertisingId: '',
                    name: '',
                    description: '',
                    articleCategory: '',
                    advertisingType: '',
                    status: '',
                    adsCategory: '',
                    adsContent: '',
                    image: '',
                    cities: '',
                },
                createSuccess: false,
                createFailed : false,
                createData: {
                    advertisingId: '',
                    name: '',
                    description: '',
                    articleCategory: '',
                    advertisingType: '',
                    status: '',
                    adsCategory: '',
                    adsContent: '',
                    image: '',
                    cities: '',
                },
                deleteSuccess: false,
                deleteFailed : false,
            }
        }

        // Response
        case SEARCH_ADVERTISING_SUCCESS: {
            return {
                ...state,
                loader: false,
                listAdvertising: action.payload.data.content,
                recordInfo: action.payload.recordInfo
            }
        }

        case SEARCH_ADVERTISING_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_ADVERTISING_SUCCESS: {
            return {
                ...state,
                loader: false,
                data: action.payload.data
            }

        }

        case VIEW_ADVERTISING_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case UPDATE_ADVERTISING_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                updateData: action.payload
            }
        }

        case UPDATE_ADVERTISING_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true,
                updateData: {
                    advertisingId: '',
                    name: '',
                    description: '',
                    articleCategory: '',
                    advertisingType: '',
                    status: '',
                    adsCategory: '',
                    adsContent: '',
                    image: '',
                    cities: '',
                }
            }
        }

        case CREATE_ADVERTISING_SUCCESS: {
            return {
                ...state,
                loader: false,
                createSuccess : true,
                createFailed : false,
                createData: action.payload
            }
        }

        case CREATE_ADVERTISING_FAILED: {
            return {
                ...state,
                loader: false,
                createSuccess : false,
                createFailed : true,
                createData: {
                    advertisingId: '',
                    name: '',
                    description: '',
                    articleCategory: '',
                    advertisingType: '',
                    status: '',
                    adsCategory: '',
                    adsContent: '',
                    image: '',
                    cities: '',
                }
            }
        }

        case DELETE_ADVERTISING_SUCCESS: {
            return {
                ...state,
                loader: false,
                deleteSuccess : true,
                deleteFailed: false,
                showMessage: false
            }
        }

        case DELETE_ADVERTISING_FAILED: {
            return {
                ...state,
                loader: false,
                deleteSuccess : false,
                deleteFailed: true,
                showMessage: false,
                alertMessage: action.payload
            }
        }

        default:
            return state;
    }
}
