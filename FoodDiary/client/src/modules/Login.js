import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import  "../css/styleSheet.css"

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/FoodSchedule"))
      .catch(() => alert("Invalid email or password"));
  };


  const formStyle = {
    paddingBottom: "10px",

  };

  const buttonStyle = {
    width: "200px",
    height: "35px",
    borderRadius: "15px",
    backgroundColor: "#416a59",
    color: "white",
    border: 0,
    textSize: "20px",
  };
  return (
    <Form onSubmit={loginSubmit}  id="logInForm">
      <FormGroup style={formStyle}>
        <Label for="email">Email </Label>
        <Input
          id="email"
          type="text"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup style={formStyle}>
        <Label for="password">Password </Label>
        <Input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Button style={buttonStyle}>Login</Button>
      </FormGroup>
     
        Not registered? <Link to="register">Register</Link>
      
    </Form>
  );
}
