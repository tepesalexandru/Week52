using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Week52.DataAccess.Migrations
{
    public partial class dbrefactor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Progress_Days_BasicDayId",
                table: "Progress");

            migrationBuilder.DropTable(
                name: "Days");

            migrationBuilder.DropColumn(
                name: "Completed",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "Complete",
                table: "Progress");

            migrationBuilder.DropColumn(
                name: "GoalId",
                table: "Progress");

            migrationBuilder.DropColumn(
                name: "TaskId",
                table: "Progress");

            migrationBuilder.RenameColumn(
                name: "Progress",
                table: "Tasks",
                newName: "Estimation");

            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "Tasks",
                newName: "DayCompleted");

            migrationBuilder.RenameColumn(
                name: "Progress",
                table: "Progress",
                newName: "Minutes");

            migrationBuilder.RenameColumn(
                name: "BasicDayId",
                table: "Progress",
                newName: "BasicTaskId");

            migrationBuilder.RenameIndex(
                name: "IX_Progress_BasicDayId",
                table: "Progress",
                newName: "IX_Progress_BasicTaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_Progress_Tasks_BasicTaskId",
                table: "Progress",
                column: "BasicTaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Progress_Tasks_BasicTaskId",
                table: "Progress");

            migrationBuilder.RenameColumn(
                name: "Estimation",
                table: "Tasks",
                newName: "Progress");

            migrationBuilder.RenameColumn(
                name: "DayCompleted",
                table: "Tasks",
                newName: "Duration");

            migrationBuilder.RenameColumn(
                name: "Minutes",
                table: "Progress",
                newName: "Progress");

            migrationBuilder.RenameColumn(
                name: "BasicTaskId",
                table: "Progress",
                newName: "BasicDayId");

            migrationBuilder.RenameIndex(
                name: "IX_Progress_BasicTaskId",
                table: "Progress",
                newName: "IX_Progress_BasicDayId");

            migrationBuilder.AddColumn<bool>(
                name: "Completed",
                table: "Tasks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Complete",
                table: "Progress",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "GoalId",
                table: "Progress",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "TaskId",
                table: "Progress",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Days",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DayNumber = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    WeekId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Days", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Days_Weeks_WeekId",
                        column: x => x.WeekId,
                        principalTable: "Weeks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Days_WeekId",
                table: "Days",
                column: "WeekId");

            migrationBuilder.AddForeignKey(
                name: "FK_Progress_Days_BasicDayId",
                table: "Progress",
                column: "BasicDayId",
                principalTable: "Days",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
