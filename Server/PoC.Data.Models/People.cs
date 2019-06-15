using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PoC.Data.Models
{
    [Table("People")]
    public class People
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        [MaxLength(75)]
        public string Name { get; set; }

        public virtual ICollection<Favourite> Favourites { get; set; } = new List<Favourite>();
    }
}