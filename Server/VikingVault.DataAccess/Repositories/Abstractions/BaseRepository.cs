using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace VikingVault.DataAccess.Repositories.Abstractions
{
    public abstract class BaseRepository<T> : IRepository<T> where T : class
    {
        protected MyDbContext MyDbContext { get; }

        protected BaseRepository(MyDbContext myDbContext)
        {
            MyDbContext = myDbContext;
        }

        public IQueryable<T> FindAll()
        {
            return MyDbContext.Set<T>();
        }
    }
}
