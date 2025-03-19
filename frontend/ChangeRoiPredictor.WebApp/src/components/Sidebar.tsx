import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-base-200 shadow-xl rounded-tr-3xl rounded-br-3xl">
      <div className="p-6 border-b border-base-300 text-center">
        <h1 className="text-2xl font-bold text-primary">
          Change ROI Predictor
        </h1>
      </div>
      <nav className="p-4">
        <ul className="menu space-y-2">
          <li>
            <Link
              to="/"
              className="rounded-lg hover:bg-primary hover:text-primary-content transition-colors duration-200"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="rounded-lg hover:bg-primary hover:text-primary-content transition-colors duration-200"
            >
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
