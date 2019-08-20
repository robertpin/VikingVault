using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet]
        public FileStreamResult CreatePDF()
        {
            try
            {
                var pdf = _pdfGeneratorService.GetTransactionListAsPDF();
                return pdf;
            }
            catch
            {
                return null;
            }
        }
    }
}
