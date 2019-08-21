using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.IdentityModel.Tokens.Jwt;

namespace VikingVault.API.SecurityFilters
{
    public class Authorization : Attribute, IAuthorizationFilter
    {

        public string Role { get; set; }

        void IAuthorizationFilter.OnAuthorization(AuthorizationFilterContext context)
        {
            try
            {
                string token = context.HttpContext.Request.Headers["x-access-token"].ToString();
                var tokenObject = new JwtSecurityToken(token);
                switch (Role)
                {
                    case "user":
                        string userId = tokenObject.Payload["Id"].ToString();
                        if (userId == null)
                        {
                            context.Result = new ForbidResult();
                        }
                        break;
                    case "admin":
                        string userRole = tokenObject.Payload["Role"].ToString();
                        if (userRole != "admin")
                        {
                            context.Result = new ForbidResult();
                        }
                        break;
                }        
            }
            catch (Exception ex)
            {
                context.Result = new StatusCodeResult(500);
            }
        }
    }
}