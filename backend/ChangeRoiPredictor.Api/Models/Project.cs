using System;
using System.Collections.Generic;

namespace ChangeRoiPredictor.Api.Models;

/// <summary>
/// Represents a project with its details and monthly data.
/// </summary>
public class Project
{
    /// <summary>
    /// Unique identifier for the project.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Name of the project.
    /// </summary>
    public required string Name { get; set; }

    /// <summary>
    /// Description of the project.
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Duration of the project in months.
    /// </summary>
    public int DurationInMonths { get; set; }

    /// <summary>
    /// Start date of the project.
    /// </summary>
    public DateOnly StartDate { get; set; }

    /// <summary>
    /// End date of the project.
    /// </summary>
    public DateOnly EndDate { get; set; }

    /// <summary>
    /// Total budget allocated for the project.
    /// </summary>
    public decimal TotalBudget { get; set; }

    /// <summary>
    /// Number of people affected by the project.
    /// </summary>
    public int NumberOfPeopleAffected { get; set; }

    /// <summary>
    /// Expected outcome of the project.
    /// </summary>
    /// <remarks>
    /// Scale 1-5
    /// </remarks>
    public int? ComplexityRating { get; set; }

    /// <summary>
    /// Engagement score of the project.
    /// </summary>
    /// <remarks>
    /// Scale 1-18
    /// </remarks>
    public int? EngagementScore { get; set; }

    /// <summary>
    /// Risk level of the project.
    /// </summary>
    /// <remarks>
    /// Scale 1-5
    /// </remarks>
    public int? RiskLevel { get; set; }

    /// <summary>
    /// Measures how prepared teams and stakeholders are for the upcoming change.
    /// </summary>
    /// <remarks>
    /// Scale 1-18
    /// </remarks>
    public int? ReadinessLevel { get; set; }

    /// <summary>
    /// Methodology used for the project.
    /// </summary>
    /// <remarks>
    /// "Agile", "Waterfall", etc.
    /// </remarks>    
    public string? Methodology { get; set; }

    /// <summary>
    /// Overall ROI of the project.
    /// </summary>
    public decimal? OverallROI { get; set; }

    /// <summary>
    /// Collection of insights for the project.
    /// </summary>
    public ICollection<ProjectInsight>? ProjectInsights { get; set; }

    /// <summary>
    /// Collection of monthly data entries for the project.
    /// </summary>
    public ICollection<ProjectMonthlyData>? MonthlyData { get; set; }
}
