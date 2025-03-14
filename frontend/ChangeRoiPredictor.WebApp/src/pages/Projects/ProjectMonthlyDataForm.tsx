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
    if (projectId) {
      loadMonthlyData();
    }
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
    setCurrentData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentData || !projectId) {
      console.error('Dados mensais ou ProjectId n�o definidos');
      return;
    }

    if (!currentData.id) {
      createMonthlyData(Number(projectId), {
        projectId: Number(projectId),
        month: currentData.month || 1,
        year: currentData.year || new Date().getFullYear(),
        monthlyBudget: currentData.monthlyBudget || 0,
        monthlyPeopleImpacted: currentData.monthlyPeopleImpacted || 0,
        expectedResult: currentData.expectedResult || 0,
        obtainedResult: currentData.obtainedResult || 0,
      })
        .then(() => {
          loadMonthlyData();
          resetForm();
        })
        .catch(console.error);
    } else {
      updateMonthlyData(Number(projectId), currentData.id, {
        projectId: Number(projectId),
        month: currentData.month || 1,
        year: currentData.year || new Date().getFullYear(),
        monthlyBudget: currentData.monthlyBudget || 0,
        monthlyPeopleImpacted: currentData.monthlyPeopleImpacted || 0,
        expectedResult: currentData.expectedResult || 0,
        obtainedResult: currentData.obtainedResult || 0,
      })
        .then(() => {
          loadMonthlyData();
          resetForm();
        })
        .catch(console.error);
    }
  };

  const editData = (data: ProjectMonthlyData) => {
    setCurrentData(data);
    setIsEditing(true);
  };

  const deleteData = (id: number) => {
    if (window.confirm('Confirm deletion?')) {
      deleteMonthlyData(Number(projectId), id)
        .then(loadMonthlyData)
        .catch(console.error);
    }
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Monthly Data</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
      >
        <div>
          <label className="block font-semibold">Month *</label>
          <input
            type="number"
            name="month"
            value={currentData.month}
            onChange={handleChange}
            className="border p-2 w-full"
            min={1}
            max={12}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Year *</label>
          <input
            type="number"
            name="year"
            value={currentData.year}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Monthly Budget *</label>
          <input
            type="number"
            name="monthlyBudget"
            value={currentData.monthlyBudget}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Monthly People Impacted</label>
          <input
            type="number"
            name="monthlyPeopleImpacted"
            value={currentData.monthlyPeopleImpacted}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Expected Result</label>
          <input
            type="number"
            name="expectedResult"
            value={currentData.expectedResult}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block font-semibold">Obtained Result</label>
          <input
            type="number"
            name="obtainedResult"
            value={currentData.obtainedResult}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {isEditing ? 'Update Monthly Data' : 'Add Monthly Data'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">Month</th>
              <th className="text-left p-2">Year</th>
              <th className="text-left p-2">Budget</th>
              <th className="text-left p-2">Impacted</th>
              <th className="text-left p-2">Expected</th>
              <th className="text-left p-2">Obtained</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((data) => (
              <tr key={data.id}>
                <td className="p-2">{data.month}</td>
                <td className="p-2">{data.year}</td>
                <td className="p-2">{data.monthlyBudget}</td>
                <td className="p-2">{data.monthlyPeopleImpacted}</td>
                <td className="p-2">{data.expectedResult}</td>
                <td className="p-2">{data.obtainedResult}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => editData(data)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteData(data.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="mt-4 bg-gray-400 text-white px-4 py-2 rounded"
        onClick={() => navigate('/projects')}
      >
        Back to Projects
      </button>
    </div>
  );
};

export default ProjectMonthlyDataForm;
