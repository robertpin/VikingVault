using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using VikingVault.Services.Abstractions;
using VikingVault.DataAccess.Models;
using VikingVault.DataAccess.Models.Exceptions;

namespace WebApi.Controllers
{
	[Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<User> Authenticate([FromBody]UserLogin user)
        {
            try
            {
                var loggedUser = _loginService.Authenticate(user.Email, user.Password);
                if (loggedUser == null)
                {
                    return StatusCode(404, "Email or password is incorrect");
                }
                return Ok(loggedUser);
            } catch(DatabaseException de)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}