using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Entities;
using Week52.DataAccess.Entities.Relations;

namespace Week52.DataAccess.Context
{
    public class Week52DbContext : DbContext
    {
        public Week52DbContext(DbContextOptions<Week52DbContext> options): base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskTags>().HasKey(sc => new { sc.TaskId, sc.TagId });
        }

        public DbSet<BasicWeek> Weeks { get; set; }
        public DbSet<BasicUser> Users { get; set; }
        public DbSet<BasicGoal> Goals { get; set; }
        public DbSet<BasicTask> Tasks { get; set; }
        public DbSet<Progress> Progress { get; set; }
        public DbSet<TaskTags> TaskTags { get; set; }
    }
}
