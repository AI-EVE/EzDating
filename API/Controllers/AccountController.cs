using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerInfo) 
        {
            var userExists = await UserExists(registerInfo.Username);

            if (userExists) return BadRequest("User Already Exists");

            using var hmac = new HMACSHA512();
            var user = new AppUser() {
              UserName = registerInfo.Username,
              PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerInfo.Password)),
              PasswordSalt = hmac.Key  
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return new UserDto {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginInfo)
        {
            var user = await context.Users.FirstOrDefaultAsync(user => user.UserName == loginInfo.Username);

            if (user == null) return Unauthorized("Incorrect Username or password");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginInfo.Password));

            if (computedHash.Length != user.PasswordHash.Length) return Unauthorized("Incorrect Username or password");

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Incorrect Username or password");
            }

            return new UserDto {
                Username = user.UserName,
                Token = tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await context.Users.AnyAsync(ele => ele.UserName.ToLower() == username.ToLower());
        }

        

    }
}
