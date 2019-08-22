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
    [Route("[controller]")]
    [ApiController]
    public class AutomaticPaymentController : ControllerBase
    {
        private IAutomaticPaymentService _automaticPaymentService;

        public AutomaticPaymentController(IAutomaticPaymentService automaticPaymentService)
        {
            _automaticPaymentService = automaticPaymentService;
        }

        [HttpPost]
        public ActionResult<AutomaticPayment> Post([FromBody] AutomaticPaymentDTO automaticPayment)
        {
            try
            {
                return Ok(_automaticPaymentService.CreateAutomaticPayment(automaticPayment));
            }
            catch (AutomaticPaymentServiceException apse)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
