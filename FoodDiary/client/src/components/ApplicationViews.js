import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../modules/Login";
import Register from "../modules/Register";
import FoodForm from "./FoodForm";
import FoodScheduleForm from "./FoodScheduleForm";
import FoodDisplay from "./FoodDisplay";
import FoodEdit from "./FoodEdit";
import FoodDelete from "./FoodDelete";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>

        <Route path="/" exact>
          {isLoggedIn?  <FoodDisplay />: <Redirect to="/login"/>}
        </Route>
      
      
        <Route path="/login"  style={{textDecoration: 'none',color:"#39395f", fontSize:"20px"}}>
        <Login />

        </Route>

        <Route path="/register" >
          <Register />
        </Route>

        <Route path="/food/add" exact>
          <FoodForm />
        </Route>

        <Route path="/food/:id(\d+)" exact>
          <FoodEdit />
        </Route>
        <Route path="/FoodSchedule/Schedule" >
          <FoodScheduleForm />
        </Route>
        <Route path="/FoodSchedule/delete/:id(\d+)" exact>
          <FoodDelete />
        </Route>
      </Switch>
    </main>
  );
}
