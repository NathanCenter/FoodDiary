using FoodDiary.Models;
using FoodDiary.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace FoodDiary.Repositories
{
    public class FoodScheduleReposity : BaseRepository, IFoodScheduleReposity
    {
        public FoodScheduleReposity(IConfiguration configuration) : base(configuration) { }

        public List<FoodSchedule> GetFoodScheduleAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select Id,UserProfileId,FoodId,Date,Meal from FoodSchedule";
                    var foodSchedules = new List<FoodSchedule>();
                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            foodSchedules.Add(new FoodSchedule {

                                Id = DbUtils.GetInt(reader, "Id"),
                                UserProfileId=DbUtils.GetInt(reader, "UserProfileId"),
                                FoodId=DbUtils.GetInt(reader, "FoodId"),
                                Date= DbUtils.GetDateTime(reader,"Date"),
                                Meal=DbUtils.GetString(reader,"Meal")

                            });
                        }
                    }
                    return foodSchedules;
                }
            }
        }

      public List<FoodSchedule> GetFoodScheduleByUserId(int id, DateTime dateTime)
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
                        var foodSchedules = new List<FoodSchedule>();
                        while (reader.Read())
                        {
                            FoodSchedule foodSchedule = new FoodSchedule()
                            {
                                Id = DbUtils.GetInt(reader, "id"),
                                
                                Food = new Food()
                                {


                                    Id = DbUtils.GetInt(reader, "FoodId"),
                                    FoodName = DbUtils.GetString(reader, "FoodName"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    Caloric = DbUtils.GetInt(reader, "Caloric"),


                                }


                            };
                            foodSchedules.Add(foodSchedule);






                       }
                      return foodSchedules;
                  }                     



               }

            }
        }

        public FoodSchedule GetById(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select fs.id as FoodScheduleId,fs.UserProfileId,fs.FoodId,fs.Date,fs.Meal, f.FoodName,f.Caloric,f.Description from FoodSchedule fs left join 
Food f on fs.FoodId=f.Id where fs.Id=@FoodScheduleId";
                    cmd.Parameters.AddWithValue("@FoodScheduleId", id);
                    FoodSchedule foodSchedule = null;
                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            foodSchedule = new FoodSchedule()
                            {
                                Id = DbUtils.GetInt(reader, "FoodScheduleId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                FoodId = DbUtils.GetInt(reader, "FoodId"),
                                Date = DbUtils.GetDateTime(reader, "Date"),
                                Meal = DbUtils.GetString(reader, "Meal"),
                                
                            };

                            foodSchedule.Food = new Food()
                            {
                                FoodName = DbUtils.GetString(reader, "FoodName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Caloric = DbUtils.GetInt(reader, "Caloric")
                            };


                        }

                    }
                    return foodSchedule;
                }
            }
        }

        public void DeleteFoodSchedule(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    try
                    {
                        cmd.CommandText = @"Delete from FoodSchedule where id=@id";
                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        Console.Write(ex);
                    }
                }
            }
        }

        public void addFoodSchedule(int id, FoodSchedule foodSchedule)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
            Insert Into FoodSchedule(UserProfileId,FoodId,Date,Meal)
            OUTPUT INSERTED.ID
            Values(@UserProfileId,@FoodId, @Date,@Meal)";
                    DbUtils.AddParameter(cmd, "@UserProfileId", id);
                    DbUtils.AddParameter(cmd, "@Date", foodSchedule.Date);
                    DbUtils.AddParameter(cmd, "@FoodId", foodSchedule.FoodId);
                    DbUtils.AddParameter(cmd, "@meal", foodSchedule.Meal);

                    foodSchedule.Id = (int)cmd.ExecuteScalar();

                }
            }

        }

    }

}
