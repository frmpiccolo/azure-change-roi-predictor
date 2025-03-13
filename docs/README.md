# Change ROI Predictor

## Overview

**Change ROI Predictor** is a data-driven application designed to help business leaders evaluate transformation initiatives by predicting the return on investment (ROI) and highlighting potential risks. Given that 70% of change projects fail due to factors like project delays, wasted resources, and employee disengagement, our solution leverages AI-powered insights to support smarter decision-making.

This solution consists of two primary components:
- **Backend:** A .NET 8 Web API that handles data processing, ROI calculation, and integration with Azure AI services.
- **Frontend:** A React (TypeScript) application that provides an intuitive user interface for data input, visualization of results, and interactive dashboards.

The solution is intended to be deployed on Azure, utilizing services such as Azure App Service, Azure SQL Database, Azure Cognitive Services (or Azure Machine Learning), Azure Blob Storage, Azure Application Insights, and Azure Key Vault.

## Features

- **Input & Data Processing:**  
  - Collects key parameters like project budget, duration, and number of employees affected.
  - Stores inputs and historical data in an Azure SQL Database for analysis.

- **ROI Calculation & Predictive Insights:**  
  - Uses a hybrid approach: a combination of industry-standard formulas and a simple AI/ML model.
  - Provides actionable recommendations based on predictive analytics.

- **Interactive Dashboards:**  
  - Visualizes data through interactive charts and graphs.
  - Generates reports that help business leaders understand potential financial risks and benefits.

- **Azure Integration:**  
  - Fully leverages Azure infrastructure for hosting, security, performance monitoring, and AI capabilities.

## Architecture

### Backend (.NET 8 Web API)
- **Framework:** .NET 8 (using the minimal hosting model)
- **Key Components:**
  - **Controllers:** API endpoints (e.g., `RoiController.cs`) for receiving input and returning ROI calculations.
  - **Models/DTOs:** Represent the domain objects (e.g., `RoiInput`, `RoiResult`) and data transfer objects.
  - **Services:** Business logic for ROI calculations (`RoiCalculationService.cs`) and integration with Azure AI services (`AiInsightService.cs`).
  - **Data Layer:** Entity Framework Core is used to interact with an Azure SQL Database.
- **Deployment:** Hosted on Azure App Service.

### Frontend (React with TypeScript)
- **Framework:** React with TypeScript for type safety and maintainability.
- **Key Components:**
  - **Components:** Reusable UI components for forms, dashboards, headers, and footers.
  - **Pages:** Page-level components (e.g., `Home.tsx`) that compose the application.
  - **Services:** API service module (`apiService.ts`) to communicate with the .NET backend.
  - **Styling & Visualization:** Uses libraries like Chart.js or D3.js to create interactive graphs and visualizations.
- **Deployment:** Also hosted on Azure App Service and managed via a Node.js project configuration for development and debugging.

## Azure Services Provisioned

The solution leverages several Azure services:
1. **Azure App Service:**  
   - Hosts both the .NET backend and the React frontend.
2. **Azure SQL Database:**  
   - Stores user inputs, ROI results, and historical data.
3. **Azure Cognitive Services / Azure Machine Learning:**  
   - Provides AI and predictive analytics capabilities.
4. **Azure Blob Storage (Optional):**  
   - Stores generated reports, logs, and other files.
5. **Azure Application Insights:**  
   - Monitors application performance and logs.
6. **Azure Key Vault:**  
   - Secures API keys, connection strings, and other secrets.
7. **(Optional) Azure API Management:**  
   - Adds an extra layer of management and security for the APIs.

## Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/)
- [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) with Node.js Development workload installed

### Repository Structure

