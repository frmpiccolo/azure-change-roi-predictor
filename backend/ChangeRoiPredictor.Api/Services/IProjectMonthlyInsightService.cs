using ChangeRoiPredictor.Api.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChangeRoiPredictor.Api.Services;

public interface IProjectMonthlyInsightService
{
    Task<IEnumerable<ProjectMonthlyInsightDto>> GetMonthlyInsightsAsync(int projectMonthlyDataId);
    Task<ProjectMonthlyInsightDto> GetMonthlyInsightByIdAsync(int id);
    Task<ProjectMonthlyInsightDto> CreateMonthlyInsightAsync(CreateProjectMonthlyInsightDto dto);
    Task<ProjectMonthlyInsightDto> UpdateMonthlyInsightAsync(int id, UpdateProjectMonthlyInsightDto dto);
    Task<bool> DeleteMonthlyInsightAsync(int id);
}
