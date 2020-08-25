import {all, call, fork, put, takeLatest} from "redux-saga/effects";
import {
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
  UPDATE_GAMIFICATION_SPINNER_FAILED,
  BACK_TO_LOGIN
} from "constants/ActionTypes";

import {
  createQuizApi,
  updateQuizApi,
  createSurveyApi,
  updateSurveyApi,
  createSpinnerApi,
  updateSpinnerApi
} from "../../appRedux/api/Gamification";

export function* postCreateQuiz({ payload }) {
  const api = createQuizApi;
  const type = {
    SUCCESS: CREATE_GAMIFICATION_QUIZ_SUCCESS,
    FAILED: CREATE_GAMIFICATION_QUIZ_FAILED
  }

  if(payload != null){
    try {
        const gamificationData = yield call(api, payload);

        if (gamificationData.data.abstractResponse.responseStatus === 'INQ003') {
            yield put({type: type.SUCCESS, payload: gamificationData.data.data});
        } else {
            yield put({type: type.FAILED, payload: gamificationData.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        if(error.response !== undefined) {
            if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            } else {
                yield put({
                    type: type.FAILED,
                    payload: error.response.data.abstractResponse.responseMessage
                });
            }
        }else{
            yield put({
                type: type.FAILEDS,
                payload: 'Sorry, this feature is not accessible at this time.'
            });
        }
    }
  }
};

export function* postCreateSurvey({ payload }) {
  const api = createSurveyApi;
  const type = {
    SUCCESS: CREATE_GAMIFICATION_SURVEY_SUCCESS,
    FAILED: CREATE_GAMIFICATION_SURVEY_FAILED
  }

  if(payload != null){
    try {
        const gamificationData = yield call(api, payload);

        if (gamificationData.data.abstractResponse.responseStatus === 'INQ003') {
            yield put({type: type.SUCCESS, payload: gamificationData.data.data});
        } else {
            yield put({type: type.FAILED, payload: gamificationData.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        if(error.response !== undefined) {
            if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            } else {
                yield put({
                    type: type.FAILED,
                    payload: error.response.data.abstractResponse.responseMessage
                });
            }
        }else{
            yield put({
                type: type.FAILEDS,
                payload: 'Sorry, this feature is not accessible at this time.'
            });
        }
    }
  }
};

export function* postCreateSpinner({ payload }) {
  const api = createSpinnerApi;
  const type = {
    SUCCESS: CREATE_GAMIFICATION_SPINNER_SUCCESS,
    FAILED: CREATE_GAMIFICATION_SPINNER_FAILED
  }

  if(payload != null){
    try {
        const gamificationData = yield call(api, payload);

        if (gamificationData.data.abstractResponse.responseStatus === 'INQ003') {
            yield put({type: type.SUCCESS, payload: gamificationData.data.data});
        } else {
            yield put({type: type.FAILED, payload: gamificationData.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        if(error.response !== undefined) {
            if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            } else {
                yield put({
                    type: type.FAILED,
                    payload: error.response.data.abstractResponse.responseMessage
                });
            }
        }else{
            yield put({
                type: type.FAILEDS,
                payload: 'Sorry, this feature is not accessible at this time.'
            });
        }
    }
  }
};

export function* postUpdateQuiz({ payload }) {
  const api = updateQuizApi;
  const type = {
    SUCCESS: UPDATE_GAMIFICATION_QUIZ_SUCCESS,
    FAILED: UPDATE_GAMIFICATION_QUIZ_FAILED
  }

  if(payload != null){
    try {
        const gamificationData = yield call(api, payload);

        if (gamificationData.data.abstractResponse.responseStatus === 'INQ003') {
            yield put({type: type.SUCCESS, payload: gamificationData.data.data});
        } else {
            yield put({type: type.FAILED, payload: gamificationData.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        if(error.response !== undefined) {
            if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            } else {
                yield put({
                    type: type.FAILED,
                    payload: error.response.data.abstractResponse.responseMessage
                });
            }
        }else{
            yield put({
                type: type.FAILEDS,
                payload: 'Sorry, this feature is not accessible at this time.'
            });
        }
    }
  }
};

export function* postUpdateSurvey({ payload }) {
  const api = updateSurveyApi;
  const type = {
    SUCCESS: UPDATE_GAMIFICATION_SURVEY_SUCCESS,
    FAILED: UPDATE_GAMIFICATION_SURVEY_FAILED
  }

  if(payload != null){
    try {
        const gamificationData = yield call(api, payload);

        if (gamificationData.data.abstractResponse.responseStatus === 'INQ003') {
            yield put({type: type.SUCCESS, payload: gamificationData.data.data});
        } else {
            yield put({type: type.FAILED, payload: gamificationData.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        if(error.response !== undefined) {
            if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            } else {
                yield put({
                    type: type.FAILED,
                    payload: error.response.data.abstractResponse.responseMessage
                });
            }
        }else{
            yield put({
                type: type.FAILEDS,
                payload: 'Sorry, this feature is not accessible at this time.'
            });
        }
    }
  }
};

export function* postUpdateSpinner({ payload }) {
  const api = updateSpinnerApi;
  const type = {
    SUCCESS: UPDATE_GAMIFICATION_SPINNER_SUCCESS,
    FAILED: UPDATE_GAMIFICATION_SPINNER_FAILED
  }

  if(payload != null){
    try {
        const gamificationData = yield call(api, payload);

        if (gamificationData.data.abstractResponse.responseStatus === 'INQ003') {
            yield put({type: type.SUCCESS, payload: gamificationData.data.data});
        } else {
            yield put({type: type.FAILED, payload: gamificationData.data.abstractResponse.responseMessage});
        }
    } catch (error) {
        if(error.response !== undefined) {
            if (error.response.data.abstractResponse.responseStatus === 'AUTH001') {
                yield put({type: BACK_TO_LOGIN, payload: error.response.data.abstractResponse.responseMessage});
            } else {
                yield put({
                    type: type.FAILED,
                    payload: error.response.data.abstractResponse.responseMessage
                });
            }
        }else{
            yield put({
                type: type.FAILEDS,
                payload: 'Sorry, this feature is not accessible at this time.'
            });
        }
    }
  }
};

export function* createQuiz() {
  yield takeLatest(CREATE_GAMIFICATION_QUIZ, postCreateQuiz);
};

export function* createSurvey() {
  yield takeLatest(CREATE_GAMIFICATION_SURVEY, postCreateSurvey);
};

export function* createSpinner() {
  yield takeLatest(CREATE_GAMIFICATION_SPINNER, postCreateSpinner);
};

export function* updateQuiz() {
  yield takeLatest(UPDATE_GAMIFICATION_QUIZ, postUpdateQuiz);
};

export function* updateSurvey() {
  yield takeLatest(UPDATE_GAMIFICATION_SURVEY, postUpdateSurvey);
};

export function* updateSpinner() {
  yield takeLatest(UPDATE_GAMIFICATION_SPINNER, postUpdateSpinner);
};

export default function* rootSaga() {
  yield all([
    fork(createQuiz),
    fork(createSurvey),
    fork(createSpinner),
    fork(updateQuiz),
    fork(updateSurvey),
    fork(updateSpinner)
  ]);
};