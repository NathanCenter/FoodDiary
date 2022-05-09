import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllFood } from "../modules/FoodManager";
import { getFoodbyDate } from "../modules/FoodManager";
import  "../css/styleSheet.css"
const FoodDisplay = () => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + +(today.getMonth() + 1) + "-" + today.getDate();
  const [foods, setFoods] = useState([]);
  const [newDate, SetDate] = useState(date);
  useEffect(() => {
    getFoodbyDate(newDate).then((data) => {
      setFoods(data);
    });
  }, [newDate]);
  let total = 0;

  const nextDay = () => {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    date =
      tomorrow.getFullYear() +
      "-" +
      +(tomorrow.getMonth() + 1) +
      "-" +
      tomorrow.getDate();

     SetDate(date);
  };

  const yesterday = () => {
    const yester = new Date(today);
    yester.setDate(yester.getDate() - 1);
    date =
      yester.getFullYear() +
      "-" +
      +(yester.getMonth() + 1) +
      "-" +
      yester.getDate();
     SetDate(date);
  };
const styleButton={
  width: "200px",
  height: "35px",
  borderRadius: "15px",
  backgroundColor: "#39395f",
  color: "white",
  border: 0,
  textSize: "20px",
  
}

  return (
    <>
    <br></br>
    <div>
      <button onClick={yesterday} style={styleButton}>Yesterday</button>
      <h1>{newDate}</h1>
      
      <button onClick={nextDay} style={styleButton}>Next Day</button>
      {foods.map((f) => {
        return (
          <div key={f.id} >
            <h2 >{f.food.foodName} </h2>

            <Link to={`/Food/${f.food.id}`} style={{textDecoration: 'none',color:"#39395f", fontSize:"20px"}}>edit</Link>
            <p>{f.description}</p>
            <p style={{fontSize:"20px"}}>Caloric amount: {f.food.caloric}</p>
            <p style={{fontSize:"20px"}}>Meal Type: {f.meal}</p>
            <Link to={`/FoodSchedule/delete/${f.id}`} style={{textDecoration: 'none',color:"#39395f", fontSize:"20px"}}>Remove</Link>
          </div>
        );
      })}
      <h3>total caloric intake for the day: </h3>
      {foods.map((c) => {
        total += c.food.caloric;
      })}
      <p>{total}</p>

     
      <Link to="/Food/add" id="addFood" style={{textDecoration: 'none',color:"#39395f", fontSize:"20px"}}> Add Food </Link>
      <br></br>
      <Link to="/FoodSchedule/Schedule"  style={{textDecoration: 'none', color:"#39395f" ,fontSize:"20px"}}> Add Food Schedule </Link>
      
     
      </div>
    </>
  );
};
export default FoodDisplay;
