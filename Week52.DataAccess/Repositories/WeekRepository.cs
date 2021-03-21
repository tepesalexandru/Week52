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
        BasicWeek GetWeek(Guid WeekId);
        BasicWeek GetWeek(Guid UserId, int weekNumber);
        BasicWeek CreateWeek(int weekNumber, Guid UserId);
    }
    public class WeekRepository : IWeekRepository
    {
        private readonly Week52DbContext _dbContext;
        public WeekRepository(Week52DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public BasicWeek CreateWeek(int weekNumber, Guid UserId)
        {
            var newWeek = new BasicWeek();
            newWeek.WeekNumber = weekNumber;
            newWeek.UserId = UserId;
            _dbContext.Weeks.Add(newWeek);
            _dbContext.SaveChanges();
            return newWeek;
    }

        public BasicWeek GetWeek(Guid WeekId)
        {
            var week = _dbContext.Weeks
                .Include(x => x.Goals)
                .ThenInclude(x => x.Tasks)
                .ThenInclude(x => x.ProgressByDay)
                .FirstOrDefault(x => x.Id == WeekId);
            return week;
        }

        public BasicWeek GetWeek(Guid UserId, int weekNumber)
        {
            var week = _dbContext.Weeks
                .Include(x => x.Goals)
                .ThenInclude(x => x.Tasks)
                .ThenInclude(x => x.ProgressByDay)
                .Include(x => x.Goals)
                .ThenInclude(x => x.Tasks)
                .ThenInclude(x => x.Tags)
                .FirstOrDefault(x => x.UserId == UserId && x.WeekNumber == weekNumber);
            return week;
        }
    }
}
