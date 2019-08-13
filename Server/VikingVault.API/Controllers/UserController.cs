using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;

namespace VikingVault.API.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Route("register")]
        [HttpPost]
        public ActionResult Post([FromBody] User user)
        {
            try
            {
                return Ok(_userService.CreateUser(user));
            }
            catch (UserServiceException e)
            {
               return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        [Route("api/user")]
        public ActionResult Delete([FromBody] UserEmail userEmail)
        {
            try
            {
                _userService.DeleteUser(userEmail);
                return Ok(true);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
