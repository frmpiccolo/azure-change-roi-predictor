import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GenericTable, { Column } from '../../components/GenericTable';
import {
  getMonthlyInsights,
  deleteMonthlyInsight,
} from '../../services/apiService';
import { ProjectMonthlyInsight } from '../../types/ProjectMonthlyInsight';

const MonthlyInsights: React.FC = () => {
  const { monthlyDataId } = useParams<{ monthlyDataId: string }>();
  const [insights, setInsights] = useState<ProjectMonthlyInsight[]>([]);

  useEffect(() => {
    if (monthlyDataId) {
      getMonthlyInsights(Number(monthlyDataId)).then(setInsights);
    }
  }, [monthlyDataId]);

  const columns: Column<ProjectMonthlyInsight>[] = [
    { label: 'Description', key: 'description' },
  ];

  const handleDelete = (insight: ProjectMonthlyInsight) => {
    deleteMonthlyInsight(insight.id).then(() => {
      setInsights((prev) => prev.filter((i) => i.id !== insight.id));
    });
  };

  return (
    <div>
      <GenericTable data={insights} columns={columns} onDelete={handleDelete} />
    </div>
  );
};

export default MonthlyInsights;
