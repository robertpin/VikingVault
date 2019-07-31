using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using VikingVault.Services.Abstractions;
using VikingVault.DataAccess.Models;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate([FromBody]UserLogin user)
        {
            var loggedUser = _loginService.Authenticate(user.Email, user.Password);

            if (loggedUser == null)
            {
                return BadRequest(new { message = "Email or password is incorrect" });
            }

            return Ok(loggedUser);
        }
    }
}