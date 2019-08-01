using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.API.DataAccess;

namespace VikingVault.Services.Abstractions
{
    public interface IAccountService
    {
         UserAccount FindById();
    }
}
