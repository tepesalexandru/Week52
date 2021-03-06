using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Entities;

namespace Week52.DataAccess.Context
{
    public class Week52DbContext : DbContext
    {
        public Week52DbContext(DbContextOptions<Week52DbContext> options): base(options)
        {
            
        }
        public DbSet<BasicUser> Users { get; set; }
        public DbSet<BasicTask> Tasks { get; set; }
        public DbSet<BasicGoal> Goals { get; set; }
        public DbSet<BasicDay> Days { get; set; }
        public DbSet<BasicWeek> Weeks { get; set; }
        public DbSet<BasicProgress> Progress { get; set; }

    }
}
