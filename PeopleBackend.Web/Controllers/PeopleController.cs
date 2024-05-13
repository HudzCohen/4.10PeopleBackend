using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleBackend.Data;
using PeopleBackend.Web.Models;

namespace PeopleBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }


        [Route("getall")]
        public List<Person> GetPeople()
        {
            var repo = new PeopleRepo(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("add")]
        public void Add(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Add(person);
        }

        [HttpPost]
        [Route("delete")]
        public void Delete(DeletePersonViewModel p)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Delete(p.Id);
        }

        [HttpPost]
        [Route("deleteall")]
        public void DeleteAll(DeleteAllViewModel p)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.DeleteAll(p.Ids);
        }

        [HttpPost]
        [Route("update")]
        public void Update(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Update(person);
        }
    }
}
