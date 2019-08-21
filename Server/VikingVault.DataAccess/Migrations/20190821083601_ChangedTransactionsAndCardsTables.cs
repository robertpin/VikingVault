using Microsoft.EntityFrameworkCore.Migrations;

namespace VikingVault.DataAccess.Migrations
{
    public partial class ChangedTransactionsAndCardsTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_User_userId",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Transactions",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_userId",
                table: "Transactions",
                newName: "IX_Transactions_UserId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Transactions",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_User_UserId",
                table: "Transactions",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_User_UserId",
                table: "Transactions");

            migrationBuilder.DropUniqueConstraint(
                name: "AlternateKey_CardNumber",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "Blocked",
                table: "Cards");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Transactions",
                newName: "userId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_UserId",
                table: "Transactions",
                newName: "IX_Transactions_userId");

            migrationBuilder.AlterColumn<int>(
                name: "userId",
                table: "Transactions",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "CardNumber",
                table: "Cards",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_User_userId",
                table: "Transactions",
                column: "userId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
