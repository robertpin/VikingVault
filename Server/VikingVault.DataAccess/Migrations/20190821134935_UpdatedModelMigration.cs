using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VikingVault.DataAccess.Migrations
{
    public partial class UpdatedModelMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Roles_RoleId",
                table: "User");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId",
                table: "User",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Blocked",
                table: "Cards",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "AutomaticPayments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CompanyId = table.Column<int>(nullable: false),
                    Amount = table.Column<float>(nullable: false),
                    InitialPaymentDate = table.Column<DateTime>(nullable: false),
                    LastPaymentDate = table.Column<DateTime>(nullable: false),
                    PayingUserId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AutomaticPayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AutomaticPayments_User_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AutomaticPayments_User_PayingUserId",
                        column: x => x.PayingUserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AutomaticPayments_CompanyId",
                table: "AutomaticPayments",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_AutomaticPayments_PayingUserId",
                table: "AutomaticPayments",
                column: "PayingUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Roles_RoleId",
                table: "User",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Roles_RoleId",
                table: "User");

            migrationBuilder.DropTable(
                name: "AutomaticPayments");

            migrationBuilder.DropColumn(
                name: "Blocked",
                table: "Cards");

            migrationBuilder.AlterColumn<int>(
                name: "RoleId",
                table: "User",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_User_Roles_RoleId",
                table: "User",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
