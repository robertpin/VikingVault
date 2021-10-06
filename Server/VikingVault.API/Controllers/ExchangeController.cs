﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.API.SecurityFilters;
using VikingVault.DataAccess.Enums;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

namespace VikingVault.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ExchangeController : ControllerBase
    {
        IExchangeService _exchangeService;

        public ExchangeController(IExchangeService exchangeService)
        {
            _exchangeService = exchangeService;
        }
        
        [HttpPost]
        public ActionResult<List<BankAccount>> Post([FromBody] List<UpdateBankAccountModel> bankAccountModels)
        {
            string token = Request.Headers["x-access-token"];
            
            UpdateBankAccountModel sellModel = bankAccountModels[0];
            UpdateBankAccountModel buyModel = bankAccountModels[1];
            UpdateBankAccountModel exchangeInfo = bankAccountModels[2];
            List<BankAccount> bankAccounts = _exchangeService.Exchange(token, sellModel, buyModel, exchangeInfo);
            return bankAccounts;
        }
    }
}
