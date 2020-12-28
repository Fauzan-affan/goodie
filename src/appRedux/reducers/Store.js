import {
    SEARCH_STORE,
    SEARCH_STORE_SUCCESS,
    SEARCH_STORE_FAILED,
    FILTER_SEARCH_STORE,
    CLEAR_FILTER_SEARCH_STORE,
    RESET_STATUS,
    VIEW_STORE_SUCCESS,
    VIEW_STORE_FAILED,
    CREATE_STORE,
    CREATE_STORE_SUCCESS,
    CREATE_STORE_FAILED,
    UPDATE_STORE,
    UPDATE_STORE_SUCCESS,
    UPDATE_STORE_FAILED,
    DELETE_STORE,
    DELETE_STORE_SUCCESS,
    DELETE_STORE_FAILED,
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listStore: [],
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
    store : {
        merchantName : '',
        storeCode : '',
        storeName : '',
        storeLogo : '',
        storeBackground : '',
        industryType : '',
        highclass : '',
        pin : '',
        reservation : '',
        status : '',
        isStoreCollaboration : '',
        address : {
            addressLine1: '',
            addressLine2: '',
            addressLine3: '',
            country: '',
            provinceId: '',
            province: '',
            cityId: '',
            cityTown: '',
            latitude: '',
            longitude: '',
            postalCode: ''
        },
        contact : [
            {
                contactFirstName: '',
                contactLastName: '',
                position: '',
                department: '',
                mobileNumber: '',
                emailAddress: '',
                workNumber: '',
            }
        ]
    },
    updateSuccess: false,
    updateFailed: false,
    updateData: {
        storeId : '',
        storeName : '',
        storeCode: ''
    },
    createSuccess: false,
    createFailed: false,
    createData: {
        storeId : '',
        storeName : '',
        storeCode: ''
    },
    deleteSuccess : false,
    deleteFailed: false

};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SEARCH_STORE: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                listStore: [],
                recordInfo: {}
            }
        }

        case CREATE_STORE: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case UPDATE_STORE: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case DELETE_STORE: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case FILTER_SEARCH_STORE: {
            return {
                ...state,
                filterAndSort: action.payload
            }
        }

        case CLEAR_FILTER_SEARCH_STORE: {
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
                    storeId : '',
                    storeName : '',
                    storeCode: ''
                },
                createSuccess: false,
                createFailed : false,
                createData: {
                    storeId : '',
                    storeName : '',
                    storeCode: ''
                },
                deleteSuccess: false,
                deleteFailed : false,
            }
        }

        // Response
        case SEARCH_STORE_SUCCESS: {
            return {
                ...state,
                loader: false,
                listStore: action.payload.stores,
                recordInfo: action.payload.recordInfo
            }
        }

        case SEARCH_STORE_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_STORE_SUCCESS: {
            return {
                ...state,
                loader: false,
                store: action.payload.store
            }

        }

        case VIEW_STORE_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case UPDATE_STORE_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                updateData: action.payload,
            }
        }

        case UPDATE_STORE_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                alertMessage: action.payload,
                updateFailed: true,
                updateData: {
                    storeId : '',
                    storeName : '',
                    storeCode: ''
                }
            }
        }

        case CREATE_STORE_SUCCESS: {
            console.log(action.payload,'reducer success')
            return {
                ...state,
                loader: false,
                createSuccess : true,
                createFailed : false,
                createData: action.payload
            }
        }

        case CREATE_STORE_FAILED: {
            console.log(action.payload,'reducer failed')
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                createSuccess : false,
                createFailed : true,
                createData: {
                    storeId : '',
                    storeName : '',
                    storeCode: ''
                }
            }
        }

        case DELETE_STORE_SUCCESS: {
            return {
                ...state,
                loader: false,
                deleteSuccess : true,
                deleteFailed: false,
                showMessage: false
            }
        }

        case DELETE_STORE_FAILED: {
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