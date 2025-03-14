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
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {id ? 'Edit Project' : 'New Project'}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <div>
          <label className="block font-semibold">Name *</label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <input
            type="text"
            name="description"
            value={project.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Duration (Months)</label>
          <input
            type="number"
            name="durationInMonths"
            value={project.durationInMonths}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={project.startDate.split('T')[0]}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">End Date</label>
          <input
            type="date"
            name="endDate"
            value={project.endDate.split('T')[0]}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Total Budget</label>
          <input
            type="number"
            name="totalBudget"
            value={project.totalBudget}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">
            Number of People Affected
          </label>
          <input
            type="number"
            name="numberOfPeopleAffected"
            value={project.numberOfPeopleAffected}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Complexity Rating (1-5)</label>
          <input
            type="number"
            name="complexityRating"
            value={project.complexityRating || ''}
            onChange={handleChange}
            className="border p-2 w-full"
            min={1}
            max={5}
          />
        </div>

        <div>
          <label className="block font-semibold">Engagement Score (1-18)</label>
          <input
            type="number"
            name="engagementScore"
            value={project.engagementScore}
            onChange={handleChange}
            className="border p-2 w-full"
            min={1}
            max={18}
          />
        </div>

        <div>
          <label className="block font-semibold">Risk Level (1-5)</label>
          <input
            type="number"
            name="riskLevel"
            value={project.riskLevel}
            onChange={handleChange}
            className="border p-2 w-full"
            min={1}
            max={5}
          />
        </div>

        <div>
          <label className="block font-semibold">Readiness Level (1-18)</label>
          <input
            type="number"
            name="readinessLevel"
            value={project.readinessLevel}
            onChange={handleChange}
            className="border p-2 w-full"
            min={1}
            max={18}
          />
        </div>

        <div>
          <label className="block font-semibold">Methodology</label>
          <select
            name="methodology"
            value={project.methodology}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Select Methodology</option>
            <option value="Agile">Agile</option>
            <option value="Waterfall">Waterfall</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
