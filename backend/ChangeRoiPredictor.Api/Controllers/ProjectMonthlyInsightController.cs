using ChangeRoiPredictor.Api.DTOs;
using ChangeRoiPredictor.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ChangeRoiPredictor.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectMonthlyInsightController : ControllerBase
{
    private readonly IProjectMonthlyInsightService _monthlyInsightService;

    public ProjectMonthlyInsightController(IProjectMonthlyInsightService monthlyInsightService)
    {
        _monthlyInsightService = monthlyInsightService;
    }

    // GET: api/ProjectMonthlyInsight/monthly/{projectMonthlyDataId}
    [HttpGet("monthly/{projectMonthlyDataId}")]
    public async Task<IActionResult> GetMonthlyInsights(int projectMonthlyDataId)
    {
        var insights = await _monthlyInsightService.GetMonthlyInsightsAsync(projectMonthlyDataId);
        return Ok(insights);
    }

    // GET: api/ProjectMonthlyInsight/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMonthlyInsight(int id)
    {
        var insight = await _monthlyInsightService.GetMonthlyInsightByIdAsync(id);
        if (insight == null) return NotFound();
        return Ok(insight);
    }

    // POST: api/ProjectMonthlyInsight
    [HttpPost]
    public async Task<IActionResult> CreateMonthlyInsight([FromBody] CreateProjectMonthlyInsightDto dto)
    {
        var insight = await _monthlyInsightService.CreateMonthlyInsightAsync(dto);
        return CreatedAtAction(nameof(GetMonthlyInsight), new { id = insight.Id }, insight);
    }

    // PUT: api/ProjectMonthlyInsight/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMonthlyInsight(int id, [FromBody] UpdateProjectMonthlyInsightDto dto)
    {
        var updatedInsight = await _monthlyInsightService.UpdateMonthlyInsightAsync(id, dto);
        if (updatedInsight == null) return NotFound();
        return Ok(updatedInsight);
    }

    // DELETE: api/ProjectMonthlyInsight/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMonthlyInsight(int id)
    {
        var result = await _monthlyInsightService.DeleteMonthlyInsightAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}
