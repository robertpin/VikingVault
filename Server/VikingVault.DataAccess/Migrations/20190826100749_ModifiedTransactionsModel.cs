using Microsoft.EntityFrameworkCore.Migrations;

namespace VikingVault.DataAccess.Migrations
{
    public partial class ModifiedTransactionsModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AutomaticPayments_User_CompanyId",
                table: "AutomaticPayments");

            migrationBuilder.RenameColumn(
                name: "OtherParty",
                table: "Transactions",
                newName: "Details");

            migrationBuilder.RenameColumn(
                name: "CompanyId",
                table: "AutomaticPayments",
                newName: "ReceivingCompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_AutomaticPayments_CompanyId",
                table: "AutomaticPayments",
                newName: "IX_AutomaticPayments_ReceivingCompanyId");

            migrationBuilder.AddColumn<int>(
                name: "ReceiverId",
                table: "Transactions",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SenderId",
                table: "Transactions",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsEnabled",
                table: "AutomaticPayments",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_ReceiverId",
                table: "Transactions",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_SenderId",
                table: "Transactions",
                column: "SenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_AutomaticPayments_User_ReceivingCompanyId",
                table: "AutomaticPayments",
                column: "ReceivingCompanyId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_User_ReceiverId",
                table: "Transactions",
                column: "ReceiverId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_User_SenderId",
                table: "Transactions",
                column: "SenderId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AutomaticPayments_User_ReceivingCompanyId",
                table: "AutomaticPayments");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_User_ReceiverId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_User_SenderId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_ReceiverId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_SenderId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "ReceiverId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "SenderId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "IsEnabled",
                table: "AutomaticPayments");

            migrationBuilder.RenameColumn(
                name: "Details",
                table: "Transactions",
                newName: "OtherParty");

            migrationBuilder.RenameColumn(
                name: "ReceivingCompanyId",
                table: "AutomaticPayments",
                newName: "CompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_AutomaticPayments_ReceivingCompanyId",
                table: "AutomaticPayments",
                newName: "IX_AutomaticPayments_CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_AutomaticPayments_User_CompanyId",
                table: "AutomaticPayments",
                column: "CompanyId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
