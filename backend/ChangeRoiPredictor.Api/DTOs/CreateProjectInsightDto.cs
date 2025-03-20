using System.ComponentModel.DataAnnotations;

namespace ChangeRoiPredictor.Api.DTOs;

/// <summary>
/// DTO for creating a new project insight.
/// </summary>
public class CreateProjectInsightDto
{
    /// <summary>
    /// Unique identifier for the project.
    /// </summary>
    [Required]
    public int ProjectId { get; set; }

    /// <summary>
    /// Description of the project insight.
    /// </summary>
    [Required]
    public string Description { get; set; } = string.Empty;
}
