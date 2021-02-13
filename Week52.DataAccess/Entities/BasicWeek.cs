using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Week52.DataAccess.Entities
{
    public class BasicWeek : BaseEntity
    {
        public BasicWeek()
        {
            Goals = new List<BasicGoal>();
            Days = new List<BasicDay>();
        }
        public int WeekNumber { get; set; }
        public virtual ICollection<BasicGoal> Goals { get; set; }
        public virtual ICollection<BasicDay> Days { get; set; }
    }
}
