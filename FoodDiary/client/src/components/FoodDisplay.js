import React, {useEffect, useState} from "react";
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
               return <h2 key={f.id}>{f.foodName}</h2>

            })}
        
        </>
    )
}
export default FoodDisplay