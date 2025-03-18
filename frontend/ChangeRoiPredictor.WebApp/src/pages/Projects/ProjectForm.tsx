import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getProjectById,
  createProject,
  updateProject,
} from '../../services/apiService';
import { Project } from '../../types/Project';

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project>({
    id: 0,
    name: '',
    description: '',
    durationInMonths: 0,
    startDate: '',
    endDate: '',
    totalBudget: 0,
    numberOfPeopleAffected: 0,
    complexityRating: undefined,
    engagementScore: undefined,
    riskLevel: undefined,
    readinessLevel: undefined,
    methodology: '',
  });

  useEffect(() => {
    if (id) {
      getProjectById(Number(id))
        .then((data) => {
          setProject({
            ...data,
            startDate: data.startDate.split('T')[0],
            endDate: data.endDate.split('T')[0],
          });
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const {
      name,
      durationInMonths,
      startDate,
      endDate,
      totalBudget,
      numberOfPeopleAffected,
    } = project;

    if (
      !name ||
      !durationInMonths ||
      !startDate ||
      !endDate ||
      !totalBudget ||
      !numberOfPeopleAffected
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = {
      ...project,
      durationInMonths: Number(project.durationInMonths),
      totalBudget: Number(project.totalBudget),
      numberOfPeopleAffected: Number(project.numberOfPeopleAffected),
    };

    if (id) {
      updateProject(Number(id), payload)
        .then(() => navigate('/projects'))
        .catch((err) => console.error(err));
    } else {
      createProject(payload)
        .then(() => navigate('/projects'))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-8">
      <h2 className="text-3xl font-bold text-primary mb-6">
        {id ? 'Edit Project' : 'New Project'}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="name"
          value={project.name}
          onChange={handleChange}
          placeholder="Name *"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="description"
          value={project.description}
          onChange={handleChange}
          placeholder="Description"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="durationInMonths"
          value={project.durationInMonths}
          onChange={handleChange}
          placeholder="Duration (Months) *"
          className="input input-bordered w-full"
          required
        />

        <input
          type="date"
          name="startDate"
          value={project.startDate}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="date"
          name="endDate"
          value={project.endDate}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="totalBudget"
          value={project.totalBudget}
          onChange={handleChange}
          placeholder="Total Budget *"
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="numberOfPeopleAffected"
          value={project.numberOfPeopleAffected}
          onChange={handleChange}
          placeholder="People Affected *"
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="complexityRating"
          value={project.complexityRating || ''}
          onChange={handleChange}
          placeholder="Complexity (1-5)"
          min={1}
          max={5}
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="engagementScore"
          value={project.engagementScore || ''}
          onChange={handleChange}
          placeholder="Engagement (1-18)"
          min={1}
          max={18}
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="riskLevel"
          value={project.riskLevel || ''}
          onChange={handleChange}
          placeholder="Risk (1-5)"
          min={1}
          max={5}
          className="input input-bordered w-full"
        />

        <select
          name="methodology"
          value={project.methodology}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Methodology</option>
          <option value="Agile">Agile</option>
          <option value="Waterfall">Waterfall</option>
        </select>

        <button
          type="submit"
          className="btn btn-primary col-span-1 md:col-span-2"
        >
          Save Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
