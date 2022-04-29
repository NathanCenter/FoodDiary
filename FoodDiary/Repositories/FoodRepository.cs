using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using FoodDiary.Models;
using FoodDiary.Utils;
using Microsoft.Data.SqlClient;
using System;

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
                    cmd.CommandText = @"Select f.Id,f.FoodName,f.Description,f.Caloric,fs.Date as DateAdded,fs.id as FoodScheduleId, fs.Meal,fs.UserProfileId from Food f left join 
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
                                    Id=DbUtils.GetInt(reader, "FoodScheduleId"),
                                    FoodId = DbUtils.GetInt(reader, "Id"),
                                    Date = DbUtils.GetDateTime(reader, "DateAdded"),
                                    UserProfileId=DbUtils.GetInt(reader, "UserProfileId"),
                                    Meal =DbUtils.GetString(reader,"Meal")
                                }
                            };
                            foods.Add(food);
                        }
                        return foods;
                    }
                }
            }
        }

        public List<Food> GetFoodScheduleByUserId(int id,DateTime dateTime)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select fs.Id,f.id as FoodId, fs.UserProfileId ,fs.id as ScheduleId, fs.date,fs.meal,f.FoodName,f.Description,f.Caloric from FoodSchedule fs
                    left join Food f on fs.FoodId=f.id
                    left join UserProfile up on
                    fs.UserProfileId=up.Id
                    Where up.id=@id
                    and
                    fs.date=@date";
                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd,"@date",dateTime);

                    using (SqlDataReader reader= cmd.ExecuteReader())
                    {
                        var foods = new List<Food>();
                        while (reader.Read())
                        {
                            Food food = new Food()
                            {


                                Id = DbUtils.GetInt(reader, "FoodId"),
                                FoodName = DbUtils.GetString(reader, "FoodName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Caloric = DbUtils.GetInt(reader, "Caloric"),


                            };
                            FoodSchedule foodSchedule = new FoodSchedule()
                            {
                                Date = DbUtils.GetDateTime(reader, "Date"),
                                Meal = DbUtils.GetString(reader,"Meal"),

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