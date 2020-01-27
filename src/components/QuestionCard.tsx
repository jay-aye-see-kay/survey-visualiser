import React from 'react';

import { Question } from 'store';
import { Card } from 'components/Card';
import { format, getStats } from 'helpers';


export const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  const stats = getStats(question.survey_responses);

  return (
    <Card>
      <h3>Question: {question.description}</h3>
      <p>Mean response: {format.float(stats.mean)}/5</p>
      <p>Response rate: {format.int(stats.answeredCount)}/{format.int(stats.totalCount)} ({format.percent(stats.answeredFraction)})</p>
    </Card>
  );
};
