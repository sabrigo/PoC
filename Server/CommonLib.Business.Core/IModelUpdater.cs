namespace CommonLib.Business.Core
{
    public interface IModelUpdater<in TEntity>  where TEntity : class
    {
        void Update(TEntity model);

        void SaveChanges();
    }
}
