import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { addSchedule, getAllFood } from "../modules/FoodManager";

const FoodSchedule = () => {
  const [foods, setFood] = useState([]);
  const getFoods = () => {
    getAllFood().then((foods) => setFood(foods));
  };
  useEffect(() => {
    getFoods();
  }, []);

  const getFoodScheduleData = {
    meal: "",
    foodId: null,
  };
  const [schedule, setSchedule] = useState(getFoodScheduleData);

  const handleInputChange = (event) => {
    let value = event.target.value;
    const key = event.target.id;

    if (key === "foodId") {
      value = parseInt(value);
    }
    const scheduleCopy = { ...schedule };

    scheduleCopy[key] = value;
    setSchedule(scheduleCopy);
  };
  const history = useHistory();
  const submit = (evt) => {
    const copy = { ...schedule };
    copy.Date = new Date().toISOString().split("T")[0];

    evt.preventDefault();
    addSchedule(copy).then(() => history.push("/FoodSchedule"));
  };

  return (
    <>
      <h1>Food Schedule</h1>

      <form className="foodForm">
        <select id="meal" onChange={handleInputChange}>
          <option value="Dinner">Dinner</option>
          <option value="Lunch">Lunch</option>
          <option value="BreakFast">BreakFast</option>
          <option value="Snack">Snack</option>
        </select>

        <div className="row justify-content-center">
          <select id="foodId" onChange={handleInputChange}>
            {foods.map((food) => (
              <option key={food.id} value={food.id}>
                {" "}
                {food.foodName}
              </option>
            ))}
          </select>
          <button onClick={submit}>Add Food to your schedule</button>
        </div>
      </form>
    </>
  );
};

export default FoodSchedule;
