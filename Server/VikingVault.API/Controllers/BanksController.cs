using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using VikingVault.DataAccess.Models;
using VikingVault.Services;
using VikingVault.Services.Abstractions;

namespace VikingVault.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BanksController : ControllerBase
    {
        private readonly IBankService _bankService;

        public BanksController(IBankService bankService)
        {
            _bankService = bankService;
        }
        
        // GET api/banks
        [HttpGet]
        public ActionResult<IEnumerable<Bank>> Get()
        {
            var banks = _bankService.GetBanks();

            return Ok(banks);
        }
    }
}