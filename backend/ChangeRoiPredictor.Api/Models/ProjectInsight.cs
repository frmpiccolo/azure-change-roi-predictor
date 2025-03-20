namespace ChangeRoiPredictor.Api.Models;

/// <summary>
/// Represents a project insight.
/// </summary>
public class ProjectInsight
{
    /// <summary>
    /// Unique identifier for the project insight.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Unique identifier for the project.
    /// </summary>
    public int ProjectId { get; set; }

    /// <summary>
    /// Description of the project insight.
    /// </summary>
    public string Description { get; set; } = string.Empty;
}