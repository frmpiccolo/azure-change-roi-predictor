namespace ChangeRoiPredictor.Api.Models;

/// <summary>
/// Represents a project monthly insight.
/// </summary>
public class ProjectMonthlyInsight
{
    /// <summary>
    /// Unique identifier for the project insight for a specific month.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Unique identifier for the project monthly data.
    /// </summary>
    public int ProjectMonthlyDataId { get; set; }

    /// <summary>
    /// Description of the project insight for a specific month
    /// </summary>
    public string Description { get; set; } = string.Empty;
}