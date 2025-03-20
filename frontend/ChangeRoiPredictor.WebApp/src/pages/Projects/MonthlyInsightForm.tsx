import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GenericForm, { FormField } from '../../components/GenericForm';
import {
  createMonthlyInsight,
  getMonthlyInsightById,
  updateMonthlyInsight,
} from '../../services/apiService';

const fields: FormField[] = [
  {
    name: 'description',
    type: 'string',
    placeholder: 'Insight Description',
    required: true,
  },
];

const MonthlyInsightForm: React.FC = () => {
  const { monthlyDataId, id } = useParams<{
    monthlyDataId?: string;
    id?: string;
  }>();
  const navigate = useNavigate();
  const [insight, setInsight] = useState({
    description: '',
    projectMonthlyDataId: Number(monthlyDataId),
  });

  useEffect(() => {
    if (id) {
      getMonthlyInsightById(Number(id)).then(setInsight);
    }
  }, [id]);

  const handleChange = (name: string, value: any) => {
    setInsight((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    (id
      ? updateMonthlyInsight(Number(id), insight)
      : createMonthlyInsight(insight)
    )
      .then(() => navigate(`/monthly-data/${monthlyDataId}/insights`))
      .catch(console.error);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-4">
        {id ? 'Edit Monthly Insight' : 'New Monthly Insight'}
      </h2>
      <GenericForm
        fields={fields}
        initialData={insight}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonLabel="Save Monthly Insight"
      />
    </div>
  );
};

export default MonthlyInsightForm;
