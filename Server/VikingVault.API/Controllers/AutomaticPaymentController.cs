﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.API.SecurityFilters;
using VikingVault.DataAccess.Enums;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;

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

        [HttpGet]
        public List<AutomaticPaymentDTO> GetAllAutomaticPayments()
        {
            var token = Request.Headers["x-access-token"];
            return _automaticPaymentService.GetAllAutomaticPayments(token);
        }

        [HttpPost]
        public ActionResult<AutomaticPayment> Post([FromBody] AutomaticPaymentDTO automaticPayment)
        {
            try
            {
                var token = Request.Headers["x-access-token"];
                return Ok(_automaticPaymentService.CreateAutomaticPayment(automaticPayment, token));
            }
            catch (AutomaticPaymentServiceException ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        public ActionResult<AutomaticPayment> Put([FromBody] AutomaticPaymentDTO automaticPayment)
        {
            try
            {
                return Ok(_automaticPaymentService.EditAutomaticPayment(automaticPayment));
            }
            catch (AutomaticPaymentServiceException ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        [Authorization(Role = RoleEnum.User)]
        public ActionResult Delete(AutomaticPaymentId automaticPaymentToDelete)
        {
            try
            {
                _automaticPaymentService.DeleteAutomaticPayment(automaticPaymentToDelete.Id);
                return Ok();
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
