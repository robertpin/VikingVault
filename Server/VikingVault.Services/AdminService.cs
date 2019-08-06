using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class AdminService : IAdminService
    {
        private readonly VikingVaultDbContext _dbContext;

        public AdminService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool IsAdmin(string token)
        {
            var tokenObject = new JwtSecurityToken(token);
            string userId = tokenObject.Payload["Id"].ToString();
            User returnedUser = _dbContext.User.SingleOrDefault(u => u.Id == Int32.Parse(userId));
            return returnedUser.Email == "admin";
        }
    }
}
