using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using CommonLib.Business.Core;
using Microsoft.AspNetCore.Mvc;
using Moq;
using PoC.Data.Models;
using PoC.Favourites.Api.Controllers;
using Xunit;

namespace PoC.Favourites.Api.Test
{
    public class FavouritesControllerTests
    {
        private readonly FavouritesController _favouritesController;
        private readonly Mock<IModelBuilder<People, IEnumerable<Favourite>>> _mockFavouritesBuilder;
        private readonly Mock<IModelCreator<Favourite>> _mockFavoritesCreator;
        private readonly Mock<IModelDeleter<Favourite>> _mockFavoritesDeleter;

        public FavouritesControllerTests()
        {
            _mockFavoritesCreator = new Mock<IModelCreator<Favourite>>();
            _mockFavoritesDeleter = new Mock<IModelDeleter<Favourite>>();
            _mockFavouritesBuilder = new Mock<IModelBuilder<People, IEnumerable<Favourite>>>();
            _favouritesController = new FavouritesController(_mockFavouritesBuilder.Object,
                _mockFavoritesCreator.Object, _mockFavoritesDeleter.Object);
        }

        [Fact]
        public void Get_WhenFavouritesExistsForAGivenUser_ShouldReturnAllFavourites()
        {
            const int peopleId = 1;
            var favourites = new List<Favourite>
            {
                new Favourite {ImageId = 1, Id = 1, PeopleId = peopleId},
                new Favourite {ImageId = 2, Id = 2, PeopleId = peopleId},
                new Favourite {ImageId = 3, Id = 3, PeopleId = peopleId},
                new Favourite {ImageId = 4, Id = 4, PeopleId = 2},
            };

            _mockFavouritesBuilder.Setup(x => x.Build(It.IsAny<People>()))
                .Returns(favourites.Where(x => x.PeopleId == peopleId).ToList());

            //Act
            var result = (OkObjectResult) _favouritesController.Get(1);

            //Assert
            var actualFavourites = (List<Favourite>) result.Value;
            Assert.Equal((int) HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(3, actualFavourites.Count);
            Assert.Equal(favourites[0].ImageId, actualFavourites[0].ImageId);
            Assert.Equal(favourites[1].ImageId, actualFavourites[1].ImageId);
            Assert.Equal(favourites[2].ImageId, actualFavourites[2].ImageId);
        }

        [Fact]
        public void Create_WhenPost_ShouldSetAsFavouriteAndReturnEmpty()
        {
            var favourite = new Favourite {ImageId = 1, Id = 1, PeopleId = 1};
            _mockFavoritesCreator.Setup(x => x.Create(It.IsAny<Favourite>()));
            _mockFavoritesCreator.Setup(x => x.SaveChanges());

            //Act
            var result = (OkObjectResult) _favouritesController.Post(favourite);

            //Assert
            var actualFavourites = (Favourite)result.Value;
            Assert.Equal((int) HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(favourite, actualFavourites);
        }

        [Fact]
        public void Delete_WhenDataExists_ShouldDeleteAndReturnEmpty()
        {
            var favourite = new Favourite {ImageId = 1, Id = 1, PeopleId = 1};
            _mockFavoritesDeleter.Setup(x => x.Delete(It.IsAny<Favourite>()));

            //Act
            var result = (OkResult) _favouritesController.Delete(favourite.Id, favourite.PeopleId);

            //Assert
            Assert.Equal((int) HttpStatusCode.OK, result.StatusCode);
        }


        [Fact]
        public void Delete_WhenNoDataExists_ShouldReturnNotFoundStatus()
        {
            var favourite = new Favourite {ImageId = 1, Id = 1, PeopleId = 1};
            _mockFavoritesDeleter.Setup(x => x.Delete(It.IsAny<Favourite>()));
            _mockFavoritesDeleter.Setup(x=>x.SaveChanges()).Throws(new InvalidDataException("Cannot find the favourite item"));

            //Act
            var result = (NotFoundResult) _favouritesController.Delete(favourite.Id, favourite.PeopleId);

            //Assert
            Assert.Equal((int) HttpStatusCode.NotFound, result.StatusCode);
        }
    }
}