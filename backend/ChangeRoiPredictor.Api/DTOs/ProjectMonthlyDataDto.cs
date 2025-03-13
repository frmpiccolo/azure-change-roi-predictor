namespace ChangeRoiPredictor.Api.DTOs
{
    public class ProjectMonthlyDataDto
    {
        public int Id { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal MonthlyBudget { get; set; }
        public int MonthlyPeopleImpacted { get; set; }
        public decimal ExpectedResult { get; set; }
        public decimal ObtainedResult { get; set; }
    }
}
