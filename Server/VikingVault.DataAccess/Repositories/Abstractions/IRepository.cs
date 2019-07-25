using System.Linq;

namespace VikingVault.DataAccess.Repositories.Abstractions
{
    public interface IRepository<T>
    {
        IQueryable<T> FindAll();
    }
}
