using ChangeRoiPredictor.Api.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ChangeRoiPredictor.Api.DTOs;

/// <summary>
/// Data Transfer Object for updating an existing project.
/// </summary>
public class UpdateProjectDto
{
    /// <summary>
    /// Name of the project.
    /// </summary>
    [Required]
    public required string Name { get; set; }

    /// <summary>
    /// Description of the project.
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Duration of the project in months.
    /// </summary>
    [Required]
    public int DurationInMonths { get; set; }

    /// <summary>
    /// Start date of the project.
    /// </summary>
    [Required]
    public DateOnly StartDate { get; set; }

    /// <summary>
    /// End date of the project.
    /// </summary>
    [Required]
    public DateOnly EndDate { get; set; }

    /// <summary>
    /// Total budget allocated for the project.
    /// </summary>
    [Required]
    public decimal TotalBudget { get; set; }

    /// <summary>
    /// Number of people affected by the project.
    /// </summary>
    [Required]
    public int NumberOfPeopleAffected { get; set; }

    /// <summary>
    /// (Optional) A measure of the project’s complexity (scale 1-5).
    /// </summary>
    public int? ComplexityRating { get; set; }

    /// <summary>
    /// (Optional) Engagement score of the project (scale 1-18).
    /// </summary>
    public int? EngagementScore { get; set; }

    /// <summary>
    /// (Optional) Risk level of the project (scale 1-5).
    /// </summary>
    public int? RiskLevel { get; set; }

    /// <summary>
    /// (Optional) How prepared teams and stakeholders are for the change (scale 1-18).
    /// </summary>
    public int? ReadinessLevel { get; set; }

    /// <summary>
    /// (Optional) Methodology used for the project (e.g., "Agile", "Waterfall").
    /// </summary>
    public string? Methodology { get; set; }

    /// <summary>
    /// Overall ROI of the project.
    /// </summary>
    public decimal? OverallROI { get; set; }

    /// <summary>
    /// Collection of insights for the project.
    /// </summary>
    public ICollection<UpdateProjectInsightDto>? ProjectInsights { get; set; }

    /// <summary>
    /// Collection of monthly data entries for the project.
    /// </summary>
    public ICollection<UpdateProjectMonthlyDataDto>? MonthlyData { get; set; }
}
