import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SurveyDetail, selectors } from 'store';
import { getSurvey } from 'store/thunks';
import { NavBar } from 'components/NavBar';
import { Loading } from 'components/Loading';
import { ThemeSection } from 'components/ThemeSection';
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
        ? <Loading />
        : <SurveyView surveyDetail={surveyDetail} />
      }
    </div>
  );
};

const SurveyView: React.FC<{ surveyDetail: SurveyDetail }> = ({ surveyDetail }) => {
  return (
    <div>
      <h1 className="text-3xl text-center mt-8 mb-2">Results of {surveyDetail.name}</h1>
      <p className="text-gray-600 italic text-center max-w-md mx-auto mb-8">
        A total of {surveyDetail.participant_count} participants have taken this survey, with a participation rate of {format.percent(surveyDetail.response_rate)}.
      </p>
      {surveyDetail.themes.map(theme => (
        <ThemeSection key={theme.name} theme={theme} />
      ))}
    </div>
  );
};
