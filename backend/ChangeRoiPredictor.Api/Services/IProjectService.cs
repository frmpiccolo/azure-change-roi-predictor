using System.Collections.Generic;
using System.Threading.Tasks;
using ChangeRoiPredictor.Api.DTOs;

namespace ChangeRoiPredictor.Api.Services
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetAllProjectsAsync();
        Task<ProjectDto?> GetProjectByIdAsync(int id);
        Task<ProjectDto> CreateProjectAsync(CreateProjectDto dto);
        Task<ProjectDto?> UpdateProjectAsync(int id, UpdateProjectDto dto);
        Task<bool> DeleteProjectAsync(int id);
    }
}
