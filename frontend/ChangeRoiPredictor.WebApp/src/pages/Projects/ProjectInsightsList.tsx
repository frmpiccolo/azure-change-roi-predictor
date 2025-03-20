// ProjectInsightsList.tsx exemplo completo claro e organizado
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import GenericTable, { Column } from '../../components/GenericTable';
import {
  getProjectInsights,
  deleteProjectInsight,
} from '../../services/apiService';
import { ProjectInsight } from '../../types/ProjectInsight';

const ProjectInsightsList: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [insights, setInsights] = useState<ProjectInsight[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      getProjectInsights(Number(projectId)).then(setInsights);
    }
  }, [projectId]);

  const handleDelete = (insight: ProjectInsight) => {
    deleteProjectInsight(insight.id).then(() => {
      setInsights((prev) => prev.filter((i) => i.id !== insight.id));
    });
  };

  const columns: Column<ProjectInsight>[] = [
    { label: 'Description', key: 'description' },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold">Project Insights</h2>
        <Link
          to={`/projects/${projectId}/insights/new`}
          className="btn btn-primary"
        >
          New Insight
        </Link>
      </div>

      <GenericTable
        data={insights}
        columns={columns}
        onEdit={(insight) => navigate(`/insights/${insight.id}/edit`)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProjectInsightsList;
