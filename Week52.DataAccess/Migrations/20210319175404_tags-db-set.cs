using Microsoft.EntityFrameworkCore.Migrations;

namespace Week52.DataAccess.Migrations
{
    public partial class tagsdbset : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BasicTagBasicTask_BasicTag_TagsId",
                table: "BasicTagBasicTask");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BasicTag",
                table: "BasicTag");

            migrationBuilder.RenameTable(
                name: "BasicTag",
                newName: "Tags");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tags",
                table: "Tags",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BasicTagBasicTask_Tags_TagsId",
                table: "BasicTagBasicTask",
                column: "TagsId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BasicTagBasicTask_Tags_TagsId",
                table: "BasicTagBasicTask");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tags",
                table: "Tags");

            migrationBuilder.RenameTable(
                name: "Tags",
                newName: "BasicTag");

            migrationBuilder.AddPrimaryKey(
                name: "PK_BasicTag",
                table: "BasicTag",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BasicTagBasicTask_BasicTag_TagsId",
                table: "BasicTagBasicTask",
                column: "TagsId",
                principalTable: "BasicTag",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
