import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllFood } from "../modules/FoodManager";
import { getFoodbyDate } from "../modules/FoodManager";
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

    return SetDate(date);
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
    return SetDate(date);
  };

  return (
    <>
      <button onClick={yesterday}>Yesterday</button>
      <h1>{newDate}</h1>
      <button onClick={nextDay}>Next Day</button>
      {foods.map((f) => {
        return (
          <div>
            <h3 key={f.id}>{f.food.foodName} </h3>

            <Link to={`/Food/${f.food.id}`}>edit</Link>
            <p>{f.description}</p>
            <p>Caloric amount: {f.food.caloric}</p>
            <Link to={`/FoodSchedule/delete/${f.id}`}>Remove</Link>
          </div>
        );
      })}
      <h1>total caloric intake for the day: </h1>
      {foods.map((c) => {
        total += c.food.caloric;
      })}
      <p>{total}</p>

      <Link to="/Food/add"> Add Food </Link>
      <br></br>
      <Link to="/FoodSchedule/Schedule"> Add Food Schedule </Link>
    </>
  );
};
export default FoodDisplay;
