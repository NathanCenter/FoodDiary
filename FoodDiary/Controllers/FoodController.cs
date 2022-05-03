 using Microsoft.AspNetCore.Mvc;
using System;
using FoodDiary.Repositories;
using FoodDiary.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace FoodDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FoodController : Controller
    {
        private readonly IFoodRepository _foodRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public FoodController(IFoodRepository foodRepository,IUserProfileRepository userProfileRepository)
        {
            _foodRepository = foodRepository;
            _userProfileRepository = userProfileRepository;
        }
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var foods = _foodRepository.GetAll();
            return Ok(foods);
        }

       
        //[HttpGet("FoodSchedule/{dateTime}")]
        //public IActionResult GetFoodScheduleByUserId(DateTime dateTime)
        //{
        //    var foods = _foodRepository.GetFoodScheduleByUserId(GetCurrentUserProfile().Id, dateTime);
        //    return Ok(foods);
        //}

        [HttpPost("add")]
        public IActionResult Post(Food Food)
        {
            _foodRepository.Add(GetCurrentUserProfile().Id, Food);
            return CreatedAtAction("Post", new { id = Food.Id }, Food);
        }

        //[HttpPost("FoodSchedule")]
        //public IActionResult Post(FoodSchedule foodSchedule)
        //{
        //    _foodRepository.addFoodSchedule(GetCurrentUserProfile().Id, foodSchedule);
        //    return CreatedAtAction("Post", new { id = foodSchedule.Id }, foodSchedule);
        //}


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
