using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Primitives;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface IAccountService
    {
        UserAccount GetUserAccount(StringValues token);
    }
}
