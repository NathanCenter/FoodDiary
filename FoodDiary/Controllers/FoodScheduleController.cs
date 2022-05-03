using FoodDiary.Models;
using FoodDiary.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace FoodDiary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FoodScheduleController : Controller
    {
        private readonly IFoodRepository _foodRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IFoodScheduleReposity _foodScheduleRepository;
        public FoodScheduleController(IFoodRepository foodRepository, IUserProfileRepository userProfileRepository, IFoodScheduleReposity foodScheduleRepository)
        {
            _foodRepository = foodRepository;
            _userProfileRepository = userProfileRepository;
            _foodScheduleRepository = foodScheduleRepository;
        }
        [HttpPost("Schedule")]
         public IActionResult Post(FoodSchedule foodSchedule)
        {

           _foodScheduleRepository.addFoodSchedule(GetCurrentUserProfile().Id, foodSchedule);
            return CreatedAtAction("Post", new { id = foodSchedule.Id }, foodSchedule);
        }

        [HttpGet("{dateTime}")]
        public IActionResult GetFoodScheduleByUserId(DateTime dateTime)
        {
            var foods = _foodScheduleRepository.GetFoodScheduleByUserId(GetCurrentUserProfile().Id, dateTime);
            return Ok(foods);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
