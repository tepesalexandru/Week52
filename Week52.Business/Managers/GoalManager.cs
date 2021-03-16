using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Entities;
using Week52.DataAccess.Repositories;

namespace Week52.Business.Managers
{
    public interface IGoalManager
    {
        IEnumerable<BasicGoal> GetGoals();
        BasicGoal CreateGoal(int WeekNumber, BasicGoal goal);
        Guid DeleteGoal(BasicGoal goal);
    }
    public class GoalManager : IGoalManager
    {
        private readonly IGoalRepository _goalRepository;
        public GoalManager(IGoalRepository goalRepository)
        {
            _goalRepository = goalRepository;
        }
        public BasicGoal CreateGoal(int WeekNumber, BasicGoal goal)
        {
            return _goalRepository.CreateGoal(WeekNumber, goal);
        }

        public Guid DeleteGoal(BasicGoal goal)
        {
            return _goalRepository.DeleteGoal(goal);
        }

        public IEnumerable<BasicGoal> GetGoals()
        {
            List<BasicGoal> goals = _goalRepository.GetGoals().ToList();
            return goals;
        }
    }

}
