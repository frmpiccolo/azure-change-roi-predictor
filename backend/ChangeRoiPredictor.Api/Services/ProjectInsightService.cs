using ChangeRoiPredictor.Api.Data;
using ChangeRoiPredictor.Api.DTOs;
using ChangeRoiPredictor.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChangeRoiPredictor.Api.Services;

public class ProjectInsightService : IProjectInsightService
{
    private readonly ApplicationDbContext _context;
    public ProjectInsightService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProjectInsightDto>> GetInsightsByProjectAsync(int projectId)
    {
        var insights = await _context.ProjectInsights
            .Where(pi => pi.ProjectId == projectId)
            .ToListAsync();

        return insights.Select(pi => new ProjectInsightDto
        {
            Id = pi.Id,
            ProjectId = pi.ProjectId,
            Description = pi.Description
        });
    }

    public async Task<ProjectInsightDto> GetInsightByIdAsync(int id)
    {
        var insight = await _context.ProjectInsights.FindAsync(id);
        if (insight == null) return new ProjectInsightDto();

        return new ProjectInsightDto
        {
            Id = insight.Id,
            ProjectId = insight.ProjectId,
            Description = insight.Description
        };
    }

    public async Task<ProjectInsightDto> CreateInsightAsync(CreateProjectInsightDto dto)
    {
        var insight = new ProjectInsight
        {
            ProjectId = dto.ProjectId,
            Description = dto.Description
        };

        _context.ProjectInsights.Add(insight);
        await _context.SaveChangesAsync();

        return new ProjectInsightDto
        {
            Id = insight.Id,
            ProjectId = insight.ProjectId,
            Description = insight.Description
        };
    }

    public async Task<ProjectInsightDto> UpdateInsightAsync(int id, UpdateProjectInsightDto dto)
    {
        var insight = await _context.ProjectInsights.FindAsync(id);
        if (insight == null) return new ProjectInsightDto();

        insight.Description = dto.Description;
        await _context.SaveChangesAsync();

        return new ProjectInsightDto
        {
            Id = insight.Id,
            ProjectId = insight.ProjectId,
            Description = insight.Description
        };
    }

    public async Task<bool> DeleteInsightAsync(int id)
    {
        var insight = await _context.ProjectInsights.FindAsync(id);
        if (insight == null) return false;

        _context.ProjectInsights.Remove(insight);
        await _context.SaveChangesAsync();
        return true;
    }
}
