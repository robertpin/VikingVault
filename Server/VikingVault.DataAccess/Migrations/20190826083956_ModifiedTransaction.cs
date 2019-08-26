using Microsoft.EntityFrameworkCore.Migrations;

namespace VikingVault.DataAccess.Migrations
{
    public partial class ModifiedTransaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_User_SenderOrReceiverId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "SenderOrReceiverId",
                table: "Transactions",
                newName: "SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_SenderOrReceiverId",
                table: "Transactions",
                newName: "IX_Transactions_SenderId");

            migrationBuilder.AddColumn<int>(
                name: "ReceiverId",
                table: "Transactions",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_ReceiverId",
                table: "Transactions",
                column: "ReceiverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_User_ReceiverId",
                table: "Transactions",
                column: "ReceiverId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_User_SenderId",
                table: "Transactions",
                column: "SenderId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_User_ReceiverId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_User_SenderId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_ReceiverId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ReceiverId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "SenderId",
                table: "Transactions",
                newName: "SenderOrReceiverId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_SenderId",
                table: "Transactions",
                newName: "IX_Transactions_SenderOrReceiverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_User_SenderOrReceiverId",
                table: "Transactions",
                column: "SenderOrReceiverId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
