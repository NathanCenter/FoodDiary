using FoodDiary.Models;
using System;
using System.Collections.Generic;

namespace FoodDiary.Repositories
{
    public interface IFoodScheduleReposity 
    {
        public List<FoodSchedule> GetFoodScheduleByUserIdAndDate(int id, DateTime dateTime);
        public List<FoodSchedule> GetFoodScheduleAll();
        public void addFoodSchedule(int id, FoodSchedule foodSchedule);

        FoodSchedule GetById(int id);
        public void DeleteFoodSchedule(int id);


    }
}
