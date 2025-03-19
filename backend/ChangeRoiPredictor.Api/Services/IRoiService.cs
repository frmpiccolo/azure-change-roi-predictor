using ChangeRoiPredictor.Api.DTOs;
using ChangeRoiPredictor.Api.Models;

namespace ChangeRoiPredictor.Api.Services;

public interface IRoiService
{
    Task<ProjectInsights?> GetProjectInsightsAsync(ProjectDto project);
}