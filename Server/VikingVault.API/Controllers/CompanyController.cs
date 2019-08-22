using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.DataAccess.Models;
using VikingVault.Services;
using VikingVault.Services.Abstractions;

namespace VikingVault.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }
        
        [HttpPost]
        public ActionResult<User> Post([FromBody] CompanyDTO company)
        {
            try
            {
                return Ok(_companyService.CreateCompany(company));
            }
            catch(CompanyServiceException e)
            {
                if(e.Message == "Company already exists")
                {
                    return Conflict();
                }
                return StatusCode(500);
            }
        }
    }
}
