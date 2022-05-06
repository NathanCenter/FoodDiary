import { Link, useParams } from "react-router-dom";
import { GetFoodById, getFoodScheduleById } from "../modules/FoodManager";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { EditFoodById } from "../modules/FoodManager";
const FoodEdit = () => {
  //display food
  const { id } = useParams();

  const getFoods = () => {
    GetFoodById(id).then((foods) => setFoodEdit(foods));
  };
  useEffect(() => {
    getFoods();
  }, []);

  const history = useHistory();

  //edit food
  const [food, setFoodEdit] = useState({
    FoodName: "",
    Description: "",
    Caloric: null,
    ImageURL: "",
  });
  const handleInputChange = (event) => {
    let value = event.target.value;

    if (value === "caloric") {
      value = parseInt(value);
    }
    const key = event.target.id;
    const foodCopy = { ...food };

    foodCopy[key] = value;
    setFoodEdit(foodCopy);
  };

  const submit = (event) => {
    event.preventDefault();
    EditFoodById(food).then(() => history.push("/FoodSchedule"));
  };
  return (
    
    <>
      <label>Food Name</label>
      <input
        id="FoodName"
        defaultValue={food?.foodName}
        onChange={handleInputChange}
      />

      <label>Food Description</label>
      <input
        id="Description"
        defaultValue={food?.description}
        onChange={handleInputChange}
      />

      <label>Food calores</label>
      <input
        id="Caloric"
        defaultValue={food?.caloric}
        onChange={handleInputChange}
      />

      <label>the Food imageURL</label>
      <input
        id="ImageURL"
        defaultValue={food?.imageURL}
        onChange={handleInputChange}
      />
      <button onClick={submit}>Save</button>
      <Link to="/FoodSchedule">Cancel</Link>
    </>
  );
};

export default FoodEdit;
