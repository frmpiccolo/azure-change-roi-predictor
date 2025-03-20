using System.ComponentModel.DataAnnotations;

namespace ChangeRoiPredictor.Api.DTOs;

/// <summary>
/// DTO for updating an existing project monthly insight.
/// </summary>
public class UpdateProjectMonthlyInsightDto
{
    /// <summary>
    /// Description of the monthly insight.
    /// </summary>
    [Required]
    public string Description { get; set; } = string.Empty;
}
