using System.Collections.Generic;
using CommonLib.Business.Core;
using CommonLib.Repo.Core;
using PoC.Data.Models;

namespace PoC.Business.Builders
{
    public class FavouritesBuilder: IModelBuilder<People, IEnumerable<Favourite>>
    {
        private readonly IRepository<Favourite> _repository;
        public FavouritesBuilder(IRepository<Favourite> repository)
        {
            _repository = repository;
            _repository.Include("People");
        }

        public IEnumerable<Favourite> Build(People people)
        {
            return _repository.Matches(new Criteria<Favourite>(x => x.PeopleId == people.Id));
        }
    }
}