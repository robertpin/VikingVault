﻿using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface IUserService
    {
        User CreateUser(UserDTO user);
        User GetById(int userId);
        void DeleteUser(UserEmail userEmail);
        int GetIdFromToken(string token);
        User GetUserFromToken(string token);
        User GetUserFromCardNumber(string cardNumber);
        UpdateUserDTO UpdateUser(UpdateUserDTO user);
    }
}
