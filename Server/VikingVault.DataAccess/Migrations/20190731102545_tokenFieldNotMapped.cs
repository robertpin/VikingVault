using Microsoft.EntityFrameworkCore.Migrations;

namespace VikingVault.DataAccess.Migrations
{
    public partial class tokenFieldNotMapped : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Token",
                table: "User");

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "User",
                nullable: true,
                oldClrType: typeof(string));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "User",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Token",
                table: "User",
                nullable: true);
        }
    }
}
