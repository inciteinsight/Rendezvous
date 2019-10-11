using Microsoft.AspNetCore.Mvc;
using Application.User;
using System.Threading.Tasks;
using Domain;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<AppUser>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }
    }
}