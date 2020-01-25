import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GetSurveysResponse } from 'codecs';
import { State } from 'store';


type Response = {
  id: number;
  questionId: number;
  respondentId: number;
  responseContent: string;
};

type Question = {
  id: number;
  themeName: string;
  description: string;
  questionType: string;
};

type Theme = {
  name: string;
};

export type NormalizedSurvey = {
  responses: Record<string, Response>;
  questions: Record<string, Question>;
  themes: Record<string, Theme>;
};

type GetSurveySuccess = PayloadAction<{ survey: GetSurveysResponse; normalizedSurvey: NormalizedSurvey }>;
type GetSurveyFailure = PayloadAction<{ message: string }>;

type SurveyState = {
  loading: boolean;
  error?: { message: string };
  data?: GetSurveysResponse;
  normalizedData?: NormalizedSurvey;
};

export const initialSurveyState: SurveyState = {
  loading: false,
};

export const surveySlice = createSlice({
  name: 'survey',
  initialState: initialSurveyState,
  reducers: {
    getSurveyStart: (state) => {
      state.loading = true;
    },
    getSurveySuccess: (state, { payload }: GetSurveySuccess) => {
      state.loading = false;
      state.data = payload.survey;
      state.normalizedData = payload.normalizedSurvey;
    },
    getSurveyFailure: (state, { payload }: GetSurveyFailure) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const surveySelectors = {
  surveys: (state: State) => state.surveyList.data,
  surveysMeta: (state: State) => ({
    loading: state.surveyList.loading,
    error: state.surveyList.error,
  }),
};
