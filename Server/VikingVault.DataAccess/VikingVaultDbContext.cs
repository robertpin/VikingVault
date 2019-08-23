using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VikingVault.DataAccess.Enums;
using VikingVault.DataAccess.Models;

namespace VikingVault.DataAccess
{
    public class VikingVaultDbContext: DbContext
    {
        public VikingVaultDbContext(DbContextOptions<VikingVaultDbContext> options)
            : base(options)
        {
        }
        
        public DbSet<User> User { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<BankAccount> BankAccount { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<AutomaticPayment> AutomaticPayments { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<TransferRequest> TransferRequests { get; set; }
        
        public void SeedAdmin(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().
                HasData(new {
                    Id = 1,
                    Email = "admin",
                    Password = "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
                    FirstName = "Admin Firstname",
                    LastName = "Admin Lastname",
                    PictureLink = "",
                    Address = "Ioan Budai Deleanu Street 64",
                    Cnp = "1700820642466",
                    RoleId = 1
                });
        }

        public void SeedRoles(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().
                HasData(new
                {
                    Id = (int)RoleEnum.Admin,
                    Type = RoleEnum.Admin.ToString()
                },
                new
                {
                    Id = (int)RoleEnum.User,
                    Type = RoleEnum.User.ToString()
                },
                new
                {
                    Id = (int)RoleEnum.Company,
                    Type = RoleEnum.Company.ToString()
                }
         );
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasAlternateKey(c => c.Email)
                .HasName("Email");

            SeedAdmin(modelBuilder);
            SeedRoles(modelBuilder);

            modelBuilder.Entity<Card>()
                .HasAlternateKey(card => card.CardNumber)
                .HasName("AlternateKey_CardNumber");
        }
    }
}
