using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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

        public List<AutomaticPaymentDTO> GetAllAutomaticPayments(string token)
        {
            var tokenObject = new JwtSecurityToken(token);
            int userId = Int32.Parse(tokenObject.Payload["Id"].ToString());

            var automaticPaymentData = new List<AutomaticPaymentDTO>();
            try
            {
                var payments = _dbContext.AutomaticPayments
                    .Include(payment => payment.ReceivingCompany)
                    .Include(payment => payment.PayingUser)
                    .Where(payment => payment.PayingUser.Id == userId)
                    .ToList();

                foreach (var payment in payments)
                {
                    var company = _dbContext.User.SingleOrDefault(user => user.Id == payment.ReceivingCompany.Id);
                    automaticPaymentData.Add(new AutomaticPaymentDTO
                    {
                        CompanyId = company.Id,
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

        public AutomaticPayment CreateAutomaticPayment(AutomaticPaymentDTO automaticPaymentDTO, string token)
        {
            var tokenObject = new JwtSecurityToken(token);
            int userId = Int32.Parse(tokenObject.Payload["Id"].ToString());
            AutomaticPayment automaticPaymentToBeCreated = new AutomaticPayment
            {
                ReceivingCompany = _dbContext.User.Find(automaticPaymentDTO.CompanyId),
                Amount = automaticPaymentDTO.Amount,
                InitialPaymentDate = automaticPaymentDTO.InitialPaymentDate,
                LastPaymentDate = automaticPaymentDTO.LastPaymentDate,
                PayingUser = _dbContext.User.Find(userId)
            };
            try
            {
                _dbContext.Add(automaticPaymentToBeCreated);
                _dbContext.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                throw new AutomaticPaymentServiceException("Database Error");
            }
            return automaticPaymentToBeCreated;
        }
    }
}
