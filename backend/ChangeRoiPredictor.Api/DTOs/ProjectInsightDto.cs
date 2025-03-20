namespace ChangeRoiPredictor.Api.DTOs;

/// <summary>
/// Data Transfer Object for returning project insight details.
/// </summary>
public class ProjectInsightDto
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
