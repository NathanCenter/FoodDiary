using FoodDiary.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
namespace FoodDiary.Repositories
{
    public interface IFoodRepository
    {
        List<Food> GetAll();
        
        public void Add(int id,Food food);


        public void Update(Food food);

        public Food GetById(int id);

    }
}
