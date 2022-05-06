import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { addFood } from "../modules/FoodManager";
const FoodForm = () => {
  const getFoodData = {
    FoodName: "",
    Description: "",
    Caloric: "",
    ImageURL: "",
  };
  const [food, SetFood] = useState(getFoodData);

  const history = useHistory();

  const handleInputChange = (event) => {
    const value = event.target.value;
    const key = event.target.id;
    const foodCopy = { ...food };

    foodCopy[key] = value;
    SetFood(foodCopy);
  };

  const submit = (event) => {
    event.preventDefault();
    const foodName = document.querySelector("#FoodName").value;
    const Description = document.querySelector("#Description").value;
    const Caloric = document.querySelector("#Caloric").value;

    if (
      !foodName ||
      !foodName.trim() ||
      !Description ||
      !Description.trim() ||
      !Caloric ||
      !Caloric.trim()
    ) {
      alert("no empty values allowed");
    } else {
      addFood(food).then(() => history.push("/FoodSchedule"));
    }
  };

  return (
    <>
      <form className="foodForm">
        <h1>Food Form</h1>
        <fieldset>
          <label>Food Name</label>
          <input id="FoodName" onChange={handleInputChange}></input>

          <label>Description</label>
          <input id="Description" onChange={handleInputChange}></input>

          <label>Caloric</label>
          <input id="Caloric" onChange={handleInputChange}></input>

          <label>ImageURL</label>
          <input id="ImageURL" onChange={handleInputChange}></input>
        </fieldset>

        <button onClick={submit}>Add Food to your list</button>
      </form>
    </>
  );
};

export default FoodForm;
