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
using VikingVault.Services;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;
using VikingVault.Services.Exceptions.CardExceptions;

namespace VikingVault.API.Controllers
{
    [ApiController]
    public class CardController : ControllerBase
    {
        private ICardService _cardService;

        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [Authorization(Role = RoleEnum.Admin)]
        [AllowAnonymous]
        [Route("attachCard")]
        [HttpPost]
        public ActionResult<Card> AttachCard([FromBody]Card card)
        {
            try
            {
                return Ok(_cardService.AttachCard(card));
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
        [Route("updateCard")]
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
        
        [Authorization(Role=RoleEnum.User)]
        [Route("card")]
        [HttpGet]
        public ActionResult<bool> CheckUserHasCard()
        {
            string token = Request.Headers["x-access-token"];
            try
            {
                Card card = _cardService.CheckUserHasCard(token);
                if(card == null)
                {
                    return Ok(false);
                }
                return Ok(true);
            }
            catch(CardServiceException e)
            {
                return StatusCode(500);
            }
        }

        [Authorization(Role = RoleEnum.User)]
        [Route("blockedcard")]
        [HttpGet]
        public ActionResult<bool> CheckCardIsBlocked()
        {
            string token = Request.Headers["x-access-token"];
            try
            {
                return Ok(_cardService.CheckCardIsBlocked(token));
            }
            catch (CardServiceException e)
            {
                return StatusCode(500);
            }
        }
    }
}
