using ChangeRoiPredictor.Api.Models;

namespace ChangeRoiPredictor.Api.DTOs;

/// <summary>
/// Data Transfer Object for returning project monthly details
/// </summary>
public class ProjectMonthlyDataDto
{

    /// <summary>
    /// Unique identifier for the monthly data record.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Month of the data record.
    /// </summary>
    public int Month { get; set; }

    /// <summary>
    /// Year of the data record.
    /// </summary>
    public int Year { get; set; }

    /// <summary>
    /// Monthly budget allocated for the project.
    /// </summary>
    public decimal MonthlyBudget { get; set; }

    /// <summary>
    /// Number of people impacted by the project in the month.
    /// </summary>
    public int MonthlyPeopleImpacted { get; set; }

    /// <summary>
    /// Expected result for the month.
    /// </summary>
    public decimal ExpectedResult { get; set; }

    /// <summary>
    /// Obtained result for the month.
    /// </summary>
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
