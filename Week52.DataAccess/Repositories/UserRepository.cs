using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Week52.DataAccess.Context;
using Week52.DataAccess.Entities;

namespace Week52.DataAccess.Repositories
{
    public interface IUserRepository
    {
        public BasicUser CreateUser(string Name);
    }
    public class UserRepository : IUserRepository
    {
        private readonly Week52DbContext _context;
        public UserRepository(Week52DbContext context)
        {
            _context = context;
        }
        public BasicUser CreateUser(string Name)
        {
            var newUser = new BasicUser();
            newUser.Name = Name;
            _context.Users.Add(newUser);
            _context.SaveChanges();
            return newUser;
        }
    }

}
