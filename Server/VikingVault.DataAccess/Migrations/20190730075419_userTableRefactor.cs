using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace VikingVault.DataAccess.Migrations
{
    public partial class userTableRefactor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Lastname",
                table: "User",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Firstname",
                table: "User",
                newName: "FirstName");

            migrationBuilder.CreateTable(
                name: "UsersProfilePages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Firstname = table.Column<string>(nullable: true),
                    Lastname = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Cnp = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PictureLink = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersProfilePages", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsersProfilePages");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "User",
                newName: "Lastname");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "User",
                newName: "Firstname");
        }
    }
}
