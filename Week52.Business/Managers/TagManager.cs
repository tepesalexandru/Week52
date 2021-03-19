using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Entities;
using Week52.DataAccess.Repositories;

namespace Week52.Business.Managers
{
    public interface ITagManager
    {
        List<BasicTag> GetTags(Guid UserId);
        BasicTag Create(BasicTag tag);
    }
    public class TagManager : ITagManager
    {
        private readonly ITagRepository _tagRepository;
        public TagManager(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }
        public BasicTag Create(BasicTag tag)
        {
            return _tagRepository.Create(tag);
        }

        public List<BasicTag> GetTags(Guid UserId)
        {
            return _tagRepository.GetTags(UserId);
        }
    }

}
