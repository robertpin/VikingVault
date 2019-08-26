using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.Services;
using VikingVault.Services.Abstractions;

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

        [HttpGet("{id}", Name = "Get")]
        public ActionResult<Boolean> Get(int id)
        {
            bool? isPaymentEnabled = _paymentTogglingService.IsPaymentEnabled(id);
            if (isPaymentEnabled == null)
                return StatusCode(500, "Internal Server Error");
            return Ok(isPaymentEnabled);
        }
        
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]bool value)
        {
            _paymentTogglingService.ChangePaymentState(id, value);
        }
    }
}
