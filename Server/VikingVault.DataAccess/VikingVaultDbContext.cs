using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
        public DbSet<BankAccount> BankAccount { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Transaction> Transactions { get; set; }  
        
        public void SeedAdmin(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().
                HasData(new User
                {
                    Id = 1,
                    Email = "admin",
                    Password = "admin",
                    FirstName = "Admin Firstname",
                    LastName = "Admin Lastname",
                    PictureLink = "",
                    Address = "Ioan Budai Deleanu Street 64",
                    Cnp = "1700820642466",
                    Role = "admin"
                });
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasAlternateKey(c => c.Email)
                .HasName("Email");

            SeedAdmin(modelBuilder);
        }
    }
}
