using System;
using System.Collections.Generic;

namespace ChangeRoiPredictor.Api.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        // Duration in months (can be computed or manually specified)
        public int DurationInMonths { get; set; }
        // StartDate and EndDate represent the Month/Year for the project
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalBudget { get; set; }
        public int NumberOfPeopleAffected { get; set; }

        public ICollection<ProjectMonthlyData> MonthlyData { get; set; }
    }
}
