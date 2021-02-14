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
    public interface IGoalRepository
    {
        IEnumerable<BasicGoal> GetGoals();
        BasicGoal CreateGoal(int WeekNumber, BasicGoal goal);
        BasicTask AddTask(Guid GoalId, BasicTask task);
        Guid DeleteGoal(BasicGoal goal);
        Guid DeleteTask(BasicTask task);
    }
    public class GoalRepository : IGoalRepository
    {
        private readonly Week52DbContext _dbContext;
        public GoalRepository(Week52DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public BasicGoal CreateGoal(int WeekNumber, BasicGoal goal)
        {
            var week = _dbContext.Weeks.Include(x => x.Goals).FirstOrDefault(x => x.WeekNumber == WeekNumber);
            week.Goals.Add(goal);
            _dbContext.SaveChanges();

            return goal;
        }

        public BasicTask AddTask(Guid GoalId, BasicTask task)
        {
            _dbContext.Goals.FirstOrDefault(x => x.Id == GoalId).Tasks.Add(task);
            _dbContext.SaveChanges();
            return task;
        }

        public Guid DeleteGoal(BasicGoal goal)
        {
            Guid goalId = goal.Id;
            _dbContext.Goals.Remove(goal);
            _dbContext.SaveChanges();
            return goalId;
        }

        public Guid DeleteTask(BasicTask task)
        {
            Guid taskId = task.Id;
            _dbContext.Tasks.Remove(task);
            _dbContext.SaveChanges();
            return taskId;
        }

        public IEnumerable<BasicGoal> GetGoals()
        {
            var goals = _dbContext.Goals.Include(x => x.Tasks).ToList();
            return goals;
        }
    }

}
