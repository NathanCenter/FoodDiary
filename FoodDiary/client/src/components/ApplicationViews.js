import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../modules/Login";
import Register from "../modules/Register";



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
        
       
      </Switch>
    </main>
  );
}
