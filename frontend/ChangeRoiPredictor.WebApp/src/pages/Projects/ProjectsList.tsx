import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../services/apiService';
import { Project } from '../../types/Project';

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary">Projects</h2>
        <Link to="/projects/new" className="btn btn-primary">
          New Project
        </Link>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-primary text-white">
              <th>Name</th>
              <th>Budget</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-base-200">
                <td>{proj.name}</td>
                <td>${proj.totalBudget.toLocaleString()}</td>
                <td className="flex justify-center space-x-2">
                  <Link
                    to={`/projects/${proj.id}/edit`}
                    className="btn btn-sm btn-info"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/projects/${proj.id}/monthly-data`}
                    className="btn btn-sm btn-success"
                  >
                    Monthly Data
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Link to="/projects/new" className="btn btn-secondary">
          Create New Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectsList;
