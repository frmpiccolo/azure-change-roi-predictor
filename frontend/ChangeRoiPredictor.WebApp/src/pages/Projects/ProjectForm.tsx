import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getProjectById,
  createProject,
  updateProject,
} from '../../services/apiService';
import GenericForm, { FormField } from '../../components/GenericForm';
import { Project } from '../../types/Project';

const fields: FormField[] = [
  { name: 'name', type: 'string', placeholder: 'Name', required: true },
  { name: 'description', type: 'string', placeholder: 'Description' },
  {
    name: 'durationInMonths',
    type: 'number',
    placeholder: 'Duration (Months)',
    required: true,
  },
  { name: 'startDate', type: 'date', required: true },
  { name: 'endDate', type: 'date', required: true },
  {
    name: 'totalBudget',
    type: 'number',
    placeholder: 'Total Budget',
    required: true,
  },
  {
    name: 'numberOfPeopleAffected',
    type: 'number',
    placeholder: 'People Affected',
    required: true,
  },
  { name: 'complexityRating', type: 'number', placeholder: 'Complexity (1-5)' },
  { name: 'engagementScore', type: 'number', placeholder: 'Engagement (1-18)' },
  { name: 'riskLevel', type: 'number', placeholder: 'Risk (1-5)' },
  {
    name: 'methodology',
    type: 'select',
    options: [
      { value: '', label: 'Select' },
      { value: 'Agile', label: 'Agile' },
      { value: 'Waterfall', label: 'Waterfall' },
    ],
  },
];

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Partial<Project>>({});

  useEffect(() => {
    if (id) {
      getProjectById(Number(id)).then((data) => {
        setProject({
          ...data,
          startDate: data.startDate.split('T')[0],
          endDate: data.endDate.split('T')[0],
        });
      });
    }
  }, [id]);

  const handleChange = (name: string, value: any) => {
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      !project.name ||
      !project.startDate ||
      !project.endDate ||
      !project.durationInMonths ||
      !project.totalBudget ||
      !project.numberOfPeopleAffected
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = {
      name: project.name,
      description: project.description || '',
      startDate: project.startDate,
      endDate: project.endDate,
      durationInMonths: Number(project.durationInMonths),
      totalBudget: Number(project.totalBudget),
      numberOfPeopleAffected: Number(project.numberOfPeopleAffected),
      complexityRating: project.complexityRating,
      engagementScore: project.engagementScore,
      riskLevel: project.riskLevel,
      methodology: project.methodology,
    };

    (id ? updateProject(Number(id), payload) : createProject(payload))
      .then(() => navigate('/projects'))
      .catch(console.error);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-4">
        {id ? 'Edit Project' : 'New Project'}
      </h2>
      <GenericForm
        fields={fields}
        initialData={project}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonLabel="Save Project"
      />
    </div>
  );
};

export default ProjectForm;
