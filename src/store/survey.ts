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

type GetSurveySuccess = PayloadAction<{
  survey: GetSurveysResponse;
  normalizedSurvey: NormalizedSurvey;
}>;
type GetSurveyFailure = PayloadAction<string[]>;

type SurveyState = {
  loading: boolean;
  errors?: string[];
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
      state.errors = payload;
    },
  },
});

export const surveySelectors = {
  survey: (state: State) => ({ 
    survey: state.survey.data,
    normalizedSurvey: state.survey.normalizedData,
  }),
  surveyMeta: (state: State) => ({
    loading: state.survey.loading,
    errors: state.survey.errors,
  }),
};
