using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VikingVault.API.SecurityFilters;
using VikingVault.DataAccess.Enums;
using VikingVault.DataAccess.Models;
using VikingVault.DataAccess.Models.Exceptions;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;
using VikingVault.Services.Exceptions.CardExceptions;

namespace VikingVault.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private ICardService _attachCardService;

        public CardController(ICardService attachCardService)
        {
            _attachCardService = attachCardService;
        }

        [Authorization(Role = RoleEnum.Admin)]
        [HttpPost]
        public ActionResult<Card> AttachCard([FromBody]Card card)
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

        [Authorization(Role = RoleEnum.User)]
        [HttpPut]
        public ActionResult<Card> UpdateCard([FromBody]Card cardToUpdate)
        {
            try
            {
                return Ok(_attachCardService.UpdateCard(cardToUpdate));
            }
            catch (DatabaseException de)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
