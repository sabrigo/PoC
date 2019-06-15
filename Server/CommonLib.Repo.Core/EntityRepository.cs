using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace CommonLib.Repo.Core
{
    public abstract class EntityRepository<TObjectContext, TEntity> : Repository<TObjectContext, TEntity>,
        IRepository<TEntity>, ICriteriaQuery<TEntity>
        where TObjectContext : DbContext
        where TEntity : class
    {
        protected EntityRepository(TObjectContext objectContext)
            : base(objectContext)
        {
        }

        public void Include(params string[] associations)
        {
            associations.ToList().ForEach(x=>Entity.Include(x).Load());
        }

        public IQueryable<TEntity> GetAll()
        {
            return Entity;
        }

        public TEntity Get(ICriteria<TEntity> criteria)
        {
            return Matches(criteria).SingleOrDefault();
        }

        public IQueryable<TEntity> Matches(ICriteria<TEntity> criteria)
        {
            return criteria.Build(this);
        }

        public void Delete(TEntity entity)
        {
            Entity.Remove(entity);
        }

        public void Delete(ICriteria<TEntity> criteria)
        {
            foreach (var entity in Matches(criteria))
            {
                Delete(entity);
            }
        }

        public void Add(TEntity entity)
        {
            Entity.Add(entity);
        }

        public void AddRange(List<TEntity> entities)
        {
            Entity.AddRange(entities);
        }

        public void Update(TEntity entity)
        {
            Entity.Update(entity);
        }

        public void SaveChanges()
        {
            DataEntities.SaveChanges();
        }

        public int Count(ICriteria<TEntity> criteria)
        {
            return Matches(criteria).Count();
        }
    }
}