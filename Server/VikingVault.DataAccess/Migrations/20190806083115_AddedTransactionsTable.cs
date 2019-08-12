using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VikingVault.DataAccess.Migrations
{
    public partial class AddedTransactionsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Lastname",
                table: "UsersProfilePages",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Firstname",
                table: "UsersProfilePages",
                newName: "FirstName");

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Type = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    Amount = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "UsersProfilePages",
                newName: "Lastname");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "UsersProfilePages",
                newName: "Firstname");
        }
    }
}
