using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Week52.Business.Managers;

namespace Week52.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookupController : ControllerBase
    {
        private readonly ILookupManager _lookupManager;
        public LookupController(ILookupManager lookupManager)
        {
            _lookupManager = lookupManager;
        }
        [HttpGet]
        [Route("Goals/{Week}")]
        public IActionResult GetGoalsForWeek(int Week)
        {
            var goals = _lookupManager.GetGoalsForWeek(Week);
            return Ok(goals);
        }

        [HttpGet]
        [Route("Tasks/{GoalId}")]
        public IActionResult GetTasksForGoal(Guid GoalId)
        {
            var tasks = _lookupManager.GetTasksForGoal(GoalId);
            return Ok(tasks);
        }
    }
}
