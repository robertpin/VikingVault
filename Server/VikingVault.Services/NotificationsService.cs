using Microsoft.EntityFrameworkCore;
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

        public User GetUserFromToken(string token)
        {
            var tokenObject = new JwtSecurityToken(token);
            var userId = Int32.Parse(tokenObject.Payload["Id"].ToString());
            return _dbContext.User.SingleOrDefault(u => u.Id == userId);
        }

        public List<Notification> GetAllNotifications(string token)
        {
            try
            {
                var user = GetUserFromToken(token);
                return _dbContext.Notifications
                    .Where(n => n.User.Id == user.Id)
                    .ToList();
            }
            catch( Exception e)
            {
                throw new NotificationsServiceException(e.Message);
            }
            
        }

        public void UpdateNotificationStatus(NotificationDTO notification)
        {
            try
            {
                var currentNotification = _dbContext.Notifications
                    .Include(n => n.User)
                    .SingleOrDefault(n => n.Id == notification.Id);
                currentNotification.Read = notification.Read;
                _dbContext.Notifications.Update(currentNotification);
                _dbContext.SaveChanges();
            }
            catch(Exception e)
            {
                throw new NotificationsServiceException(e.Message);
            }
        }
    }
}
