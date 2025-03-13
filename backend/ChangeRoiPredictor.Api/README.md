
# Change ROI Predictor API

## Overview

The **Change ROI Predictor API** is a .NET 8 Web API designed to handle the backend processing for our transformation ROI calculator. This API receives input parameters, calculates the return on investment (ROI) based on a combination of productivity gains, cost reductions, and risk mitigation factors, and returns predictive insights to assist business leaders in making informed decisions about their change initiatives.

## Architecture & Project Structure

The backend project follows a clean and modular architecture using the minimal hosting model available in .NET 8. Below is an overview of the project's folder and file structure:

```
ChangeRoiPredictor.Api/
├── Controllers/
│   └── RoiController.cs            // API endpoints for ROI calculations
├── Models/
│   ├── RoiInput.cs                 // Domain model for input parameters
│   └── RoiResult.cs                // Domain model for calculation results
├── DTOs/
│   ├── RoiInputDto.cs              // Data Transfer Object for receiving inputs
│   └── RoiResultDto.cs             // DTO for sending back results
├── Services/
│   ├── RoiCalculationService.cs    // Core logic for ROI calculation
│   └── AiInsightService.cs         // Integration with Azure AI/Machine Learning services
├── Data/
│   └── ApplicationDbContext.cs     // Entity Framework Core context for database operations
├── Program.cs                      // Entry point (minimal hosting model)
├── appsettings.json                // Configuration settings (e.g., connection strings, Azure service endpoints)
└── Properties/
    └── launchSettings.json         // Debug and launch settings for local development
```

## Key Components

- **Controllers:**  
  The `RoiController` handles HTTP requests and exposes endpoints for calculating ROI based on user-provided parameters.

- **Models & DTOs:**  
  - **Models:** Define the domain objects (`RoiInput` and `RoiResult`) used internally by the API.  
  - **DTOs:** Facilitate data transfer between the client and server, ensuring decoupling between internal models and external API contracts.

- **Services:**  
  - **RoiCalculationService:** Contains the core business logic for calculating ROI from input parameters.  
  - **AiInsightService:** Interfaces with Azure Cognitive Services or Azure Machine Learning to generate predictive insights and actionable recommendations.

- **Data Access:**  
  The `ApplicationDbContext` (built with Entity Framework Core) handles interactions with the Azure SQL Database, enabling persistent storage of historical data, user inputs, and calculated outcomes.

- **Configuration:**  
  The `appsettings.json` file stores application settings such as database connection strings and configuration for Azure services.  
  The `launchSettings.json` provides settings for debugging and local deployment.

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- An IDE such as [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) configured for .NET development
- Access to an Azure SQL Database (if persistence is required) and Azure services for AI integration

### Running the API Locally

1. **Restore Dependencies:**  
   Open the solution in Visual Studio 2022 and restore NuGet packages.

2. **Build the Project:**  
   Build the project to ensure all dependencies are resolved and the code compiles successfully.

3. **Run the API:**  
   Press **F5** (or use `dotnet run` from the terminal) to launch the API.  
   The API will start using the minimal hosting model defined in `Program.cs` and will listen on the configured port (typically set in `launchSettings.json`).

### Testing the Endpoints

Once the API is running, you can test the endpoints using tools like [Postman](https://www.postman.com/) or [Swagger](https://swagger.io/):

- **RoiController Endpoint:**  
  Use the endpoint (e.g., `https://localhost:443XX/api/roi`) to send a POST request with ROI input parameters in JSON format.  
  The API will return the calculated ROI along with predictive insights.

## Deployment

The backend is designed to be hosted on **Azure App Service** for scalability and reliability. Before deployment, ensure the following:

- Update the connection strings and Azure service configurations in `appsettings.json`.
- Configure the appropriate environment variables in the Azure portal.
- Deploy the project using Visual Studio's publishing tools or via CI/CD pipelines.

## Contributing

Contributions and enhancements are welcome. Please fork the repository and create pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For questions or further assistance, please contact [frmpiccolo@gmail.com](mailto:frmpiccolo@gmail.com).
```
