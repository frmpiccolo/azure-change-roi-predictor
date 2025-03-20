using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChangeRoiPredictor.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class ProjectRoiAndInsights : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "OverallROI",
                table: "Projects",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "ObtainedResult",
                table: "ProjectMonthlyData",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<decimal>(
                name: "MonthlyROI",
                table: "ProjectMonthlyData",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProjectInsight",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectInsight", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectInsight_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectMonthlyInsight",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectMonthlyDataId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectMonthlyInsight", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectMonthlyInsight_ProjectMonthlyData_ProjectMonthlyDataId",
                        column: x => x.ProjectMonthlyDataId,
                        principalTable: "ProjectMonthlyData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectInsight_ProjectId",
                table: "ProjectInsight",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMonthlyInsight_ProjectMonthlyDataId",
                table: "ProjectMonthlyInsight",
                column: "ProjectMonthlyDataId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectInsight");

            migrationBuilder.DropTable(
                name: "ProjectMonthlyInsight");

            migrationBuilder.DropColumn(
                name: "OverallROI",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "MonthlyROI",
                table: "ProjectMonthlyData");

            migrationBuilder.AlterColumn<decimal>(
                name: "ObtainedResult",
                table: "ProjectMonthlyData",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);
        }
    }
}
