import { State } from 'store';

import { isNotNullOrUndefined } from 'helpers';


type SurveyDetail = NonNullable<State['survey']['data']>['survey_result_detail'];
type Question = SurveyDetail['themes'][number]['questions'][number];

// from: https://www.jstips.co/en/javascript/array-average-and-median/
const getMean = (values: number[]) => {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum += val, 0) / values.length;
};

// from: https://www.jstips.co/en/javascript/array-average-and-median/
const getMedian = (values: number[]) => {
  const sorted = [...values].sort();
  const lowMiddle = Math.floor((sorted.length - 1) / 2);
  const highMiddle = Math.ceil((sorted.length - 1) / 2);
  return (sorted[lowMiddle] + sorted[highMiddle]) / 2;
};

export const getStats = (surveyResponses: Question['survey_responses']) => {
  const intResponses = surveyResponses.map(({ response_content }) =>
    response_content === '' ? undefined : parseInt(response_content, 10)
  );

  const answered = intResponses.filter(isNotNullOrUndefined);

  return {
    answeredFraction: intResponses.length === 0 ? 0 : answered.length / intResponses.length,
    answeredCount: answered.length,
    totalCount: intResponses.length,
    mean: getMean(answered),
    median: getMedian(answered),
    min: Math.min(...answered),
    max: Math.max(...answered),
    upperQuartile: 0, // TODO
    lowerQuartile: 0, // TODO
  };
};

// based on: https://stackoverflow.com/questions/11832914
const round = (num: number, dp = 2) => {
  const factor = 10 ** dp;
  return Math.round((num + Number.EPSILON) * factor) / factor;
};

export const format = {
  int: (num: number) => round(num, 0),
  float: (num: number, dp = 2) => round(num, dp),
  percent: (num: number, dp = 0) => round(num * 100, dp) + '%',
};
