using System;
using System.Collections.Generic;
using Week52.Business.Engine;
using Week52.Business.Models;
using Week52.DataAccess.Entities;
using Week52.DataAccess.Repositories;

namespace Week52.Business.Managers
{
    public interface IAnalyticsManager
    {
        List<WeekProgressModel> ProgressOnEachWeek(Guid UserId);
    }
    public class AnalyticsManager : IAnalyticsManager
    {
        private readonly IAnalyticsEngine _analyticsEngine;
        private readonly IWeekRepository _weekRepository;
        public AnalyticsManager(IAnalyticsEngine analyticsEngine, IWeekRepository weekRepository)
        {
            _analyticsEngine = analyticsEngine;
            _weekRepository = weekRepository;
        }
        public List<WeekProgressModel> ProgressOnEachWeek(Guid UserId)
        {
            List<WeekProgressModel> progressOnEachWeek = new List<WeekProgressModel>();
            for (int i = 1; i <= 52; i++)
            {
                BasicWeek week = _weekRepository.GetWeek(UserId, i);
                if (week == null) continue;
                int progress = _analyticsEngine.GetProgressOnWeek(week);
                WeekProgressModel weekProgress = new WeekProgressModel() { WeekNumber = i, Progress = progress };
                progressOnEachWeek.Add(weekProgress);
            }
            return progressOnEachWeek;
        }
    }

}
