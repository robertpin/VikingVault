using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using VikingVault.API.SecurityFilters;
using VikingVault.DataAccess.Enums;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;

namespace VikingVault.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        [Authorization(Role = RoleEnum.User)]
        public ActionResult<IEnumerable<TransactionDTO>> Get()
        {
            var token = Request.Headers["x-access-token"];
            var tokenObject = new JwtSecurityToken(token);
            string userId = tokenObject.Payload["Id"].ToString();
            return _transactionService.GetTransactions(userId);
        }

        [HttpPost]
        public ActionResult<Transaction> Post([FromBody] Transaction transaction)
        {
            try
            {
                return Ok(_transactionService.AddTransaction(transaction));
            }
            catch (TransactionException e)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
