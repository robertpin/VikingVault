using System;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
using VikingVault.Services.Exceptions;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using VikingVault.Services.Utils;

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
                user.Password = PasswordEncryption.ComputeSha256Hash(user.Password);
                _dbContext.Add(user);
                _dbContext.SaveChanges();
            }
            catch(Exception e)
            {
                if (e is DbUpdateException || e is DbUpdateConcurrencyException) throw new UserServiceException();
            }
            return user;
        }

        public User GetById(int userId)
        {
            return _dbContext.User.Find(userId);
        }
    }
}
