using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.API.SecurityFilters;
using VikingVault.DataAccess.Enums;
using VikingVault.Services;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;

namespace VikingVault.API.Controllers
{
   
    [Route("[controller]")]
    [ApiController]
    public class PaymentTogglingController : ControllerBase
    {
        private readonly IPaymentTogglingService _paymentTogglingService;

        public PaymentTogglingController(IPaymentTogglingService paymentTogglingService)
        {
            _paymentTogglingService = paymentTogglingService;
        }

        [HttpGet("{id}")]
        public ActionResult<Boolean> Get(int id)
        {
            try
            {
                bool? isPaymentEnabled = _paymentTogglingService.IsPaymentEnabled(id);
                return Ok(isPaymentEnabled);
            }
            catch (AutomaticPaymentException e)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        
        [Authorization(Role = RoleEnum.User)]
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]bool value)
        {
            _paymentTogglingService.ChangePaymentState(id, value);
        }
    }
}
