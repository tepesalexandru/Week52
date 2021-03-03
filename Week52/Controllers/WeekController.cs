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
    public class WeekController : ControllerBase
    {
        private readonly IWeekManager _weekManager;
        public WeekController(IWeekManager weekManager)
        {
            _weekManager = weekManager;
        }

        [HttpGet]
        [Route("get/{UserId}/{WeekNumber}")]
        public IActionResult GetWeek(Guid UserId, int WeekNumber)
        {
            return Ok(_weekManager.GetWeek(UserId, WeekNumber));
        }


        [HttpPatch]
        [Route("addProgress/{DayId}")]
        public IActionResult AddProgress(Guid DayId, BasicProgress progress)
        {
            _weekManager.AddProgress(DayId, progress);
            return Ok();
        }

    }
}
