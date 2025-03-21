import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
} from 'chart.js';
import { getProjects } from '../services/apiService';
import { Project } from '../types/Project';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard: React.FC = (): JSX.Element => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMonthYear, setSelectedMonthYear] = useState<string>('All');

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      if (data && data.length > 0) {
        setSelectedProject(data[0]);
      }
    });
  }, []);

  const totalProjects = projects.length;
  const totalBudget = projects.reduce(
    (acc, project) => acc + project.totalBudget,
    0
  );
  const avgBudget =
    totalProjects > 0 ? (totalBudget / totalProjects).toFixed(2) : '0';
  const totalPeopleAffected = projects.reduce(
    (acc, project) => acc + project.numberOfPeopleAffected,
    0
  );

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
        project.computedROI = roi.toFixed(2);
      } else {
        project.computedROI = null;
      }
    }
  });
  const avgROI = roiCount > 0 ? (roiSum / roiCount).toFixed(2) : 'N/A';

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

  const availablePeriods: string[] =
    selectedProject?.monthlyData
      ?.map((md) => {
        const date = new Date(md.year, md.month - 1);
        return `${date.toLocaleString('default', { month: 'short' })}/${md.year}`;
      })
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(
        (a, b) => new Date('1 ' + a).getTime() - new Date('1 ' + b).getTime()
      ) || [];

  let monthlyDataToDisplay = selectedProject?.monthlyData || [];
  if (selectedMonthYear !== 'All') {
    const [monthLabel, year] = selectedMonthYear.split('/');
    const monthIndex = new Date(`${monthLabel} 1, ${year}`).getMonth() + 1;
    const yearNum = parseInt(year);
    monthlyDataToDisplay = monthlyDataToDisplay.filter(
      (md) => md.month === monthIndex && md.year === yearNum
    );
  }

  const monthlyComparisonChartData: ChartData<'bar', number[], unknown> = {
    labels: monthlyDataToDisplay.map((md) => `${md.month}/${md.year}`),
    datasets: [
      {
        label: 'Expected Result',
        data: monthlyDataToDisplay.map((md) => md.expectedResult),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Obtained Result',
        data: monthlyDataToDisplay.map((md) => md.obtainedResult ?? 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const projectTypeCounts = projects.reduce(
    (acc, proj) => {
      const key = proj.methodology || 'Unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const projectTypeData = {
    labels: Object.keys(projectTypeCounts),
    datasets: [
      {
        label: 'Projects by Type',
        data: Object.values(projectTypeCounts),
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  let aboveExpected = 0,
    belowExpected = 0;
  projects.forEach((p) => {
    p.monthlyData?.forEach((md) => {
      if (md.obtainedResult !== undefined && md.obtainedResult !== null) {
        if (md.obtainedResult > md.expectedResult) aboveExpected++;
        else belowExpected++;
      }
    });
  });

  const performancePieData = {
    labels: ['Above Expected', 'Below Expected'],
    datasets: [
      {
        data: [aboveExpected, belowExpected],
        backgroundColor: ['#28a745', '#dc3545'],
      },
    ],
  };

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

      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-4">ROI per Project</h3>
        {barChartData.labels.length > 0 ? (
          <Bar
            data={barChartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { callback: (value) => value + '%' },
                },
              },
              plugins: {
                legend: { display: true, position: 'top' },
                title: { display: true, text: 'ROI per Project (%)' },
              },
            }}
          />
        ) : (
          <p>No ROI data available.</p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-4">Monthly Project Performance</h3>
        <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
          <div>
            <label className="mr-2">Select a Project:</label>
            <select
              value={selectedProject?.id || ''}
              onChange={(e) => {
                const proj = projects.find(
                  (p) => p.id === parseInt(e.target.value)
                );
                setSelectedProject(proj ?? null);
                setSelectedMonthYear('All');
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

          <div>
            <label className="mr-2">Select Month/Year:</label>
            <select
              value={selectedMonthYear}
              onChange={(e) => setSelectedMonthYear(e.target.value)}
              className="select select-bordered"
            >
              <option value="All">All</option>
              {availablePeriods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>
        </div>

        {monthlyDataToDisplay.length > 0 ? (
          <Bar
            data={monthlyComparisonChartData}
            options={{
              scales: { y: { beginAtZero: true } },
              plugins: {
                legend: { display: true, position: 'top' },
                title: {
                  display: true,
                  text: `Monthly Performance - ${selectedProject?.name}`,
                },
              },
            }}
          />
        ) : (
          <p>No monthly data available for the selected filters.</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-2xl font-bold mb-4">Projects by Methodology</h3>
          <Pie data={projectTypeData} />
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">Performance Overview</h3>
          <Pie data={performancePieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
