using ChangeRoiPredictor.Api.Data;
using ChangeRoiPredictor.Api.DTOs;
using ChangeRoiPredictor.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;

namespace ChangeRoiPredictor.Api.Services
{
    public class ProjectService(ApplicationDbContext context) : IProjectService
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<IEnumerable<ProjectDto>> GetAllProjectsAsync()
        {
            var projects = await _context.Projects
                .Include(p => p.MonthlyData)
                .ToListAsync();

            return projects.Select(MapToProjectDto);
        }

        public async Task<ProjectDto?> GetProjectByIdAsync(int id)
        {
            var project = await _context.Projects
                .Include(p => p.MonthlyData)
                .FirstOrDefaultAsync(p => p.Id == id);

            return project != null ? MapToProjectDto(project) : null;
        }

        public async Task<ProjectDto> CreateProjectAsync(CreateProjectDto dto)
        {
            var project = new Project
            {
                Name = dto.Name,
                Description = dto.Description, 
                DurationInMonths = dto.DurationInMonths,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                TotalBudget = dto.TotalBudget,
                NumberOfPeopleAffected = dto.NumberOfPeopleAffected,
                RiskLevel = dto.RiskLevel, 
                ReadinessLevel = dto.ReadinessLevel, 
                EngagementScore = dto.EngagementScore, 
                ComplexityRating = dto.ComplexityRating, 
                Methodology = dto.Methodology, 
                MonthlyData = dto.MonthlyData?.Select(m => new ProjectMonthlyData
                {
                    Month = m.Month,
                    Year = m.Year,
                    MonthlyBudget = m.MonthlyBudget,
                    MonthlyPeopleImpacted = m.MonthlyPeopleImpacted,
                    ExpectedResult = m.ExpectedResult,
                    ObtainedResult = m.ObtainedResult
                }).ToList() ?? []
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return MapToProjectDto(project);
        }

        public async Task<ProjectDto?> UpdateProjectAsync(int id, UpdateProjectDto dto)
        {
            var project = await _context.Projects
                .Include(p => p.MonthlyData)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
                return null;

            project.Name = dto.Name;
            project.Description = dto.Description; 
            project.DurationInMonths = dto.DurationInMonths;
            project.StartDate = dto.StartDate;
            project.EndDate = dto.EndDate;
            project.TotalBudget = dto.TotalBudget;
            project.RiskLevel = dto.RiskLevel;
            project.ReadinessLevel = dto.ReadinessLevel;
            project.EngagementScore = dto.EngagementScore;
            project.ComplexityRating = dto.ComplexityRating; 
            project.Methodology = dto.Methodology; 
            project.NumberOfPeopleAffected = dto.NumberOfPeopleAffected;

            // Update monthly data: simple approach by removing existing data and adding new data.
            if (project.MonthlyData != null)
                _context.ProjectMonthlyData.RemoveRange(project.MonthlyData);

            if (dto.MonthlyData != null)
            {
                project.MonthlyData = [.. dto.MonthlyData.Select(m => new ProjectMonthlyData
                {
                    Month = m.Month,
                    Year = m.Year,
                    MonthlyBudget = m.MonthlyBudget,
                    MonthlyPeopleImpacted = m.MonthlyPeopleImpacted,
                    ExpectedResult = m.ExpectedResult,
                    ObtainedResult = m.ObtainedResult
                })];
            }

            await _context.SaveChangesAsync();
            return MapToProjectDto(project);
        }

        public async Task<bool> DeleteProjectAsync(int id)
        {
            var project = await _context.Projects
                .Include(p => p.MonthlyData)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (project == null)
                return false;

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return true;
        }

        private ProjectDto MapToProjectDto(Project project)
        {
            return new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description, 
                DurationInMonths = project.DurationInMonths,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                TotalBudget = project.TotalBudget,
                NumberOfPeopleAffected = project.NumberOfPeopleAffected,
                RiskLevel = project.RiskLevel,
                ReadinessLevel = project.ReadinessLevel,
                EngagementScore = project.EngagementScore,
                ComplexityRating = project.ComplexityRating,
                Methodology = project.Methodology,                
                MonthlyData = project.MonthlyData?.Select(m => new ProjectMonthlyDataDto
                {
                    Id = m.Id,
                    Month = m.Month,
                    Year = m.Year,
                    MonthlyBudget = m.MonthlyBudget,
                    MonthlyPeopleImpacted = m.MonthlyPeopleImpacted,
                    ExpectedResult = m.ExpectedResult,
                    ObtainedResult = m.ObtainedResult
                }).ToList() ?? []
            };
        }
    }
}
