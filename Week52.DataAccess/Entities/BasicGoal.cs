using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Week52.DataAccess.Entities
{
    public class BasicGoal : BaseEntity
    {
        public BasicGoal()
        {
            Tasks = new List<BasicTask>();
        }
        public string Name { get; set; }
        public int? WeekNumber { get; set; }
        public virtual ICollection<BasicTask> Tasks { get; set; }
    }
}
