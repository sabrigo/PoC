using System;
using System.Linq;
using System.Linq.Expressions;

namespace CommonLib.Repo.Core
{
    public class Criteria<TEntity> : ICriteria<TEntity> where TEntity : class
    {
        private readonly Expression<Func<TEntity, bool>> _expression;

        public Criteria(Expression<Func<TEntity, bool>> expression)
        {
            _expression = expression;
        }

        public IQueryable<TEntity> Build(ICriteriaQuery<TEntity> entity)
        {
            return entity.Entity.Where(_expression);
        }
    }
}