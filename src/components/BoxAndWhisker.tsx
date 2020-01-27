import React from 'react';

import { format } from 'helpers';

type Props = {
  max: number;
  min: number;
  median: number;
  mean: number;
  upperQuartile: number;
  lowerQuartile: number;
};

export const BoxAndWhisker: React.FC<Props> = ({ max, min, median, mean, upperQuartile, lowerQuartile }) => {
  const title = `Mean: ${format.float(mean)}
Upper Quartile: ${format.float(upperQuartile)}
Median: ${format.float(median)}
Lower Quartile: ${format.float(lowerQuartile)}`;
  return (
    <>
      <div title={title} className="h-10 relative">
        <MinToMaxLine max={max} min={min} />
        <MarkAt value={min} small />
        <MarkAt value={median} />
        <MarkAt value={max} small />
        <Box upperQuartile={upperQuartile} lowerQuartile={lowerQuartile} />
        <DotAt value={mean} />
      </div>
    </>
  );
};

const Box: React.FC<{ lowerQuartile: number; upperQuartile: number }> = ({ lowerQuartile, upperQuartile }) => {
  const lowerPercent = ((lowerQuartile - 1) / 4) * 100;
  const upperPercent = ((upperQuartile - 1) / 4) * 100;
  return (
    <div
      className="absolute border-2 border-gray-500"
      style={{
        left: `${lowerPercent}%`,
        right: `calc(${100 - upperPercent}% - 2px)`,
        top: '15%',
        bottom: '15%',
      }}
    />
  );
};

const MinToMaxLine: React.FC<{ min: number; max: number }> = ({ min, max }) => {
  const minPercent = ((min - 1) / 4) * 100;
  const maxPercent = ((max - 1) / 4) * 100;
  return (
    <div
      className="absolute border border-gray-500"
      style={{
        left: `${minPercent}%`,
        right: `${100 - maxPercent}%`,
        top: 'calc(50% - 1px)',
      }}
    />
  );
};

const MarkAt: React.FC<{ value: number; small?: boolean }> = ({ value, small }) => {
  const percentMark = ((value - 1) / 4) * 100;
  return (
    <div
      className="absolute border border-gray-500"
      style={{
        left: `${percentMark}%`,
        top: small ? '30%' : 0,
        bottom: small ? '30%' : 0,
      }}
    />
  );
};

const DotAt: React.FC<{ value: number }> = ({ value }) => {
  const percentMark = ((value - 1) / 4) * 100;
  return (
    <div
      className="rounded-full bg-blue-500"
      style={{
        width: 8,
        height: 8,
        position: 'absolute',
        left: `${percentMark}%`,
        top: 'calc(50% - 4px)',
      }}
    />
  );
};
