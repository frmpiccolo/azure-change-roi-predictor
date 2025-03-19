namespace ChangeRoiPredictor.Api.DTOs;

public class ProjectMonthlyInsights
{
    public decimal MonthlyROI { get; set; }
    public List<string>? MonthlyInsights { get; set; }
}