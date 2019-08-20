using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace VikingVault.API.SecurityFilters
{
    public class AuthorizeAdmin : Attribute, IAuthorizationFilter
    {
        void IAuthorizationFilter.OnAuthorization(AuthorizationFilterContext context)
        {
            try
            {
                string token = context.HttpContext.Request.Headers["x-access-token"].ToString();
                var tokenObject = new JwtSecurityToken(token);
                string userRole = tokenObject.Payload["Role"].ToString();
                if (userRole != "admin")
                {
                    context.Result = new ForbidResult();
                }
            }
            catch (Exception ex)
            {
                context.Result = new StatusCodeResult(500);
            }
        }
    }
}
