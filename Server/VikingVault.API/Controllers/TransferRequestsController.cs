using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace VikingVault.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    private readonly ITransferRequestsService _transferRequestsService;

    public class TransferRequestsController : ControllerBase
    {
        [HttpGet]
        public getAllTransferRequests()
        {
            /** 1) getCardNumberFromToken()
             *  2) if(cardNumber != null)
             *     {
             *         User user = _userService.getUserFromCardNumber(cardNumber);
             *         var requests = _transferRequestService.getAllRequests(user);
             *         return requests;
             *     }
             *     
             *  3) ****TRANSFER REQUEST SERVICE*****
             *     _dbcontext.TransferRequests.Where(request => request.CardNumberReciever == CardNumber).ToList();
            */
        }

    }
}