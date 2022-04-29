import React, {useEffect, useState} from "react";
import { getAllFood } from "../modules/FoodManager";
const FoodDisplay=()=>{
    var today = new Date(),

      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const [ foods, setFoods ] = useState([]);
    useEffect(() => {
        getAllFood().then(setFoods);
      }, []);
    return (
        <>
        <h1>{date}</h1>
        
        
        
            {foods.map(f=>{
               return <h2 key={f.id}>{f.foodName} {f.foodSchedule.meal}</h2>

            })}
        
        </>
    )
}
export default FoodDisplay