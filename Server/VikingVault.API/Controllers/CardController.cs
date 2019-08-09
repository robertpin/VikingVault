using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.DataAccess.Models;
using VikingVault.DataAccess.Models.Exceptions;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;
using VikingVault.Services.Exceptions.CardExceptions;

namespace VikingVault.API.Controllers
{
    [Authorize]
    [ApiController]
    public class CardController : ControllerBase
    {
        private IAttachCardService _attachCardService;

        public CardController(IAttachCardService attachCardService)
        {
            _attachCardService = attachCardService;
        }

        [AllowAnonymous]
        [Route("api/attach")]
        [HttpPost]
        public IActionResult AttachCard([FromBody]Card card)
        {
            try
            {
                return Ok(_attachCardService.AttachCard(card));
            }
            catch (CardNumberAlreadyExistsException cnaee)
            {
                return StatusCode(409, "Card Number already exists");
            }
            catch (DatabaseException de)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
