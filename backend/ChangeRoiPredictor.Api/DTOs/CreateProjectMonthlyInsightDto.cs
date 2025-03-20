using System.ComponentModel.DataAnnotations;

namespace ChangeRoiPredictor.Api.DTOs;

/// <summary>
/// DTO for creating a new project monthly insight.
/// </summary>
public class CreateProjectMonthlyInsightDto
{
    /// <summary>
    /// Unique identifier for the related monthly data record.
    /// </summary>
    [Required]
    public int ProjectMonthlyDataId { get; set; }

    /// <summary>
    /// Description of the monthly insight.
    /// </summary>
    [Required]
    public string Description { get; set; } = string.Empty;
}
