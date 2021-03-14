using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Week52.DataAccess.Entities
{
    public class Progress : BaseEntity
    {
        [ForeignKey("Task")]
        public Guid TaskId { get; set; }
        public BasicTask Task { get; set; }
        public int Minutes { get; set; }
        public int Day { get; set; }
    }
    public class BasicTask : BaseEntity
    {
        public BasicTask()
        {
            ProgressByDay = new List<Progress>();
        }
        public string Name { get; set; }
        [ForeignKey("Goal")]
        public Guid GoalId { get; set; }
        public BasicGoal Goal { get; set; }
        public int Estimation { get; set; }
        public virtual ICollection<Progress> ProgressByDay { get; set; } 
        public int DayCompleted { get; set; }
        public string Note { get; set; }
    }
}
