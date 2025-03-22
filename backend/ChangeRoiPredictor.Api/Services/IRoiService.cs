using ChangeRoiPredictor.Api.DTOs;
using ChangeRoiPredictor.Api.Models;

namespace ChangeRoiPredictor.Api.Services;

public interface IRoiService
{
    Task<ProjectDto?> GenerateProjectInsightsAsync(ProjectDto project);
}