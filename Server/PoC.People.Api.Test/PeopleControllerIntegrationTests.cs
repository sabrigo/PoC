using System;
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
using PoC.Utility;
using Xunit;

namespace PoC.People.Api.Test
{
    public class PeopleFixture : IDisposable
    {
        internal HttpClient Client;
        internal IConfigurationRoot Configuration;
        internal PoCDbContext DbContext;

        public PeopleFixture()
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

    public class PeopleControllerIntegrationTests : IClassFixture<PeopleFixture>
    {
        private readonly PeopleFixture _fixture;
        private const string RequestUri = "/api/people";

        public PeopleControllerIntegrationTests(PeopleFixture fixture)
        {
            _fixture = fixture;

        }

        [Theory]
        [InlineData("Brad", "Brad", HttpStatusCode.OK)]
        [InlineData("Matt", "Matt", HttpStatusCode.OK)]
        public async Task Post_ShouldLoginPeople(string name, string expectedOutput, HttpStatusCode expectedStatusCode)
        {
            //Arrange
            var people = new Data.Models.People {Name = name};

            //Act
            
            var response = await _fixture.Client.PostAsync($"{RequestUri}/Login", new JsonContent(people));
            var actualOutput =
                JsonConvert.DeserializeObject<Data.Models.People>(response.Content.ReadAsStringAsync().Result);
            Assert.Equal(expectedStatusCode, response.StatusCode);
            Assert.True(actualOutput.Name == expectedOutput);
        }

        [Fact]
        public async Task Post_ShouldSendUnAuthorisedMessage_WhenNoUserFound()
        {
            //Arrange
            var people = new Data.Models.People { Name = "Sample" };

            //Act
            var response = await _fixture.Client.PostAsync($"{RequestUri}/Login", new JsonContent(people));
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}