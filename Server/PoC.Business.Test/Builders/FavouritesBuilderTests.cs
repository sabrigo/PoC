using System.Collections.Generic;
using System.Linq;
using CommonLib.Business.Core;
using CommonLib.Repo.Core;
using Moq;
using PoC.Business.Builders;
using PoC.Data.Models;
using Xunit;

namespace PoC.Business.Test.Builders
{
    public class FavouritesBuilderTests
    {
        private readonly IModelBuilder<People, IEnumerable<Favourite>> _favouritesBuilder;
        private readonly Mock<IRepository<Favourite>> _mockFavouritesRepository;

        public FavouritesBuilderTests()
        {
            _mockFavouritesRepository = new Mock<IRepository<Favourite>>();
            _favouritesBuilder = new FavouritesBuilder(_mockFavouritesRepository.Object);
        }


        [Fact]
        public void Build_GivenPeople_ShouldFetchFavouritesByGivenPeople()
        {
            //Arrange
            const int id = 1;
            ;
            var people = new People {Name = "Test 1", Id = id};
            var favourites = new[]
            {
                new Favourite {Id = 1, PeopleId = 1, People = people},
                new Favourite {Id = 2, PeopleId = 2, People = new People {Id = 2, Name = "sample"}}
            };
            _mockFavouritesRepository.Setup(x => x.Matches(It.IsAny<Criteria<Favourite>>()))
                .Returns(favourites.Where(y => y.People.Name == people.Name).AsQueryable());
            const int expectedCount = 1;

            //Act
            var actualFavourites = _favouritesBuilder.Build(people).ToList();

            //Assert
            Assert.Equal(actualFavourites.Count, expectedCount);
            Assert.Equal(actualFavourites.Single().Id, id);
        }
    }
}