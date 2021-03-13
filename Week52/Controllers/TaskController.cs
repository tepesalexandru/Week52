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
    public class TaskController : ControllerBase
    {
        private readonly ITaskManager _taskManager;
        public TaskController(ITaskManager taskManager)
        {
            _taskManager = taskManager;
        }

        [HttpGet]
        [Route("get")]
        public IActionResult Get()
        {
            return Ok(_taskManager.GetTasks());
        }

        [HttpGet]
        [Route("get/{TaskId}")]
        public IActionResult GetById(Guid TaskId)
        {
            return Ok(_taskManager.GetTask(TaskId));
        }

        [HttpPost]
        [Route("create/{GoalId}")]
        public IActionResult Create(Guid GoalId, [FromBody] BasicTask task)
        {
            _taskManager.CreateTask(GoalId, task);
            return Ok();
        }

        [HttpDelete]
        [Route("delete/{Id}")]
        public IActionResult Delete(Guid Id)
        {
            return Ok(_taskManager.DeleteTask(Id));
        }

        [HttpPost]
        [Route("addProgress/{TaskId}")]
        public IActionResult AddProgress(Guid TaskId, [FromBody] Progress progress)
        {
            return Ok(_taskManager.AddProgress(TaskId, progress));
        }


        [HttpPatch]
        [Route("complete/{TaskId}/{Day}")]
        public IActionResult Complete(Guid TaskId, int Day)
        {
            return Ok(_taskManager.CompleteTask(TaskId, Day));
        }

    }
}
