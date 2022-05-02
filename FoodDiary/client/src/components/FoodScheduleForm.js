import React, { useState,useEffect } from "react"
import { useHistory } from "react-router-dom";

import { getAllFood } from "../modules/FoodManager";

const FoodSchedule=()=>{
    const today = new Date();

    const date = today.getFullYear() + '-' + '0'+(today.getMonth() + 1) + '-' + today.getDate();

    
    const [foods,setFood]=useState([])
    const getFoods = () => {
        getAllFood().then(foods => setFood(foods));
      };
      useEffect(() => {
        getFoods();
      }, []);
    

    
    
  
    return(<>
    <h1>Food Schedule</h1>

    <form className="foodForm">
        

    <select>
        <option value="Dinner">Dinner</option>
        <option value="Lunch">Lunch</option>
        <option value="BreakFast">BreakFast</option>
        <option value="Snack">Snack</option>
      </select>
      
      <div className="row justify-content-center">
   
        <select>
        {foods.map((food) => (
         <>
         <option key={food.id} value={food.id}>{food.foodName}</option> 
         </>
        ))}


        </select>
     
        
      </div>
</form>
    </>)


}

export default FoodSchedule