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
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpPost]
        public ActionResult Post([FromBody] User user)
        {
            try
            {
                var returnedUser = _userService.CreateUser(user);
                return Ok(returnedUser);
            }
            catch (UserServiceException e)
            {
               return StatusCode(500, "Internal server error");
            }
        }
    }
}
