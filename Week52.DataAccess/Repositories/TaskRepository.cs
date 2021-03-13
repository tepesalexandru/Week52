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
    public interface ITaskRepository
    {
        BasicTask GetById(Guid Id);
        BasicTask AddTask(Guid GoalId, BasicTask task);
        Guid DeleteTask(Guid TaskId);
        BasicTask AddProgress(Guid TaskId, Progress progress);
        BasicTask CompleteTask(Guid TaskId, int Day);
    }
    public class TaskRepository : ITaskRepository
    {
        private readonly Week52DbContext _dbContext;
        public TaskRepository(Week52DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public BasicTask AddProgress(Guid TaskId, Progress progress)
        {
            var task = _dbContext.Tasks.Include(x => x.ProgressByDay).FirstOrDefault(x => x.Id == TaskId);
            List<Progress> progresses = task.ProgressByDay.ToList();
            for (int i = 0; i < task.ProgressByDay.Count; i++)
            {
                if (progresses[i].Day == progress.Day)
                {
                    progresses[i].Minutes += progress.Minutes;
                }
            }

            task.ProgressByDay = progresses;
            _dbContext.SaveChanges();
            return task;

        }

        public BasicTask AddTask(Guid GoalId, BasicTask task)
        {
            _dbContext.Goals.FirstOrDefault(x => x.Id == GoalId).Tasks.Add(task);
            _dbContext.SaveChanges();

            for (int i = 0; i < 7; i++)
            {
                task.ProgressByDay.Add(new Progress() { Minutes = 0, Day = i + 1 }) ;
            }
            _dbContext.SaveChanges();

            return task;
        }

        public BasicTask CompleteTask(Guid TaskId, int Day)
        {
            var task = _dbContext.Tasks.FirstOrDefault(x => x.Id == TaskId);
            task.DayCompleted = Day;
            _dbContext.SaveChanges();
            return task;
        }

        public Guid DeleteTask(Guid TaskId)
        {
            var task = _dbContext.Tasks.Include(x => x.ProgressByDay).FirstOrDefault(x => x.Id == TaskId);
            foreach(var p in task.ProgressByDay)
            {
                _dbContext.Progress.Remove(p);
            }
            _dbContext.Tasks.Remove(task);
            _dbContext.SaveChanges();
            return TaskId;
        }

        public BasicTask GetById(Guid Id)
        {
            return _dbContext.Tasks.FirstOrDefault(x => x.Id == Id);
        }
    }

}
