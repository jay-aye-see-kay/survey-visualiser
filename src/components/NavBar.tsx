import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronsLeft } from 'react-icons/fi';


type Props = {
  isHome?: boolean;
};

export const NavBar: React.FC<Props> = ({ isHome }) => {
  return (
    <div className="bg-blue-900 text-white shadow-md">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-row justify-between items-center py-4 px-2">
          <div>
            {!isHome && (
              <Link to="/" className="flex flex-row items-center grow-on-hover smooth">
                <FiChevronsLeft className="mr-2" size="24"/>Back
              </Link>
            )}
          </div>
          <h2 className="uppercase text-xl">Survey visualiser</h2>
        </div>
      </div>
    </div>
  );
};
