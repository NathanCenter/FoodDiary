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
                    cmd.CommandText = @"Select Id,FoodName,Description,Caloric  from Food 
                    
                    ";
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
                                
                            };
                            foods.Add(food);
                        }
                        return foods;
                    }
                }
            }
        }

        //public List<Food> GetFoodScheduleByUserId(int id,DateTime dateTime)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"select fs.Id,f.id as FoodId, fs.UserProfileId ,fs.id as ScheduleId, fs.date,fs.meal,f.FoodName,f.Description,f.Caloric from FoodSchedule fs
        //            left join Food f on fs.FoodId=f.id
        //            left join UserProfile up on
        //            fs.UserProfileId=up.Id
        //            Where up.id=@id
        //            and
        //            fs.date=@date";
        //            DbUtils.AddParameter(cmd, "@id", id);
        //            DbUtils.AddParameter(cmd,"@date",dateTime);

        //            using (SqlDataReader reader= cmd.ExecuteReader())
        //            {
        //                var foods = new List<Food>();
        //                while (reader.Read())
        //                {
        //                    Food food = new Food()
        //                    {


        //                        Id = DbUtils.GetInt(reader, "FoodId"),
        //                        FoodName = DbUtils.GetString(reader, "FoodName"),
        //                        Description = DbUtils.GetString(reader, "Description"),
        //                        Caloric = DbUtils.GetInt(reader, "Caloric"),


        //                    };
                            
                          


        //                    foods.Add(food);
        //                }
        //                return foods;
        //            }                     

                    
                    
        //        }
               
        //    }
        //}

        public void Add(int id,Food food)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Insert Into Food(FoodName,Description,Caloric,ImageURL)
                        OUTPUT INSERTED.ID
                        Values(@FoodName,@Description, @Caloric,@ImageURL ) ";
                        
                       
                    DbUtils.AddParameter(cmd, "@FoodName", food.FoodName);
                    DbUtils.AddParameter(cmd, "@Description", food.Description);
                    DbUtils.AddParameter(cmd, "@Caloric", food.Caloric);
                    DbUtils.AddParameter(cmd, "@ImageURL", food.ImageURL);
                   
                    DbUtils.AddParameter(cmd, "@UserProfileId", id);
                    food.Id = (int)cmd.ExecuteScalar();
                }

            }

        }

        //public void addFoodSchedule(int id,FoodSchedule foodSchedule)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //    Insert Into FoodSchedule(UserProfileId,FoodId,Date,Meal)
        //    OUTPUT INSERTED.ID
        //    Values(@UserProfileId,@FoodId, @Date,@Meal)";
        //            DbUtils.AddParameter(cmd, "@UserProfileId", foodSchedule.UserProfileId);
        //            DbUtils.AddParameter(cmd, "@Date", foodSchedule.Date);
        //            DbUtils.AddParameter(cmd, "@FoodId", foodSchedule.FoodId);
        //            DbUtils.AddParameter(cmd, "@meal", foodSchedule.Meal);

        //            foodSchedule.Id = (int)cmd.ExecuteScalar();

        //        }
        //    }
        //}
    }
}