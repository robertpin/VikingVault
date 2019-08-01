using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class UserService : IUserService
    {
        private readonly VikingVaultDbContext _dbContext;

        public UserService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public User CreateUser(User user)
        {
            user.Role = "user";
            try
            {
                _dbContext.Add(user);
                _dbContext.SaveChanges();
                return user;
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public User GetById(int userId)
        {
            return _dbContext.User.Find(userId);
        }
    }
}
