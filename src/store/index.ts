import { combineReducers } from '@reduxjs/toolkit';

import { surveySlice, surveySelectors, initialSurveyState } from 'store/survey';
import { surveyListSlice, surveyListSelectors, initialSurveyListState } from 'store/surveyList';


export const preloadedState = {
  survey: initialSurveyState,
  surveyList: initialSurveyListState,
};
export type State = typeof preloadedState;
export type SurveyDetail = NonNullable<State['survey']['data']>['survey_result_detail'];
export type Question = SurveyDetail['themes'][number]['questions'][number];

export const reducer = combineReducers({
  survey: surveySlice.reducer,
  surveyList: surveyListSlice.reducer,
});

// export all actions and selectors together for convenience
export const actions = {
  ...surveySlice.actions,
  ...surveyListSlice.actions,
};
export type Actions = {
  [T in keyof typeof actions]: ReturnType<typeof actions[T]>;
};

export const selectors = {
  ...surveySelectors,
  ...surveyListSelectors,
};
export type Selectors = typeof selectors;
