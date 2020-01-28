import React from 'react';
import { Link } from 'react-router-dom';

import { format } from 'helpers';
import { Badge } from 'components/Badge';


type Props = {
  to: string;
  name: string;
  participant_count: number;
  response_rate: number;
  submitted_response_count: number;
};

export const SurveyCard: React.FC<Props> = props => {
  return (
    <Link to={props.to}>
      <div className="bg-gray-200 rounded shadow-md hover:shadow-lg smooth px-4 py-6 mt-4">
        <h3>{props.name}</h3>
        <div className="flex flex-row justify-between mt-3">
          <p><Badge>{props.participant_count}</Badge> Particpant count</p>
          <p>Response rate <Badge>{format.percent(props.response_rate)}</Badge></p>
        </div>
      </div>
    </Link>
  );
};
