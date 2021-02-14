using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Week52.DataAccess.Migrations
{
    public partial class improvedtasks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Completed",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Progress",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "WeekNumber",
                table: "Goals");

            migrationBuilder.AddColumn<Guid>(
                name: "WeekId",
                table: "Goals",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Goals_WeekId",
                table: "Goals",
                column: "WeekId");

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_Weeks_WeekId",
                table: "Goals",
                column: "WeekId",
                principalTable: "Weeks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goals_Weeks_WeekId",
                table: "Goals");

            migrationBuilder.DropIndex(
                name: "IX_Goals_WeekId",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "WeekId",
                table: "Goals");

            migrationBuilder.AddColumn<bool>(
                name: "Completed",
                table: "Tasks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Progress",
                table: "Tasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WeekNumber",
                table: "Goals",
                type: "int",
                nullable: true);
        }
    }
}
