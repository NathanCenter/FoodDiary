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

       
       

        [HttpPost("add")]
        public IActionResult Post(Food Food)
        {
            _foodRepository.Add(GetCurrentUserProfile().Id, Food);
            return CreatedAtAction("Post", new { id = Food.Id }, Food);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var food = _foodRepository.GetById(id);
            if (food == null)
            {
                return NotFound();
            }
            return Ok(food);
        }
        [HttpPut("Edit/{id}")]
        public IActionResult Put(int id, Food food)
        {
            if (id != food.Id)
            {
                return BadRequest();
            }

            _foodRepository.Update(food);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
