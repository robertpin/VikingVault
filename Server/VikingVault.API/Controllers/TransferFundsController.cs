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
    [Route("api/[controller]")]
    [ApiController]
    public class TransferFundsController : ControllerBase
    {
        ITransferFundsService _transferFundsService;
        IUserService _userService;

        public TransferFundsController(ITransferFundsService transferFundsService, IUserService userService)
        {
            _transferFundsService = transferFundsService;
            _userService = userService;
        }

        [HttpPost]
        public ActionResult<string> Post([FromBody] TransferFundsModel transferFundsData)
        {
            try
            {
                var token = Request.Headers["x-access-token"];
                var idSender = _userService.GetIdFromToken(token);

                transferFundsData.IdSender = idSender; //TO BE CHANGED

                if (transferFundsData != null)
                {
                    _transferFundsService.TransferFunds();

                    return Ok();
                }
                else
                {
                    return NotFound("Request to server unsuccesful!");
                }
            }
            catch(NoCardAttachedToUserException e)
            {
                return NotFound();
            }
            catch(DatabaseException e)
            {
                return NotFound();
            }
            
        }
    }
}