using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using PoC.Data.Models;

namespace PoC.Data
{
    public class PoCDbContext : DbContext
    {
        public PoCDbContext(DbContextOptions<PoCDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            SeedInitialData(modelBuilder);
        }

        private static void SeedInitialData(ModelBuilder modelBuilder)
        {
            var people = new List<People>
            {
                new People {Name = "Bradly", Id = 1},
                new People {Name = "Brad", Id = 2},
                new People {Name = "George", Id = 3},
                new People {Name = "Matt", Id = 4}
            };
            modelBuilder.Entity<People>().HasData(people);

            var favourites = new List<Favourite>()
            {
                new Favourite {Id = 1, ImageId = 1, PeopleId = 1},
                new Favourite {Id = 2, ImageId = 2, PeopleId = 1},
                new Favourite {Id = 3, ImageId = 3, PeopleId = 1},
                new Favourite {Id = 4, ImageId = 3, PeopleId = 2},
                new Favourite {Id = 5, ImageId = 3, PeopleId = 2},
            };
            modelBuilder.Entity<Favourite>().HasData(favourites);
        }
    }
}