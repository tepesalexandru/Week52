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

        [HttpPost]
        [Route("create/{GoalId}")]
        public IActionResult Create(Guid GoalId, [FromBody] BasicTask task)
        {
            _taskManager.CreateTask(GoalId, task);
            return Ok();
        } 

        [HttpPatch]
        [Route("addProgress/{TaskId}/{minutes}")]
        public IActionResult AddProgress(Guid TaskId, int minutes)
        {
            _taskManager.AddTaskProgress(TaskId, minutes);
            return Ok();
        }

        [HttpDelete]
        [Route("delete/{Id}")]
        public IActionResult Delete(Guid Id)
        {
            BasicTask taskToDelete = _taskManager.GetTasks().FirstOrDefault(x => x.Id == Id);
            return Ok(_taskManager.DeleteTask(taskToDelete));
        }

    }
}
