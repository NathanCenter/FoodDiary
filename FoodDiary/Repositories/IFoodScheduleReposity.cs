using FoodDiary.Models;
using System;
using System.Collections.Generic;

namespace FoodDiary.Repositories
{
    public interface IFoodScheduleReposity 
    {
        public List<Food> GetFoodScheduleByUserId(int id, DateTime dateTime);

        public void addFoodSchedule(int id, FoodSchedule foodSchedule);

    }
}
