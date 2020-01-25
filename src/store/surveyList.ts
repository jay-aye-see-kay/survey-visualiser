import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ListSurveysResponse } from 'codecs';
import { State } from 'store';


type ListSurveysSuccess = PayloadAction<ListSurveysResponse>;
type ListSurveysFailure = PayloadAction<{ message: string }>;

type SurveyListState = {
  loading: boolean;
  error?: { message: string };
  data?: ListSurveysResponse;
};

export const initialSurveyListState: SurveyListState = {
  loading: false,
};

export const surveyListSlice = createSlice({
  name: 'survey',
  initialState: initialSurveyListState,
  reducers: {
    listSurveysStart: (state) => {
      state.loading = true;
    },
    listSurveysSuccess: (state, { payload }: ListSurveysSuccess) => {
      state.loading = false;
      state.data = payload;
    },
    listSurveysFailure: (state, { payload }: ListSurveysFailure) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const surveyListSelectors = {
  surveyList: (state: State) => state.surveyList.data,
  surveyListMeta: (state: State) => ({
    loading: state.surveyList.loading,
    error: state.surveyList.error,
  }),
};
