﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Exceptions;

namespace VikingVault.Services
{
    public class AutomaticPaymentService : IAutomaticPaymentService
    {
        private readonly VikingVaultDbContext _dbContext;

        public AutomaticPaymentService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<AutomaticPaymentDTO> GetAllAutomaticPayments()
        {
            var automaticPaymentData = new List<AutomaticPaymentDTO>();
            try
            {
                var payments = _dbContext.AutomaticPayments.Include(payment => payment.Company).ToList();
                foreach (var payment in payments)
                {
                    var company = _dbContext.User.SingleOrDefault(user => user.Id == payment.Company.Id);
                    automaticPaymentData.Add(new AutomaticPaymentDTO
                    {
                        CompanyName = company.FirstName,
                        Amount = payment.Amount,
                        InitialPaymentDate = payment.InitialPaymentDate,
                        LastPaymentDate = payment.LastPaymentDate
                    });
                }
            }
            catch (Exception e)
            {
                throw new AutomaticPaymentException(e.Message);
            }

            return automaticPaymentData;
        }
    }
}