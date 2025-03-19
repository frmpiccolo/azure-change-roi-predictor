using ChangeRoiPredictor.Api.Data;
using ChangeRoiPredictor.Api.DTOs;
using ChangeRoiPredictor.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChangeRoiPredictor.Api.Services
{

    public class ProjectMonthlyDataService(ApplicationDbContext context) : IProjectMonthlyDatService
    {
        private readonly ApplicationDbContext _context = context;

        public async Task<IEnumerable<ProjectMonthlyDataDto>> GetAllMonthlyDataForProjectAsync(int projectId)
        {
            var monthlyData = await _context.ProjectMonthlyData
                .Where(m => m.ProjectId == projectId)
                .ToListAsync();

            return monthlyData.Select(m => new ProjectMonthlyDataDto
            {
                Id = m.Id,
                Month = m.Month,
                Year = m.Year,
                MonthlyBudget = m.MonthlyBudget,
                MonthlyPeopleImpacted = m.MonthlyPeopleImpacted,
                ExpectedResult = m.ExpectedResult,
                ObtainedResult = m.ObtainedResult
            });
        }

        public async Task<ProjectMonthlyDataDto?> GetMonthlyDataByIdAsync(int id)
        {
            var data = await _context.ProjectMonthlyData.FindAsync(id);
            if (data == null)
                return null;

            return new ProjectMonthlyDataDto
            {
                Id = data.Id,
                Month = data.Month,
                Year = data.Year,
                MonthlyBudget = data.MonthlyBudget,
                MonthlyPeopleImpacted = data.MonthlyPeopleImpacted,
                ExpectedResult = data.ExpectedResult,
                ObtainedResult = data.ObtainedResult
            };
        }

        public async Task<ProjectMonthlyDataDto?> CreateMonthlyDataAsync(int projectId, CreateProjectMonthlyDataDto dto)
        {
            var monthlyData = new ProjectMonthlyData
            {
                ProjectId = projectId,
                Month = dto.Month,
                Year = dto.Year,
                MonthlyBudget = dto.MonthlyBudget,
                MonthlyPeopleImpacted = dto.MonthlyPeopleImpacted,
                ExpectedResult = dto.ExpectedResult,
                ObtainedResult = dto.ObtainedResult
            };

            _context.ProjectMonthlyData.Add(monthlyData);
            await _context.SaveChangesAsync();

            return new ProjectMonthlyDataDto
            {
                Id = monthlyData.Id,
                Month = monthlyData.Month,
                Year = monthlyData.Year,
                MonthlyBudget = monthlyData.MonthlyBudget,
                MonthlyPeopleImpacted = monthlyData.MonthlyPeopleImpacted,
                ExpectedResult = monthlyData.ExpectedResult,
                ObtainedResult = monthlyData.ObtainedResult
            };
        }

        public async Task<ProjectMonthlyDataDto?> UpdateMonthlyDataAsync(int id, UpdateProjectMonthlyDataDto dto)
        {
            var monthlyData = await _context.ProjectMonthlyData.FindAsync(id);
            if (monthlyData == null)
                return null;

            monthlyData.Month = dto.Month;
            monthlyData.Year = dto.Year;
            monthlyData.MonthlyBudget = dto.MonthlyBudget;
            monthlyData.MonthlyPeopleImpacted = dto.MonthlyPeopleImpacted;
            monthlyData.ExpectedResult = dto.ExpectedResult;
            monthlyData.ObtainedResult = dto.ObtainedResult;

            await _context.SaveChangesAsync();

            return new ProjectMonthlyDataDto
            {
                Id = monthlyData.Id,
                Month = monthlyData.Month,
                Year = monthlyData.Year,
                MonthlyBudget = monthlyData.MonthlyBudget,
                MonthlyPeopleImpacted = monthlyData.MonthlyPeopleImpacted,
                ExpectedResult = monthlyData.ExpectedResult,
                ObtainedResult = monthlyData.ObtainedResult
            };
        }

        public async Task<bool> DeleteMonthlyDataAsync(int id)
        {
            var monthlyData = await _context.ProjectMonthlyData.FindAsync(id);
            if (monthlyData == null)
                return false;

            _context.ProjectMonthlyData.Remove(monthlyData);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
