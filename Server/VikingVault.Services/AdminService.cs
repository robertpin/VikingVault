using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Enums;
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

        public List<UserProfileDataWithCard> GetAllUsers()
        {
            try
            {
                var users = _dbContext.User.Where(user => user.Role.Type == RoleEnum.User.ToString()).
                    GroupJoin(
                        _dbContext.Cards,
                        user => user.Id,
                        card => card.User.Id,
                        (user, card) =>
                        new UserProfileDataWithCard()
                        {
                            Id = user.Id,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Address = user.Address,
                            Email = user.Email,
                            PictureLink = user.PictureLink,
                            CardNumber = card.Count() != 0 ? card.ToArray<Card>()[0].CardNumber : "",
                            ExpirationDate = card.Count() != 0 ? GenerateExpirationDate(card.ToArray<Card>()[0].ExpirationDate) : ""
                        }).ToList();

                 return users;
            }
            catch(Exception e)
            {
                return null;
            }
        }

        public bool IsAdmin(string token)
        {
            if (token != null)
            {
                var tokenObject = new JwtSecurityToken(token);
                string userId = tokenObject.Payload["Id"].ToString();
                User returnedUser = _dbContext.User.SingleOrDefault(u => u.Id == Int32.Parse(userId));
                return returnedUser.Email == "admin";
            }

            return false; 
        }

        private string GenerateExpirationDate(DateTime expirationDate)
        {
            return expirationDate.Month + "/" + expirationDate.Year.ToString().Substring(2, 2);
        }
    }
}
