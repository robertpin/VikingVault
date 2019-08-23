using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.API.SecurityFilters;
using VikingVault.DataAccess.Enums;
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

        [Authorization(Role=RoleEnum.Admin)]
        [HttpPost]
        public ActionResult<User> Post([FromBody] CompanyDTO company)
        {
            try
            {
                return Ok(_companyService.CreateCompany(company));
            }
            catch(CompanyServiceAlreadyExistsException e)
            {
                return Conflict();
            }
            catch(CompanyServiceException e)
            {
                return StatusCode(500);
            }
        }

        [HttpGet]
        public ActionResult<List<CompanyDataDTO>> Get()
        {
            try
            {
                return Ok(_companyService.GetAllCompanies());
            }
            catch(CompanyServiceException e)
            {
                return StatusCode(500);
            }
        }

        [Authorization(Role=RoleEnum.Admin)]
        [HttpDelete]
        public ActionResult Delete([FromBody] int companyId)
        {
            try
            {
                _companyService.DeleteCompany(companyId);
                return Ok();
            }
            catch(CompanyServiceException e)
            {
                return StatusCode(500);
            }
        }
    }
}
