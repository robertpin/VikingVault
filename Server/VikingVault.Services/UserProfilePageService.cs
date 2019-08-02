using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class UserProfilePageService : IUserProfilePageService
    {
        private readonly VikingVaultDbContext _dbContext;

        public UserProfilePageService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserProfilePageViewModel GetUserProfileData(string token)
        {
            var tokenObject = new JwtSecurityToken(token);
            string userId = tokenObject.Payload["Id"].ToString();
            var returnedUser = _dbContext.User.SingleOrDefault(u => u.Id == Int32.Parse(userId));
            var userPage = new UserProfilePageViewModel();

            if (returnedUser != null)
            {
                userPage.Id = returnedUser.Id;
                userPage.FirstName = returnedUser.FirstName;
                userPage.LastName = returnedUser.LastName;
                userPage.Address = returnedUser.Address;
                userPage.Cnp = returnedUser.Cnp;
                userPage.Email = returnedUser.Email;
                userPage.PictureLink = returnedUser.PictureLink;
                return userPage;
            }
            return null;
        }
    }
}
