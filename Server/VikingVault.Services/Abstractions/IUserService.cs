using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface IUserService
    {
        User CreateUser(User user);
        User GetById(int userId);
        User GetUserByCardNumber(int cardNumber);
        int GetIdFromToken(string token);
    }
}
