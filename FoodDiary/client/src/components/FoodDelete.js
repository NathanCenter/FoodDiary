import React, { useEffect, useState } from "react";
import {
  deleteFoodSchedule,
  GetFoodById,
  getFoodbyDate,
  getFoodScheduleById,
} from "../modules/FoodManager";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import FoodSchedule from "./FoodScheduleForm";
const FoodDelete = () => {
  const { id } = useParams();

  const getFoodSchedule = () => {
    getFoodScheduleById(id).then((fs) => setFoodSchedule(fs));
  };
  useEffect(() => {
    getFoodSchedule();
  }, []);

  
  const [foodSchedule, setFoodSchedule] = useState({});

  const submit = (event) => {
    event.preventDefault();
    deleteFoodSchedule(foodSchedule.id).then(() =>
      history.push("/FoodSchedule")
    );
  };
  const history = useHistory();
  return (
    <>
      <h1>Delete from the Schedule</h1>

      <h3>Are you sure you want to remove it from your schedule?</h3>
      <div key={foodSchedule?.id}>
        <p>Food{foodSchedule.food?.foodName}</p>
        <p>{foodSchedule.food?.description}</p>
        <p> Caloris: {foodSchedule.food?.caloric}</p>
        <p>{foodSchedule?.meal}</p>
      </div>

      <button onClick={submit}>Delete</button>
      <Link to="/FoodSchedule">Cancel</Link>
    </>
  );
};
export default FoodDelete;
