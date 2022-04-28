using System;

namespace FoodDiary.Models
{
    public class FoodSchedule
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }

        public int FoodId { get; set; }

        public DateTime Date { get; set; }

        public string Meal { get; set; }
    }
}
