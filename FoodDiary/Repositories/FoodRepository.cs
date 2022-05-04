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


        public void Update(Food food)
        {   
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Food set FoodName=@FoodName, Description=@Description
                ,Caloric=@Caloric, ImageURL=@ImageURL
                     where id=@id";
                    DbUtils.AddParameter(cmd, "@FoodName", food.FoodName);
                    DbUtils.AddParameter(cmd, "@Description", food.Description);
                    DbUtils.AddParameter(cmd, "@Caloric", food.Caloric);
                    DbUtils.AddParameter(cmd, "@ImageURL", food.ImageURL);
                    DbUtils.AddParameter(cmd, "@id", food.Id);
                    cmd.ExecuteNonQuery();


                }
            }
            
        }


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

        public Food GetById(int id) 
        { 
            using (var conn = Connection)
            {
                
                using(var cmd = conn.CreateCommand())
                {
                    conn.Open();
                    cmd.CommandText = @"select FoodName, Description,Caloric,ImageURL from food
                        where id=@id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    using (SqlDataReader reader=cmd.ExecuteReader())
                    {
                        Food food = null;
                        if (reader.Read())
                        {
                            food = new Food()
                            {
                                Id = id,
                                FoodName=DbUtils.GetString(reader,"FoodName"),
                                Description=DbUtils.GetString(reader,"Description"),
                                Caloric=DbUtils.GetInt(reader,"Caloric"),
                                ImageURL=DbUtils.GetString(reader,"ImageURL")
                            };
                        }
                        return food;
                    }
                    
                }
            }
        }

    }
}