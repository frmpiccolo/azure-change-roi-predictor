namespace ChangeRoiPredictor.Api.Models;

/// <summary>
/// Represents the monthly data for a project.
/// </summary>
public class ProjectMonthlyData
{
    /// <summary>
    /// Unique identifier for the monthly data record.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Unique identifier for the project.
    /// </summary>
    public int ProjectId { get; set; }

    /// <summary>
    /// Navigation property for the project.
    /// </summary>
    public Project? Project { get; set; }

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
    public decimal ObtainedResult { get; set; }
}
