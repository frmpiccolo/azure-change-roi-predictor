import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../services/apiService';
import { Project } from '../../types/Project';

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Link
          to="/projects/new"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          New Project
        </Link>
      </div>
      <div className="bg-white shadow rounded p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Budget</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <tr key={proj.id}>
                <td className="p-2">{proj.name}</td>
                <td className="p-2">{proj.totalBudget}</td>
                <td className="p-2 space-x-2">
                  <Link
                    to={`/projects/${proj.id}/edit`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/projects/${proj.id}/monthly-data`}
                    className="text-green-600"
                  >
                    Monthly Data
                  </Link>
                  {/* Additional actions like Delete */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsList;
