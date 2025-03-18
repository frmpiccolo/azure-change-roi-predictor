import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-error mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-2">Oops! Page Not Found</h2>
          <p className="mb-6">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <a href="/" className="btn btn-primary">
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
