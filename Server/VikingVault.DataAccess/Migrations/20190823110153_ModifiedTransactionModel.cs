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
                newName: "Details");

            migrationBuilder.AddColumn<int>(
                name: "SenderOrReceiverId",
                table: "Transactions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_SenderOrReceiverId",
                table: "Transactions",
                column: "SenderOrReceiverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_User_SenderOrReceiverId",
                table: "Transactions",
                column: "SenderOrReceiverId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_User_SenderOrReceiverId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_SenderOrReceiverId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "SenderOrReceiverId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "Details",
                table: "Transactions",
                newName: "OtherParty");
        }
    }
}
