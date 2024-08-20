using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions;

public static class IdentityServicesExtensions
{
    public static IServiceCollection UseIdentityServices(this IServiceCollection services, IConfiguration confiq)
    {

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).
            AddJwtBearer(opt => {
                var tokenKey = confiq["TokenKey"] ?? throw new Exception("TokenKey not found");
                opt.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
                    ValidateAudience = false,
                    ValidateIssuer = false
                };
            });
        return services;
    }
}
