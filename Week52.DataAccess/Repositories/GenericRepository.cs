using Week52.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Context;
using Microsoft.EntityFrameworkCore;

namespace Week52.DataAccess.Repositories
{
    public interface IGenericRepository
    {
        List<T> GetAll<T>() where T : BaseEntity;
        T Get<T>(Guid id) where T : BaseEntity;
        T Insert<T>(T entity) where T : BaseEntity;
        T Update<T>(T entity) where T : BaseEntity;
        void Delete<T>(T entity) where T : BaseEntity;
        bool Exists<T>(Guid id) where T : BaseEntity;
    }
    public class GenericRepository : IGenericRepository
    {
        public readonly Week52DbContext _dbContext;
        public GenericRepository(Week52DbContext context)
        {
            _dbContext = context;
        }
        public void Delete<T>(T entity) where T : BaseEntity
        {
            if (entity == null)
            {

            }
            _dbContext.Remove(entity);
            _dbContext.SaveChanges();
        }

        public T Get<T>(Guid id) where T : BaseEntity
        {
            DbSet<T> entities = _dbContext.Set<T>();

            return entities.SingleOrDefault(s => s.Id == id);
        }

        public List<T> GetAll<T>() where T : BaseEntity
        {
            DbSet<T> entities = _dbContext.Set<T>();

            return entities.ToList();
        }

        public T Insert<T>(T entity) where T : BaseEntity
        {
            if (entity == null)
            {
                return null;
            }
            DbSet<T> entities = _dbContext.Set<T>();

            entities.Add(entity);
            _dbContext.SaveChanges();
            return entity;
        }

        public T Update<T>(T entity) where T : BaseEntity
        {
            DbSet<T> entities = _dbContext.Set<T>();

            entities.Update(entity);
            _dbContext.SaveChanges();
            return entity;
        }

        public bool Exists<T>(Guid Id) where T : BaseEntity
        {
            DbSet<T> entities = _dbContext.Set<T>();

            return entities.Any(e => e.Id == Id);
        }
    }
}
