using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Entities;
using Week52.DataAccess.Repositories;

namespace Week52.Business.Managers
{
    public interface ILookupManager
    {
        List<IdName> GetTasksForGoal(Guid GoalId);
    }
    public class LookupManager : ILookupManager
    {
        private readonly IGoalRepository _goalRepository;
        public LookupManager(IGoalRepository goalRepository)
        {
            _goalRepository = goalRepository;
        }

        public List<IdName> GetTasksForGoal(Guid GoalId)
        {
            List<IdName> tasks = _goalRepository.GetGoals().FirstOrDefault(x => x.Id == GoalId).Tasks.Select(x => new IdName { Id = x.Id, Name = x.Name }).ToList();
            return tasks;
        }
    }

}
