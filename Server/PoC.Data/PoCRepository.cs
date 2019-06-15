using CommonLib.Repo.Core;

namespace PoC.Data
{
    public class PoCRepository<TEntity> : EntityRepository<PoCDbContext, TEntity> where TEntity : class
    {
        public PoCRepository(PoCDbContext objectContext) : base(objectContext)
        {
        }
    }
}