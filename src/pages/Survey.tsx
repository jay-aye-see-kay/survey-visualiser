import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectors } from 'store';
import { getSurvey } from 'store/thunks';
import { NavBar } from 'components';

export const Survey = () => {
  const { id } = useParams<{ id?: string }>();

  const dispatch = useDispatch();
  React.useEffect(() => {
    id && dispatch(getSurvey(parseInt(id, 10)));
  }, [id, dispatch]);
  const survey = useSelector(selectors.survey);
  const { loading, error } = useSelector(selectors.surveyMeta);

  return (
    <div className="max-w-2xl mx-auto"> <NavBar />
      {loading || !survey ? (
        <div>
        loading...
        </div>
      ) : <pre>{survey.survey?.survey_result_detail.name}</pre>
      }
    </div>
  );
};
