import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'components/Card';


type Props = {
  to: string;
  name: string;
  participant_count: number;
  response_rate: number;
  submitted_response_count: number;
};

export const SurveyCard = (props: Props) => {
  return (
    <Link to={props.to}>
      <Card>
        <h3>{props.name}</h3>
        <div>Particpation count:{props.participant_count}</div>
        <div>Response rate: {Math.round(props.response_rate*100)}%</div>
      </Card>
    </Link>
  );
};
