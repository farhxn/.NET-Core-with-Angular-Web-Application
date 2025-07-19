using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PaymentApi.Models;

namespace PaymentApi.Controllers
{
    public static class AuthorizationDemoEndpoints
    {
        public static IEndpointRouteBuilder MapAuthorizationDemoEndPoints(this IEndpointRouteBuilder app)
        {
            app.MapGet("/AdminOnly", AdminOnly);
            app.MapGet("/AdminOrTeacherOnly", AdminOrTeacherOnly);
            app.MapGet("/FemaleTeacherOnly", FemaleTeacherOnly);
            app.MapGet("/LibraryMembersOnly", LibraryMembersOnly);
            app.MapGet("/FemalesOnly", FemalesOnly);
            app.MapGet("/Under10Only", Under10Only);
            app.MapGet("/Under10FemaleOnly", Under10FemaleOnly);
        
            return app;
        }

        [Authorize(Roles ="Admin")]
        private async static  Task<ResponseDto> AdminOnly(UserManager<AppUser> userManager)
        {
            var user = await userManager.Users.ToListAsync();
      var userwRole = new List<object>();

      foreach (var use  in user)
      {

        var roles = await userManager.GetRolesAsync(use);
        string role = string.Join(',', roles);
        userwRole.Add(new {
          use.FullName,
          use.Email,
          use.DOB,
          use.LibraryID,
          use.Gender,
          Roles = role
        });

      }

            ResponseDto response = new ResponseDto();
              response.data = userwRole; 
            return response;
        }

        [Authorize(Roles ="Admin,Teacher")]
        private async static  Task<IResult> AdminOrTeacherOnly()
        {
            return Results.Ok(new { message = "Successfully access Admin/Teacher Route" });
        }
        

        [Authorize(Roles ="Teacher",Policy = "FemalesOnly")]
        private async static  Task<IResult> FemaleTeacherOnly()
        {
            return Results.Ok(new { message = "Successfully access Females Teacher Only Route" });
        }

        [Authorize(Policy = "HasLibraryID")]
        private async static  Task<IResult> LibraryMembersOnly()
        {
            return Results.Ok(new { message = "Successfully access Library Member Only Route" });
        }

        [Authorize(Policy = "FemalesOnly")]
        private async static  Task<IResult> FemalesOnly()
        {
            return Results.Ok(new { message = "Successfully access Females Only Route" });
        }

        [Authorize(Policy = "Under10")]
        private async static  Task<IResult> Under10Only()
        {
            return Results.Ok(new { message = "Successfully access Under 10 Only Route" });
        }


        [Authorize(Policy = "FemalesOnly")]
        [Authorize(Policy = "Under10")]
        private async static  Task<IResult> Under10FemaleOnly()
        {
            return Results.Ok(new { message = "Successfully access Under 10 Female Only Route" });
        }
    }
}
