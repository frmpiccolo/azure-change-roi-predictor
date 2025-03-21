import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  createProjectInsight,
  getProjectInsightById,
  updateProjectInsight,
} from '../../services/apiService';
import GenericForm from '../../components/GenericForm';
import { FormField } from '../../components/GenericForm';

const fields: FormField[] = [
  {
    name: 'description',
    type: 'string',
    placeholder: 'Insight Description',
    required: true,
  },
];

const ProjectInsightForm: React.FC = () => {
  const { projectId, insightId } = useParams<{
    projectId: string;
    insightId: string;
  }>();
  const navigate = useNavigate();
  const [insight, setInsight] = useState({
    projectId: Number(projectId),
    description: '',
  });

  useEffect(() => {
    if (insightId) {
      getProjectInsightById(Number(insightId)).then((data) =>
        setInsight({ projectId: data.projectId, description: data.description })
      );
    }
  }, [insightId]);

  const handleChange = (name: string, value: any) => {
    setInsight((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const action = insightId
      ? updateProjectInsight(Number(insightId), {
          description: insight.description,
        })
      : createProjectInsight({
          projectId: insight.projectId,
          description: insight.description,
        });

    action
      .then(() => navigate(`/projects/${insight.projectId}/insights`))
      .catch(console.error);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">
        {insightId ? 'Edit Insight' : 'Add Insight'}
      </h2>
      <GenericForm
        fields={fields}
        initialData={insight}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonLabel="Save Insight"
      />
    </div>
  );
};

export default ProjectInsightForm;
