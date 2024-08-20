using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ServicesExtensions
{
    public static IServiceCollection UseServics(this IServiceCollection services, IConfiguration confiq)
    {
        services.AddControllers();

        services.AddDbContext<DataContext>(opt => opt.UseSqlite(confiq.GetConnectionString("DefaultConnection")));

        services.AddCors(opt => 
        {
            opt.AddPolicy("CorsPolicy", policy => 
            {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200", "https://localhost:4200");
            });
        });



        services.AddScoped<ITokenService, TokenService>();

        return services;
    }
}
