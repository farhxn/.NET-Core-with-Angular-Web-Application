using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using PaymentApi.Models;

namespace PaymentApi.Controllers
{
    public static class AccountEndPoints
    {
        public static IEndpointRouteBuilder MapAccountEndPoints(this IEndpointRouteBuilder app)
        {
            app.MapGet("/UserProfile", GetUserProfile);
            return app;
        }

        [Authorize]
        private static async Task<IResult> GetUserProfile(ClaimsPrincipal claimsPrincipal, UserManager<AppUser> user)
        {
            string userID = claimsPrincipal.Claims.First(x => x.Type == "userID").Value;
            var userDetail = await user.FindByIdAsync(userID);

            return Results.Ok(new
            {
                email = userDetail?.Email,
                userName = userDetail?.FullName,
            });
        }
    }
}
 