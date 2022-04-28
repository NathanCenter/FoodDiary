using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FoodDiary.Models
{
    public class Food
    { public int Id { get; set; }

        public string FoodName { get; set; }

        public string Description { get; set; }

        public int Caloric { get; set; }

        public FoodSchedule FoodSchedule { get; set; }

    }
}
