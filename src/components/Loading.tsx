import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';


type Props = {
  size?: string | number;
};

export const Loading: React.FC<Props> = ({ size }) => (
  <AiOutlineLoading size={size} className="spin mx-auto mt-10"/>
);

Loading.defaultProps = {
  size: 64,
};
