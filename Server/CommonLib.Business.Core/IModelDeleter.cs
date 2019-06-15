namespace CommonLib.Business.Core
{
    public interface IModelDeleter<in TEntity>
    {
        void Delete(TEntity model);

        void SaveChanges();
    }
}
