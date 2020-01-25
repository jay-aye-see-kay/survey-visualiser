import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetSurveysResponse } from 'codecs';


type GetSurveyStart = PayloadAction<{ id: number }>;
type GetSurveySuccess = PayloadAction<GetSurveysResponse>;
type GetSurveyFailure = PayloadAction<{ error: { message: string } }>;

type SurveyState = {
  loading: boolean;
  error?: { message: string };
  data?: GetSurveysResponse
};

export const initialSurveyState: SurveyState = {
  loading: false,
};

export const surveySlice = createSlice({
  name: 'survey',
  initialState: initialSurveyState,
  reducers: {
    getSurveyStart: (state, { payload }: GetSurveyStart) => {
      state.loading = true;
    },
    getSurveySuccess: (state, { payload }: GetSurveySuccess) => {
      state.loading = false;
      state.data = payload
    },
    getSurveyFailure: (state, { payload }: GetSurveyFailure) => {
      state.loading = false;
      state.error = payload.error;
    },
  }
});

export const surveySelectors = {};
