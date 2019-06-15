using System.IO;
using CommonLib.Business.Core;
using CommonLib.Repo.Core;
using PoC.Data.Models;

namespace PoC.Business.Builders
{
    public class PeopleBuilder : IModelBuilder<string, People>
    {
        private readonly IRepository<People> _repository;

        public PeopleBuilder(IRepository<People> repository)
        {
            _repository = repository;
        }

        public People Build(string name)
        {
            var people = _repository.Get(new Criteria<People>(x => x.Name == name));
            if (people == null)
            {
                throw new InvalidDataException("Could not find the user");
            }

            return people;
        }
    }
}