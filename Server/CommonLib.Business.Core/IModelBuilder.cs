namespace CommonLib.Business.Core
{
    public interface IModelBuilder<in TModel, out TEntity>
    {
        TEntity Build(TModel param);
    }

    public interface IModelBuilder<out TEntity>
    {
        TEntity Build();
    }
}
