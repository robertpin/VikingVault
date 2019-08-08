using System;
using System.Collections.Generic;
using System.Text;

namespace VikingVault.Services.Abstractions
{
    public interface IAdminService
    {
        bool IsAdmin(string token);
    }
}
