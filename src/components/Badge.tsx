import React from 'react';


type Props = {
  className?: string;
};

export const Badge: React.FC<Props> = ({ children, className }) => (
  <span className={`flex-shrink-0 rounded-full bg-blue-400 uppercase px-2 py-1 text-xs text-white font-bold ${className}`}>
    {children}
  </span>
);
