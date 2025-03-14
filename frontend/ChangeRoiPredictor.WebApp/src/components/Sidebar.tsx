import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Change ROI Predictor</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block py-2 hover:text-blue-600">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/projects" className="block py-2 hover:text-blue-600">
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
