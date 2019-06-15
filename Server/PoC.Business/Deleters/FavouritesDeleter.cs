using System.IO;
using CommonLib.Business.Core;
using CommonLib.Repo.Core;
using PoC.Data.Models;

namespace PoC.Business.Deleters
{
    public class FavouritesDeleter : IModelDeleter<Favourite>
    {
        private readonly IRepository<Favourite> _repository;

        public FavouritesDeleter(IRepository<Favourite> repository)
        {
            _repository = repository;
        }

        public void Delete(Favourite model)
        {
            var favourite =
                _repository.Get(new Criteria<Favourite>(x => x.Id == model.Id && x.PeopleId == model.PeopleId));
            if (favourite == null)
                throw new InvalidDataException("Cannot find the favourite item");
            _repository.Delete(favourite);
        }

        public void SaveChanges()
        {
            _repository.SaveChanges();
        }
    }
}