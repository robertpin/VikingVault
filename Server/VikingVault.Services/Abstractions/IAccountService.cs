using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.API.Controllers;

namespace VikingVault.Services.Abstractions
{
    public interface IAccountService
    {
         UserAccount FindById(int id);
    }
}
