using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.VisualBasic;
using System.Net;
using System.Text;

namespace PaymentApi.Extensions
{
    public static class SwaggerExtension
    {
        public static IServiceCollection AddSwaggerExplorer(this IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                // Add the security definition for Bearer token
                c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Fill in the JWT Token",
                });

                // Add the security requirement referencing the above scheme
                c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
        {
            {
                new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Reference = new Microsoft.OpenApi.Models.OpenApiReference
                    {
                        Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new List<string>() // Scopes - empty for JWT
            }
        });

                c.EnableAnnotations();
            });

            return services;
        }

        public static WebApplication ConfiqureSwaggerExplorer(this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.RoutePrefix = "";
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                });
            }
            return app;
        }

    }
}
