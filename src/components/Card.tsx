import React from 'react';

export const Card: React.FC = ({ children }) => {
  return (
    <div className="rounded shadow-md px-4 py-6 my-2">
      {children}
    </div>
  );
};
