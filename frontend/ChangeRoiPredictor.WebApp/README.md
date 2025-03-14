# Change ROI Predictor Web Application

## Overview

The **Change ROI Predictor Web Application** is the frontend component of the Change ROI Predictor solution. Built with React and TypeScript, this application provides an intuitive user interface for inputting transformation project parameters and visualizing calculated ROI along with predictive insights. It communicates with the .NET 8 backend API to fetch data and deliver real-time, interactive dashboards that support informed decision-making.

## Architecture & Project Structure

The frontend is created using Create React App with a TypeScript template, and its structure is designed for modularity and maintainability:

```
change-roi-predictor-frontend/
├── public/
│   ├── index.html                // Main HTML file
│   └── favicon.ico               // Site icon
├── src/
│   ├── components/               // Reusable UI components
│   │   ├── FormInput.tsx         // Component for data input form
│   │   ├── Dashboard.tsx         // Component to display results and visualizations
│   │   ├── Header.tsx            // Header component (branding, navigation)
│   │   └── Footer.tsx            // Footer component (contact info, links)
│   ├── pages/                    // Page-level components
│   │   └── Home.tsx              // Main page combining form and dashboard components
│   ├── services/                 // API service modules
│   │   └── apiService.ts         // Service for API calls to the .NET 8 backend
│   ├── App.tsx                   // Root component that sets up routing and layout
│   ├── index.tsx                 // Entry point to render the React app
│   └── styles/                   // Global styles
│       └── App.css               // Global CSS styles for the project
├── package.json                  // NPM configuration and dependencies
├── tsconfig.json                 // TypeScript configuration
└── README.md                     // Project documentation
```

## Key Features

- **Interactive Data Input:**  
  Users can easily enter parameters such as project budget, number of employees impacted, and project duration.

- **Dynamic Dashboard:**  
  Displays ROI calculations, predictive insights, and risk factors through interactive charts and visualizations.

- **API Integration:**  
  Communicates seamlessly with the .NET 8 backend API to fetch ROI data and generate actionable recommendations.

- **Responsive Design:**  
  Ensures a smooth and engaging user experience across desktops, tablets, and mobile devices.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or later) and [npm](https://www.npmjs.com/)
- A modern web browser (e.g., Chrome, Firefox, or Edge)
- The backend API running locally or deployed on Azure

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/ChangeRoiPredictor.git
   cd ChangeRoiPredictor/change-roi-predictor-frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

### Running the Application Locally

Start the development server by running:

```bash
npm start
```

This command will launch the development server and open the application in your default browser at `http://localhost:3000`. The server supports hot reloading, so any changes made to the source code will automatically update in the browser.

### API Configuration

Ensure the frontend is configured to communicate with your backend API. You can adjust the API base URL in the `apiService.ts` file within the `src/services/` folder:

```typescript
const API_BASE_URL = 'https://localhost:443XX/api'; // Replace with your actual backend URL
```

## Building for Production

To create an optimized production build, run:

```bash
npm run build
```

This will generate a production-ready build in the `build` folder. The build output is minified, and filenames include hashes to support long-term caching.

## Deployment

The production build can be deployed on Azure App Service or any static hosting provider. Follow your chosen provider's documentation to deploy the React application.

## Troubleshooting

- **Build Issues:**  
  Ensure that your `tsconfig.json` includes `"jsx": "react-jsx"` under `compilerOptions` to compile JSX/TSX files correctly.
  
- **API Connectivity:**  
  Confirm that the backend API is accessible and that the API base URL in `apiService.ts` is correctly configured.

- **Hot Reloading Not Working:**  
  If hot reloading fails, try restarting the development server using `npm start`.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests with any improvements, bug fixes, or additional features.

## License

This project is licensed under the MIT License.

## Contact

For questions or further assistance, please contact [frmpiccolo@gmail.com](mailto:frmpiccolo@gmail.com).

