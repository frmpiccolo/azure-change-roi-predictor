import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GenericTable, { Column } from '../../components/GenericTable';
import {
  getMonthlyInsights,
  deleteMonthlyInsight,
} from '../../services/apiService';
import { MonthlyInsight } from '../../types/MonthlyInsight';

const MonthlyInsightsList: React.FC = () => {
  const { monthlyDataId } = useParams<{ monthlyDataId: string }>();
  const [insights, setInsights] = useState<MonthlyInsight[]>([]);
  const navigate = useNavigate();

  const loadInsights = () => {
    if (monthlyDataId) {
      getMonthlyInsights(Number(monthlyDataId)).then(setInsights);
    }
  };

  useEffect(loadInsights, [monthlyDataId]);

  const handleDelete = (insight: MonthlyInsight) => {
    deleteMonthlyInsight(insight.id).then(loadInsights);
  };

  const columns: Column<MonthlyInsight>[] = [
    { label: 'Description', key: 'description' },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-bold">Monthly Insights</h2>
        <Link
          to={`/monthly-data/${monthlyDataId}/insights/new`}
          className="btn btn-primary"
        >
          New Monthly Insight
        </Link>
      </div>
      <GenericTable
        data={insights}
        columns={columns}
        onEdit={(insight) => navigate(`/monthly-insights/${insight.id}/edit`)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MonthlyInsightsList;
