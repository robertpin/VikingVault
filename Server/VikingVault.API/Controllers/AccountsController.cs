using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.Services.Abstractions;

namespace VikingVault.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        IAccountService _accService;

        public AccountsController(IAccountService accService)
        {
            _accService = accService;
        }

        // GET: api/Accounts/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<UserAccount> Get(int id)
        {
            UserAccount userAccount = _accService.FindById(id);
            if (userAccount != null)
                return Ok(userAccount);
            else
                return NotFound();
        }

    }
}
