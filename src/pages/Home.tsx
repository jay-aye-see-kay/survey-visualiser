import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SurveyList, selectors } from 'store';
import { listSurveys } from 'store/thunks';
import { SurveyCard } from 'components/SurveyCard';
import { NavBar } from 'components/NavBar';
import { LoadingGuard } from 'components/LoadingGuard';

export const Home = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(listSurveys());
  }, [dispatch]);
  const surveys = useSelector(selectors.surveyList);
  const { loading, errors } = useSelector(selectors.surveyListMeta);

  return (
    <>
      <NavBar isHome />
      <LoadingGuard loading={loading} errors={errors}>
        {surveys?.survey_results && <ListView surveyList={surveys.survey_results} />}
      </LoadingGuard>
    </>
  );
};

const ListView: React.FC<{ surveyList: SurveyList }> = ({ surveyList }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl text-center my-8">
        {surveyList.length} survey result{surveyList.length !== 1 ? 's' : ''} to view
      </h1>
      {surveyList.map(survey => (
        <SurveyCard key={survey.name} to={survey.url} {...survey} />
      ))}
    </div>
  );
};
