import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SurveyDetail, selectors } from 'store';
import { getSurvey } from 'store/thunks';
import { Card } from 'components/Card';
import { QuestionCard } from 'components/QuestionCard';
import { NavBar } from 'components/NavBar';
import { format } from 'helpers';

export const Survey = () => {
  const { id } = useParams<{ id?: string }>();

  const dispatch = useDispatch();
  React.useEffect(() => {
    id && dispatch(getSurvey(parseInt(id, 10)));
  }, [id, dispatch]);
  const survey = useSelector(selectors.survey);
  const surveyDetail = survey?.survey?.survey_result_detail;
  const { loading, error } = useSelector(selectors.surveyMeta);

  return (
    <div className="max-w-2xl mx-auto">
      <NavBar />
      {loading || !surveyDetail
        ? <div>loading...</div>
        : <SurveyView surveyDetail={surveyDetail} />
      }
    </div>
  );
};

const SurveyView: React.FC<{ surveyDetail: SurveyDetail }> = ({ surveyDetail }) => {
  return (
    <div>
      <h2>{surveyDetail.name}</h2>
      <p>Particpant count: {surveyDetail.participant_count}</p>
      <p>Response rate: {format.percent(surveyDetail.response_rate)}</p>
      {surveyDetail.themes.map(theme => (
        <Card key={theme.name}>
          <h3>Theme: {theme.name}</h3>
          {theme.questions.map(question => (
            <QuestionCard key={question.description} question={question} />
          ))}
        </Card>
      ))}
    </div>
  );
};

