using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PaymentApi.Controllers;
using PaymentApi.Extensions;
using PaymentApi.Models;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


builder.Services
    .AddSwaggerExplorer()
    .InjectDBContext(builder.Configuration)
    .AddAppConfig(builder.Configuration)
    .AddIdentityHandlersAndStores()
    .ConfiqureIdentityOptions()
    .AddIdentityAuth(builder.Configuration)
    ;


var app = builder.Build();

// Configure the HTTP request pipeline.

app.
    ConfiqureSwaggerExplorer()
    .ConfiqureCORS(builder.Configuration)
    .AddIdentityAuthMiddelware();

app.UseHttpsRedirection();

app.MapControllers();
app.MapGroup("/api")
    .MapIdentityApi<AppUser>();
app.MapGroup("/api")
    .MapIdentityUserEndPoint()
    .MapAccountEndPoints()
    .MapAuthorizationDemoEndPoints();


app.Run();

