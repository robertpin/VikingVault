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
            int userId = (int)tokenObject.Payload["Id"];
            var returnedUser = _dbContext.User.SingleOrDefault(u => u.Id == userId);
            var userPage = new UserProfilePageViewModel();

            if (returnedUser != null)
            {
                userPage.Id = returnedUser.Id;
                userPage.Firstname = returnedUser.FirstName;
                userPage.Lastname = returnedUser.LastName;
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
