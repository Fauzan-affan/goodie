import {
    SEARCH_DOORPRIZE,
    CREATE_DOORPRIZE,
    FILTER_SEARCH_DOORPRIZE,
    CLEAR_FILTER_SEARCH_DOORPRIZE,
    RESET_STATUS,
    SEARCH_DOORPRIZE_SUCCESS,
    SEARCH_DOORPRIZE_FAILED,
    CREATE_DOORPRIZE_SUCCESS,
    CREATE_DOORPRIZE_FAILED,
} from "constants/ActionTypes";
const INIT_STATE = {
    loader: false,
    alertMessage: '',
    showMessage: false,
    listDoorprize: [],
    filterAndSort : {
        pagination : null,
        filters : null,
        sorter : null,
        search : null
    },
    data: {
            content: [
                {
                    doorPrizeId: '',
                    period: '',
                    reward: '',
                    memberName: '',
                    phoneNumber: '',
                    email: '',
                    uploadDate: '',
                    winner: ''
                }
            ],
    },
    createSuccess: false,
    createFailed: false,
    createData: {
        doorprizeStructureId : '',
        doorprizeStructureFile : '',
        merchant : ''
    },

};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SEARCH_DOORPRIZE: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case CREATE_DOORPRIZE: {
            return {
                ...state,
                loader: true,
                showMessage: false,
                alertMessage: ''
            }
        }

        case FILTER_SEARCH_DOORPRIZE: {
            return {
                ...state,
                filterAndSort: action.payload
            }
        }

        case CLEAR_FILTER_SEARCH_DOORPRIZE: {
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
                createSuccess: false,
                createFailed : false,
                createData: {
                    doorPrizeId : '',
                    period : '',
                    reward : ''
                },
            }
        }

        // Response
        case SEARCH_DOORPRIZE_SUCCESS: {

            return {
                ...state,
                loader: false,
                listDoorprize: action.payload.data.content,
                recordInfo: action.payload.recordInfo
            }
        }

        case SEARCH_DOORPRIZE_FAILED: {

            return {
                ...state,
                loader: false,
                alertMessage: action.payload,
                showMessage: true
            }
        }

        case CREATE_DOORPRIZE_SUCCESS: {
            return {
                ...state,
                loader: false,
                createSuccess : true,
                createFailed : false,
                createData: action.payload
            }
        }

        case CREATE_DOORPRIZE_FAILED: {
            return {
                ...state,
                loader: false,
                createSuccess : false,
                createFailed : true,
                createData: {
                    doorPrizeId : '',
                    period : '',
                    reward : ''
                }
            }
        }

        default:
            return state;
    }
}
