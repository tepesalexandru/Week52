using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Week52.DataAccess.Entities.Relations
{
    public class TaskTags : BaseEntity
    {
        public Guid TaskId { get; set; }
        public Task Task { get; set; }

        public Guid TagId { get; set; }
        public BasicTag Tag { get; set; }
    }
}
