import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllFood } from "../modules/FoodManager";
import { getFoodbyDate } from "../modules/FoodManager";
import "../css/styleSheet.css"
import {_saveUser} from "../modules/authManager"
import {CurrentName} from "../modules/authManager"
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

  const [userName,setUserName]=useState([]);
  useEffect(()=>{
    CurrentName().then((userObject)=>{
      setUserName(userObject.name)
      
    })

  },[])
    
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
    <div class="userName"> <h1>Hello, {`${userName}`}!</h1></div>
    <div  id="form">
      <button onClick={yesterday} style={styleButton}>Yesterday</button>
      <h1>{newDate}</h1>
      
      <button onClick={nextDay} style={styleButton}>Next Day</button>
      {foods.map((f) => {
        return (
          <div key={f.id} >
            <h2 >{f.food.foodName} </h2>

            <Link to={`/Food/${f.food.id}`} style={{textDecoration: 'none',color:"#39395f", fontSize:"20px"}}>edit</Link>
            <p>{f.description}</p>
            <p style={{fontSize:"20px"}}><strong>Caloric amount:</strong> {f.food.caloric}</p>
            <p> <strong>Description: </strong> {f.food.description}</p>
            <p style={{fontSize:"20px"}}><strong>Meal Type:</strong> {f.meal}</p>
            <Link to={`/FoodSchedule/delete/${f.id}`} style={{textDecoration: 'none',color:"#39395f", fontSize:"20px"}}>Remove</Link>
          </div>
        );
      })}
      <h3>Total caloric intake for the day: </h3>
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
