import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { getAllFood } from "../modules/FoodManager";
import { getFoodbyUserID } from "../modules/FoodManager";
const FoodDisplay=()=>{
    var today = new Date(),

      date = today.getFullYear() + '-' + '0'+(today.getMonth() + 1) + '-' + today.getDate();
    const [ foods, setFoods ] = useState([]);
    
    useEffect(() => {
        getFoodbyUserID(date).then(setFoods);
      }, []);
    return (
        <>
        <h1>{date}</h1>
        
        
        
            {foods.map(f=>{
             
               return(
                 <>
                 <div>
                 <h3 key={f.id}>{f.foodName}   </h3> <Link to={`/Food/${f.id}`}>edit</Link>
                  <p>{f.description}</p>

                  <p>Caloric amount: {f.caloric}</p> 
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