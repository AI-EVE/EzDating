using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration confiq) : ITokenService
{
    public string CreateToken(AppUser appUser)
    {
        var tokenKey = confiq["TokenKey"] ?? throw new Exception("Unable to access token key");

        if (tokenKey.Length < 64) throw new Exception("TokenKey length must be longer than 63");

        var symmetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        var claims = new List<Claim> {
            new(ClaimTypes.NameIdentifier, appUser.UserName)
        };

        var creds = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(6),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);


    }
}
