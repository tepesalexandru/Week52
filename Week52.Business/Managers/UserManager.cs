using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Entities;
using Week52.DataAccess.Repositories;

namespace Week52.Business.Managers
{
    public interface IUserManager
    {
        public BasicUser CreateUser(string Name);
        public void InitializeUser(Guid UserId);
    }
    public class UserManager : IUserManager
    {
        private readonly IUserRepository _userRepository;
        private readonly IWeekRepository _weekRepository;
        public UserManager(IUserRepository userRepository, IWeekRepository weekRepository)
        {
            _userRepository = userRepository;
            _weekRepository = weekRepository;
        }
        public BasicUser CreateUser(string Name)
        {
            var user = _userRepository.CreateUser(Name);
            InitializeUser(user.Id);
            return user;
        }

        public void InitializeUser(Guid UserId)
        {
            for (int i = 1; i <= 52; i++)
            {
                _weekRepository.CreateWeek(i, UserId);
            }
        }
    }

}
