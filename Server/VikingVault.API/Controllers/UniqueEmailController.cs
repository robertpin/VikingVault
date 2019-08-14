using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.Services.Abstractions;
using VikingVault.DataAccess.Models;

namespace VikingVault.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UniqueEmailController : ControllerBase
    {
        private readonly IUniqueEmailService _uniqueEmailService;

        public UniqueEmailController(IUniqueEmailService uniqueEmailService)
        {
            _uniqueEmailService = uniqueEmailService;
        }
        [HttpGet("{userEmail}")]
        public ActionResult<Boolean> Get(string userEmail)
        {
            bool? isUnique = _uniqueEmailService.IsUniqueEmail(userEmail);
            if (isUnique == null)
                return StatusCode(500, "Internal Server Error");
            if (isUnique == true)
                return Ok(true);
            else
                return Ok(false);
        }
    }
}
