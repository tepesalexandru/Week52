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
        BasicTask GetTask(Guid TaskId);
        BasicTask CreateTask(Guid GoalId, BasicTask task);
        Guid DeleteTask(Guid TaskId);
        BasicTask AddProgress(Guid TaskId, Progress progress);
        BasicTask CompleteTask(Guid TaskId, int Day);
    }
    public class TaskManager : ITaskManager
    {
        private readonly IGenericRepository _genericRepository;
        private readonly IGoalRepository _goalRepository;
        private readonly ITaskRepository _taskRepository;
        public TaskManager(
            IGenericRepository genericRepository, 
            IGoalRepository goalRepository, 
            ITaskRepository taskRepository
        )
        {
            _genericRepository = genericRepository;
            _goalRepository = goalRepository;
            _taskRepository = taskRepository;
        }

        public BasicTask AddProgress(Guid TaskId, Progress progress)
        {
            return _taskRepository.AddProgress(TaskId, progress);
        }

        public BasicTask CompleteTask(Guid TaskId, int Day)
        {
            return _taskRepository.CompleteTask(TaskId, Day);
        }

        public BasicTask CreateTask(Guid GoalId, BasicTask task)
        {
            return _taskRepository.AddTask(GoalId, task);
        }

        public Guid DeleteTask(Guid TaskId)
        {
            return _taskRepository.DeleteTask(TaskId);
        }

        public BasicTask GetTask(Guid TaskId)
        {
            return _taskRepository.GetById(TaskId);
        }

        public IEnumerable<BasicTask> GetTasks()
        {
            return _genericRepository.GetAll<BasicTask>();
        }
    }

}
