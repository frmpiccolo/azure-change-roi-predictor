using System;
using System.Collections.Generic;

namespace ChangeRoiPredictor.Api.DTOs;

/// <summary>
/// Data Transfer Object for returning project details.
/// </summary>
public class ProjectDto
{
    /// <summary>
    /// Unique identifier for the project.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Name of the project.
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// Description of the project.
    /// </summary>
    public string Description { get; set; }

    /// <summary>
    /// Duration of the project in months.
    /// </summary>
    public int DurationInMonths { get; set; }

    /// <summary>
    /// Start date of the project.
    /// </summary>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// End date of the project.
    /// </summary>
    public DateTime EndDate { get; set; }

    /// <summary>
    /// Total budget allocated for the project.
    /// </summary>
    public decimal TotalBudget { get; set; }

    /// <summary>
    /// Number of people affected by the project.
    /// </summary>
    public int NumberOfPeopleAffected { get; set; }

    /// <summary>
    /// A measure of the project’s complexity (scale 1-5).
    /// </summary>
    public int? ComplexityRating { get; set; }

    /// <summary>
    /// Engagement score of the project (scale 1-18).
    /// </summary>
    public int? EngagementScore { get; set; }

    /// <summary>
    /// Risk level of the project (scale 1-5).
    /// </summary>
    public int? RiskLevel { get; set; }

    /// <summary>
    /// Measures how prepared teams and stakeholders are for the upcoming change (scale 1-18).
    /// </summary>
    public int? ReadinessLevel { get; set; }

    /// <summary>
    /// Methodology used for the project (e.g., "Agile", "Waterfall").
    /// </summary>
    public string Methodology { get; set; }

    /// <summary>
    /// Collection of monthly data entries for the project.
    /// </summary>
    public IEnumerable<ProjectMonthlyDataDto> MonthlyData { get; set; }
}
