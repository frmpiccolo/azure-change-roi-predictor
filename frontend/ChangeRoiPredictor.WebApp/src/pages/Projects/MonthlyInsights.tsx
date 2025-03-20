import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import GenericTable, { Column } from '../../components/GenericTable';
import { getMonthlyInsights } from '../../services/apiService';

interface MonthlyInsight {
  id: number;
  metric: string;
  value: number;
  note?: string;
}

const MonthlyInsights: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchParams] = useSearchParams();
  const [insights, setInsights] = useState<MonthlyInsight[]>([]);

  const month = Number(searchParams.get('month'));
  const year = Number(searchParams.get('year'));

  useEffect(() => {
    if (projectId && month && year) {
      getMonthlyInsights(Number(projectId), month, year).then((res) =>
        setInsights(res.data)
      );
    }
  }, [projectId, month, year]);

  const columns: Column<MonthlyInsight>[] = [
    { label: 'Metric', key: 'metric' },
    { label: 'Value', key: 'value' },
    { label: 'Note', key: 'note' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-4">
        Monthly Insights ({month}/{year})
      </h2>
      <GenericTable data={insights} columns={columns} />
    </div>
  );
};

export default MonthlyInsights;
