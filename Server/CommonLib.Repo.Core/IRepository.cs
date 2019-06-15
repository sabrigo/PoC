using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace CommonLib.Repo.Core
{
    public interface IRepository<TEntity> where TEntity : class
    {
        void Include(params string[] associations);
        IQueryable<TEntity> GetAll();
        TEntity Get(ICriteria<TEntity> criteria);
        IQueryable<TEntity> Matches(ICriteria<TEntity> criteria);
        void Delete(TEntity entity);
        void Delete(ICriteria<TEntity> criteria);
        void Add(TEntity entity);
        void AddRange(List<TEntity> entities);
        void Update(TEntity entity);
        void SaveChanges();
        int Count(ICriteria<TEntity> criteria);
    }
}