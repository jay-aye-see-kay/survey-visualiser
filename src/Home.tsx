import React from 'react';
import { useDispatch } from 'react-redux';

import { getSurvey, listSurveys } from 'store/thunks';

export const Home = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(listSurveys())
    dispatch(getSurvey(2))
  }, []);

  return (
    <div>
      test
    </div>
  );
}
