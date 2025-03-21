using ChangeRoiPredictor.Api.Models;
using System.ComponentModel.DataAnnotations;

namespace ChangeRoiPredictor.Api.DTOs;

/// <summary>
/// DTO for updating project monthly data.
/// </summary>
public class UpdateProjectMonthlyDataDto
{
    /// <summary>
    /// Id of the project monthly data.
    /// </summary>
    public int? Id { get; set; }

    /// <summary>
    /// Month of the project monthly data.
    /// </summary>
    [Required]
    public int Month { get; set; }

    /// <summary>
    ///  Yar of the project monthly data.
    /// </summary>
    [Required]
    public int Year { get; set; }

    /// <summary>
    /// Monthly budget for the project.
    /// </summary>
    [Required]
    public decimal MonthlyBudget { get; set; }

    /// <summary>
    /// Monthly people impacted by the project.
    /// </summary>
    [Required]
    public int MonthlyPeopleImpacted { get; set; }

    /// <summary>
    /// Expected result for the project in the month.
    /// </summary>
    [Required]
    public decimal ExpectedResult { get; set; }

    /// <summary>
    /// Obtained result for the project in the month.
    /// </summary>
    [Required]
    public decimal? ObtainedResult { get; set; }

    /// <summary>
    /// Monthly ROI for the project.
    /// </summary>
    public decimal? MonthlyROI { get; set; }

    /// <summary>
    /// Collection of insights for the project in the month.
    /// </summary>
    public ICollection<ProjectMonthlyInsight>? ProjectMonthlyInsights { get; set; }
}
