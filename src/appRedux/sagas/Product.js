import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    SEARCH_PRODUCTS,
    SEARCH_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS_FAILED,
    VIEW_PRODUCT,
    VIEW_PRODUCT_SUCCESS,
    VIEW_PRODUCT_FAILED,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILED,
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILED,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILED,
    RESET_STATUS,
    BACK_TO_LOGIN,
    ADD_STOCK
} from "constants/ActionTypes";
import {
    searchProductsApi,
    viewProductApi,
    updateProductApi,
    createProductApi,
    deleteProductApi,
    addStockApi
} from "../../appRedux/api/Product";


function* fetchSearchProducts({payload}) {
    if(payload != null){
        try {
            const searchProductsData = yield call(searchProductsApi, payload);
            if (searchProductsData.data.abstractResponse.responseStatus === 'PROD102') {
                yield put({type: SEARCH_PRODUCTS_SUCCESS, payload: searchProductsData.data.product});
            } else {
                yield put({type: SEARCH_PRODUCTS_FAILED, payload: searchProductsData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: SEARCH_PRODUCTS_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: SEARCH_PRODUCTS_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* fetchViewProduct({payload}) {
    if(payload != null){
        try {
            let viewProductData = yield call(viewProductApi, payload);
            if (viewProductData.data.abstractResponse.responseStatus === 'PROD103') {
                yield put({type: VIEW_PRODUCT_SUCCESS, payload: viewProductData.data.product});
            } else {
                yield put({type: VIEW_PRODUCT_FAILED, payload: viewProductData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: VIEW_PRODUCT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: VIEW_PRODUCT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postEditProduct({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let editProductData = yield call(updateProductApi, payload);

            if (editProductData.data.abstractResponse.responseStatus === 'PROD105') {
                yield put({type: UPDATE_PRODUCT_SUCCESS, payload: editProductData.data.product});
            } else {
                yield put({type: UPDATE_PRODUCT_FAILED, payload: editProductData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_PRODUCT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_PRODUCT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postInsertProduct({payload}) {
    if(payload != null){
        try {
            yield put({type: RESET_STATUS});
            let insertProductData = yield call(createProductApi, payload);

            if (insertProductData.data.abstractResponse.responseStatus === 'PROD104') {
                yield put({type: CREATE_PRODUCT_SUCCESS, payload: insertProductData.data});
            } else {
                yield put({type: CREATE_PRODUCT_FAILED, payload: insertProductData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: CREATE_PRODUCT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: CREATE_PRODUCT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


function* postDeleteProduct({payload}) {
    if(payload != null){
        try {
            let deleteProductData = yield call(deleteProductApi, payload);

            if (deleteProductData.data.abstractResponse.responseStatus === 'PROD106') {
                let responseData = deleteProductData.data.product;
                yield put({type: DELETE_PRODUCT_SUCCESS, payload: responseData});
            } else {
                yield put({type: DELETE_PRODUCT_FAILED, payload: deleteProductData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: DELETE_PRODUCT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: DELETE_PRODUCT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}

function* postAddStock({payload}) {
    if(payload != null){
        try {
            let deleteProductData = yield call(addStockApi, payload);

            if (deleteProductData.data.abstractResponse.responseStatus === 'PROD107') {
                let responseData = deleteProductData.data.product;
                yield put({type: UPDATE_PRODUCT_SUCCESS, payload: responseData});
            } else {
                yield put({type: UPDATE_PRODUCT_FAILED, payload: deleteProductData.data.abstractResponse.responseMessage});
            }
        } catch (error) {
            if(error.response !== undefined) {
                if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                    yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
                } else {
                    yield put({
                        type: UPDATE_PRODUCT_FAILED,
                        payload: error.response.data.abstractResponse.responseMessage
                    });
                }
            }else{
                yield put({
                    type: UPDATE_PRODUCT_FAILED,
                    payload: 'Sorry, this feature is not accessible at this time.'
                });
            }
        }
    }
}


export function* searchProducts() {
    yield takeEvery(SEARCH_PRODUCTS, fetchSearchProducts);
}

export function* viewProduct(){
    yield takeEvery(VIEW_PRODUCT, fetchViewProduct);
}

export function* editProduct(){
    yield takeEvery(UPDATE_PRODUCT, postEditProduct);
}

export function* createProduct(){
    yield takeEvery(CREATE_PRODUCT, postInsertProduct);
}

export function* removeProduct(){
    yield takeEvery(DELETE_PRODUCT, postDeleteProduct);
}

export function* addStock(){
    yield takeEvery(ADD_STOCK, postAddStock);
}

// yield all
export default function* rootSaga() {
    yield all([
        fork(searchProducts),
        fork(viewProduct),
        fork(editProduct),
        fork(createProduct),
        fork(removeProduct),
        fork(addStock)
    ]);
}
