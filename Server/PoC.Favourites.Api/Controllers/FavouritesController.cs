using System.Collections.Generic;
using System.IO;
using System.Linq;
using CommonLib.Business.Core;
using Microsoft.AspNetCore.Mvc;
using PoC.Data.Models;

namespace PoC.Favourites.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouritesController : ControllerBase
    {
        private readonly IModelBuilder<People, IEnumerable<Favourite>> _favouritesBuilder;
        private readonly IModelCreator<Favourite> _favoritesCreator;
        private readonly IModelDeleter<Favourite> _favoritesDeleter;

        public FavouritesController(IModelBuilder<People, IEnumerable<Favourite>> favouritesBuilder,
            IModelCreator<Favourite> favoritesCreator, IModelDeleter<Favourite> favoritesDeleter)
        {
            _favouritesBuilder = favouritesBuilder;
            _favoritesCreator = favoritesCreator;
            _favoritesDeleter = favoritesDeleter;
        }

        [HttpGet]
        [Route("get")]
        public IActionResult Get(int peopleId)
        {
            var people = new People {Id = peopleId};
            var favourites = _favouritesBuilder.Build(people).ToList();
            return Ok(favourites);
        }

        [HttpPost]
        [Route("post")]
        public IActionResult Post(Favourite favourite)
        {
            _favoritesCreator.Create(favourite);
            _favoritesCreator.SaveChanges();
            return Ok(favourite);
        }

        [HttpDelete]
        [Route("delete")]
        public IActionResult Delete(int id, int peopleId)
        {
            try
            {
                var favourite = new Favourite {Id = id, PeopleId = peopleId};
                _favoritesDeleter.Delete(favourite);
                _favoritesDeleter.SaveChanges();
                return Ok();
            }
            catch (InvalidDataException)
            {
                return NotFound();
            }
        }
    }
}