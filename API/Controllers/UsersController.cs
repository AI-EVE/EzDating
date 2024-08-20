using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await userRepository.GetMembersAsync();
            return Ok(users);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await userRepository.GetMemberByIdAsync(id);


            if (user == null) return NotFound();

            return Ok(user);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUser(string username)
        {
            var user = await userRepository.GetMemberByUsernameAsync(username);

            if (user == null) return NotFound();
        
            return Ok(user);
        }

        // [HttpPut]
        // public async Task<ActionResult> UpdateUser(AppUser user)
        // {
        //     userRepository.Update(user);

        //     var result = await userRepository.SaveAllAsync();

        //     if (!result) return BadRequest("Failed to update user");

        //     return NoContent();
        // }
    }
}
