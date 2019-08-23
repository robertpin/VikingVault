using Microsoft.EntityFrameworkCore.Migrations;

namespace VikingVault.DataAccess.Migrations
{
    public partial class changedCompanyColumnName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AutomaticPayments_User_CompanyId",
                table: "AutomaticPayments");

            migrationBuilder.RenameColumn(
                name: "CompanyId",
                table: "AutomaticPayments",
                newName: "ReceivingCompanyId");

            migrationBuilder.RenameIndex(
                name: "IX_AutomaticPayments_CompanyId",
                table: "AutomaticPayments",
                newName: "IX_AutomaticPayments_ReceivingCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_AutomaticPayments_User_ReceivingCompanyId",
                table: "AutomaticPayments",
                column: "ReceivingCompanyId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AutomaticPayments_User_ReceivingCompanyId",
                table: "AutomaticPayments");

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
