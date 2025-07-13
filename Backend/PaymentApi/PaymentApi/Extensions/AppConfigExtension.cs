using Microsoft.EntityFrameworkCore;
using PaymentApi.Models;

namespace PaymentApi.Extensions
{
    public static class AppConfigExtension
    {
        public static WebApplication ConfiqureCORS(this WebApplication app,IConfiguration configuration)
        {
            app.UseCors(options => options.WithOrigins("http://localhost:4200").AllowAnyMethod()
           .AllowAnyHeader()
           );
            return app;
        }

        public static IServiceCollection AddAppConfig(this IServiceCollection services, IConfiguration configuration)
        {


            services.Configure<AppSettings>(configuration.GetSection("AppSettings"));

            return services;
        }
    }
}
