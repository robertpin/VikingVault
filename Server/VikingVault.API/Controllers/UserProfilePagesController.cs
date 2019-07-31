using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

namespace VikingVault.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfilePagesController : ControllerBase
    {
        private readonly IUserProfilePageService _userProfilePageService;

        public UserProfilePagesController(IUserProfilePageService userProfilePageService)
        {
            _userProfilePageService = userProfilePageService;
        }
        
        // GET: api/UserProfilePages/5
        [HttpGet("{id}", Name = "UserId")]
        public ActionResult<UserProfilePageViewModel> Get(int id)
        {
            var page = _userProfilePageService.GetUserProfileData(id);

            if (page == null)
                return StatusCode(404, "User not found!");

            return Ok(page);
        }
    }
}
