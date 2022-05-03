import FoodSchedule from "../components/FoodScheduleForm";
import { getToken } from "./authManager";
const apiUrl = "/api/Food";
const apiFood = "/api/FoodSchedule";

export const getAllFood = () => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/GetAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("An unknown error occurred while trying to get food.");
        }
      });
    });
  };

  export const getFoodbyUserID=(date)=>
  {
    return getToken().then((token) => {
        return fetch(`${apiFood}/${date}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(resp => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error("An unknown error occurred while trying to get food.");
          }
        });
      });

      
  }

  export const  addFood=(food) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(food)
      }).then(resp => resp.json()));
  };

  export const addSchedule=(FoodSchedule)=>{
    debugger;
    return getToken().then((token) =>
      fetch(`${apiFood}/Schedule`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(FoodSchedule)
      }).then(resp => resp.json()));
  };