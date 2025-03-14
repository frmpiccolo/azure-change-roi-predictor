import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Welcome to Change ROI Predictor
      </h2>
      <p className="mb-4">
        Use the sidebar to navigate through projects and view key insights.
      </p>
      {/* Example Filtering UI */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Filter Projects</h3>
        <form className="flex space-x-2">
          <input
            type="text"
            placeholder="Project name"
            className="border p-2 flex-1"
          />
          <input type="month" className="border p-2" />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>
      </div>
      {/* Example Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Project Count: 10</div>
        <div className="bg-white p-4 rounded shadow">Avg. ROI: 150%</div>
        <div className="bg-white p-4 rounded shadow">High Risk Projects: 2</div>
      </div>
    </div>
  );
};

export default Dashboard;
