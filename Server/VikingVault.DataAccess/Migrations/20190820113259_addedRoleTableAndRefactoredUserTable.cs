using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VikingVault.DataAccess.Migrations
{
    public partial class addedRoleTableAndRefactoredUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_User_userId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "User");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Transactions",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_userId",
                table: "Transactions",
                newName: "IX_Transactions_UserId");

            migrationBuilder.AddColumn<int>(
                name: "RoleId",
                table: "User",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "Type" },
                values: new object[] { 1, 0 });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "Type" },
                values: new object[] { 2, 1 });

            migrationBuilder.InsertData(
                table: "Role",
                columns: new[] { "Id", "Type" },
                values: new object[] { 3, 2 });

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "RoleId",
                value: 1);

            migrationBuilder.CreateIndex(
                name: "IX_User_RoleId",
                table: "User",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_User_UserId",
                table: "Transactions",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_User_Role_RoleId",
                table: "User",
                column: "RoleId",
                principalTable: "Role",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_User_UserId",
                table: "Transactions");

            migrationBuilder.DropForeignKey(
                name: "FK_User_Role_RoleId",
                table: "User");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropIndex(
                name: "IX_User_RoleId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "User");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Transactions",
                newName: "userId");

            migrationBuilder.RenameIndex(
                name: "IX_Transactions_UserId",
                table: "Transactions",
                newName: "IX_Transactions_userId");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "User",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "Id",
                keyValue: 1,
                column: "Role",
                value: "admin");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_User_userId",
                table: "Transactions",
                column: "userId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
