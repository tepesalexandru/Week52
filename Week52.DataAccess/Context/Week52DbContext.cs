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

        public DbSet<SimpleTask> SimpleTasks { get; set; }

    }
}
