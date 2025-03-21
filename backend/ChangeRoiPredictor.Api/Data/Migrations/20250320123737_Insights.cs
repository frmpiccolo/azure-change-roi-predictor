using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChangeRoiPredictor.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class Insights : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectInsight_Projects_ProjectId",
                table: "ProjectInsight");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectMonthlyInsight_ProjectMonthlyData_ProjectMonthlyDataId",
                table: "ProjectMonthlyInsight");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectMonthlyInsight",
                table: "ProjectMonthlyInsight");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectInsight",
                table: "ProjectInsight");

            migrationBuilder.RenameTable(
                name: "ProjectMonthlyInsight",
                newName: "ProjectMonthlyInsights");

            migrationBuilder.RenameTable(
                name: "ProjectInsight",
                newName: "ProjectInsights");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectMonthlyInsight_ProjectMonthlyDataId",
                table: "ProjectMonthlyInsights",
                newName: "IX_ProjectMonthlyInsights_ProjectMonthlyDataId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectInsight_ProjectId",
                table: "ProjectInsights",
                newName: "IX_ProjectInsights_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectMonthlyInsights",
                table: "ProjectMonthlyInsights",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectInsights",
                table: "ProjectInsights",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectInsights_Projects_ProjectId",
                table: "ProjectInsights",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectMonthlyInsights_ProjectMonthlyData_ProjectMonthlyDataId",
                table: "ProjectMonthlyInsights",
                column: "ProjectMonthlyDataId",
                principalTable: "ProjectMonthlyData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectInsights_Projects_ProjectId",
                table: "ProjectInsights");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectMonthlyInsights_ProjectMonthlyData_ProjectMonthlyDataId",
                table: "ProjectMonthlyInsights");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectMonthlyInsights",
                table: "ProjectMonthlyInsights");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectInsights",
                table: "ProjectInsights");

            migrationBuilder.RenameTable(
                name: "ProjectMonthlyInsights",
                newName: "ProjectMonthlyInsight");

            migrationBuilder.RenameTable(
                name: "ProjectInsights",
                newName: "ProjectInsight");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectMonthlyInsights_ProjectMonthlyDataId",
                table: "ProjectMonthlyInsight",
                newName: "IX_ProjectMonthlyInsight_ProjectMonthlyDataId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectInsights_ProjectId",
                table: "ProjectInsight",
                newName: "IX_ProjectInsight_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectMonthlyInsight",
                table: "ProjectMonthlyInsight",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectInsight",
                table: "ProjectInsight",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectInsight_Projects_ProjectId",
                table: "ProjectInsight",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectMonthlyInsight_ProjectMonthlyData_ProjectMonthlyDataId",
                table: "ProjectMonthlyInsight",
                column: "ProjectMonthlyDataId",
                principalTable: "ProjectMonthlyData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
