import { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';

import { actions, State } from 'store';


const rootUrl = 'https://px2yf2j445.execute-api.us-west-2.amazonaws.com/production';

type AppThunk = ThunkAction<void, State, null, Action<string>>

export const listSurveys = (): AppThunk => async dispatch => {
  dispatch(actions.listSurveysStart());
  try {
    const res = await fetch(`${rootUrl}/surveys`);
    const body = await res.json();
    // TODO verify with io-ts
    dispatch(actions.listSurveysSuccess(body));
  } catch (error) {
    dispatch(actions.listSurveysFailure({ error: { message: 'unknown error' }}));
  }
};

export const getSurvey = (id: number): AppThunk => async dispatch => {
  dispatch(actions.getSurveyStart({ id }));
  try {
    const res = await fetch(`${rootUrl}/surveys/${id}`);
    const body = await res.json();
    // TODO verify with io-ts
    dispatch(actions.getSurveySuccess(body));
  } catch (error) {
    dispatch(actions.getSurveyFailure({ error: { message: 'unknown error' }}));
  }
};
