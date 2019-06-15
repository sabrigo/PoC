using Microsoft.EntityFrameworkCore;

namespace CommonLib.Repo.Core
{
    public abstract class Repository<TObjectContext, TEntity>
        where TObjectContext : DbContext
        where TEntity : class
    {
        protected Repository(TObjectContext objectDbContext)
        {
            DataEntities = objectDbContext;
            Entity = DataEntities.Set<TEntity>();
        }

        public DbSet<TEntity> Entity { get; }

        public TObjectContext DataEntities { get; }
    }
}