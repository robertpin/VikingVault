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
    public class NotificationsService : INotificationsService
    {
        private readonly VikingVaultDbContext _dbContext;

        public NotificationsService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Notification> GetAllNotifications(string token)
        {
            try
            {
                var tokenObject = new JwtSecurityToken(token);
                var userId = Int32.Parse(tokenObject.Payload["Id"].ToString());
                return _dbContext.Notifications.Where(n => n.User.Id == userId).ToList();
            }
            catch( Exception e)
            {
                throw new NotificationsServiceException(e.Message);
            }
            
        }
    }
}
