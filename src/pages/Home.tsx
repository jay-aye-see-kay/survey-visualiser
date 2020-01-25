import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectors } from 'store';
import { listSurveys } from 'store/thunks';
import { NavBar } from 'components';

export const Home = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(listSurveys());
  }, [dispatch]);
  const surveys = useSelector(selectors.surveys);
  const { loading, error } = useSelector(selectors.surveysMeta);

  return (
    <div>
      <NavBar />
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

type Props = {
  to: string;
  name: string;
  participant_count: number;
  response_rate: number;
  submitted_response_count: number;
};
const SurveyCard = (props: Props) => {
  return (
    <Link to={props.to}>
      <div className="max-w-md rounded shadow-md hover:shadow-lg px-4 py-6 my-2">
        <h3>{props.name}</h3>
        <div>Particpation count:{props.participant_count}</div>
        <div>Response rate: {Math.round(props.response_rate*100)}</div>
      </div>
    </Link>
  );
};
