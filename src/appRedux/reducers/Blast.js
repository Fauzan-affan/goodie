import {
    SEARCH_BLAST,
    CREATE_BLAST,
    UPDATE_BLAST,
    DELETE_BLAST,
    SEARCH_BLAST_SUCCESS,
    SEARCH_BLAST_FAILED,
    FILTER_SEARCH_BLAST,
    CLEAR_FILTER_SEARCH_BLAST,
    RESET_STATUS,
    VIEW_BLAST_SUCCESS,
    VIEW_BLAST_FAILED,
    UPDATE_BLAST_SUCCESS,
    UPDATE_BLAST_FAILED,
    CREATE_BLAST_SUCCESS,
    CREATE_BLAST_FAILED,
    DELETE_BLAST_SUCCESS,
    DELETE_BLAST_FAILED,
    // SELECT_BLAST,
    // CLEAR_SELECT_BLAST
} from "constants/ActionTypes";
const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listBlast: [],
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
    messageBlast: {
        messageBlastId: '',
        sender: '',
        subject: '',
        status: '',
        content: '',
        sendDate: '',
        messageType: '',
        deliveryStatus: '',
        createdDate: '',
        createdBy: '',
        isAllMember: '',
        merchantId: '',
        member: '',
        receivers: {
            dataReceivers: [
                {
                    name: '',
                    mobileNumber: '',
                    email: '',
                    status: '',
                }
            ]
        },
    },

    selectedBlast : null,
    updateSuccess: false,
    updateFailed: false,
    updateData: {
        messageBlastStructureId : '',
        messageBlastStructureSubject : '',
        merchant: ''
    },
    createSuccess: false,
    createFailed: false,
    createData: {
        messageBlastStructureId : '',
        messageBlastStructureSubject : '',
        merchant : ''
    },
    deleteSuccess : false,
    deleteFailed: false

};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SEARCH_BLAST: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: '',
                listBlast: [],
                recordInfo: {},
            }
        }

        case CREATE_BLAST: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case UPDATE_BLAST: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case DELETE_BLAST: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case FILTER_SEARCH_BLAST: {
            return {
                ...state,
                filterAndSort: action.payload
            }
        }

        case CLEAR_FILTER_SEARCH_BLAST: {
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
                    messageBlastId : '',
                    subject : '',
                    messageType : ''
                },
                createSuccess: false,
                createFailed : false,
                createData: {
                    messageBlastId : '',
                    subject : '',
                    messageType : ''
                },
                deleteSuccess: false,
                deleteFailed : false,
            }
        }

        // Response
        case SEARCH_BLAST_SUCCESS: {
            return {
                ...state,
                loader: false,
                listBlast: action.payload.messageBlast,
                recordInfo: action.payload.recordInfo
            }
        }

        case SEARCH_BLAST_FAILED: {

            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case VIEW_BLAST_SUCCESS: {
            return {
                ...state,
                loader: false,
                messageBlast: action.payload,
                recordInfo: action.payload.receivers.recordInfo
            }

        }

        case VIEW_BLAST_FAILED: {
            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case UPDATE_BLAST_SUCCESS: {
            return {
                ...state,
                loader: false,
                updateSuccess : true,
                updateFailed: false,
                updateData: action.payload
            }
        }

        case UPDATE_BLAST_FAILED: {
            return {
                ...state,
                loader: false,
                updateSuccess : false,
                updateFailed: true,
                updateData: {
                    messageBlastId : '',
                    subject : '',
                    messageTypess : ''
                }
            }
        }

        case CREATE_BLAST_SUCCESS: {
            return {
                ...state,
                loader: false,
                createSuccess : true,
                createFailed : false,
                createData: action.payload
            }
        }

        case CREATE_BLAST_FAILED: {
            return {
                ...state,
                loader: false,
                createSuccess : false,
                createFailed : true,
                createData: {
                    messageBlastId : '',
                    subject : '',
                    messageType : ''
                }
            }
        }

        case DELETE_BLAST_SUCCESS: {
            return {
                ...state,
                loader: false,
                deleteSuccess : true,
                deleteFailed: false,
                showMessage: false
            }
        }

        case DELETE_BLAST_FAILED: {
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
