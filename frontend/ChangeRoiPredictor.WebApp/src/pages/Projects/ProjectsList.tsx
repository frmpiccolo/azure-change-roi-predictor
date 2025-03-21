import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProjects, deleteProject } from '../../services/apiService';
import { Project } from '../../types/Project';
import GenericTable, { Column } from '../../components/GenericTable';

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const loadProjects = () => getProjects().then(setProjects);

  useEffect(() => {
    loadProjects();
  }, []);

  const columns: Column<Project>[] = [
    { label: 'Name', key: 'name' },
    {
      label: 'Budget',
      key: 'totalBudget',
      render: (p: Project) => `$${p.totalBudget.toLocaleString()}`,
    },
  ];

  const handleDelete = (proj: Project) => {
    deleteProject(proj.id).then(loadProjects);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold">Projects</h2>
        <Link to="/projects/new" className="btn btn-primary">
          New Project
        </Link>
      </div>

      <GenericTable
        data={projects}
        columns={columns}
        onEdit={(proj) => navigate(`/projects/${proj.id}/edit`)}
        onDelete={handleDelete}
        additionalActions={[
          {
            label: 'Monthly Data',
            className: 'btn btn-sm btn-secondary',
            action: (proj) => navigate(`/projects/${proj.id}/monthly-data`),
          },
          {
            label: 'Insights',
            className: 'btn btn-sm btn-accent',
            action: (proj) => navigate(`/projects/${proj.id}/insights`),
          },
        ]}
      />
    </div>
  );
};

export default ProjectsList;
