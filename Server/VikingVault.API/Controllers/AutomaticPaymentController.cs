using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

namespace VikingVault.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AutomaticPaymentController : ControllerBase
    {
        private readonly IAutomaticPaymentService _automaticPaymentService;

        public AutomaticPaymentController(IAutomaticPaymentService automaticPaymentService)
        {
            _automaticPaymentService = automaticPaymentService;
        }

        [HttpDelete]
        public ActionResult Delete(AutomaticPaymentId automaticPaymentToDelete)
        {
            try
            {
                _automaticPaymentService.DeleteAutomaticPayment(automaticPaymentToDelete.Id);
                return Ok(true);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
