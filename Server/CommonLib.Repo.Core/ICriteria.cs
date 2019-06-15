using System.Linq;

namespace CommonLib.Repo.Core
{
    public interface ICriteria<TEntity> where TEntity : class
    {
        IQueryable<TEntity> Build(ICriteriaQuery<TEntity> entity);
    }
}