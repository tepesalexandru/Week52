using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Week52.DataAccess.Entities
{
    public class SimpleTask : BaseEntity
    {
        public string Name { get; set; }
        public int Duration { get; set; }
    }
}
