using Microsoft.Extensions.Configuration;
using FoodDiary.Models;
using FoodDiary.Utils;

namespace FoodDiary.Repositories
{
    public class UserProfileRepository :  BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select Id, Name,Email,Height,Weight,FirebaseUserId from UserProfile 
                    WHERE FirebaseUserId = @FirebaseuserId";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader,"Name"),
                            Email = DbUtils.GetString(reader,"Email"),
                            Height = DbUtils.GetString(reader, "Height"),
                            Weight = DbUtils.GetInt(reader,"Weight"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId")
                        };

                    }
                    reader.Close();
                    return userProfile;
                }
            }
           
        }
        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, Name, Email,Height,Weight)
                        OUTPUT INSERTED.ID
                        VALUES (@FirebaseUserId, @Name, @Email,@Height,@Weight)";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@Height", userProfile.Height);
                    DbUtils.AddParameter(cmd, "@Weight", userProfile.Weight);

                    userProfile.Id = (int)cmd.ExecuteScalar();

                }
            }
        }
        
    }
}
