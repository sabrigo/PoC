using Microsoft.EntityFrameworkCore;

namespace CommonLib.Repo.Core
{
    public interface ICriteriaQuery<TEntity> where TEntity : class
    {
        DbSet<TEntity> Entity { get; }
    }
}