using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Context;
using Week52.DataAccess.Entities;

namespace Week52.DataAccess.Repositories
{
    public interface IWeekRepository
    {
        BasicWeek GetWeek(int weekNumber);
        BasicWeek GetWeek(Guid WeekId);
        BasicWeek GetWeek(Guid UserId, int weekNumber);
        BasicWeek CreateWeek(int weekNumber, Guid UserId);
        BasicProgress AddProgress(Guid DayId, BasicProgress progress);
    }
    public class WeekRepository : IWeekRepository
    {
        private readonly Week52DbContext _dbContext;
        public WeekRepository(Week52DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public BasicWeek GetWeek(int weekNumber)
        {
            var week = _dbContext.Weeks
                .Include(x => x.Goals)
                .ThenInclude(x => x.Tasks)
                .Include(x => x.Days)
                .ThenInclude(x => x.Overview)
                .FirstOrDefault(x => x.WeekNumber == weekNumber);
            if (week == null)
            {
                var newWeek = new BasicWeek();
                newWeek.WeekNumber = weekNumber;
                _dbContext.Weeks.Add(newWeek);
                _dbContext.SaveChanges();

                for(int i = 0; i < 7; i++)
                {
                    var newDay = new BasicDay();
                    newDay.DayNumber = i + 1;
                    newWeek.Days.Add(newDay);
                }
                _dbContext.SaveChanges();

                return newWeek;
            }
            return week;
        }

        public BasicProgress AddProgress(Guid DayId, BasicProgress progress)
        {
            var day = _dbContext.Days
                .Include(x => x.Overview)
                .FirstOrDefault(x => x.Id == DayId);

            day.Overview.Add(progress);
            _dbContext.SaveChanges();
            return progress;
        }

        public BasicWeek CreateWeek(int weekNumber, Guid UserId)
        {
            var newWeek = new BasicWeek();
            newWeek.WeekNumber = weekNumber;
            newWeek.UserId = UserId;
            _dbContext.Weeks.Add(newWeek);
            _dbContext.SaveChanges();

            for (int i = 0; i < 7; i++)
            {
                var newDay = new BasicDay();
                newDay.DayNumber = i + 1;
                newWeek.Days.Add(newDay);
            }
            _dbContext.SaveChanges();

            return newWeek;
    }

        public BasicWeek GetWeek(Guid WeekId)
        {
            var week = _dbContext.Weeks
                .Include(x => x.Goals)
                .ThenInclude(x => x.Tasks)
                .Include(x => x.Days)
                .ThenInclude(x => x.Overview)
                .FirstOrDefault(x => x.Id == WeekId);
            return week;
        }

        public BasicWeek GetWeek(Guid UserId, int weekNumber)
        {
            var week = _dbContext.Weeks
                .Include(x => x.Goals)
                .ThenInclude(x => x.Tasks)
                .Include(x => x.Days)
                .ThenInclude(x => x.Overview)
                .FirstOrDefault(x => x.UserId == UserId && x.WeekNumber == weekNumber);
            return week;
        }
    }

    
}
