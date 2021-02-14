using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Week52.DataAccess.Entities
{
    public class BasicDay : BaseEntity
    {
        public BasicDay()
        {
            Overview = new List<BasicProgress>();
        }
        public int DayNumber { get; set; }
        [ForeignKey("Week")]
        public Guid WeekId { get; set; }
        public BasicWeek Week{ get; set; }
        public virtual ICollection<BasicProgress> Overview { get; set; }
    }
}
