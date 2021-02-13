using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Week52.DataAccess.Entities
{
    public class BasicTask : BaseEntity
    {
        public string Name { get; set; }
        public int Duration { get; set; }
        [ForeignKey("Goal")]
        public Guid GoalId { get; set; }
        public BasicGoal Goal { get; set; }
    }
}
