import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../modules/Login";
import Register from "../modules/Register";
import FoodForm from "./FoodForm";
import FoodSchedule from "./FoodScheduleForm";
import FoodEdit from "./FoodEdit";





export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
      
      
      <Route path="/login" exact>
        <Login />
      </Route>
      
      <Route path="/register" exact>
        <Register />
      </Route>
        
      <Route path="/food/add" exact>
        <FoodForm/>
      </Route>

      <Route path="/food/:id(\d+)" exact>

     <FoodEdit/>

      </Route>
      <Route path="/FoodSchedule/Schedule" exact>
        <FoodSchedule/>
      </Route>
     
      </Switch>
    </main>
  );
}
