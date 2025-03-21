// App.tsx revisado com rotas claras e separadas
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProjectsList from './pages/Projects/ProjectsList';
import ProjectForm from './pages/Projects/ProjectForm';
import ProjectInsightsList from './pages/Projects/ProjectInsightsList';
import ProjectInsightForm from './pages/Projects/ProjectInsightForm';
import ProjectMonthlyDataList from './pages/Projects/ProjectMonthlyDataList';
import ProjectMonthlyDataForm from './pages/Projects/ProjectMonthlyDataForm';
import MonthlyInsightsList from './pages/Projects/MonthlyInsightsList';
import MonthlyInsightForm from './pages/Projects/MonthlyInsightForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cover bg-center">
        <div className="min-h-screen bg-base-200/90 backdrop-blur-sm flex">
          <Sidebar />

          <div className="flex-1 p-6 overflow-auto">
            <div className="card bg-base-100 shadow-xl rounded-box p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />

                <Route path="/projects" element={<ProjectsList />} />
                <Route path="/projects/new" element={<ProjectForm />} />
                <Route path="/projects/:id/edit" element={<ProjectForm />} />

                <Route
                  path="/projects/:projectId/monthly-data"
                  element={<ProjectMonthlyDataList />}
                />
                <Route
                  path="/projects/:projectId/monthly-data/new"
                  element={<ProjectMonthlyDataForm />}
                />
                <Route
                  path="/monthly-data/:id/edit"
                  element={<ProjectMonthlyDataForm />}
                />

                <Route
                  path="/projects/:projectId/insights"
                  element={<ProjectInsightsList />}
                />
                <Route
                  path="/projects/:projectId/insights/new"
                  element={<ProjectInsightForm />}
                />
                <Route
                  path="/insights/:id/edit"
                  element={<ProjectInsightForm />}
                />

                <Route
                  path="/monthly-data/:monthlyDataId/insights"
                  element={<MonthlyInsightsList />}
                />
                <Route
                  path="/monthly-data/:monthlyDataId/insights/new"
                  element={<MonthlyInsightForm />}
                />
                <Route
                  path="/monthly-insights/:id/edit"
                  element={<MonthlyInsightForm />}
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
