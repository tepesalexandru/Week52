using Microsoft.EntityFrameworkCore.Migrations;

namespace Week52.DataAccess.Migrations
{
    public partial class addedweeknumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WeekNumber",
                table: "Goals",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WeekNumber",
                table: "Goals");
        }
    }
}
