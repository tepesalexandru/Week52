using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Week52.DataAccess.Migrations
{
    public partial class addeddayweek : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Days_Weeks_BasicWeekId",
                table: "Days");

            migrationBuilder.DropIndex(
                name: "IX_Days_BasicWeekId",
                table: "Days");

            migrationBuilder.DropColumn(
                name: "BasicWeekId",
                table: "Days");

            migrationBuilder.DropColumn(
                name: "WeekNumber",
                table: "Days");

            migrationBuilder.AddColumn<Guid>(
                name: "WeekId",
                table: "Days",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Days_WeekId",
                table: "Days",
                column: "WeekId");

            migrationBuilder.AddForeignKey(
                name: "FK_Days_Weeks_WeekId",
                table: "Days",
                column: "WeekId",
                principalTable: "Weeks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Days_Weeks_WeekId",
                table: "Days");

            migrationBuilder.DropIndex(
                name: "IX_Days_WeekId",
                table: "Days");

            migrationBuilder.DropColumn(
                name: "WeekId",
                table: "Days");

            migrationBuilder.AddColumn<Guid>(
                name: "BasicWeekId",
                table: "Days",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WeekNumber",
                table: "Days",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Days_BasicWeekId",
                table: "Days",
                column: "BasicWeekId");

            migrationBuilder.AddForeignKey(
                name: "FK_Days_Weeks_BasicWeekId",
                table: "Days",
                column: "BasicWeekId",
                principalTable: "Weeks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
