using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using PoC.Data;
using PoC.Data.Models;
using PoC.Utility;
using Xunit;

namespace PoC.Favourites.Api.Test
{
    public class FavouritesFixture : IDisposable
    {
        internal HttpClient Client;
        internal IConfigurationRoot Configuration;
        internal PoCDbContext DbContext;

        public FavouritesFixture()
        {
            Configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var webHostBuilder = new WebHostBuilder()
                .UseConfiguration(Configuration)
                .UseStartup<Startup>();
            var testServer = new TestServer(webHostBuilder);
            DbContext = testServer.Host.Services.GetService<PoCDbContext>();
            DbContext.Database.EnsureDeleted();
            DbContext.Database.EnsureCreated();
            DbContext.Database.Migrate();
            testServer.CreateHandler();
            Client = testServer.CreateClient();
            Client.DefaultRequestHeaders.Accept.Clear();
            Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public void Dispose()
        {
            DbContext.Database.EnsureDeleted();
            Client?.Dispose();
            DbContext?.Dispose();
        }
    }

    public class FavouritesControllerIntegrationTests : IClassFixture<FavouritesFixture>
    {
        private readonly FavouritesFixture _fixture;
        private const string RequestUri = "/api/favourites";

        public FavouritesControllerIntegrationTests(FavouritesFixture fixture)
        {
            _fixture = fixture;
        }

        [Fact]
        public async Task Get_WhenDataExists_ShouldGetFavourites()
        {
            const int peopleId = 1;

            //Act
            var result = await _fixture.Client.GetAsync($"{RequestUri}/get/?peopleId={peopleId}");

            //Assert
            var actualOutput =
                JsonConvert.DeserializeObject<List<Favourite>>(result.Content.ReadAsStringAsync().Result);
            Assert.Equal(HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(3, actualOutput.Count);
        }

        [Fact]
        public async Task Post_ShouldCreateFavourites()
        {
            //Arrange
            var favourite = new Favourite {ImageId = 4, PeopleId = 1};

            //Act

            var result = await _fixture.Client.PostAsync($"{RequestUri}/post", new JsonContent(favourite));

            //Assert
            Assert.Equal(HttpStatusCode.OK, result.StatusCode);

            var readAsStringAsync = result.Content.ReadAsStringAsync();
            var actualOutput = JsonConvert.DeserializeObject<Favourite>(readAsStringAsync.Result);
            Assert.Equal(HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(favourite.ImageId, actualOutput.ImageId);
        }

        [Fact]
        public async Task Delete_ShouldRemoveTheFavourites_WhenUnSetAsFavourites()
        {
            //Arrange
            const int id = 4;
            const int peopleId = 2;

            //Act
            var response = await _fixture.Client.DeleteAsync($"{RequestUri}/delete?id={id}&peopleId={peopleId}");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task Delete_ShouldReturnNotFound_WhenDataNotFound()
        {
            //Arrange
            const int id = int.MaxValue;
            const int peopleId = 2;

            //Act
            var response = await _fixture.Client.DeleteAsync($"{RequestUri}/delete?={id}&peopleId={peopleId}");
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}