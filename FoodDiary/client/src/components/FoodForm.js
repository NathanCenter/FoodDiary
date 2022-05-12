import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import  "../css/styleSheet.css"
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
  const formStyle={
    textAlign: "center",
  }
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
      <form className="foodForm" style={formStyle}>
        <h1>Food Form</h1>
        <p>
          <label>Food Name:</label>&nbsp;
          <input id="FoodName" onChange={handleInputChange}></input> &nbsp;
          </p>
          <label><u>Description</u></label> &nbsp;
          <p>
          <textarea rows="5" cols="50" id="Description" onChange={handleInputChange}/> &nbsp;
          </p>
          <br></br>
        
          <label>Calories:</label> &nbsp;
          <input id="Caloric" onChange={handleInputChange}></input>&nbsp;
          
         
       <br></br>
       <br></br>
        <button onClick={submit} style={styleButton}>Add Food to your list</button>
        <br></br>
        <br></br>
        <Link to="/FoodSchedule" id="goBack"  style={{textDecoration: 'none',color:"#39395f", fontSize:"20px"}}>Go Back</Link>
      </form>
    </>
  );
};
export default FoodForm;
