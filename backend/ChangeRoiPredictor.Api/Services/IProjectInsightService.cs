using ChangeRoiPredictor.Api.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChangeRoiPredictor.Api.Services;

public interface IProjectInsightService
{
    Task<IEnumerable<ProjectInsightDto>> GetInsightsByProjectAsync(int projectId);
    Task<ProjectInsightDto> GetInsightByIdAsync(int id);
    Task<ProjectInsightDto> CreateInsightAsync(CreateProjectInsightDto dto);
    Task<ProjectInsightDto> UpdateInsightAsync(int id, UpdateProjectInsightDto dto);
    Task<bool> DeleteInsightAsync(int id);
}
