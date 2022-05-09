import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import { register } from "../modules/authManager";

export default function Register() {
  const history = useHistory();

  const [name, setName] = useState();

  const [email, setEmail] = useState();
  const [height, setHeight] = useState();

  const [weight, setWeight] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { name, email, height, weight };
      register(userProfile, password).then(() => history.push("/FoodSchedule"));
    }
  };

  const registerStyle = {
    backgroundColor: "white",
    textAlign: "center",
    paddingTop:"10px",
    paddingBottom:"10px"
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
    <Form onSubmit={registerClick} style={registerStyle}> &nbsp;
      <FormGroup style={formStyle}>
        <Label for="Name">Name</Label>  &nbsp;
        <Input
          id="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>

      <FormGroup style={formStyle}>
        <Label for="email">Email</Label> &nbsp;
        <Input
          id="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup style={formStyle}> &nbsp;
        <Label for="height">Height</Label> &nbsp;
        <Input
          id="height"
          type="text"
          onChange={(e) => setHeight(e.target.value)}
        />
      </FormGroup>
      <FormGroup style={formStyle}>
        <Label for="weight">Weight</Label> &nbsp;
        <Input
          id="weight"
          type="text"
          onChange={(e) => setWeight(e.target.value)}
        />
      </FormGroup>
      <FormGroup style={formStyle}>
        <Label for="password">Password</Label> &nbsp;
        <Input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup style={formStyle}>
        <Label for="confirmPassword">Confirm Password</Label> &nbsp;
        <Input
          id="confirmPassword"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup style={formStyle}>
        <Button style={buttonStyle}>Register</Button>
      </FormGroup>
    </Form>
  );
}
