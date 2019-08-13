using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

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
        [Authorize]
        public IEnumerable<Transaction> Get()
        {
            var token = Request.Headers["x-access-token"];
            var tokenObject = new JwtSecurityToken(token);
            string userId = tokenObject.Payload["Id"].ToString();
            return _transactionService.GetTransactions(userId);
        }
    }
}
