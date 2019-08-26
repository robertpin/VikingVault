using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.API.SecurityFilters;
using VikingVault.DataAccess.Enums;
using VikingVault.DataAccess.Models;
using VikingVault.Services;
using VikingVault.Services.Abstractions;

namespace VikingVault.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationsService _notificationsService;

        public NotificationsController(INotificationsService notificationsService)
        {
            _notificationsService = notificationsService;
        }

        [Authorization(Role=RoleEnum.User)]
        [HttpGet]
        public ActionResult<List<Notification>> GetAllNotifications()
        {
            try
            {
                string token = Request.Headers["x-access-token"];
                return Ok(_notificationsService.GetAllNotifications(token));
            }
            catch (NotificationsServiceException e)
            {
                return StatusCode(500);
            }
        }

        [Authorization(Role=RoleEnum.User)]
        [HttpPut]
        public ActionResult ChangeNotificationStatus([FromBody] NotificationDTO notification)
        {
            try
            {
                _notificationsService.UpdateNotificationStatus(notification);
                return Ok();
            }
            catch(NotificationsServiceException e)
            {
                return StatusCode(500);
            }
        }
    }
}
