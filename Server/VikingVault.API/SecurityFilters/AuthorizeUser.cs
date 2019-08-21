using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.IdentityModel.Tokens.Jwt;
using VikingVault.DataAccess.Enums;

namespace VikingVault.API.SecurityFilters
{
    public class Authorization : Attribute, IAuthorizationFilter
    {

        public RoleEnum Role { get; set; }

        void IAuthorizationFilter.OnAuthorization(AuthorizationFilterContext context)
        {
            try
            {
                string token = context.HttpContext.Request.Headers["x-access-token"].ToString();
                var tokenObject = new JwtSecurityToken(token);
                string userId = tokenObject.Payload["Id"].ToString();

                switch (Role)
                {
                    case RoleEnum.User:
                        if (userId == null)
                        {
                            context.Result = new ForbidResult();
                        }
                        break;
                    case RoleEnum.Admin:
                        if (userId != "1")
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