using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.Services.Abstractions
{
    public interface IUserCardService
    {
        string FindCardByUserId(int id);
        int FindUserIdByCardNumber(string cardNumber);
    }


}
