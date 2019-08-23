using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.DataAccess.Models.Exceptions;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;
using VikingVault.Services.Exceptions.CardExceptions;

namespace VikingVault.Services
{
    public class CardService : ICardService
    {
        private readonly VikingVaultDbContext _dbContext;

        public CardService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Card AttachCard(Card cardToAttach)
        {
            try {
                Card card = _dbContext.Cards.SingleOrDefault(c => c.CardNumber == cardToAttach.CardNumber);
                if (card != null)
                {
                    throw new CardNumberAlreadyExistsException("This card number already exists! You can't have a card with the same card number!");
                }

                Card cardOfUser = _dbContext.Cards.SingleOrDefault(c => c.UserId == cardToAttach.UserId);
                if (cardOfUser != null)
                {
                    _dbContext.Cards.Remove(cardOfUser);
                    _dbContext.SaveChanges();
                }

                _dbContext.Add(cardToAttach);
                _dbContext.SaveChanges();
                return cardToAttach;
            }
            catch (DbUpdateException)
            {
                throw new DatabaseException("Database Error!");
            }
        }

        public Card UpdateCard(Card cardToUpdate)
        {
            try
            {
                var oldCard = _dbContext.Cards.Find(cardToUpdate.Id);
                if(oldCard == null)
                {
                    throw new DatabaseException("Card to be updated doesn't exist in the database!");
                }
                oldCard.Blocked = cardToUpdate.Blocked;
                _dbContext.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                throw new DatabaseException(e.Message);
            }
            return cardToUpdate;
        }
    }

    
}
