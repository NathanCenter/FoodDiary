using FoodDiary.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
namespace FoodDiary.Repositories
{
    public interface IFoodRepository
    {
        List<Food> GetAll();
        List<Food> GetFoodScheduleByUserId(int id,DateTime dateTime);

    }
}
