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
    public class BankAccountController : ControllerBase
    {
        private readonly IBankAccountService _bankAccountService;

        public BankAccountController(IBankAccountService bankAccountService)
        {
            _bankAccountService = bankAccountService;
        }

        [HttpGet]
        public IEnumerable<BankAccount> Get()
        {
            var token = Request.Headers["x-access-token"];
            return _bankAccountService.GetBankAccounts(token);
        }

        [HttpPut]
        public ActionResult Put([FromBody]UpdateBankAccountModel updatedBankAccount)
        {
            try
            {
                return Ok(_bankAccountService.UpdateBankAccount(updatedBankAccount));
            }
            catch (BankAccountServiceException e)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        
    }
}
