using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Week52.Business.Managers;
using Week52.Business.Models;

namespace Week52.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        private readonly IAnalyticsManager _analyticsManager;
        public AnalyticsController(IAnalyticsManager analyticsManager)
        {
            _analyticsManager = analyticsManager;
        }

        [HttpGet]
        [Route("progressOnWeeks/{UserId}")]
        public IActionResult GetProgressByWeeks(Guid UserId)
        {
            return Ok(_analyticsManager.ProgressOnEachWeek(UserId));
        }

    }
}
