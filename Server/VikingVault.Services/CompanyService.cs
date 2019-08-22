﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Enums;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;

namespace VikingVault.Services
{
    public class CompanyService : ICompanyService
    {
        private readonly VikingVaultDbContext _dbContext;
        private readonly IBankAccountService _bankAccountService;

        public CompanyService(VikingVaultDbContext dbContext, IBankAccountService bankAccountService)
        {
            _dbContext = dbContext;
            _bankAccountService = bankAccountService;
        }

        public User CreateCompany(CompanyDTO company)
        {
            var companyRole = _dbContext.Roles.SingleOrDefault(role => role.Type == RoleEnum.Company.ToString());
            var presentUser = _dbContext.User.SingleOrDefault(user => user.FirstName.ToLower() == company.Name.ToLower());
            if (presentUser != null)
            {
                throw new CompanyServiceException("Company already exists");
            }
            var companyUser = new User
            {
                FirstName = company.Name,
                LastName = company.Name,
                Email = company.Email,
                Password = company.Name,
                Address = company.Address,
                Cnp = "1234567891234",
                Role = companyRole
            };

            try
            {
                _dbContext.Add(companyUser);
                _bankAccountService.CreateBankAccount(this.CreateBankAccount(companyUser, "Ron"));

                _dbContext.SaveChanges();
            } catch (Exception e)
            {
                throw new CompanyServiceException("Internal server error");
            }

            return companyUser;
        }

        private BankAccount CreateBankAccount(User user, string currencyType)
        {
            return new BankAccount
            {
                User = user,
                CurrencyType = currencyType,
                Balance = 0.0f
            };
        }
    }
}
