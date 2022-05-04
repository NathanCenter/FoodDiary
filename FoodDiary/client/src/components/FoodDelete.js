import React, {useEffect, useState} from "react";
import { deleteFoodSchedule, GetFoodById,getFoodbyDate,getFoodScheduleById } from "../modules/FoodManager";
import { Link ,useParams} from "react-router-dom"
import { useHistory } from "react-router-dom";
import FoodSchedule from "./FoodScheduleForm";
const FoodDelete=()=>{
    const {id}=useParams()

    const getFoods = () => {
        getFoodScheduleById(id).then(foods => setFoodEdit(foods));
      };
      useEffect(() => {
        getFoods();
      }, []);

  

      const [ foods, setFoodEdit ] = useState({});

    
      const submit = (event) =>{
        console.log(foods.id)
        event.preventDefault();
        deleteFoodSchedule(foods.id).then(() => history.push("/FoodSchedule"));

      }
      const history=useHistory();
return (

    <>
    <h1>Delete from the Schedule</h1>

    <h1>Are you sure you want to remove it from your schedule?</h1>
    <div key={foods.id}>

    <h1>{foods.food.foodName}</h1>
        <p>{foods.food.description}</p>
        <p>{foods.food.caloric}</p>
        </div>
    
   <button  onClick={submit}>Delete</button>
    <Link to="/FoodSchedule" >Cancel</Link>
    </>
)
}
export default FoodDelete