using ChangeRoiPredictor.Api.DTOs;
using ChangeRoiPredictor.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ChangeRoiPredictor.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectMonthlyDataController : ControllerBase
    {
        private readonly IProjectMonthlyDataervice _monthlyDataService;

        public ProjectMonthlyDataController(IProjectMonthlyDataervice monthlyDataService)
        {
            _monthlyDataService = monthlyDataService;
        }

        // GET: api/ProjectMonthlyData/project/{projectId}
        [HttpGet("project/{projectId}")]
        public async Task<IActionResult> GetMonthlyDataForProject(int projectId)
        {
            var data = await _monthlyDataService.GetAllMonthlyDataForProjectAsync(projectId);
            return Ok(data);
        }

        // GET: api/ProjectMonthlyData/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMonthlyData(int id)
        {
            var data = await _monthlyDataService.GetMonthlyDataByIdAsync(id);
            if (data == null)
                return NotFound();
            return Ok(data);
        }

        // POST: api/ProjectMonthlyData/project/{projectId}
        [HttpPost("project/{projectId}")]
        public async Task<IActionResult> CreateMonthlyData(int projectId, [FromBody] CreateProjectMonthlyDataDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdData = await _monthlyDataService.CreateMonthlyDataAsync(projectId, dto);
            return CreatedAtAction(nameof(GetMonthlyData), new { id = createdData.Id }, createdData);
        }

        // PUT: api/ProjectMonthlyData/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMonthlyData(int id, [FromBody] UpdateProjectMonthlyDataDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedData = await _monthlyDataService.UpdateMonthlyDataAsync(id, dto);
            if (updatedData == null)
                return NotFound();

            return Ok(updatedData);
        }

        // DELETE: api/ProjectMonthlyData/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMonthlyData(int id)
        {
            var result = await _monthlyDataService.DeleteMonthlyDataAsync(id);
            if (!result)
                return NotFound();
            return NoContent();
        }
    }
}
