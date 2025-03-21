namespace ChangeRoiPredictor.Api.DTOs;

/// <summary>
/// Data Transfer Object for returning a project monthly insight.
/// </summary>
public class ProjectMonthlyInsightDto
{
    /// <summary>
    /// Unique identifier for the monthly insight.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Unique identifier for the related monthly data record.
    /// </summary>
    public int ProjectMonthlyDataId { get; set; }

    /// <summary>
    /// Description of the monthly insight.
    /// </summary>
    public string Description { get; set; } = string.Empty;
}
