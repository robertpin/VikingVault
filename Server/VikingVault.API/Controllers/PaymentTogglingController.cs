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

        // GET: api/PaymentToggling/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<Boolean> Get(int id)
        {
            Console.Write(id);
            bool? isPaymentEnabled = _paymentTogglingService.IsPaymentEnabled(id);
            if (isPaymentEnabled == null)
                return StatusCode(500, "Internal Server Error");
            if (isPaymentEnabled == true)
                return Ok(true);
            else
                return Ok(false);
        }

        // PUT: api/PaymentToggling/5
        [HttpPut]
        public void Put([FromBody] string value)
        {
            try
            {
                _paymentTogglingService.ChangePaymentState(value);
            }
            catch (Exception ex)
            {
                Console.WriteLine("cevaaaaa");
            }
        }
    }
}
