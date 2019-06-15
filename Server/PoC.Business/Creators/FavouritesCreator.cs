using CommonLib.Business.Core;
using CommonLib.Repo.Core;
using PoC.Data.Models;

namespace PoC.Business.Creators
{
    public class FavouritesCreator : IModelCreator<Favourite>
    {
        private readonly IRepository<Favourite> _repository;
        public FavouritesCreator(IRepository<Favourite> repository)
        {
            _repository = repository;
            _repository.Include("People");
        }
        public void Create(Favourite model)
        {
            _repository.Add(model);
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }
    }
}