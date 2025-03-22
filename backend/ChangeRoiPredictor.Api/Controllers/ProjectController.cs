using ChangeRoiPredictor.Api.DTOs;
using ChangeRoiPredictor.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChangeRoiPredictor.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController(
        IProjectService projectService,
        IProjectInsightService projectInsightService,
        IProjectMonthlyInsightService projectMonthlyInsightService,
        IRoiService roiService) : ControllerBase
    {
        private readonly IProjectService _projectService = projectService;
        private readonly IProjectInsightService _projectInsightService = projectInsightService;
        private readonly IProjectMonthlyInsightService projectMonthlyInsightService = projectMonthlyInsightService;
        private readonly IRoiService _roiService = roiService;

        // GET: api/project
        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            return Ok(projects);
        }

        // GET: api/project/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectById(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);
            if (project == null)
                return NotFound();
            return Ok(project);
        }

        // POST: api/project
        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdProject = await _projectService.CreateProjectAsync(dto);
            return CreatedAtAction(nameof(GetProjectById), new { id = createdProject.Id }, createdProject);
        }

        // PUT: api/project/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] UpdateProjectDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedProject = await _projectService.UpdateProjectAsync(id, dto);
            if (updatedProject == null)
                return NotFound();
            return Ok(updatedProject);
        }

        // DELETE: api/project/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var result = await _projectService.DeleteProjectAsync(id);
            if (!result)
                return NotFound();
            return NoContent();
        }

        // added just for test purposes, remove if not necessary
        [HttpPost("insight/{id}")]
        public async Task<IActionResult> GenerateInsightsAsync(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);

            if (project == null) return NotFound();

            var projectWithInsights = await _roiService.GenerateProjectInsightsAsync(project);

            project.ProjectInsights = projectWithInsights?.ProjectInsights;
            project.MonthlyData = projectWithInsights?.MonthlyData;
            project.OverallROI = projectWithInsights?.OverallROI;

            var result = await _projectService.UpdateProjectAsync(id, MapProjectDtoUpdate(project));

            return Ok(result);
        }

        private static UpdateProjectDto MapProjectDtoUpdate(ProjectDto projectDto)
        {
            return new UpdateProjectDto
            {
                Name = projectDto.Name,
                ComplexityRating = projectDto.ComplexityRating,
                Description = projectDto.Description,
                DurationInMonths = projectDto.DurationInMonths,
                EndDate = projectDto.EndDate,
                EngagementScore = projectDto.EngagementScore,
                Methodology = projectDto.Methodology,
                NumberOfPeopleAffected = projectDto.NumberOfPeopleAffected,
                OverallROI = projectDto.OverallROI,
                TotalBudget = projectDto.TotalBudget,
                ReadinessLevel = projectDto.ReadinessLevel,
                RiskLevel = projectDto.RiskLevel,
                StartDate = projectDto.StartDate,
                ProjectInsights = projectDto.ProjectInsights?.Select(projectInsights => new UpdateProjectInsightDto()
                {
                    Description = projectInsights.Description
                }).ToList(),
                MonthlyData = projectDto.MonthlyData?.Select(monthlyData => new UpdateProjectMonthlyDataDto()
                {
                    Month = monthlyData.Month,
                    Year = monthlyData.Year,
                    ExpectedResult = monthlyData.ExpectedResult,
                    MonthlyBudget = monthlyData.MonthlyBudget,
                    MonthlyPeopleImpacted = monthlyData.MonthlyPeopleImpacted,
                    ObtainedResult = monthlyData.ObtainedResult,
                    MonthlyROI = monthlyData.MonthlyROI,
                    ProjectMonthlyInsights = monthlyData.ProjectMonthlyInsights?
                        .Select(projectMonthlyDataInsight => new UpdateProjectMonthlyInsightDto()
                        {
                            Description = projectMonthlyDataInsight.Description
                        }).ToList()
                }).ToList()
            };
        }
    }
}
