using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VikingVault.API.Controllers;
using VikingVault.DataAccess.Models;

namespace VikingVault.DataAccess
{
    public class VikingVaultDbContext: DbContext
    {
        public VikingVaultDbContext(DbContextOptions<VikingVaultDbContext> options)
            : base(options)
        { }

        public DbSet<Bank> Banks { get; set; }
        public DbSet<UserAccount> UserAccounts { get; set; }
    }
}
