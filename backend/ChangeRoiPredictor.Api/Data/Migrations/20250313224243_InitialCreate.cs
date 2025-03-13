using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChangeRoiPredictor.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DurationInMonths = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalBudget = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    NumberOfPeopleAffected = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectMonthlyData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    MonthlyBudget = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    MonthlyPeopleImpacted = table.Column<int>(type: "int", nullable: false),
                    ExpectedResult = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ObtainedResult = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectMonthlyData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectMonthlyData_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMonthlyData_ProjectId",
                table: "ProjectMonthlyData",
                column: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectMonthlyData");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
