using System.Collections.Generic;
using System.Threading.Tasks;
using ChangeRoiPredictor.Api.DTOs;

namespace ChangeRoiPredictor.Api.Services
{    
    public interface IProjectMonthlyDataService
    {
        Task<IEnumerable<ProjectMonthlyDataDto>> GetAllMonthlyDataForProjectAsync(int projectId);
        Task<ProjectMonthlyDataDto?> GetMonthlyDataByIdAsync(int id);
        Task<ProjectMonthlyDataDto?> CreateMonthlyDataAsync(int projectId, CreateProjectMonthlyDataDto dto);
        Task<ProjectMonthlyDataDto?> UpdateMonthlyDataAsync(int id, UpdateProjectMonthlyDataDto dto);
        Task<bool> DeleteMonthlyDataAsync(int id);
    }
}
