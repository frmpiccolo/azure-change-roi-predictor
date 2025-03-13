using System;
using System.Collections.Generic;

namespace ChangeRoiPredictor.Api.DTOs
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int DurationInMonths { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalBudget { get; set; }
        public int NumberOfPeopleAffected { get; set; }
        public IEnumerable<ProjectMonthlyDataDto> MonthlyData { get; set; }
    }
}
