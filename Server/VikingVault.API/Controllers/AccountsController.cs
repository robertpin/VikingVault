using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.Services.Abstractions;
using System.Web.Http;
using System.Net;
using System.Net.Http;
using VikingVault.DataAccess.Models;
using Microsoft.AspNetCore.Authorization;

namespace VikingVault.API.Controllers
{
	[Route("[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        IAccountService _accountService;

        public AccountsController(IAccountService accService)
        {
            _accountService = accService;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<UserAccount> Get()
        {
            var token = Request.Headers["x-access-token"];

            UserAccount userAccount = _accountService.GetUserAccount(token);

            if (userAccount != null)
            {
                return Ok(userAccount);
            }  
            else
            {
                return NotFound();
            }
        }

    }
}
