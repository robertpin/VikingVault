using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface IUserCardService
    {
        Card FindCardByUserId(int id);
        int? FindUserIdByCardNumber(string cardNumber);
        bool HasCardAttached(int userId);
        string GetCardNumberFromUser(User user);
    }


}
