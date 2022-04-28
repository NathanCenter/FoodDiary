using System.ComponentModel.DataAnnotations;

namespace FoodDiary.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Height { get; set; }
        [Required]
        public int Weight { get; set; }
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }



    }
}
