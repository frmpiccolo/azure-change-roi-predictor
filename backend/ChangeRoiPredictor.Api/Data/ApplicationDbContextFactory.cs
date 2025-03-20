using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;

namespace ChangeRoiPredictor.Api.Data
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            // Use the current directory as the base path.
            var basePath = Directory.GetCurrentDirectory();

            // Build configuration from appsettings.json.
            var configuration = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            // Read the environment from configuration.            
            var environment = configuration["ASPNETCORE_ENVIRONMENT"] ?? "Development";
            string connectionString = configuration["AzureSqlConnectionString"] ?? "";

            if (string.IsNullOrWhiteSpace(connectionString))
            {
                throw new InvalidOperationException("The connection string has not been initialized.");
            }

            optionsBuilder.UseSqlServer(connectionString);

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
