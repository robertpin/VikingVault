using Microsoft.EntityFrameworkCore.Migrations;

namespace VikingVault.DataAccess.Migrations
{
    public partial class addedBlockedAttributeForCard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CardNumber",
                table: "Cards",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<bool>(
                name: "Blocked",
                table: "Cards",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddUniqueConstraint(
                name: "AlternateKey_CardNumber",
                table: "Cards",
                column: "CardNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AlternateKey_CardNumber",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "Blocked",
                table: "Cards");

            migrationBuilder.AlterColumn<string>(
                name: "CardNumber",
                table: "Cards",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
