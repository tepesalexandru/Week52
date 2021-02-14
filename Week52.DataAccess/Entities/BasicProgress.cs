using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Week52.DataAccess.Entities
{
    public class BasicProgress : BaseEntity
    {
        public Guid GoalId { get; set; }
        public Guid TaskId { get; set; }
        public int Progress { get; set; }
    }
}
