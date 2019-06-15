namespace CommonLib.Business.Core
{
    public interface IModelCreator<in TEntity> where TEntity : class
    {
        void Create(TEntity model);

        void SaveChanges();
    }
}
