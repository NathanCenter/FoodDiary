using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using FoodDiary.Models;
using FoodDiary.Utils;
using Microsoft.Data.SqlClient;

namespace FoodDiary.Repositories
{

    public class FoodRepository : BaseRepository, IFoodRepository
    {
        public FoodRepository(IConfiguration configuration) : base(configuration) { }

        public List<Food> GetAll()
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select f.Id,f.FoodName,f.Description,f.Caloric,fs.Date as DateAdded, fs.Meal from Food f left join 
                    FoodSchedule fs
                    on f.id=fs.FoodId";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var foods = new List<Food>();
                        while (reader.Read())
                        {
                            Food food = new Food()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FoodName = DbUtils.GetString(reader, "FoodName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Caloric = DbUtils.GetInt(reader, "Caloric"),
                                FoodSchedule =new FoodSchedule()
                                {
                                    FoodId = DbUtils.GetInt(reader, "Id"),
                                    Date = DbUtils.GetDateTime(reader, "DateAdded"),
                                    Meal=DbUtils.GetString(reader,"Meal")
                                }
                            };
                            foods.Add(food);
                        }
                        return foods;
                    }
                }
            }
        }
    }
}