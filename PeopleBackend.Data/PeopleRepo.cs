using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PeopleBackend.Data
{
    public class PeopleRepo
    {
        private readonly string _connectionString;

        public PeopleRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleBackendDataContext(_connectionString);
            return context.People.ToList();
        }

        public void Add(Person person)
        {
            using var context = new PeopleBackendDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            using var context = new PeopleBackendDataContext(_connectionString);
            var person = context.People.FirstOrDefault(p => p.Id == id);
            context.People.Remove(person);
            context.SaveChanges();

        }

        public void DeleteAll(List<int> ids)
        {
            using var context = new PeopleBackendDataContext(_connectionString);
            foreach(var id in ids)
            {
                context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
            }
        }

        public void Update(Person person)
        {
            using var context = new PeopleBackendDataContext(_connectionString);
            context.People.Update(person);
            context.SaveChanges();
        }
    }
}
