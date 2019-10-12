using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Application.Interfaces;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public string GetCurrentUsername()
        {
            string username = _httpContextAccessor.HttpContext.
                User?.Claims?.FirstOrDefault(
                    x => x.Type == ClaimTypes.NameIdentifier
                )?.Value;
            
            return username;
        }
    }
}