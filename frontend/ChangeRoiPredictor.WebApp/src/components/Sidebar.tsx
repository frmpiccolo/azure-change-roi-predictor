import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = (): JSX.Element => {
  return (
    <div className="sidebar">
      <ul className="menu space-y-2">
        <li>
          <Link
            to="/"
            className="rounded-lg hover:bg-primary hover:text-primary-content transition-colors duration-200"
          >
            Home
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
    </div>
  );
};

export default Sidebar;
