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
    public class ExecutePaymentService : IScopedProcessingService
    {
        private readonly VikingVaultDbContext _dbContext;

        public ExecutePaymentService(VikingVaultDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void PayCompanies()
        {
            var currentDateTime = DateTime.Now;
            IList<AutomaticPayment> automaticPayments = CurrentPayments(currentDateTime);

            foreach (AutomaticPayment automaticPayment in automaticPayments)
            {
                var lastPaymentDate = automaticPayment.LastPaymentDate.Date;
                var payingUserCard = _dbContext.Cards.SingleOrDefault(card => card.UserId == automaticPayment.PayingUser.Id);
                var payingUserAccount = _dbContext.BankAccount
                                        .Include(bankAccount => bankAccount.User)
                                        .SingleOrDefault(bankAccount => bankAccount.User.Id == automaticPayment.PayingUser.Id 
                                                                        && bankAccount.CurrencyType.Equals("Ron"));
               
                if (payingUserAccount.Balance < automaticPayment.Amount)
                {
                    DisableAutomaticPayment(automaticPayment);
                    AddFailedPaymentNotification(automaticPayment);
                }
                else if (!lastPaymentDate.Equals(currentDateTime.Date) && !payingUserCard.Blocked)
                {
                    UpdatePaymentInvolvedAccounts(automaticPayment, currentDateTime);
                    AddPayingUserAutomaticTransaction(automaticPayment, currentDateTime);
                    AddSuccessfulPaymentNotification(automaticPayment);
                }
            }
        }

        private IList<AutomaticPayment> CurrentPayments(DateTime currentDateTime)
        {
           return _dbContext.AutomaticPayments.Include(automaticPayment => automaticPayment.PayingUser)
                                              .Include(automaticPayment => automaticPayment.ReceivingCompany)
                                              .Where(automaticPayment => IsPaymentEligible(automaticPayment, currentDateTime))
                                              .ToList();
        }

        private bool IsPaymentEligible(AutomaticPayment automaticPayment, DateTime currentDateTime)
        {
            return automaticPayment.InitialPaymentDate.Day.Equals(currentDateTime.Day) && automaticPayment.IsEnabled;
        }

        private void DisableAutomaticPayment(AutomaticPayment automaticPayment)
        {
            automaticPayment.IsEnabled = false;
            _dbContext.AutomaticPayments.Update(automaticPayment);
            _dbContext.SaveChanges();
        }

        private void AddSuccessfulPaymentNotification(AutomaticPayment automaticPayment)
        {
            Notification notification = new Notification
            {
                User = automaticPayment.PayingUser,
                Text = "Payment to " + automaticPayment.ReceivingCompany.FirstName +
                       " of " + automaticPayment.Amount + " RON successful!",
                Read = false
            };
            _dbContext.Notifications.Add(notification);
            _dbContext.SaveChanges();
        }

        private void AddFailedPaymentNotification(AutomaticPayment automaticPayment)
        {
            Notification notification = new Notification
            {
                User = automaticPayment.PayingUser,
                Text = "Payment to " + automaticPayment.ReceivingCompany.FirstName + 
                       " of " + automaticPayment.Amount + " RON was declined!",
                Read = false
            };
            _dbContext.Notifications.Add(notification);
            _dbContext.SaveChanges();
        }

        private void AddPayingUserAutomaticTransaction(AutomaticPayment automaticPayment, DateTime currentDateTime)
        {
            Transaction transaction = new Transaction
            {
                Sender = automaticPayment.PayingUser,
                Type = "Payment",
                Date = currentDateTime,
                Currency = "Ron",
                Amount = automaticPayment.Amount,
                Receiver = automaticPayment.ReceivingCompany,
                Details = "Automatic Payment"
            };

            _dbContext.Transactions.Add(transaction);
            _dbContext.SaveChanges();
        }

        private void UpdatePaymentInvolvedAccounts(AutomaticPayment automaticPayment, DateTime currentDateTime)
        {
            UpdateCompanyBankAccount(automaticPayment.ReceivingCompany, automaticPayment.Amount);
            UpdatePayingUserBankAccount(automaticPayment.PayingUser, automaticPayment.Amount);
            UpdateAutomaticPayment(automaticPayment, currentDateTime);
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
                                        .SingleOrDefault(bankAccount => bankAccount.User.Id == payingUser.Id 
                                                                                           && bankAccount.CurrencyType.Equals("Ron"));

            payingUserAccount.Balance -= amount;
            _dbContext.BankAccount.Update(payingUserAccount);
        }

        private void UpdateCompanyBankAccount(User company, float amount)
        {
            var companyAccount = _dbContext.BankAccount
                                        .Include(bankAccount => bankAccount.User)
                                        .SingleOrDefault(bankAccount => bankAccount.User.Id == company.Id 
                                                                                            && bankAccount.CurrencyType.Equals("Ron"));
                                        
            companyAccount.Balance += amount;
            _dbContext.BankAccount.Update(companyAccount);
        }
    }
}
