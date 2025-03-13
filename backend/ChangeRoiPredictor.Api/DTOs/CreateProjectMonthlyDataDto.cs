using System.ComponentModel.DataAnnotations;

namespace ChangeRoiPredictor.Api.DTOs
{
    public class CreateProjectMonthlyDataDto
    {
        [Required]
        public int Month { get; set; }

        [Required]
        public int Year { get; set; }

        [Required]
        public decimal MonthlyBudget { get; set; }

        [Required]
        public int MonthlyPeopleImpacted { get; set; }

        [Required]
        public decimal ExpectedResult { get; set; }

        [Required]
        public decimal ObtainedResult { get; set; }
    }
}
