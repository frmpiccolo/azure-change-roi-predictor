using System.ComponentModel.DataAnnotations;

namespace ChangeRoiPredictor.Api.DTOs;

/// <summary>
/// DTO for creating a new project monthly data.
/// </summary>
public class CreateProjectMonthlyDataDto
{
    /// <summary>
    /// The month of the data.
    /// </summary>
    [Required]
    public int Month { get; set; }

    /// <summary>
    /// The year of the data.
    /// </summary>
    [Required]
    public int Year { get; set; }

    /// <summary>
    /// Monthly budget.
    /// </summary>
    [Required]
    public decimal MonthlyBudget { get; set; }

    /// <summary>
    /// Monthly people impacted.
    /// </summary>
    [Required]
    public int MonthlyPeopleImpacted { get; set; }

    /// <summary>
    /// Expected result.
    /// </summary>
    [Required]
    public decimal ExpectedResult { get; set; }

    /// <summary>
    /// Obtained result.
    /// </summary>    
    public decimal? ObtainedResult { get; set; }
}
