using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface ILoginService
    {
        User Authenticate(string email, string password);
    }
}
