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
  const formView={
    margin:"20px"
  }
  const buttonStyle = {
    width: "200px",
    height: "35px",
    borderRadius: "15px",
    backgroundColor: "#39395f",
    color: "white",
    border: 0,
    textSize: "20px",
  };
  return (
    <>
    <div key={foodSchedule?.id} style={formView}>
      <h1>Delete from the Schedule</h1>

      <h3>Are you sure you want to remove it from your schedule?</h3>
      
          
        <h1>Food Name: {foodSchedule.food?.foodName}</h1>
        <p><strong>Description: </strong>&nbsp;{foodSchedule.food?.description}</p>
        <p> <strong>Caloris: </strong>&nbsp;{foodSchedule.food?.caloric}</p>
        <p><strong>Meal type:</strong>&nbsp;{foodSchedule?.meal}</p>
     

      <button onClick={submit} style={buttonStyle}>Delete</button>&nbsp;
      <Link to="/FoodSchedule" style={{textDecoration: 'none',color:"#39395f", fontSize:"20px"}}>Cancel</Link>
      </div>
    </>
  );
};
export default FoodDelete;
