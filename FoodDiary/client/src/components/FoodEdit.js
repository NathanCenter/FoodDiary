import { Link, useParams } from "react-router-dom";
import { GetFoodById, getFoodScheduleById } from "../modules/FoodManager";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { EditFoodById } from "../modules/FoodManager";
import  "../css/styleSheet.css"
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
  const formStyle={
    textAlign: "center",
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
    <div style={formStyle}>
      <label>Food Name</label> &nbsp;
      <input
        id="FoodName"
        defaultValue={food?.foodName}
        onChange={handleInputChange}
      />
      <p>
      <label>Food Description</label>
      <br></br>
      <textarea rows="5" cols="50"
        id="Description"
        defaultValue={food?.description}
        onChange={handleInputChange}
       
      /></p>

      <label>Food calores</label> &nbsp;
      <input
        id="Caloric"
        defaultValue={food?.caloric}
        onChange={handleInputChange}
      />
    <p>

       
      <button onClick={submit} style={buttonStyle}>Save</button> &nbsp;
      <Link to="/FoodSchedule" style={{textDecoration: 'none',color:"#39395f", fontSize:"20px"}}>Cancel</Link>
      </p>
      </div>
    </>
  );
};

export default FoodEdit;
