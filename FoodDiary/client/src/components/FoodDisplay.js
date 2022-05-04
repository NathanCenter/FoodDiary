import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { getAllFood } from "../modules/FoodManager";
import { getFoodbyDate } from "../modules/FoodManager";
const FoodDisplay=()=>{
    var today = new Date(),

      date = today.getFullYear() + '-' + '0'+(today.getMonth() + 1) + '-' + today.getDate();
    const [ foods, setFoods ] = useState([]);
    
    useEffect(() => {
      getFoodbyDate(date).then(setFoods);
      }, []);
    return (
        <>
        <h1>{date}</h1>
        
        
        
            {foods.map(f=>{
             
               return(
                 <>
                 <div>
                 <h3 key={f.id}>{f.food.foodName}   </h3> <Link to={`/Food/${f.id}`}>edit</Link>
                  <p>{f.description}</p>

                  <p>Caloric amount: {f.food.caloric}</p> 

                  <Link to={`/FoodSchedule/delete/${f.id}`}>Remove</Link>
                 </div>
                


                  
                 </>
               
               )
                
               
            })}
            <Link to="/Food/add" > Add Food </Link>
            <Link to="/FoodSchedule/Schedule" > Add Food Schedule </Link>
        
        </>
    )
}
export default FoodDisplay