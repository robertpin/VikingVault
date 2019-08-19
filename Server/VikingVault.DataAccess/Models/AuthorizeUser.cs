using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace VikingVault.DataAccess.Models
{
    public class AuthorizeUser : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext context)
        {
            try
            {
                string token = context.Request.Headers.GetValues("x-access-token").ToString();
                var tokenObject = new JwtSecurityToken(token);
                string userId = tokenObject.Payload["Id"].ToString();
                if (userId == null)
                {
                    context.Response = new HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
                }
            }
            catch (Exception ex)
            {
                context.Response = new HttpResponseMessage(System.Net.HttpStatusCode.InternalServerError);
            }
        }
    }
}