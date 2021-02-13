using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Entities;
using Week52.DataAccess.Repositories;

namespace Week52.Business.Managers
{
    public interface IWeekManager
    {
        BasicWeek GetWeek(int weekNumber);
        BasicProgress AddProgress(Guid DayId, BasicProgress progress);
    }
    public class WeekManager : IWeekManager
    {
        private readonly IWeekRepository _weekRepository;
        public WeekManager(IWeekRepository weekRepository)
        {
            _weekRepository = weekRepository;
        }

        public BasicProgress AddProgress(Guid DayId, BasicProgress progress)
        {
            return _weekRepository.AddProgress(DayId, progress);
        }

        public BasicWeek GetWeek(int weekNumber)
        {
            return _weekRepository.GetWeek(weekNumber);
        }
    }

}
