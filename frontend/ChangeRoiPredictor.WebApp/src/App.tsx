import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProjectsList from './pages/Projects/ProjectsList';
import ProjectForm from './pages/Projects/ProjectForm';
import ProjectMonthlyDataForm from './pages/Projects/ProjectMonthlyDataForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cover bg-center">
        <div className="min-h-screen bg-base-200/90 backdrop-blur-sm flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="card bg-base-100 shadow-xl rounded-box p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<ProjectsList />} />
                <Route path="/projects/new" element={<ProjectForm />} />
                <Route path="/projects/:id/edit" element={<ProjectForm />} />
                <Route
                  path="/projects/:id/monthly-data"
                  element={<ProjectMonthlyDataForm />}
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
