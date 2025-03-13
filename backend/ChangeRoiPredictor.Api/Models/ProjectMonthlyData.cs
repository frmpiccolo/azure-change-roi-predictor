namespace ChangeRoiPredictor.Api.Models
{
    public class ProjectMonthlyData
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        // Month (1-12) and Year for this record
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal MonthlyBudget { get; set; }
        public int MonthlyPeopleImpacted { get; set; }
        public decimal ExpectedResult { get; set; }
        public decimal ObtainedResult { get; set; }

        public Project Project { get; set; }
    }
}
