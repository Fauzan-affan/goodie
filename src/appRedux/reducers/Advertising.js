import {
    SEARCH_ADVERTISING,
    CREATE_ADVERTISING,
    UPDATE_ADVERTISING,
    DELETE_ADVERTISING,
    SEARCH_ADVERTISING_SUCCESS,
    SEARCH_ADVERTISING_FAILED,
    FILTER_SEARCH_ADVERTISING,
    CLEAR_FILTER_SEARCH_ADVERTISING,
    RESET_STATUS,
    VIEW_ADVERTISING_SUCCESS,
    VIEW_ADVERTISING_FAILED,
    UPDATE_ADVERTISING_SUCCESS,
    UPDATE_ADVERTISING_FAILED,
    CREATE_ADVERTISING_SUCCESS,
    CREATE_ADVERTISING_FAILED,
    DELETE_ADVERTISING_SUCCESS,
    DELETE_ADVERTISING_FAILED
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listAdvertisings: [],
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
        startDate: '',
        endDate: '',
        priority: '',
        createdBy: '',
        createdDate: '',
        content: [
            {
                advertisingId: '',
                name: '',
                description: '',
                articleCategory: '',
                advertisingType: '',
                status: '',
                adsCategory: '',
                adsCategoryName: '',
                adsContent: '',
                image: '',
                cities: [
                    {
                        advertisingId: '',
                        cityId: '',
                        cityName: '',
                        stateProvId: ''
                    }
                ],
                startDate: '',
                endDate: '',
                priority: '',
                createdBy: '',
                createdDate: '',
                advertisingTypeName: '',
                statusName: '',
                rewardCode: '',
                rewardName: ''
            }
        ],
        cityId: []
    },
    updateSuccess: false,
    updateFailed: false,
    updateData: {
        advertisingStructureId : '',
        advertisingStructureName : '',
        merchantId: '',
        userId: '',
        cityId: '',
    },
    createSuccess: false,
    createFailed: false,
    createData: {
        advertisingStructureId : '',
        advertisingStructureName : '',
        merchantId: '',
        userId: '',
        cityId: '',
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
                listAdvertisings: [],
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
                    advertisingName: '',
                    advertisingType: '',
                    cityId: '',
                },
                createSuccess: false,
                createFailed : false,
                createData: {
                    advertisingId: '',
                    advertisingName: '',
                    advertisingType: '',
                    cityId: '',
                },
                deleteSuccess: false,
                deleteFailed : false,
            }
        }

        // Response
        case SEARCH_ADVERTISING_SUCCESS: {
            // console.log("red search advertising >> " + JSON.stringify(action.payload.data.content))
            return {
                ...state,
                loader: false,
                listAdvertisings: action.payload.data.content,
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
                    advertisingName: '',
                    advertisingType: '',
                    merchantId: '',
                    userId: '',
                    cityId: '',
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
                    advertisingName: '',
                    advertisingType: '',
                    merchantId: '',
                    userId: '',
                    cityId: '',
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
