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
    public class TagController : ControllerBase
    {
        private readonly ITagManager _tagManager;
        public TagController(ITagManager tagManager)
        {
            _tagManager = tagManager;
        }

        [HttpGet]
        [Route("getByUserId/{UserId}")]
        public IActionResult Create(Guid UserId)
        {
            return Ok(_tagManager.GetTags(UserId));
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create(BasicTag tag)
        {
            return Ok(_tagManager.Create(tag));
        }

        [HttpPost]
        [Route("assignTo/{TaskId}")]
        public IActionResult Assign(Guid TaskId, BasicTag tag)
        {
            return Ok(_tagManager.AssignTag(TaskId, tag));
        }

        [HttpPatch]
        [Route("removeFrom/{TaskId}")]
        public IActionResult Remove(Guid TaskId, BasicTag tag)
        {
            return Ok(_tagManager.RemoveTag(TaskId, tag));
        }

    }
}
