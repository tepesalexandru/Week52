using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Week52.DataAccess.Migrations
{
    public partial class progresstaskfull : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Progress_Tasks_BasicTaskId",
                table: "Progress");

            migrationBuilder.DropIndex(
                name: "IX_Progress_BasicTaskId",
                table: "Progress");

            migrationBuilder.DropColumn(
                name: "BasicTaskId",
                table: "Progress");

            migrationBuilder.AddColumn<Guid>(
                name: "TaskId",
                table: "Progress",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Progress_TaskId",
                table: "Progress",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_Progress_Tasks_TaskId",
                table: "Progress",
                column: "TaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Progress_Tasks_TaskId",
                table: "Progress");

            migrationBuilder.DropIndex(
                name: "IX_Progress_TaskId",
                table: "Progress");

            migrationBuilder.DropColumn(
                name: "TaskId",
                table: "Progress");

            migrationBuilder.AddColumn<Guid>(
                name: "BasicTaskId",
                table: "Progress",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Progress_BasicTaskId",
                table: "Progress",
                column: "BasicTaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_Progress_Tasks_BasicTaskId",
                table: "Progress",
                column: "BasicTaskId",
                principalTable: "Tasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
