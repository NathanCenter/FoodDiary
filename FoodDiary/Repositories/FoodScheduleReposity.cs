using FoodDiary.Utils;
using Microsoft.Extensions.Configuration;

namespace FoodDiary.Repositories
{
    public class FoodScheduleReposity : BaseRepository, IFoodScheduleReposity
    {
        public FoodScheduleReposity(IConfiguration configuration) : base(configuration) { }




    }

}
