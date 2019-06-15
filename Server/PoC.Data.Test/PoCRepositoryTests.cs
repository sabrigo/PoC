using System.IO;
using System.Linq;
using CommonLib.Repo.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PoC.Data.Models;
using Xunit;

namespace PoC.Data.Test
{
    public class PoCRepositoryFixture
    {
        internal PoCDbContext DbContext;

        public PoCRepositoryFixture()
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var connectionString = configuration.GetConnectionString("PoCDb");
            var builder = new DbContextOptionsBuilder<PoCDbContext>();
            builder.EnableSensitiveDataLogging();
            builder.EnableDetailedErrors();
            builder.UseSqlServer(connectionString);
            DbContext = new PoCDbContext(builder.Options);
            DbContext.Database.EnsureDeleted();
            DbContext.Database.EnsureCreated();
            DbContext.Database.Migrate();
        }
    }

    public class PoCRepositoryTests : IClassFixture<PoCRepositoryFixture>
    {
        
        private readonly PoCRepository<Favourite> _favouriteRepository;
        private readonly PoCRepository<People> _peopleRepository;

        public PoCRepositoryTests(PoCRepositoryFixture fixture)
        {
            _favouriteRepository = new PoCRepository<Favourite>(fixture.DbContext);
            _peopleRepository = new PoCRepository<People>(fixture.DbContext);
        }
        

        [Theory]
        [InlineData(12345)]
        [InlineData(23456)]
        [InlineData(34567)]
        public void Add_ShouldAddNewRecords(long imageId)
        {
            //Arrange

            var image = new Favourite {ImageId = imageId, PeopleId = 1 };
            //Act
            _favouriteRepository.Add(image);
            _favouriteRepository.SaveChanges();

            //Assert
            var actualFavourite = _favouriteRepository.Get(new Criteria<Favourite>(x => x.ImageId == imageId));
            Assert.Equal(imageId, actualFavourite.ImageId);
            
        }


        [Theory]
        [InlineData(2, 2)]
        public void Matches_ShouldFetchRecordsBasedOnPeopleId(int peopleId, int expectedCount)
        {
            //Arrange & Act
            var favourites = _favouriteRepository.Matches(new Criteria<Favourite>(x => x.PeopleId == peopleId)).ToList();

            //Assert
            Assert.Equal(favourites.Count, expectedCount);
        }

    }
}