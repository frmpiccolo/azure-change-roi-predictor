import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getMonthlyDataByProjectId,
  createMonthlyData,
  updateMonthlyData,
  deleteMonthlyData,
} from '../../services/apiService';
import { ProjectMonthlyData } from '../../types/ProjectMonthlyData';

const ProjectMonthlyDataForm: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [monthlyData, setMonthlyData] = useState<ProjectMonthlyData[]>([]);
  const [currentData, setCurrentData] = useState<Partial<ProjectMonthlyData>>({
    month: 1,
    year: new Date().getFullYear(),
    monthlyBudget: 0,
    monthlyPeopleImpacted: 0,
    expectedResult: 0,
    obtainedResult: 0,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (projectId) loadMonthlyData();
  }, [projectId]);

  const loadMonthlyData = () => {
    getMonthlyDataByProjectId(Number(projectId))
      .then(setMonthlyData)
      .catch(console.error);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCurrentData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentData || !projectId) return;

    const action =
      isEditing && currentData.id
        ? updateMonthlyData(
            Number(projectId),
            currentData.id,
            currentData as ProjectMonthlyData
          )
        : createMonthlyData(
            Number(projectId),
            currentData as ProjectMonthlyData
          );

    action
      .then(() => {
        loadMonthlyData();
        resetForm();
      })
      .catch(console.error);
  };

  const editData = (data: ProjectMonthlyData) => {
    setCurrentData(data);
    setIsEditing(true);
  };

  const deleteData = (id: number) => {
    if (window.confirm('Confirm deletion?'))
      deleteMonthlyData(Number(projectId), id)
        .then(loadMonthlyData)
        .catch(console.error);
  };

  const resetForm = () => {
    setCurrentData({
      month: 1,
      year: new Date().getFullYear(),
      monthlyBudget: 0,
      monthlyPeopleImpacted: 0,
      expectedResult: 0,
      obtainedResult: 0,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-primary">Manage Monthly Data</h2>

      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'month',
            'year',
            'monthlyBudget',
            'monthlyPeopleImpacted',
            'expectedResult',
            'obtainedResult',
          ].map((field) => (
            <div key={field}>
              <label className="label font-semibold capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type="number"
                name={field}
                value={currentData[field as keyof ProjectMonthlyData] || ''}
                onChange={handleChange}
                className="input input-bordered w-full"
                required={['month', 'year', 'monthlyBudget'].includes(field)}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 space-x-2">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update' : 'Add'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Budget</th>
              <th>Impacted</th>
              <th>Expected</th>
              <th>Obtained</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((data) => (
              <tr key={data.id}>
                <td>{data.month}</td>
                <td>{data.year}</td>
                <td>{data.monthlyBudget}</td>
                <td>{data.monthlyPeopleImpacted}</td>
                <td>{data.expectedResult}</td>
                <td>{data.obtainedResult}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => editData(data)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => deleteData(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn btn-outline" onClick={() => navigate('/projects')}>
        Back to Projects
      </button>
    </div>
  );
};

export default ProjectMonthlyDataForm;
