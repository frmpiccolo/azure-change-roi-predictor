import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GenericTable, { Column } from '../../components/GenericTable';
import {
  getMonthlyDataByProject,
  deleteMonthlyData,
} from '../../services/apiService';
import { ProjectMonthlyData } from '../../types/ProjectMonthlyData';

const ProjectMonthlyDataList: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [monthlyData, setMonthlyData] = useState<ProjectMonthlyData[]>([]);
  const navigate = useNavigate();

  const loadData = () => {
    if (projectId) {
      getMonthlyDataByProject(Number(projectId)).then(setMonthlyData);
    }
  };

  useEffect(loadData, [projectId]);

  const handleDelete = (data: ProjectMonthlyData) => {
    deleteMonthlyData(data.id).then(loadData);
  };

  const columns: Column<ProjectMonthlyData>[] = [
    { label: 'Month', key: 'month' },
    { label: 'Year', key: 'year' },
    {
      label: 'Budget',
      key: 'monthlyBudget',
      render: (d) => `$${d.monthlyBudget}`,
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold">Monthly Data</h2>
        <Link
          to={`/projects/${projectId}/monthly-data/new`}
          className="btn btn-primary"
        >
          New Monthly Data
        </Link>
      </div>
      <GenericTable
        data={monthlyData}
        columns={columns}
        onEdit={(data) => navigate(`/monthly-data/${data.id}/edit`)}
        onDelete={handleDelete}
        additionalActions={[
          {
            label: 'Insights',
            className: 'btn btn-sm btn-accent',
            action: (data) => navigate(`/monthly-data/${data.id}/insights`),
          },
        ]}
      />
    </div>
  );
};

export default ProjectMonthlyDataList;
