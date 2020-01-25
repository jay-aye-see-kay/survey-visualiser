import * as t from 'io-ts';

const SurveyResponseCodec = t.type({
  id: t.number,
  question_id: t.number,
  respondent_id: t.number,
  response_content: t.string,
});

const QuestionCodec = t.type({
  id: t.number,
  question_id: t.number,
  respondent_id: t.number,
  description: t.string,
  question_type: t.string,
  survey_responses: t.array(SurveyResponseCodec),
});

const ThemeCodec = t.type({
  name: t.string,
  questions: t.array(QuestionCodec),
});

// expected data shape from /surveys/:id
export const GetSurveysResponseCodec = t.type({
  survey_result_detail: t.type({
    name: t.string,
    url: t.string,
    participant_count: t.number,
    response_rate: t.number,
    submitted_response_count: t.number,
    themes: t.array(ThemeCodec),
  }),
});
export type GetSurveysResponse = t.TypeOf<typeof GetSurveysResponseCodec>;

// expected data shape from /surveys
export const ListSurveysResponseCodec = t.type({
  survey_results: t.array(t.type({
    name: t.string,
    url: t.string,
    participant_count: t.number,
    response_rate: t.number,
    submitted_response_count: t.number,
  })),
});
export type ListSurveysResponse = t.TypeOf<typeof ListSurveysResponseCodec>;
