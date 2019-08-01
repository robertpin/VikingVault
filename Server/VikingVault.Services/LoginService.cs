using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.DataAccess.Models.Exceptions;
using VikingVault.Services.Abstractions;
using VikingVault.Services.Utils;

namespace VikingVault.Services
{
    public class LoginService : ILoginService
    {
        private VikingVaultDbContext _context;

        private readonly AppSettings _appSettings;

        public LoginService(VikingVaultDbContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            _appSettings = appSettings.Value;
        }

        public User Authenticate(string email, string password)
        {
            try {
                string hashedPassword = PasswordEncryption.ComputeSha256Hash(password);

                var user = _context.User.SingleOrDefault(u => u.Email == email && u.Password == hashedPassword);

                if (user == null)
                {
                    return null;
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("Id", user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(token);

                user.Password = null;
                return user;
            } catch(Exception e)
            {
                throw new DatabaseException("Database Error");
            }
        }
    }
}
