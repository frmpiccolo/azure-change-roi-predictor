import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GenericTable, { Column } from '../../components/GenericTable';
import { ProjectInsight } from '../../types/ProjectInsight';
import {
  getProjectInsights,
  deleteProjectInsight,
} from '../../services/apiService';

const ProjectInsights: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [insights, setInsights] = useState<ProjectInsight[]>([]);

  useEffect(() => {
    if (projectId) getProjectInsights(Number(projectId)).then(setInsights);
  }, [projectId]);

  const columns: Column<ProjectInsight>[] = [
    { label: 'Description', key: 'description' },
  ];

  const handleDelete = (insight: ProjectInsight) => {
    deleteProjectInsight(insight.id).then(() =>
      setInsights((prev) => prev.filter((i) => i.id !== insight.id))
    );
  };

  return (
    <div>
      <GenericTable data={insights} columns={columns} onDelete={handleDelete} />
    </div>
  );
};

export default ProjectInsights;
