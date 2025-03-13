using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ChangeRoiPredictor.Api.DTOs
{
    public class UpdateProjectDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int DurationInMonths { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public decimal TotalBudget { get; set; }

        [Required]
        public int NumberOfPeopleAffected { get; set; }

        public IEnumerable<UpdateProjectMonthlyDataDto> MonthlyData { get; set; }
    }
}
