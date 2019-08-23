using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.DataAccess.Models;
using VikingVault.DataAccess.Models.Exceptions;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;
using VikingVault.Services.Exceptions.CardException;

namespace VikingVault.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TransferRequestsController : ControllerBase
    {
        ITransferRequestService _transferRequestService;
        IUserService _userService;

        public TransferRequestsController(ITransferRequestService transferRequestService, IUserService userService)
        {
            _transferRequestService = transferRequestService;
            _userService = userService;
        }

        [HttpPost]
        public ActionResult<string> Post([FromBody] TransferRequestDTO transferRequestDTO)
        {
            try
            {
                var token = Request.Headers["x-access-token"];

                if(transferRequestDTO != null)
                {
                    var requester = _userService.GetUserFromToken(token);
                    var reciever = _userService.GetUserFromCardNumber(transferRequestDTO.CardNumberReciever);

                    if(requester.Id != reciever.Id)
                    {
                        var transferRequestData = transferRequestDTO.ConvertDTOtoTransferRequest(requester);
                        _transferRequestService.AddTransferRequest(transferRequestData);

                        return Ok("Succesfully requested " + transferRequestData.Amount + "!");
                    }
                    else
                    {
                        return Ok("Select a different user to request money from!");
                    }                   
                }
                else
                {
                    return NotFound("Request to server unsuccesful.");
                }
            }
            catch (Exception e)
            {
                if (e is NoCardAttachedToUserException || e is TransactionException || e is DatabaseException)
                {
                    return NotFound(e.Message);
                }

                return NotFound("Unknown error.");
            }
        }
    }
}