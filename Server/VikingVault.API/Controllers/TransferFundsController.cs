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
    public class TransferFundsController : ControllerBase
    {
        ITransferFundsService _transferFundsService;
        IUserService _userService;
        ITransferRequestService _transferRequestService;

        public TransferFundsController(ITransferFundsService transferFundsService, IUserService userService, ITransferRequestService transferRequestService)
        {
            _transferFundsService = transferFundsService;
            _userService = userService;
            _transferRequestService = transferRequestService;
        }

        [HttpPost]
        public ActionResult<string> Post([FromBody] TrasnferFundsDTO transferFundsDTO)
        {
            try
            {
                var token = Request.Headers["x-access-token"];

                if (transferFundsDTO != null)
                {
                    User sender = _userService.GetUserFromToken(token);
                    TransferFundsModel transferFundsData = transferFundsDTO.convertDTOtoTransferFundsModel(sender);

                    _transferFundsService.TransferFunds(transferFundsData);

                    if(transferFundsDTO.IsTransferRequested)
                    {
                        _transferRequestService.DeleteRequest(transferFundsDTO.RequestId);
                    }

                    return Ok("Succesfully transfered " + transferFundsData.AmountSent + "!");
                }
                else
                {
                    return Ok("Not able to send data to the server");
                }
            }
            catch (Exception e)
            {
                if (e is NoCardAttachedToUserException || e is TransactionException || e is TransferFundsException || e is DatabaseException)
                {
                    return Ok(e.Message);
                }

                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
