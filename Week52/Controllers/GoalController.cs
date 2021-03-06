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
    public class GoalController : ControllerBase
    {
        private readonly IGoalManager _goalManager;
        public GoalController(IGoalManager goalManager)
        {
            _goalManager = goalManager;
        }

        [HttpGet]
        [Route("get")]
        public IActionResult GetGoals()
        {
            return Ok(_goalManager.GetGoals());
        }

        [HttpGet]
        [Route("get/{UserId}")]
        public IActionResult GetGoalsByUserId(Guid UserId)
        {
            return Ok(_goalManager.GetGoalsByUserId(UserId));
        }

        [HttpPost]
        [Route("create/{WeekNumber}")]
        public IActionResult CreateGoal(int WeekNumber, BasicGoal goal)
        {
            _goalManager.CreateGoal(WeekNumber, goal);
            return Ok();
        }

        [HttpDelete]
        [Route("delete/{Id}")]
        public IActionResult DeleteGoal(Guid Id)
        {
            BasicGoal goalToDelete =_goalManager.GetGoals().FirstOrDefault(x => x.Id == Id);
            return Ok(_goalManager.DeleteGoal(goalToDelete));
        }
    }
}
