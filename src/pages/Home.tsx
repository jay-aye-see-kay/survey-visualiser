import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SurveyList, selectors } from 'store';
import { listSurveys } from 'store/thunks';
import { SurveyCard } from 'components/SurveyCard';
import { NavBar } from 'components/NavBar';
import { Loading } from 'components/Loading';

export const Home = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(listSurveys());
  }, [dispatch]);
  const surveys = useSelector(selectors.surveyList);
  const { loading, error } = useSelector(selectors.surveyListMeta);

  return (
    <div className="max-w-2xl mx-auto">
      <NavBar />
      {loading || !surveys
        ? <Loading />
        : <ListView surveyList={surveys.survey_results} />
      }
    </div>
  );
};

const ListView: React.FC<{ surveyList: SurveyList }> = ({ surveyList }) => {
  return (
    <>
      <h1 className="text-3xl text-center my-8">
        {surveyList.length} survey result{surveyList.length !== 1 ? 's' : ''} to view
      </h1>
      {surveyList.map(survey => (
        <SurveyCard key={survey.name} to={survey.url} {...survey} />
      ))}
    </>
  );
};
