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
    public class TagProgress
    {
        public TagProgress()
        {

        }
        public Guid TagId { get; set; }
        public string Name { get; set; }
        public int TotalEstimations { get; set; }
        public int TotalActive { get; set; }
    }
    public interface ITagRepository
    {
        List<BasicTag> GetTags(Guid UserId);
        BasicTag Create(BasicTag tag);
        BasicTag AssignTag(Guid TaskId, BasicTag tag);
        Guid RemoveTag(Guid TaskId, BasicTag tag);
        List<TagProgress> GetProgressOnTags(Guid UserId);
    }
    public class TagRepository : ITagRepository
    {
        private readonly Week52DbContext _dbContext;
        public TagRepository(Week52DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public BasicTag AssignTag(Guid TaskId, BasicTag tag)
        {
            var task = _dbContext.Tasks.Include(x => x.Tags).FirstOrDefault(x => x.Id == TaskId);
            task.Tags.Add(tag);
            _dbContext.SaveChanges();
            return tag;
        }

        public BasicTag Create(BasicTag tag)
        {
            _dbContext.Tags.Add(tag);
            _dbContext.SaveChanges();
            return tag;
        }

        public List<TagProgress> GetProgressOnTags(Guid UserId)
        {
            
            List<BasicWeek> weeks = _dbContext.Weeks
                .Include(x => x.Goals)
                .ThenInclude(x => x.Tasks)
                .ThenInclude(x => x.Tags)
                .Include(x => x.Goals)
                .ThenInclude(x => x.Tasks)
                .ThenInclude(x => x.ProgressByDay)
                .Where(x => x.UserId == UserId)
                .ToList();
            var tags = _dbContext.Tags.Where(x => x.UserId == UserId).ToList();
            List<TagProgress> progressOnTasks = new List<TagProgress>();
            void AddEstimation(Guid TagId, int Amount)
            {
                for (int i = 0; i < progressOnTasks.Count; i++)
                {
                    if (progressOnTasks[i].TagId == TagId)
                    {
                        progressOnTasks[i].TotalEstimations += Amount;
                    }
                }
            }
            void AddActiveTime(Guid TagId, int Amount)
            {
                for (int i = 0; i < progressOnTasks.Count; i++)
                {
                    if (progressOnTasks[i].TagId == TagId)
                    {
                        progressOnTasks[i].TotalActive += Amount;
                    }
                }
            }
            foreach (var tag in tags)
            {
                progressOnTasks.Add(
                    new TagProgress { TotalEstimations = 0, TotalActive = 0, TagId = tag.Id, Name=tag.Name }
               ) ;
            }
            foreach(var week in weeks)
            {
                foreach(var goal in week.Goals)
                {
                    foreach(var task in goal.Tasks)
                    {
                        foreach(var tag in task.Tags)
                        {
                            AddEstimation(tag.Id, task.Estimation);
                            foreach (var p in task.ProgressByDay)
                            {
                                AddActiveTime(tag.Id, p.Minutes);
                            }
                        }
                    }
                }
            }
            return progressOnTasks;

        }

        public List<BasicTag> GetTags(Guid UserId)
        {
            var tags = _dbContext.Tags.Where(x => x.UserId == UserId).ToList();
            return tags;
        }

        public Guid RemoveTag(Guid TaskId, BasicTag tag)
        {
            var task = _dbContext.Tasks.Include(x => x.Tags).FirstOrDefault(x => x.Id == TaskId);
            BasicTag tagToRemove = task.Tags.FirstOrDefault(x => x.Id == tag.Id);
            task.Tags.Remove(tagToRemove);
            _dbContext.SaveChanges();
            return tag.Id;
        }

    }

}
