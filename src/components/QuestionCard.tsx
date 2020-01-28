import React from 'react';
import { GoQuote } from 'react-icons/go';

import { Question } from 'store';
import { format, getStats } from 'helpers';
import { Badge } from 'components/Badge';
import { BoxAndWhisker } from 'components/BoxAndWhisker';


type Props = {
  question: Question;
};

export const QuestionCard: React.FC<Props> = ({ question }) => {
  const stats = getStats(question.survey_responses);
  const responseFraction = `${format.int(stats.answeredCount)}/${format.int(stats.totalCount)}`;
  const responsePercent = format.percent(stats.answeredFraction);

  return (
    <div className="bg-white rounded shadow-md px-4 py-6 mt-4">
      <div className="flex flex-row items-center">
        <GoQuote className="text-gray-200 flex-shrink-0 -mr-6" size="64" />
        <h3 className="max-w-lg">{question.description}</h3>
      </div>

      {/* Tablet/Desktop layout */}
      <div className="sm:flex hidden flex-row justify-between mt-3 px-1">
        <p><Badge>{format.float(stats.mean)}/5</Badge> Average response</p>
        <p>
          Response rate
          <Badge className="ml-1">{responsePercent}</Badge>
          {responsePercent !== '100%' && <Badge className="ml-1">{responseFraction}</Badge>}
        </p>
      </div>

      {/* Mobile layout */}
      <div className="block sm:hidden mt-3 px-1 max-w-xs mx-auto">
        <p className="mb-3 flex items-center justify-between">
          Average response <Badge>{format.float(stats.mean)}/5
          </Badge></p>
        <p className="flex items-center justify-between">
          Response rate
          <span>
            <Badge className="ml-1">{responsePercent}</Badge>
            {responsePercent !== '100%' && <Badge className="ml-1">{responseFraction}</Badge>}
          </span>
        </p>
      </div>

      <div className="mx-2 mt-6">
        <BoxAndWhisker {...stats} />
      </div>
    </div>
  );
};
