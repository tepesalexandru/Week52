using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Entities;
using Week52.DataAccess.Repositories;

namespace Week52.Business.Managers
{
    public interface ITaskManager
    {
        IEnumerable<BasicTask> GetTasks();
        BasicTask CreateTask(Guid GoalId, BasicTask task);
        Guid DeleteTask(BasicTask Task);
    }
    public class TaskManager : ITaskManager
    {
        private readonly IGenericRepository _genericRepository;
        private readonly IGoalRepository _goalRepository;
        public TaskManager(IGenericRepository genericRepository, IGoalRepository goalRepository)
        {
            _genericRepository = genericRepository;
            _goalRepository = goalRepository;
        }

        public BasicTask CreateTask(Guid GoalId, BasicTask task)
        {
            return _goalRepository.AddTask(GoalId, task);
        }

        public Guid DeleteTask(BasicTask task)
        {
            return _goalRepository.DeleteTask(task);
        }

        public IEnumerable<BasicTask> GetTasks()
        {
            return _genericRepository.GetAll<BasicTask>();
        }
    }

}
