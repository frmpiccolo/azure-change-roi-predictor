using ChangeRoiPredictor.Api.Data;
using ChangeRoiPredictor.Api.DTOs;
using ChangeRoiPredictor.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChangeRoiPredictor.Api.Services;

public class ProjectMonthlyInsightService : IProjectMonthlyInsightService
{
    private readonly ApplicationDbContext _context;
    public ProjectMonthlyInsightService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProjectMonthlyInsightDto>> GetMonthlyInsightsAsync(int projectMonthlyDataId)
    {
        var insights = await _context.ProjectMonthlyInsights
            .Where(pmi => pmi.ProjectMonthlyDataId == projectMonthlyDataId)
            .ToListAsync();

        return insights.Select(pmi => new ProjectMonthlyInsightDto
        {
            Id = pmi.Id,
            ProjectMonthlyDataId = pmi.ProjectMonthlyDataId,
            Description = pmi.Description
        });
    }

    public async Task<ProjectMonthlyInsightDto> GetMonthlyInsightByIdAsync(int id)
    {
        var insight = await _context.ProjectMonthlyInsights.FindAsync(id);
        if (insight == null) return new ProjectMonthlyInsightDto();

        return new ProjectMonthlyInsightDto
        {
            Id = insight.Id,
            ProjectMonthlyDataId = insight.ProjectMonthlyDataId,
            Description = insight.Description
        };
    }

    public async Task<ProjectMonthlyInsightDto> CreateMonthlyInsightAsync(CreateProjectMonthlyInsightDto dto)
    {
        var insight = new ProjectMonthlyInsight
        {
            ProjectMonthlyDataId = dto.ProjectMonthlyDataId,
            Description = dto.Description
        };

        _context.ProjectMonthlyInsights.Add(insight);
        await _context.SaveChangesAsync();

        return new ProjectMonthlyInsightDto
        {
            Id = insight.Id,
            ProjectMonthlyDataId = insight.ProjectMonthlyDataId,
            Description = insight.Description
        };
    }

    public async Task<ProjectMonthlyInsightDto> UpdateMonthlyInsightAsync(int id, UpdateProjectMonthlyInsightDto dto)
    {
        var insight = await _context.ProjectMonthlyInsights.FindAsync(id);
        if (insight == null) return new ProjectMonthlyInsightDto();

        insight.Description = dto.Description;
        await _context.SaveChangesAsync();

        return new ProjectMonthlyInsightDto
        {
            Id = insight.Id,
            ProjectMonthlyDataId = insight.ProjectMonthlyDataId,
            Description = insight.Description
        };
    }

    public async Task<bool> DeleteMonthlyInsightAsync(int id)
    {
        var insight = await _context.ProjectMonthlyInsights.FindAsync(id);
        if (insight == null) return false;

        _context.ProjectMonthlyInsights.Remove(insight);
        await _context.SaveChangesAsync();
        return true;
    }
}
