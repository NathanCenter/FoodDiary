 using Microsoft.AspNetCore.Mvc;
using System;
using FoodDiary.Repositories;
using FoodDiary.Models;
namespace FoodDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : Controller
    {
        private readonly IFoodRepository _foodRepository;
        public FoodController(IFoodRepository foodRepository)
        {
            _foodRepository = foodRepository;
        }
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var foods = _foodRepository.GetAll();
            return Ok(foods);
        }
    }
}
