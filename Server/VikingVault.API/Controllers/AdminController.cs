using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.API.SecurityFilters;
using VikingVault.DataAccess.Enums;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

namespace VikingVault.API.Controllers
{
	[Route("[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        
        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet]
        public ActionResult<bool> IsAdmin()
        {
            var token = Request.Headers["x-access-token"];
            if (_adminService.IsAdmin(token))
            {
                return Ok(true);
            }
            return Ok(false);
        }

        [Route("[action]")]
        [HttpGet]
        [Authorization(Role = RoleEnum.Admin)]
        public ActionResult<User> GetAllUsers()
        {
            var users = _adminService.GetAllUsers();
            return Ok(users);
        }
    }
}
