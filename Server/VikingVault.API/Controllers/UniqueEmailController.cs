using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.Services.Abstractions;
using VikingVault.DataAccess.Models;

namespace VikingVault.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UniqueEmailController : ControllerBase
    {

        private readonly IUniqueEmailService _uniqueEmailService;

        public UniqueEmailController(IUniqueEmailService uniqueEmailService)
        {
            _uniqueEmailService = uniqueEmailService;
        }
        
        [HttpGet]
        public ActionResult Get()
        {
            return Ok("good job");
        }


        // POST: api/UniqueEmail
        [HttpPost]
        public ActionResult Post([FromBody] UserEmail userEmail)
        {
            bool? isUnique = _uniqueEmailService.IsUniqueEmail(userEmail.email);

            if (isUnique == null)
                return StatusCode(500, "Internal Server Error");

            if (isUnique == true)
                return Ok("unique");
            else
                return Ok("not-unique");

        }   

        // PUT: api/UniqueEmail/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
