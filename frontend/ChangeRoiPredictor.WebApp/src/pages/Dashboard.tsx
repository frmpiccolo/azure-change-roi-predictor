import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { getProjects } from '../services/apiService'; // Adjust the path as needed
import { Project } from '../types/Project';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = (): JSX.Element => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMonthYear, setSelectedMonthYear] = useState<string>(''); // stores 'YYYY-MM' from input

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      if (data && data.length > 0) {
        setSelectedProject(data[0]);
      }
    });
  }, []);

  // Calculate aggregated indicators
  const totalProjects = projects.length;
  const totalBudget = projects.reduce(
    (acc, project) => acc + project.totalBudget,
    0
  );
  const avgBudget =
    totalProjects > 0 ? (totalBudget / totalProjects).toFixed(2) : 0;
  const totalPeopleAffected = projects.reduce(
    (acc, project) => acc + project.numberOfPeopleAffected,
    0
  );

  // Calculate ROI for each project that has monthly data
  let roiSum = 0;
  let roiCount = 0;
  projects.forEach((project) => {
    if (project.monthlyData && project.monthlyData.length > 0) {
      const totalMonthlyBudget = project.monthlyData.reduce(
        (sum, md) => sum + md.monthlyBudget,
        0
      );
      const totalObtainedResult = project.monthlyData.reduce(
        (sum, md) => sum + (md.obtainedResult ?? 0),
        0
      );
      if (totalMonthlyBudget > 0) {
        const roi =
          ((totalObtainedResult - totalMonthlyBudget) / totalMonthlyBudget) *
          100;
        roiSum += roi;
        roiCount++;
        // Add the calculated ROI to the project object for chart usage
        project.computedROI = roi.toFixed(2);
      } else {
        project.computedROI = null;
      }
    }
  });
  const avgROI = roiCount > 0 ? (roiSum / roiCount).toFixed(2) : 'N/A';

  // Data for the bar chart: ROI per project
  const barChartData = {
    labels: projects.filter((p) => p.computedROI != null).map((p) => p.name),
    datasets: [
      {
        label: 'ROI (%)',
        data: projects
          .filter((p) => p.computedROI != null)
          .map((p) => Number(p.computedROI)),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  // -----------------------------
  // Monthly Data (Expected vs. Obtained) - Bar Chart
  // -----------------------------
  // We'll filter the selected project's monthlyData by the chosen month/year
  // and display a bar chart comparing Expected vs. Obtained.

  // 1) Parse the month/year chosen by the user (format: "YYYY-MM").
  let filteredMonthlyData = null;
  if (selectedProject?.monthlyData && selectedMonthYear) {
    const [yearStr, monthStr] = selectedMonthYear.split('-');
    const year = parseInt(yearStr);
    const month = parseInt(monthStr);

    // 2) Find the entry that matches this month/year (assuming unique entries).
    filteredMonthlyData = selectedProject.monthlyData.find(
      (md) => md.year === year && md.month === month
    );
  }

  // 3) Build the bar chart data comparing Expected vs. Obtained.
  const monthlyComparisonChartData: ChartData<'bar', number[], unknown> = {
    labels: [],
    datasets: [],
  };

  if (filteredMonthlyData) {
    monthlyComparisonChartData.labels = [
      `${filteredMonthlyData.month}/${filteredMonthlyData.year}`,
    ];
    monthlyComparisonChartData.datasets = [
      {
        label: 'Expected Result',
        data: [filteredMonthlyData.expectedResult],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Obtained Result',
        data: [filteredMonthlyData.obtainedResult ?? 0],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ];
  }

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

        {/* Filter UI */}
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="stat shadow-xl bg-secondary text-secondary-content rounded-xl">
          <div className="stat-title">Total Projects</div>
          <div className="stat-value">{totalProjects}</div>
        </div>

        <div className="stat shadow-xl bg-accent text-accent-content rounded-xl">
          <div className="stat-title">Total People Affected</div>
          <div className="stat-value">{totalPeopleAffected}</div>
        </div>

        <div className="stat shadow-xl bg-info text-info-content rounded-xl">
          <div className="stat-title">Average Budget</div>
          <div className="stat-value">${avgBudget}</div>
        </div>

        <div className="stat shadow-xl bg-warning text-warning-content rounded-xl">
          <div className="stat-title">Average ROI</div>
          <div className="stat-value">
            {avgROI !== 'N/A' ? `${avgROI}%` : 'N/A'}
          </div>
        </div>
      </div>

      {/* ROI per Project */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-4">ROI per Project</h3>
        {projects.filter((p) => p.computedROI != null).length > 0 ? (
          <Bar
            data={barChartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function (value) {
                      return value + '%';
                    },
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'ROI per Project (%)',
                },
              },
            }}
          />
        ) : (
          <p>No ROI data available.</p>
        )}
      </div>

      {/* Monthly Project Performance - Filter by Project & Month/Year */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Monthly Project Performance</h3>

        {/* Select Project */}
        <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
          <div>
            <label className="mr-2">Select a Project:</label>
            <select
              value={selectedProject ? selectedProject.id : ''}
              onChange={(e) => {
                const proj = projects.find(
                  (p) => p.id === parseInt(e.target.value)
                );
                setSelectedProject(proj ?? null);
              }}
              className="select select-bordered"
            >
              {projects.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.name}
                </option>
              ))}
            </select>
          </div>

          {/* Select Month/Year */}
          <div>
            <label className="mr-2">Select Month/Year:</label>
            <input
              type="month"
              value={selectedMonthYear}
              onChange={(e) => setSelectedMonthYear(e.target.value)}
              className="input input-bordered"
            />
          </div>
        </div>

        {/* Bar Chart: Expected vs. Obtained for the chosen month/year */}
        {selectedProject && filteredMonthlyData ? (
          <Bar
            data={monthlyComparisonChartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
                title: {
                  display: true,
                  text: `Monthly Performance - ${selectedProject.name}`,
                },
              },
            }}
          />
        ) : (
          <p>No monthly data available for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
