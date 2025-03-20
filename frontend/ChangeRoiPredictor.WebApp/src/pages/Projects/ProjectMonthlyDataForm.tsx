import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  createMonthlyData,
  updateMonthlyData,
} from '../../services/apiService';
import GenericForm, { FormField } from '../../components/GenericForm';
import { ProjectMonthlyData } from '../../types/ProjectMonthlyData';

const fields: FormField[] = [
  { name: 'month', type: 'number', placeholder: 'Month', required: true },
  { name: 'year', type: 'number', placeholder: 'Year', required: true },
  {
    name: 'monthlyBudget',
    type: 'number',
    placeholder: 'Budget',
    required: true,
  },
  {
    name: 'monthlyPeopleImpacted',
    type: 'number',
    placeholder: 'People Impacted',
  },
  { name: 'expectedResult', type: 'number', placeholder: 'Expected Result' },
  { name: 'obtainedResult', type: 'number', placeholder: 'Obtained Result' },
];

const ProjectMonthlyDataForm: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState<Partial<ProjectMonthlyData>>(
    {}
  );

  const handleChange = (name: string, value: any) => {
    setCurrentData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = () => {
    if (!currentData.month || !currentData.year || !currentData.monthlyBudget) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = {
      projectId: Number(projectId),
      month: currentData.month,
      year: currentData.year,
      monthlyBudget: currentData.monthlyBudget,
      monthlyPeopleImpacted: currentData.monthlyPeopleImpacted || 0,
      expectedResult: currentData.expectedResult || 0,
      obtainedResult: currentData.obtainedResult || 0,
    };

    (currentData.id
      ? updateMonthlyData(Number(projectId), currentData.id, payload)
      : createMonthlyData(Number(projectId), payload)
    )
      .then(() => navigate(`/projects/${projectId}/monthly-data`))
      .catch(console.error);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-4">
        Manage Monthly Data
      </h2>
      <GenericForm
        fields={fields}
        initialData={currentData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonLabel={currentData.id ? 'Update' : 'Add'}
      />
    </div>
  );
};

export default ProjectMonthlyDataForm;
