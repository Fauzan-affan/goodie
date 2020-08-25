import { call, put, all, fork, takeLatest } from "redux-saga/effects";
import {
  GET_DEPOSIT_BALANCE_HISTORY,
  GET_DEPOSIT_BALANCE_HISTORY_SUCCESS,
  GET_DEPOSIT_BALANCE_HISTORY_FAILED,
  GET_VA_LIST,
  GET_VA_LIST_SUCCESS,
  GET_VA_LIST_FAILED,
  GET_BALANCE,
  GET_BALANCE_SUCCESS,
  GET_BALANCE_FAILED
} from "constants/ActionTypes";
import { getHistory, getVaList, getBalance } from '../api/Deposit';

function* fetchBalanceHistory({ payload }) {
  try {
    const response = yield call(getHistory, payload);
    const status = response.data.status.text || '';
    const code = response.data.status.code;

    if (code === '00') {
      yield put({
        type: GET_DEPOSIT_BALANCE_HISTORY_SUCCESS, 
        balanceHistory: response.data.trxList
      })
    } else {
      yield put({
        type: GET_DEPOSIT_BALANCE_HISTORY_FAILED,
        error: status
      })
    }
  } catch (error) {
    if (error.response) {
      yield put({
        type: GET_DEPOSIT_BALANCE_HISTORY_FAILED,
        error: error.response
      })
    } else {
      yield put({
        type: GET_DEPOSIT_BALANCE_HISTORY_FAILED,
        error: 'Sorry, this feature is not accessible at this time.'
      });
    }
  }
};

function* fetchVaList({ payload }) {
  try {
    const response = yield call(getVaList, payload);
    const status = response.data.status.text || '';
    const code = response.data.status.code;

    if (code === '00') {
      yield put({
        type: GET_VA_LIST_SUCCESS, 
        vaList: response.data.data
      })
    } else {
      yield put({
        type: GET_VA_LIST_FAILED,
        error: status
      })
    }
  } catch (error) {
    if (error.response) {
      yield put({
        type: GET_VA_LIST_FAILED,
        error: error.response
      })
    } else {
      yield put({
        type: GET_VA_LIST_FAILED,
        error: 'Sorry, this feature is not accessible at this time.'
      })
    }
  }
}

function* fetchBalance({ payload }) {
  try {
    const response = yield call(getBalance, payload);
    const status = response.data.status.text || '';
    const code = response.data.status.code;

    if (code === '00') {
      yield put({
        type: GET_BALANCE_SUCCESS, 
        balance: response.data.balance
      })
    } else {
      yield put({
        type: GET_BALANCE_FAILED,
        error: status
      })
    } 
  } catch (error) {
    if (error.response) {
      yield put({
        type: GET_BALANCE_FAILED,
        error: error.response
      })
    } else {
      yield put({
        type: GET_BALANCE_FAILED,
        error: 'Sorry, this feature is not accessible at this time.'
      })
    }
  }
}

export function* balanceHistory() {
  yield takeLatest(GET_DEPOSIT_BALANCE_HISTORY, fetchBalanceHistory);
};

export function* vaList() {
  yield takeLatest(GET_VA_LIST, fetchVaList);
}

export function* balance() {
  yield takeLatest(GET_BALANCE, fetchBalance);
}

export default function* depositSaga() {
  yield all([
      fork(balanceHistory),
      fork(vaList),
      fork(balance)
  ]);
};
