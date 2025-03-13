using ChangeRoiPredictor.Api.DTOs;
using ChangeRoiPredictor.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ChangeRoiPredictor.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

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
    }
}
