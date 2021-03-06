using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Week52.Business.Managers;
using Week52.DataAccess.Entities;

namespace Week52.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserManager _userManager;
        public UserController(IUserManager userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Route("get")]
        public IActionResult GetUsers()
        {
            return Ok(_userManager.GetUsers());
        }

        [HttpPost]
        [Route("create")]
        public IActionResult CreateUser([FromBody] BasicUser User)
        {
            return Ok(_userManager.CreateUser(User.Name));
        }

    }
}
