import React from 'react';

import { SurveyDetail } from 'store';
import { QuestionCard } from 'components/QuestionCard';


type Props = {
  theme: SurveyDetail['themes'][number];
};

export const ThemeSection: React.FC<Props> = ({ theme }) => {
  return (
    <div className="bg-gray-200 rounded my-4 p-4">
      <h3 className="text-xl">
        <span className="uppercase text-base text-gray-700">Theme: </span>
        {theme.name}
      </h3>
      {theme.questions.map(question => (
        <QuestionCard key={question.description} question={question} />
      ))}
    </div>
  );
};
