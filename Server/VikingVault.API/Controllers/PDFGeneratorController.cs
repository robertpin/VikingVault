﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DinkToPdf;
using DinkToPdf.Contracts;
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
    public class PDFGeneratorController : ControllerBase
    {
        private IPDFGeneratorService _pdfGeneratorService;

        public PDFGeneratorController(IPDFGeneratorService pdfGeneratorService)
        {
            _pdfGeneratorService = pdfGeneratorService;
        }

        [HttpGet("{timeFilter}")]
        [Authorization(Role = RoleEnum.User)]
        public FileStreamResult CreatePDF(string timeFilter)
        {
            try
            {
                var token = Request.Headers["x-access-token"];
                var tokenObject = new JwtSecurityToken(token);
                string userId = tokenObject.Payload["Id"].ToString();

                var pdf = _pdfGeneratorService.GetTransactionListAsPDF(userId, timeFilter);
                return pdf;
            }
            catch
            {
                return null;
            }
        }
    }
}
