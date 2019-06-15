using System.IO;
using CommonLib.Business.Core;
using CommonLib.Repo.Core;
using Moq;
using PoC.Business.Builders;
using PoC.Data.Models;
using Xunit;

namespace PoC.Business.Test.Builders
{
    public class PeopleBuilderTests
    {
        private readonly IModelBuilder<string, People> _peopleBuilder;
        private readonly Mock<IRepository<People>> _mockRepository;

        public PeopleBuilderTests()
        {
            _mockRepository = new Mock<IRepository<People>>();
            _peopleBuilder = new PeopleBuilder(_mockRepository.Object);
        }

        [Fact]
        public void Get_GivenPeopleName_ShouldGetThePeople()
        {
            //Arrange
            
            var people = new People {Name = "Test 1", Id = 1};
            _mockRepository.Setup(x => x.Get(It.IsAny<Criteria<People>>())).Returns(people);

            //Act
            var actualPeople = _peopleBuilder.Build(people.Name);

            //Assert
            Assert.True(actualPeople.Name == people.Name);
            _mockRepository.Verify(x => x.Get(It.IsAny<Criteria<People>>()), Times.Once);
        }

        [Fact]
        public void Get_GivenInvalidPeopleName_ShouldThrowInvalidDataException()
        {
            //Arrange
            const string expectedException = "Could not find the user";
            _mockRepository.Setup(x => x.Get(It.IsAny<Criteria<People>>())).Returns(() => null);

            //Act
            var actualException = Assert.Throws<InvalidDataException>(() => _peopleBuilder.Build("bla bla bla")) ;

            //Assert
            
            Assert.Equal(actualException.Message, expectedException);
            _mockRepository.Verify(x => x.Get(It.IsAny<Criteria<People>>()), Times.Once);
        }

    }
}