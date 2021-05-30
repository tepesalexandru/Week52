using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Entities;

namespace Week52.Business.Engine
{
    public interface IAnalyticsEngine
    {
        int GetProgressOnWeek(BasicWeek week);
    }
    public class AnalyticsEngine : IAnalyticsEngine
    {
        public int GetProgressOnWeek(BasicWeek week)
        {
            int totalProgress = 0;
            foreach(var goal in week.Goals)
            {
                foreach(var task in goal.Tasks)
                {
                    totalProgress += task.ProgressByDay.Select(x => x.Minutes).ToArray().Sum();
                }
            }
            return totalProgress;
        }
    }

}
