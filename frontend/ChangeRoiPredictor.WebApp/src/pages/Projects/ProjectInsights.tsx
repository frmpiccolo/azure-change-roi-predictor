import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GenericTable, { Column } from '../../components/GenericTable';
import { getProjectInsights } from '../../services/apiService';

interface Insight {
  id: number;
  title: string;
  description: string;
  date: string;
}

const ProjectInsights: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    if (projectId) {
      getProjectInsights(Number(projectId)).then((res) =>
        setInsights(res.data)
      );
    }
  }, [projectId]);

  const columns: Column<Insight>[] = [
    { label: 'Title', key: 'title' },
    { label: 'Description', key: 'description' },
    {
      label: 'Date',
      key: 'date',
      render: (item) => new Date(item.date).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-4">Project Insights</h2>
      <GenericTable data={insights} columns={columns} />
    </div>
  );
};

export default ProjectInsights;
