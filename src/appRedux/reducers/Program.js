import {
    SEARCH_PROGRAMS,
    CREATE_PROGRAM,
    UPDATE_PROGRAM,
    DELETE_PROGRAM,
    SEARCH_PROGRAMS_SUCCESS,
    SEARCH_PROGRAMS_FAILED,
    FILTER_SEARCH_PROGRAMS,
    CLEAR_FILTER_SEARCH_PROGRAMS,
    RESET_STATUS,
    VIEW_PROGRAM_SUCCESS,
    VIEW_PROGRAM_FAILED,
    UPDATE_PROGRAM_SUCCESS,
    UPDATE_PROGRAM_FAILED,
    CREATE_PROGRAM_SUCCESS,
    CREATE_PROGRAM_FAILED,
    DELETE_PROGRAM_SUCCESS,
    DELETE_PROGRAM_FAILED
} from "constants/ActionTypes";

const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listPrograms: [],
    filterAndSort : {
        pagination : null,
        filters : null,
        sorter : null
    },
    program: {
        programCode:'',
        programName: '',
        expiredDate: '',
        productId: '',
        productName:'',
        isExternalProduct: -1,
        merchantProduct: '',
        amount: 0,
        fee: 0,
        tier: [],
        redeemFrequency: 0,
        pointRequired: 0,
        description: '',
        termCondition: ''
    },

    updateSuccess: false,
    updateFailed: false,
    updateData: {
        programStructureId : '',
        programStructureCode : '',
        merchant: ''
    },
    createSuccess: false,
    createFailed: false,
    createData: {
        programStructureId : '',
        programStructureCode : '',
        merchant : ''
    },
    deleteSuccess : false,
    deleteFailed: false

};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SEARCH_PROGRAMS: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case CREATE_PROGRAM: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case UPDATE_PROGRAM: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case DELETE_PROGRAM: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case FILTER_SEARCH_PROGRAMS: {
            return {
                ...state,
                filterAndSort: action.payload
            }
        }

        case CLEAR_FILTER_SEARCH_PROGRAMS: {
            return {
                ...state,
                filterAndSort: {
                    pagination : null,
                    filters : null,
                    sorter : null
                }
            }
        }

        case RESET_STATUS : {
            return {
                ...state,
                updateSuccess: false,
                updateFailed : false,
                updateData: {
                    programId : '',
                    programName : '',
                    programType : ''
                },
                createSuccess: false,
                createFailed : false,
                createData: {
                    programId : '',
                    programName : '',
                    programType : ''
                },
                deleteSuccess: false,
                deleteFailed : false,
            }
        }

        // Response
        case SEARCH_PROGRAMS_SUCCESS: {
            return {
                ...state,
                loader: false,
                listPrograms: action.payload
            }
        }

        case SEARCH_PROGRAMS_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_PROGRAM_SUCCESS: {
            return {
                ...state,
                loader: false,
                program: action.payload
            }

        }

        case VIEW_PROGRAM_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case UPDATE_PROGRAM_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                updateData: action.payload
            }
        }

        case UPDATE_PROGRAM_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                updateSuccess : false,
                updateFailed: true,
                updateData: {
                    programId : '',
                    programName : '',
                    programType : ''
                }
            }
        }

        case CREATE_PROGRAM_SUCCESS: {
            return {
                ...state,
                loader: false,
                createSuccess : true,
                createFailed : false,
                createData: action.payload
            }
        }

        case CREATE_PROGRAM_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                createSuccess : false,
                createFailed : true,
                createData: {
                    programId : '',
                    programName : '',
                    programType : ''
                }
            }
        }

        case DELETE_PROGRAM_SUCCESS: {
            return {
                ...state,
                loader: false,
                deleteSuccess : true,
                deleteFailed: false,
                showMessage: false
            }
        }

        case DELETE_PROGRAM_FAILED: {
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
