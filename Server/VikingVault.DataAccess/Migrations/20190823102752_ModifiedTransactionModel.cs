using Microsoft.EntityFrameworkCore.Migrations;

namespace VikingVault.DataAccess.Migrations
{
    public partial class ModifiedTransactionModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OtherParty",
                table: "Transactions",
                newName: "SenderOrReceiver");

            migrationBuilder.AddColumn<string>(
                name: "Details",
                table: "Transactions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Details",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "SenderOrReceiver",
                table: "Transactions",
                newName: "OtherParty");
        }
    }
}
