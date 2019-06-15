using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PoC.Data.Models
{
    [Table("Favourites")]
    public class Favourite
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        [ForeignKey("People")]
        public int PeopleId { get; set; }
        
        public long ImageId { get; set; }

        public string Image { get; set; }
        
        public virtual People People { get; set; }
    }
}