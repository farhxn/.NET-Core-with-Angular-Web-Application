using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PaymentApi.Models;

namespace PaymentApi.Extensions
{
    public static class EFCoreExtensions
    {
        public static IServiceCollection InjectDBContext(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddDbContext<PaymentDetailContex>(options => options.UseSqlServer(
             configuration.GetConnectionString("DevConnections")
                ));

            return services;
        }
        
    
    }
}
