using System.IO;
using CommonLib.Business.Core;
using Microsoft.AspNetCore.Mvc;

namespace PoC.People.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly IModelBuilder<string, Data.Models.People> _peopleBuilder;


        public PeopleController(IModelBuilder<string, Data.Models.People> peopleBuilder)
        {
            _peopleBuilder = peopleBuilder;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(Data.Models.People request)
        {
            try
            {
                var people = _peopleBuilder.Build(request.Name);
                return Ok(people);
            }
            catch (InvalidDataException)
            {
                return Unauthorized();
            }
            
        }

    }
}