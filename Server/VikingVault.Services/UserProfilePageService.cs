using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public UserProfilePageViewModel GetUserProfileData(int id)
        {
            var returnedUser = _dbContext.User.SingleOrDefault(u => u.Id == id);

            var userPage = new UserProfilePageViewModel();

            if (returnedUser != null)
            {
                userPage.Id = returnedUser.Id;
                userPage.Firstname = returnedUser.Firstname;
                userPage.Lastname = returnedUser.Lastname;
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
