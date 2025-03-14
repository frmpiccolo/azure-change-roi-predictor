using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChangeRoiPredictor.Api.Data.Migrations;

public partial class AddOptionalFieldsToProject : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
            name: "Description",
            table: "Projects",
            type: "nvarchar(max)",
            nullable: true);

        migrationBuilder.AddColumn<int>(
            name: "ComplexityRating",
            table: "Projects",
            type: "int",
            nullable: true);

        migrationBuilder.AddColumn<int>(
            name: "EngagementScore",
            table: "Projects",
            type: "int",
            nullable: true);

        migrationBuilder.AddColumn<int>(
            name: "RiskLevel",
            table: "Projects",
            type: "int",
            nullable: true);

        migrationBuilder.AddColumn<int>(
            name: "ReadinessLevel",
            table: "Projects",
            type: "int",
            nullable: true);

        migrationBuilder.AddColumn<string>(
            name: "Methodology",
            table: "Projects",
            type: "nvarchar(max)",
            nullable: true);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "Description",
            table: "Projects");

        migrationBuilder.DropColumn(
            name: "ComplexityRating",
            table: "Projects");

        migrationBuilder.DropColumn(
            name: "EngagementScore",
            table: "Projects");

        migrationBuilder.DropColumn(
            name: "RiskLevel",
            table: "Projects");

        migrationBuilder.DropColumn(
            name: "ReadinessLevel",
            table: "Projects");

        migrationBuilder.DropColumn(
            name: "Methodology",
            table: "Projects");
    }
}
