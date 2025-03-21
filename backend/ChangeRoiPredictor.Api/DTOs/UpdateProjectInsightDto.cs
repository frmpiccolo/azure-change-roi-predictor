using System.ComponentModel.DataAnnotations;

namespace ChangeRoiPredictor.Api.DTOs;

/// <summary>
/// DTO for updating an existing project insight.
/// </summary>
public class UpdateProjectInsightDto
{
    /// <summary>
    /// Description of the project insight.
    /// </summary>
    [Required]
    public string Description { get; set; } = string.Empty;
}
