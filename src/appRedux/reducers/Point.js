import {
    SEARCH_POINT,
    CREATE_POINT,
    UPDATE_POINT,
    DELETE_POINT,
    SEARCH_POINT_SUCCESS,
    SEARCH_POINT_FAILED,
    FILTER_SEARCH_POINT,
    CLEAR_FILTER_SEARCH_POINT,
    RESET_STATUS,
    VIEW_POINT_SUCCESS,
    VIEW_POINT_FAILED,
    UPDATE_POINT_SUCCESS,
    UPDATE_POINT_FAILED,
    CREATE_POINT_SUCCESS,
    CREATE_POINT_FAILED,
    DELETE_POINT_SUCCESS,
    DELETE_POINT_FAILED,
} from "constants/ActionTypes";
const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listCurrency: [],
    listPoint: [],
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
        pointValueId: '',
        pointValue: '',
        startDate: '',
        endDate: '',
        currency: '',
        status: '',
        userId: '',
        merchantId: '',
        // currency: {
        //     lookupDtlId: '',
        //     lookupHdrId: '',
        //     lookupCode: '',
        //     lookupValue: '',
        //     description: '',
        //     icon: '',
        //     listCurrency: [{
        //         lookupDtlId: '',
        //         lookupHdrId: '',
        //         lookupCode: '',
        //         lookupValue: '',
        //         description: '',
        //         icon: '',
        //     }]
        // },
        content: [
            {
                pointValueId: '',
                pointValue: '',
                startDate: '',
                endDate: '',
                currency: '',
                status: '',
                userId: '',
                merchantId: '',
            }
        ],
    },

    currency: {
        lookupDtlId: '',
        lookupHdrId: '',
        lookupCode: '',
        lookupValue: '',
        description: '',
        icon: '',
        listCurrency: [{
            lookupDtlId: '',
            lookupHdrId: '',
            lookupCode: '',
            lookupValue: '',
            description: '',
            icon: '',
        }]
    },

    updateSuccess: false,
    updateFailed: false,
    updateData: {
        pointValueStructureId : '',
        pointValueStructurePointValue : '',
        merchant: ''
    },
    createSuccess: false,
    createFailed: false,
    createData: {
        pointValueStructureId : '',
        pointValueStructurePointValue : '',
        merchant : ''
    },
    deleteSuccess : false,
    deleteFailed: false

};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SEARCH_POINT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                listPoint: [],
                recordInfo: {},
            }
        }

        case CREATE_POINT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case UPDATE_POINT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case DELETE_POINT: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case FILTER_SEARCH_POINT: {
            return {
                ...state,
                filterAndSort: action.payload
            }
        }

        case CLEAR_FILTER_SEARCH_POINT: {
            return {
                ...state,
                filterAndSort: {
                    pagination : null,
                    filters : null,
                    sorter : null,
                    search : null
                }
            }
        }

        case RESET_STATUS : {
            return {
                ...state,
                updateSuccess: false,
                updateFailed : false,
                updateData: {
                    pointValueId : '',
                    pointValue : '',
                    currency : ''
                },
                createSuccess: false,
                createFailed : false,
                createData: {
                    pointValueId : '',
                    pointValue : '',
                    currency : ''
                },
                deleteSuccess: false,
                deleteFailed : false,
            }
        }

        // Response
        case SEARCH_POINT_SUCCESS: {

            return {
                ...state,
                loader: false,
                listPoint: action.payload.data.content,
                recordInfo: action.payload.recordInfo
            }
        }

        case SEARCH_POINT_FAILED: {

            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_POINT_SUCCESS: {
            return {
                ...state,
                loader: false,
                data: action.payload.data
            }

        }

        case VIEW_POINT_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case UPDATE_POINT_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                updateData: action.payload
            }
        }

        case UPDATE_POINT_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true,
                updateData: {
                    pointValueId : '',
                    pointValue : '',
                    currency : ''
                }
            }
        }

        case CREATE_POINT_SUCCESS: {
            return {
                ...state,
                loader: false,
                createSuccess : true,
                createFailed : false,
                createData: action.payload
            }
        }

        case CREATE_POINT_FAILED: {
            return {
                ...state,
                loader: false,
                createSuccess : false,
                createFailed : true,
                createData: {
                    pointValueId : '',
                    pointValue : '',
                    currency : ''
                }
            }
        }

        case DELETE_POINT_SUCCESS: {
            return {
                ...state,
                loader: false,
                deleteSuccess : true,
                deleteFailed: false,
                showMessage: false
            }
        }

        case DELETE_POINT_FAILED: {
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
