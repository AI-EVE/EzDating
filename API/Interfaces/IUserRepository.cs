using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<AppUser?> GetUserByIdAsync(int id);
        Task<AppUser?> GetUserByUsernameAsync(string username);
        Task<List<AppUser>> GetUsersAsync();
        Task<MemberDto?> GetMemberByIdAsync(int id);
        Task<MemberDto?> GetMemberByUsernameAsync(string username);
        Task<List<MemberDto>> GetMembersAsync();
        Task<bool> SaveAllAsync();       
    }
}