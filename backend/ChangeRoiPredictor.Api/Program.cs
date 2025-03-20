using ChangeRoiPredictor.Api.Data;
using ChangeRoiPredictor.Api.Options;
using ChangeRoiPredictor.Api.Services;
using Microsoft.EntityFrameworkCore;
using Azure.Identity;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Optional: Only add Azure Key Vault if not in development
// or if you want Key Vault secrets in development as well.
if (!builder.Environment.IsDevelopment())
{
    builder.Configuration.AddAzureKeyVault(
        new Uri(builder.Configuration["AzureOptions:AzureKeyVaultUrl"]!),
        new DefaultAzureCredential());
}

// Bind your custom options
builder.Services.Configure<AzureKeyVaultOptions>(builder.Configuration);
builder.Services.Configure<AzureOptions>(builder.Configuration.GetSection(nameof(AzureOptions)));

// Configure SQL Server connection.
builder.Services.AddDbContext<ApplicationDbContext>((serviceProvider, options) =>
{
    var env = serviceProvider.GetRequiredService<IHostEnvironment>();
    var config = serviceProvider.GetRequiredService<IConfiguration>();
    var azureKeyVaultOptions = serviceProvider.GetRequiredService<IOptions<AzureKeyVaultOptions>>().Value;

    if (env.IsDevelopment())
    {
        // Use the local connection string in development
        string localConnectionString = config["AzureSqlConnectionString"] ?? "";
        options.UseSqlServer(localConnectionString);
    }
    else
    {
        // Use Azure Key Vault connection string in non-development (production) mode
        options.UseAzureSql(azureKeyVaultOptions.AzureSqlConnectionString);
    }
});

// Register project and monthly data services.
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IProjectMonthlyDataService, ProjectMonthlyDataService>();
builder.Services.AddScoped<IRoiService, RoiService>();
builder.Services.AddScoped<IBlobService, BlobService>();
builder.Services.AddScoped<IProjectMonthlyDataService, ProjectMonthlyDataService>();
builder.Services.AddScoped<IProjectInsightService, ProjectInsightService>();
builder.Services.AddScoped<IProjectMonthlyInsightService, ProjectMonthlyInsightService>();

// Configure CORS: read allowed origins from configuration; default to localhost:3000 if none provided.
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();
if (allowedOrigins == null || allowedOrigins.Length == 0)
{
    allowedOrigins = new string[] { "http://localhost:3000" };
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add controllers and Swagger.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Apply migrations on startup (optional).
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS with the policy "AllowFrontend"
app.UseCors("AllowFrontend");

app.MapControllers();
app.Run();
