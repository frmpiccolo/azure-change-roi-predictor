namespace ChangeRoiPredictor.Api.DTOs;

public class ProjectInsights
{
    public int Id { get; set; }
    public decimal OverallROI { get; set; }
    public List<string>? OverallInsights { get; set; }
}