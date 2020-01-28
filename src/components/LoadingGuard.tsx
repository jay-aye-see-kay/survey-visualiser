import React from 'react';

import { Loading } from 'components/Loading';


type Props = {
  loading: boolean;
  errors?: string[];
};

export const LoadingGuard: React.FC<Props> = ({ loading, errors, children }) => {
  if (errors) {
    return (
      <div className="max-w-xl mx-auto mt-6">
        {errors.map(error => (
          <div key={error} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ))}
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};
