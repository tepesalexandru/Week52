using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Entities.Relations;

namespace Week52.DataAccess.Entities
{
    public class BasicTag : BaseEntity
    {
        public BasicTag()
        {
            Tasks = new List<BasicTask>();
        }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public ICollection<BasicTask> Tasks { get; set; }
    }
}
