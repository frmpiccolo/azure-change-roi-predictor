using ChangeRoiPredictor.Api.Data;
using ChangeRoiPredictor.Api.Options;
using ChangeRoiPredictor.Api.Services;
using Microsoft.EntityFrameworkCore;
using Azure.Identity;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddAzureKeyVault(
    new Uri(builder.Configuration["AzureOptions:AzureKeyVaultUrl"]!),
    new DefaultAzureCredential());

builder.Services.Configure<AzureKeyVaultOptions>(builder.Configuration);
builder.Services.Configure<AzureOptions>(builder.Configuration.GetSection(nameof(AzureOptions)));

// Configure SQL Server connection.
builder.Services.AddDbContext<ApplicationDbContext>((serviceProvider, options) =>
{
    AzureKeyVaultOptions azureKeyVaultOptions = serviceProvider.GetRequiredService<IOptions<AzureKeyVaultOptions>>().Value;

    options.UseAzureSql(azureKeyVaultOptions.AzureSqlConnectionString);
});

// Register project and monthly data services.
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IProjectMonthlyDataService, ProjectMonthlyDataService>();
builder.Services.AddScoped<IRoiService, RoiService>();
builder.Services.AddScoped<IBlobService, BlobService>();
builder.Services.AddScoped<IProjectMonthlyDataService, ProjectMonthlyDataService>();

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
