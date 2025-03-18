import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="card bg-base-100 shadow-xl p-6 mb-6">
        <h2 className="text-3xl font-bold text-primary mb-4">
          🎯 Welcome to Change ROI Predictor
        </h2>
        <p className="mb-4">
          Use the sidebar to navigate through projects and view key insights.
        </p>

        <div className="divider"></div>

        {/* Filtering UI */}
        <h3 className="font-semibold mb-2">🔍 Filter Projects</h3>
        <form className="flex flex-col md:flex-row md:space-x-4">
          <input
            type="text"
            placeholder="Project Name"
            className="input input-bordered flex-1 mb-2 md:mb-0"
          />
          <input type="month" className="input input-bordered" />
          <button type="submit" className="btn btn-primary mt-2 md:mt-0">
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat shadow-xl bg-secondary text-secondary-content rounded-xl">
          <div className="stat-title">Total Projects</div>
          <div className="stat-value">15</div>
        </div>

        <div className="stat shadow-xl bg-accent text-accent-content rounded-xl">
          <div className="stat-title">High Risk Projects</div>
          <div className="stat-value">2</div>
        </div>

        <div className="stat shadow-xl bg-success text-success-content rounded-xl">
          <div className="stat-title">Avg. Budget</div>
          <div className="stat-value">$12,500</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
