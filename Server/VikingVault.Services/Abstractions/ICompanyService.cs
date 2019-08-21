using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface ICompanyService
    {
        User CreateCompany(CompanyDTO company);
        List<User> GetAllCompanies();
    }
}
