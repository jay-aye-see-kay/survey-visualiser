import * as t from 'io-ts';


// this codec may seem overkill (c/w just using t.string) but now we can use
// parseInt without being overly defensive
const ResponseCodec = t.union([
  t.literal(''),
  t.literal('0'),
  t.literal('1'),
  t.literal('2'),
  t.literal('3'),
  t.literal('4'),
  t.literal('5'),
]);

const SurveyResponseCodec = t.type({
  id: t.number,
  question_id: t.number,
  respondent_id: t.number,
  response_content: ResponseCodec,
});

const QuestionCodec = t.type({
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
