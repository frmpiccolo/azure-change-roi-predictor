using ChangeRoiPredictor.Api.DTOs;
using ChangeRoiPredictor.Api.Models;

namespace ChangeRoiPredictor.Api.Services;

public interface IRoiService
{
    Task<ICollection<ProjectInsight>?> GetProjectInsightsAsync(ProjectDto project);
}