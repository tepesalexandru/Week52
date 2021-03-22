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
    public interface ITagRepository
    {
        List<BasicTag> GetTags(Guid UserId);
        BasicTag Create(BasicTag tag);
        BasicTag AssignTag(Guid TaskId, BasicTag tag);
        Guid RemoveTag(Guid TaskId, BasicTag tag);
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
