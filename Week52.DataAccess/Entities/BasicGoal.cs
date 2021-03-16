using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public virtual ICollection<BasicTask> Tasks { get; set; }
        [ForeignKey("Week")]
        public Guid WeekId { get; set; }
        public BasicWeek Week { get; set; }
    }
}
