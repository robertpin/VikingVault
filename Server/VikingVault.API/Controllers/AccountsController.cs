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

namespace VikingVault.API.Controllers
{
	[Route("[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        IAccountService _accService;

        public AccountsController(IAccountService accService)
        {
            _accService = accService;
        }

        [HttpGet]
        public ActionResult<UserAccount> Get()
        {
            UserAccount userAccount = _accService.FindById();
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
