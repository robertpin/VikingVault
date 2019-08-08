using System;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;
using Microsoft.EntityFrameworkCore;
using VikingVault.Services.Exceptions;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using VikingVault.Services.Utils;
using System.Linq;

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
                if (e is DbUpdateException || e is DbUpdateConcurrencyException)
                {
                    throw new UserServiceException();
                }
            }
            return user;
        }

        public void DeleteUser(UserEmail userEmail)
        {
            try
            {
                User user = this.GetByEmail(userEmail.Email);
                _dbContext.Remove(user);
                _dbContext.SaveChanges();
            }
            catch(Exception e)
            {
                throw new UserServiceException();
            }
        }

        public User GetByEmail(string email)
        {
            return _dbContext.User.SingleOrDefault(user => user.Email == email);
        }

        public User GetById(int userId)
        {
            return _dbContext.User.Find(userId);
        }
    }
}
