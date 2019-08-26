﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VikingVault.DataAccess;

namespace VikingVault.DataAccess.Migrations
{
    [DbContext(typeof(VikingVaultDbContext))]
    [Migration("20190826060558_CreatedNotificationModel")]
    partial class CreatedNotificationModel
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("VikingVault.DataAccess.Models.AutomaticPayment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("Amount");

                    b.Property<int>("CompanyId");

                    b.Property<DateTime>("InitialPaymentDate");

                    b.Property<DateTime>("LastPaymentDate");

                    b.Property<int?>("PayingUserId");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("PayingUserId");

                    b.ToTable("AutomaticPayments");
                });

            modelBuilder.Entity("VikingVault.DataAccess.Models.BankAccount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("Balance");

                    b.Property<string>("CurrencyType")
                        .IsRequired();

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("BankAccount");
                });

            modelBuilder.Entity("VikingVault.DataAccess.Models.Card", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Blocked");

                    b.Property<int>("CCV");

                    b.Property<string>("CardNumber")
                        .IsRequired();

                    b.Property<DateTime>("ExpirationDate");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasAlternateKey("CardNumber")
                        .HasName("AlternateKey_CardNumber");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Cards");
                });

            modelBuilder.Entity("VikingVault.DataAccess.Models.Notification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Read");

                    b.Property<string>("Text")
                        .IsRequired();

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("VikingVault.DataAccess.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Type")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Type = "Admin"
                        },
                        new
                        {
                            Id = 2,
                            Type = "User"
                        },
                        new
                        {
                            Id = 3,
                            Type = "Company"
                        });
                });

            modelBuilder.Entity("VikingVault.DataAccess.Models.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("Amount");

                    b.Property<string>("Currency");

                    b.Property<DateTime>("Date");

                    b.Property<string>("OtherParty");

                    b.Property<string>("Type");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("VikingVault.DataAccess.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .IsRequired();

                    b.Property<string>("Cnp")
                        .IsRequired();

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired();

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<string>("PictureLink");

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasAlternateKey("Email")
                        .HasName("Email");

                    b.HasIndex("RoleId");

                    b.ToTable("User");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "Ioan Budai Deleanu Street 64",
                            Cnp = "1700820642466",
                            Email = "admin",
                            FirstName = "Admin Firstname",
                            LastName = "Admin Lastname",
                            Password = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
                            PictureLink = "",
                            RoleId = 1
                        });
                });

            modelBuilder.Entity("VikingVault.DataAccess.Models.AutomaticPayment", b =>
                {
                    b.HasOne("VikingVault.DataAccess.Models.User", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("VikingVault.DataAccess.Models.User", "PayingUser")
                        .WithMany()
                        .HasForeignKey("PayingUserId");
                });

            modelBuilder.Entity("VikingVault.DataAccess.Models.BankAccount", b =>
                {
                    b.HasOne("VikingVault.DataAccess.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("VikingVault.DataAccess.Models.Card", b =>
                {
                    b.HasOne("VikingVault.DataAccess.Models.User", "User")
                        .WithOne("Card")
                        .HasForeignKey("VikingVault.DataAccess.Models.Card", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("VikingVault.DataAccess.Models.Notification", b =>
                {
                    b.HasOne("VikingVault.DataAccess.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("VikingVault.DataAccess.Models.Transaction", b =>
                {
                    b.HasOne("VikingVault.DataAccess.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("VikingVault.DataAccess.Models.User", b =>
                {
                    b.HasOne("VikingVault.DataAccess.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}