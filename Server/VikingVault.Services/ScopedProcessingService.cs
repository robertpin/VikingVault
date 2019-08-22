using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Enums;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class ScopedProcessingService : IScopedProcessingService
    {
        private readonly VikingVaultDbContext _dbContext;

        public ScopedProcessingService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void PayCompanies()
        {
            var currentDateTime = DateTime.Now;
            IList<AutomaticPayment> automaticPayments = _dbContext
                                                        .AutomaticPayments
                                                        .Include(automaticPayment => automaticPayment.PayingUser)
                                                        .Include(automaticPayment => automaticPayment.ReceivingCompany)
                                                        .Where(automaticPayment => automaticPayment
                                                                                   .InitialPaymentDate
                                                                                   .Day
                                                                                   .Equals(currentDateTime.Day)
                                                                                    && automaticPayment.IsEnabled)
                                                                                   .ToList();
            foreach (AutomaticPayment automaticPayment in automaticPayments)
            {
                var lastPaymentDate = automaticPayment.LastPaymentDate.Date;
                var payingUserCard = _dbContext.Cards.SingleOrDefault(card => card.UserId == automaticPayment.PayingUser.Id);
                var payingUserAccount = _dbContext.BankAccount
                                        .Include(bankAccount => bankAccount.User)
                                       .SingleOrDefault(bankAccount => bankAccount.User.Id == automaticPayment.PayingUser.Id && bankAccount.CurrencyType.Equals("Ron"));

                if (payingUserAccount.Balance < automaticPayment.Amount)
                {
                    automaticPayment.IsEnabled = false;
                    _dbContext.AutomaticPayments.Update(automaticPayment);
                    _dbContext.SaveChanges();
                }
                else
                {
                    if (!lastPaymentDate.Equals(currentDateTime.Date) && !payingUserCard.Blocked)
                    {
                        UpdateCompanyBankAccount(automaticPayment.ReceivingCompany, automaticPayment.Amount);
                        UpdatePayingUserBankAccount(automaticPayment.PayingUser, automaticPayment.Amount);
                        UpdateAutomaticPayment(automaticPayment, currentDateTime);
                    }
                }
            }
        }

        private void UpdateAutomaticPayment(AutomaticPayment automaticPayment, DateTime date)
        {
            automaticPayment.LastPaymentDate = date;
            _dbContext.AutomaticPayments.Update(automaticPayment);
            _dbContext.SaveChanges();
        }

        private void UpdatePayingUserBankAccount(User payingUser, float amount)
        {
            var payingUserAccount = _dbContext.BankAccount
                                        .Include(bankAccount => bankAccount.User)
                                       .SingleOrDefault(bankAccount => bankAccount.User.Id == payingUser.Id && bankAccount.CurrencyType.Equals("Ron"));

            payingUserAccount.Balance -= amount;
            _dbContext.BankAccount.Update(payingUserAccount);
        }

        private void UpdateCompanyBankAccount(User company, float amount)
        {
            var companyAccount = _dbContext.BankAccount
                                        .Include(bankAccount => bankAccount.User)
                                        .SingleOrDefault(bankAccount => bankAccount.User.Id == company.Id && bankAccount.CurrencyType.Equals("Ron"));
                                        
            companyAccount.Balance += amount;
            _dbContext.BankAccount.Update(companyAccount);
        }
    }
}
