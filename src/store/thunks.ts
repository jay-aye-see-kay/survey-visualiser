import { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { isRight } from 'fp-ts/lib/Either';

import { actions, State } from 'store';
import { NormalizedSurvey } from 'store/survey';
import { ListSurveysResponseCodec, GetSurveysResponseCodec, GetSurveysResponse } from 'codecs';


const rootUrl = 'https://px2yf2j445.execute-api.us-west-2.amazonaws.com/production';

type AppThunk = ThunkAction<void, State, null, Action<string>>

const normalizeSurvey = (surveyResponse: GetSurveysResponse): NormalizedSurvey => {
  const normalized: NormalizedSurvey = {
    responses: {},
    questions: {},
    themes: {},
  };

  for (const theme of surveyResponse.survey_result_detail.themes) {
    normalized.themes[theme.name] = { name: theme.name };

    for (const question of theme.questions) {
      const questionId =
        question.survey_responses.length &&
        question.survey_responses[0].question_id;

      normalized.questions[questionId] = {
        id: questionId,
        themeName: theme.name,
        description: question.description,
        questionType: question.question_type,
      };

      for (const response of question.survey_responses) {
        normalized.responses[response.id] = {
          id: response.id,
          questionId: response.question_id,
          respondentId: response.respondent_id,
          responseContent: response.response_content,
        };
      }
    }
  }

  return normalized;
};

export const listSurveys = (): AppThunk => async dispatch => {
  dispatch(actions.listSurveysStart());
  try {
    const res = await fetch(`${rootUrl}/surveys`);
    const body = await res.json();
    const decoded = ListSurveysResponseCodec.decode(body);
    if (isRight(decoded)) {
      dispatch(actions.listSurveysSuccess(decoded.right));
    } else {
      dispatch(actions.listSurveysFailure({ message: 'invalid response'}));
    }
  } catch (error) {
    dispatch(actions.listSurveysFailure({ message: 'unknown error'}));
  }
};

export const getSurvey = (id: number): AppThunk => async dispatch => {
  dispatch(actions.getSurveyStart());
  try {
    const res = await fetch(`${rootUrl}/surveys/${id}`);
    const body = await res.json();
    const decoded = GetSurveysResponseCodec.decode(body);
    if (isRight(decoded)) {
      dispatch(actions.getSurveySuccess({
        survey: decoded.right,
        normalizedSurvey: normalizeSurvey(decoded.right),
      }));
    } else {
      dispatch(actions.getSurveyFailure({ message: 'invalid response'}));
    }
  } catch (error) {
    dispatch(actions.getSurveyFailure({ message: 'unknown error'}));
  }
};
