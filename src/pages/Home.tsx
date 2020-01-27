import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectors } from 'store';
import { listSurveys } from 'store/thunks';
import { SurveyCard } from 'components/SurveyCard';
import { NavBar } from 'components/NavBar';

export const Home = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(listSurveys());
  }, [dispatch]);
  const surveys = useSelector(selectors.surveyList);
  const { loading, error } = useSelector(selectors.surveyListMeta);

  return (
    <div className="max-w-2xl mx-auto"> <NavBar />
      {loading || !surveys ? (
        <div>
        loading...
        </div>
      ) : 
        surveys.survey_results.map(survey => (
          <SurveyCard key={survey.name} to={survey.url} {...survey} />
        ))
      }
    </div>
  );
};
