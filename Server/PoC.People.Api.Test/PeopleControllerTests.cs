using System.IO;
using System.Net;
using CommonLib.Business.Core;
using Microsoft.AspNetCore.Mvc;
using Moq;
using PoC.People.Api.Controllers;
using Xunit;

namespace PoC.People.Api.Test
{
    public class PeopleControllerTests
    {
        private readonly PeopleController _peopleController;
        private readonly Mock<IModelBuilder<string, Data.Models.People>> _mockPeopleBuilder;

        public PeopleControllerTests()
        {
            _mockPeopleBuilder = new Mock<IModelBuilder<string, Data.Models.People>>();
            _peopleController = new PeopleController(_mockPeopleBuilder.Object);
        }

        [Fact]
        public void Login_WhenDataExists_ShouldGetPeople()
        {

            var people = new Data.Models.People {Name = "ABC", Id = 1};

            _mockPeopleBuilder.Setup(x => x.Build(people.Name)).Returns(people);

            //Act
            var result = (OkObjectResult)_peopleController.Login(people);

            //Assert
            var actualPeople = (Data.Models.People)result.Value;
            Assert.Equal((int) HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(people, actualPeople);
        }

        [Fact]
        public void Get_WhenNoDataExists_ShouldReturnEmptyContent()
        {
            var people = new Data.Models.People { Name = "ABC", Id = 1 };
            _mockPeopleBuilder.Setup(x => x.Build(people.Name)).Throws(new InvalidDataException("Could not find the user"));

            //Act
            var result = (UnauthorizedResult) _peopleController.Login(people);

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
        }
    }
}