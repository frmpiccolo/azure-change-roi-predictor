using ChangeRoiPredictor.Api.DTOs;
using ChangeRoiPredictor.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ChangeRoiPredictor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectInsightController : ControllerBase
{
    private readonly IProjectInsightService _projectInsightService;

    public ProjectInsightController(IProjectInsightService projectInsightService)
    {
        _projectInsightService = projectInsightService;
    }

    // GET: api/ProjectInsight/project/{projectId}
    [HttpGet("project/{projectId}")]
    public async Task<IActionResult> GetInsightsByProject(int projectId)
    {
        var insights = await _projectInsightService.GetInsightsByProjectAsync(projectId);
        return Ok(insights);
    }

    // GET: api/ProjectInsight/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetInsight(int id)
    {
        var insight = await _projectInsightService.GetInsightByIdAsync(id);
        if (insight == null) return NotFound();
        return Ok(insight);
    }

    // POST: api/ProjectInsight
    [HttpPost]
    public async Task<IActionResult> CreateInsight([FromBody] CreateProjectInsightDto dto)
    {
        var insight = await _projectInsightService.CreateInsightAsync(dto);
        return CreatedAtAction(nameof(GetInsight), new { id = insight.Id }, insight);
    }

    // PUT: api/ProjectInsight/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateInsight(int id, [FromBody] UpdateProjectInsightDto dto)
    {
        var updatedInsight = await _projectInsightService.UpdateInsightAsync(id, dto);
        if (updatedInsight == null) return NotFound();
        return Ok(updatedInsight);
    }

    // DELETE: api/ProjectInsight/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInsight(int id)
    {
        var result = await _projectInsightService.DeleteInsightAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}
