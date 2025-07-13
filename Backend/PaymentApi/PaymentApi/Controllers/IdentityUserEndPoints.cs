using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PaymentApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PaymentApi.Controllers
{
    public class UserRegistrationModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public int? LibraryID { get; set; }
    }

    public class UserLoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public static class IdentityUserEndPoints
    {
        public static IEndpointRouteBuilder MapIdentityUserEndPoint(this IEndpointRouteBuilder app)
        {
            app.MapPost("/signup", CreateUser);
            app.MapPost("/signin", signIn);

            return app;
        }

        [AllowAnonymous]
        private static async Task<IResult> CreateUser(UserManager<AppUser> userManager, UserRegistrationModel userRegistrationModel)
        {
            AppUser appUser = new AppUser()
            {
                UserName = userRegistrationModel.Email,
                Email = userRegistrationModel.Email,
                FullName = userRegistrationModel.FullName,
                DOB = DateTime.Now.AddYears(-userRegistrationModel.Age).Date,
                Gender = userRegistrationModel.Gender,
                LibraryID = userRegistrationModel.LibraryID,
            };
            var result = await userManager.CreateAsync(appUser, userRegistrationModel.Password);
            await userManager.AddToRoleAsync(appUser, userRegistrationModel.Role);
            if (result.Succeeded)
            {
                return Results.Ok(result);
            }
            else
            {
                return Results.BadRequest(result);
            }
        }

        [AllowAnonymous]
        private static async Task<IResult> signIn(UserManager<AppUser> userManager, UserLoginModel userLogin,IOptions<AppSettings> appSettings)
        {
            var user = await userManager.FindByEmailAsync(userLogin.Email);
            if (user != null && await userManager.CheckPasswordAsync(user, userLogin.Password))
            {
                var role = await userManager.GetRolesAsync(user);

                ClaimsIdentity claims = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("userID",user.Id.ToString()),
                        new Claim("gender",user.Gender.ToString()),
                        new Claim("age",(DateTime.Now.Year - user.DOB.Year).ToString()),
                        new Claim(ClaimTypes.Role,role.First()),

                    });
                if(user.LibraryID != null)
                {
                    claims.AddClaim(new Claim("libraryID", user.LibraryID.ToString()!));

                }

                var signInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.Value.JWTSecret));
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,


                    Expires = DateTime.UtcNow.AddDays(10),
                    SigningCredentials = new SigningCredentials(signInKey, SecurityAlgorithms.HmacSha256)
                };

                var TokenHandler = new JwtSecurityTokenHandler();
                var securityToken = TokenHandler.CreateToken(tokenDescriptor);
                var token = TokenHandler.WriteToken(securityToken);
                return Results.Ok(new { token });
            }
            else
            {
                return Results.BadRequest(new { message = "Incorrect Credentials" });
            }
        }
    
    }
}
