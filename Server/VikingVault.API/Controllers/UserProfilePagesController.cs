using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

namespace VikingVault.API.Controllers
{
	[Route("[controller]")]
	[ApiController]
    public class UserProfilePagesController : ControllerBase
    {
        private readonly IUserProfilePageService _userProfilePageService;


        public UserProfilePagesController(IUserProfilePageService userProfilePageService)
        {
            _userProfilePageService = userProfilePageService;
        }
       
        [HttpGet]
        [Authorize]
        public ActionResult<UserProfilePageViewModel> Get()
        {
            var token = Request.Headers["x-access-token"];
            var page = _userProfilePageService.GetUserProfileData(token);

            if (page == null)
                return StatusCode(404, "User not found!");

            return Ok(page);
        }
    }
}
