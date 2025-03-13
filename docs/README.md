# Change ROI Predictor

## Overview

**Change ROI Predictor** is a data-driven application designed to help business leaders evaluate transformation initiatives by predicting the return on investment (ROI) and highlighting potential risks. Given that 70% of change projects fail due to factors such as project delays, wasted resources, and employee disengagement, our solution leverages AI-powered insights to support smarter decision-making.

This solution consists of two primary components:
- **Backend:** A .NET 8 Web API that handles data processing, ROI calculation, and integration with Azure AI services.
- **Frontend:** A React (TypeScript) application that provides an intuitive user interface for data input, visualization of results, and interactive dashboards.

The solution is intended to be deployed on Azure, utilizing services such as Azure App Service, Azure SQL Database, Azure Cognitive Services (or Azure Machine Learning), Azure Blob Storage, Azure Application Insights, and Azure Key Vault.

## Features

- **Input & Data Processing:**  
  - Collects key parameters such as project budget, duration, and number of employees affected.
  - Stores inputs and historical data in an Azure SQL Database for analysis.

- **ROI Calculation & Predictive Insights:**  
  - Uses a hybrid approach combining industry-standard formulas with a simple AI/ML model.
  - Provides actionable recommendations based on predictive analytics.

- **Interactive Dashboards:**  
  - Visualizes data through interactive charts and graphs.
  - Generates comprehensive reports to help business leaders understand potential financial risks and benefits.

- **Azure Integration:**  
  - Fully leverages Azure infrastructure for hosting, security, performance monitoring, and AI capabilities.

## Architecture

### Backend (.NET 8 Web API)
- **Framework:** .NET 8 (using the minimal hosting model)
- **Key Components:**
  - **Controllers:** API endpoints (e.g., `RoiController.cs`, `ProjectController.cs`, `HomeController.cs`) for receiving inputs and returning results.
  - **Models/DTOs:** Represent the domain objects (e.g., `Project`, `ProjectMonthlyData`) and Data Transfer Objects for API communication.
  - **Services:** Business logic services (e.g., `ProjectService.cs`, `ProjectMonthlyDataService.cs`) for handling operations related to projects and monthly data entries, as well as ROI calculations.
  - **Data Layer:** Entity Framework Core is used to interact with an Azure SQL Database. Migrations are managed within the `Data/Migrations` folder.
- **Deployment:** Hosted on Azure App Service.

### Frontend (React with TypeScript)
- **Framework:** React with TypeScript for enhanced type safety and maintainability.
- **Key Components:**
  - **Components:** Reusable UI components (e.g., `FormInput.tsx`, `Dashboard.tsx`, `Header.tsx`, `Footer.tsx`).
  - **Pages:** Page-level components (e.g., `Home.tsx`) that structure the application.
  - **Services:** An API service module (e.g., `apiService.ts`) to communicate with the .NET backend.
  - **Styling & Visualization:** Utilizes libraries such as Chart.js or D3.js to create interactive graphs and charts.
- **Deployment:** Hosted on Azure App Service (or as a static web app) and configured as a Node.js project for development and debugging.

## Azure Services Provisioned

The solution leverages several Azure services:
1. **Azure App Service:**  
   - Hosts both the .NET backend and the React frontend.
2. **Azure SQL Database:**  
   - Stores user inputs, ROI results, and historical data.
3. **Azure Cognitive Services / Azure Machine Learning:**  
   - Provides AI and predictive analytics capabilities.
4. **Azure Blob Storage (Optional):**  
   - Stores generated reports, logs, and additional files.
5. **Azure Application Insights:**  
   - Monitors application performance and logs.
6. **Azure Key Vault:**  
   - Secures API keys, connection strings, and other sensitive data.
7. **(Optional) Azure API Management:**  
   - Adds an extra layer of management and security for the APIs.

## Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/en/) (v14 or later) and [npm](https://www.npmjs.com/)
- [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) with the Node.js Development workload installed

### Repository Structure

```
ChangeRoiPredictor/
├── ChangeRoiPredictor.sln            // Visual Studio solution file
├── ChangeRoiPredictor.Api/            // .NET 8 Web API backend project
│   ├── Controllers/                 // API controllers (e.g., RoiController.cs, ProjectController.cs, HomeController.cs)
│   ├── Data/                        // EF Core DbContext and Migrations (e.g., ApplicationDbContext.cs, Migrations/)
│   ├── DTOs/                        // Data Transfer Objects for API communication
│   ├── Models/                      // Domain models (e.g., Project, ProjectMonthlyData)
│   ├── Services/                    // Business logic services (e.g., ProjectService.cs, ProjectMonthlyDataService.cs)
│   ├── Program.cs                   // Application entry point and configuration
│   └── appsettings.json             // Configuration file (connection strings, etc.)
└── ChangeRoiPredictor.WebApp/         // React (TypeScript) frontend project
    ├── public/                      // Public static files (e.g., index.html)
    ├── src/                         // Source code (components, pages, services, styles)
    │   ├── components/              // Reusable UI components (e.g., FormInput.tsx, Dashboard.tsx)
    │   ├── pages/                   // Page-level components (e.g., Home.tsx)
    │   ├── services/                // API service (e.g., apiService.ts)
    │   ├── App.tsx                  // Root component
    │   ├── index.tsx                // Application entry point for React
    │   └── styles/                  // Global styles (e.g., App.css)
    ├── package.json                 // NPM package configuration and dependencies
    └── tsconfig.json                // TypeScript configuration
```

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/ChangeRoiPredictor.git
   cd ChangeRoiPredictor
   ```

2. **Setup the Backend:**
   - Open the solution in Visual Studio 2022.
   - Restore NuGet packages.
   - Update the connection string in `appsettings.json` to point to your local or Azure SQL Database.
   - Build the solution to ensure all dependencies are resolved.

3. **Setup the Frontend:**
   - Navigate to the frontend directory:
     ```bash
     cd ChangeRoiPredictor.WebApp
     ```
   - Install npm dependencies:
     ```bash
     npm install
     ```

### Running the Application

#### Using Visual Studio 2022

1. **Configure Multiple Startup Projects:**
   - Open the solution in Visual Studio 2022.
   - Right-click the solution in Solution Explorer and select **Properties**.
   - Under **Common Properties > Startup Project**, choose **Multiple startup projects**.
   - Set both `ChangeRoiPredictor.Api` and `ChangeRoiPredictor.WebApp` (configured as a Node.js project) to **Start**.
   - Save the settings.

2. **Start Debugging:**
   - Press **F5** to launch both the .NET backend and the React frontend.
   - The backend will run on a port (e.g., `https://localhost:443XX`) and the frontend on `http://localhost:3000`.

#### Running Manually via CLI

1. **Run the Backend:**
   - From the repository root, run:
     ```bash
     dotnet run --project ChangeRoiPredictor.Api
     ```

2. **Run the Frontend:**
   - Open a terminal, navigate to the frontend folder:
     ```bash
     cd ChangeRoiPredictor.WebApp
     npm start
     ```
   - Your React app will open in your browser at `http://localhost:3000`.

## Deployment

- **Azure Deployment:**
  - Deploy the backend to **Azure App Service**.
  - Deploy the frontend as a static web app or via **Azure App Service**.
  - Update the connection strings and configuration settings in the Azure portal.
  - Ensure that necessary Azure services (SQL Database, Cognitive Services, etc.) are properly configured.

- **CI/CD:**
  - Consider using GitHub Actions or Azure DevOps for continuous integration and deployment.

## Troubleshooting

- **Database Migrations:**
  - Ensure that EF Core Migrations are applied. You can automatically apply migrations on startup by adding the following code in `Program.cs`:
    ```csharp
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        dbContext.Database.Migrate();
    }
    ```
- **Large File Errors:**
  - Verify that directories like `.vs/` are excluded from version control using the `.gitignore` file.
- **API Connectivity:**
  - Confirm that the frontend is configured to use the correct backend URL in the API service (in `apiService.ts`).

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for improvements, bug fixes, or additional features.

---

> ⚠ **Disclaimer**: Using Azure services incurs costs. Ensure you monitor your Azure resources and review billing details in the Azure Portal.

---

## Contact

For questions or support, please contact [your.email@example.com](mailto:your.email@example.com).
```

---

## License

This project is licensed under the [MIT License](LICENSE).

```
