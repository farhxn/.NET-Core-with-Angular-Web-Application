using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using PaymentApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace PaymentApi.Extensions
{
    public static class IdentityExtenstions
    {
        public static IServiceCollection AddIdentityHandlersAndStores(this IServiceCollection services)
        {
            services.AddIdentityApiEndpoints<AppUser>()
                .AddRoles<IdentityRole>()
                    .AddEntityFrameworkStores<PaymentDetailContex>();
            return services;
        }
        
        public static IServiceCollection ConfiqureIdentityOptions(this IServiceCollection services)
        {
            services.Configure<IdentityOptions>(options => {
                options.Password.RequireDigit = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.User.RequireUniqueEmail = true;

            });
            return services;
        }

        public static IServiceCollection AddIdentityAuth(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme =
                options.DefaultChallengeScheme =
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(y =>
            {
                y.SaveToken = false;
                y.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["AppSettings:JWTSecret"]!)),
                   ValidateIssuer = false,
                   ValidateAudience = false,
                };

            });
            services.AddAuthorization(
                options =>
                {
                    options.FallbackPolicy = new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme).RequireAuthenticatedUser().Build();

                    options.AddPolicy("HasLibraryID", policy => policy.RequireClaim("libraryID"));
                    options.AddPolicy("FemalesOnly", policy => policy.RequireClaim("gender","Female"));
                    options.AddPolicy("Under10", policy => policy.RequireAssertion(context=> Int32.Parse(context.User.Claims.First(x=>x.Type == "age").Value)<10));


                }

                );

            return services;
        }


        public static WebApplication AddIdentityAuthMiddelware(this WebApplication app)
        {
            app.UseAuthentication();
            app.UseAuthorization();
            return app;
        }

    }
}
